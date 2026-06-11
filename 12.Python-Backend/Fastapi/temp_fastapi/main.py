from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
import json

app = FastAPI()

html = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Cipher — Private Rooms</title>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0a0a0f;
      --surface: #111118;
      --surface2: #1a1a24;
      --border: #2a2a3a;
      --accent: #7c6dfa;
      --accent2: #fa6d9c;
      --text: #e8e8f0;
      --muted: #6b6b80;
      --green: #4ade80;
      --red: #f87171;
      --radius: 12px;
    }

    body {
      font-family: 'Syne', sans-serif;
      background: var(--bg);
      color: var(--text);
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    /* Ambient background */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background:
        radial-gradient(ellipse 600px 400px at 20% 10%, rgba(124,109,250,0.08) 0%, transparent 70%),
        radial-gradient(ellipse 400px 300px at 80% 80%, rgba(250,109,156,0.06) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }

    /* ── TOP NAV ── */
    nav {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 32px;
      border-bottom: 1px solid var(--border);
      background: rgba(10,10,15,0.8);
      backdrop-filter: blur(12px);
    }
    .logo {
      font-size: 1.3rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .logo span { font-weight: 400; opacity: 0.5; }
    #conn-status {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: var(--muted);
    }
    .dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: var(--muted);
      transition: background 0.3s;
    }
    .dot.online  { background: var(--green); box-shadow: 0 0 8px var(--green); }
    .dot.offline { background: var(--red); }

    /* ── MAIN LAYOUT ── */
    .layout {
      position: relative;
      z-index: 1;
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    /* ── SIDEBAR ── */
    aside {
      width: 300px;
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      background: var(--surface);
      flex-shrink: 0;
    }
    .sidebar-header {
      padding: 20px;
      border-bottom: 1px solid var(--border);
    }
    .sidebar-header h2 {
      font-size: 0.7rem;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 14px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      border-radius: var(--radius);
      border: none;
      cursor: pointer;
      font-family: 'Syne', sans-serif;
      font-size: 0.85rem;
      font-weight: 600;
      transition: all 0.2s;
    }
    .btn-primary {
      background: linear-gradient(135deg, var(--accent), #6455e8);
      color: #fff;
      width: 100%;
      justify-content: center;
    }
    .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(124,109,250,0.3); }
    .btn-danger {
      background: rgba(248,113,113,0.12);
      color: var(--red);
      border: 1px solid rgba(248,113,113,0.2);
      padding: 6px 10px;
      font-size: 0.75rem;
    }
    .btn-danger:hover { background: rgba(248,113,113,0.22); }
    .btn-ghost {
      background: var(--surface2);
      color: var(--text);
      border: 1px solid var(--border);
      width: 100%;
      justify-content: center;
      margin-top: 8px;
    }
    .btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

    .rooms-list {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .rooms-list::-webkit-scrollbar { width: 4px; }
    .rooms-list::-webkit-scrollbar-track { background: transparent; }
    .rooms-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

    .room-card {
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 12px 14px;
      cursor: pointer;
      transition: all 0.18s;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .room-card:hover { border-color: var(--accent); background: rgba(124,109,250,0.06); }
    .room-card.active { border-color: var(--accent); background: rgba(124,109,250,0.1); }
    .room-card.full { border-color: rgba(250,109,156,0.3); opacity: 0.7; cursor: not-allowed; }
    .room-info { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
    .room-id {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.78rem;
      font-weight: 500;
      color: var(--accent);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .room-meta {
      font-size: 0.7rem;
      color: var(--muted);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .pill {
      display: inline-block;
      padding: 2px 7px;
      border-radius: 99px;
      font-size: 0.65rem;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 500;
    }
    .pill-open  { background: rgba(74,222,128,0.12); color: var(--green); }
    .pill-full  { background: rgba(250,109,156,0.12); color: var(--accent2); }
    .pill-yours { background: rgba(124,109,250,0.15); color: var(--accent); }

    .empty-rooms {
      text-align: center;
      padding: 40px 20px;
      color: var(--muted);
      font-size: 0.8rem;
      line-height: 1.6;
    }
    .empty-rooms svg { opacity: 0.3; margin-bottom: 12px; }

    /* ── MAIN CHAT AREA ── */
    main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    /* ── JOIN PANEL ── */
    #join-panel {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
    }
    .join-box {
      width: 100%;
      max-width: 420px;
      text-align: center;
    }
    .join-box h3 {
      font-size: 1.6rem;
      font-weight: 800;
      letter-spacing: -0.04em;
      margin-bottom: 8px;
    }
    .join-box p {
      color: var(--muted);
      font-size: 0.85rem;
      margin-bottom: 32px;
      line-height: 1.6;
    }
    .input-row {
      display: flex;
      gap: 10px;
      margin-bottom: 12px;
    }
    .input-field {
      flex: 1;
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 12px 16px;
      color: var(--text);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      outline: none;
      transition: border-color 0.2s;
    }
    .input-field::placeholder { color: var(--muted); }
    .input-field:focus { border-color: var(--accent); }
    .divider {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 20px 0;
      color: var(--muted);
      font-size: 0.75rem;
    }
    .divider::before, .divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--border);
    }

    /* ── CHAT PANEL ── */
    #chat-panel {
      flex: 1;
      display: none;
      flex-direction: column;
    }
    .chat-header {
      padding: 16px 24px;
      border-bottom: 1px solid var(--border);
      background: var(--surface);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .chat-room-info { display: flex; flex-direction: column; gap: 4px; }
    .chat-room-id {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--accent);
    }
    .chat-room-meta { font-size: 0.72rem; color: var(--muted); }
    .chat-actions { display: flex; gap: 8px; }

    .copy-btn {
      background: var(--surface2);
      border: 1px solid var(--border);
      color: var(--muted);
      padding: 6px 12px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.75rem;
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      transition: all 0.2s;
    }
    .copy-btn:hover { border-color: var(--accent); color: var(--accent); }
    .copy-btn.copied { border-color: var(--green); color: var(--green); }

    #messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    #messages::-webkit-scrollbar { width: 4px; }
    #messages::-webkit-scrollbar-track { background: transparent; }
    #messages::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

    .msg {
      max-width: 70%;
      padding: 10px 14px;
      border-radius: 14px;
      font-size: 0.87rem;
      line-height: 1.5;
      animation: msgIn 0.18s ease;
    }
    @keyframes msgIn {
      from { opacity: 0; transform: translateY(6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .msg-in {
      background: var(--surface2);
      border: 1px solid var(--border);
      border-bottom-left-radius: 4px;
      align-self: flex-start;
    }
    .msg-out {
      background: linear-gradient(135deg, var(--accent), #6455e8);
      color: #fff;
      border-bottom-right-radius: 4px;
      align-self: flex-end;
    }
    .msg-system {
      align-self: center;
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--border);
      color: var(--muted);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      padding: 6px 14px;
      border-radius: 99px;
    }

    .chat-footer {
      padding: 16px 24px;
      border-top: 1px solid var(--border);
      background: var(--surface);
      display: flex;
      gap: 10px;
    }
    .chat-footer .input-field { margin: 0; }
    .send-btn {
      background: linear-gradient(135deg, var(--accent), #6455e8);
      border: none;
      border-radius: var(--radius);
      width: 46px;
      height: 46px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all 0.2s;
    }
    .send-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(124,109,250,0.35); }
    .send-btn svg { color: #fff; }

    /* Toast */
    #toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: var(--surface2);
      border: 1px solid var(--border);
      color: var(--text);
      padding: 12px 20px;
      border-radius: var(--radius);
      font-size: 0.82rem;
      font-family: 'JetBrains Mono', monospace;
      z-index: 1000;
      transform: translateY(80px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    }
    #toast.show { transform: translateY(0); opacity: 1; }
    #toast.success { border-color: rgba(74,222,128,0.4); color: var(--green); }
    #toast.error   { border-color: rgba(248,113,113,0.4); color: var(--red); }
  </style>
</head>
<body>

<nav>
  <div class="logo">cipher<span>.rooms</span></div>
  <div id="conn-status"><span class="dot" id="dot"></span><span id="status-text">connecting…</span></div>
</nav>

<div class="layout">
  <!-- Sidebar -->
  <aside>
    <div class="sidebar-header">
      <h2>Rooms</h2>
      <button class="btn btn-primary" onclick="createRoom()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Create Room
      </button>
    </div>
    <div class="rooms-list" id="rooms-list">
      <div class="empty-rooms">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="display:block;margin:0 auto"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        No rooms yet.<br/>Create one to start chatting.
      </div>
    </div>
  </aside>

  <!-- Main -->
  <main>
    <!-- Join panel -->
    <div id="join-panel">
      <div class="join-box">
        <h3>Private Rooms</h3>
        <p>Create a room and share the code,<br/>or join an existing one.</p>
        <div class="input-row">
          <input class="input-field" id="join-input" placeholder="Enter room code…" />
          <button class="btn btn-primary" style="width:auto;padding:10px 18px" onclick="joinRoomById()">Join</button>
        </div>
      </div>
    </div>

    <!-- Chat panel -->
    <div id="chat-panel">
      <div class="chat-header">
        <div class="chat-room-info">
          <div class="chat-room-id" id="chat-room-id">—</div>
          <div class="chat-room-meta" id="chat-room-meta">—</div>
        </div>
        <div class="chat-actions">
          <button class="copy-btn" id="copy-btn" onclick="copyRoomCode()">Copy Code</button>
          <button class="btn btn-danger" onclick="deleteRoom()">Delete Room</button>
        </div>
      </div>
      <div id="messages"></div>
      <div class="chat-footer">
        <input class="input-field" id="msg-input" placeholder="Send a message…" onkeydown="if(event.key==='Enter')sendMsg()"/>
        <button class="send-btn" onclick="sendMsg()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  </main>
</div>

<div id="toast"></div>

<script>
  // ── State ──
  const clientId = crypto.randomUUID().slice(0, 8);
  let ws = null;
  let currentRoom = null;
  // rooms: { [roomId]: { creator, members: Set, created } }
  let rooms = {};

  // ── WebSocket ──
  function connect() {
    ws = new WebSocket(`ws://${location.host}/ws/${clientId}`);

    ws.onopen = () => {
      setStatus(true);
      ws.send(JSON.stringify({ type: 'sync_rooms' }));
    };

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      handleMessage(msg);
    };

    ws.onclose = () => {
      setStatus(false);
      setTimeout(connect, 2000);
    };
  }

  function setStatus(online) {
    document.getElementById('dot').className = 'dot ' + (online ? 'online' : 'offline');
    document.getElementById('status-text').textContent = online ? `you: ${clientId}` : 'reconnecting…';
  }

  // ── Message handler ──
  function handleMessage(msg) {
    switch (msg.type) {
      case 'rooms_state':
        // Receive all rooms state from server
        rooms = {};
        for (const [id, r] of Object.entries(msg.rooms)) {
          rooms[id] = { ...r, members: new Set(r.members) };
        }
        renderRooms();
        if (currentRoom && rooms[currentRoom]) updateChatHeader();
        break;

      case 'room_created':
        rooms[msg.room_id] = { creator: msg.creator, members: new Set(msg.members), created: msg.created };
        renderRooms();
        toast(`Room created`, 'success');
        break;

      case 'room_deleted':
        if (currentRoom === msg.room_id) {
          currentRoom = null;
          showPanel('join');
          toast('Room was deleted', 'error');
        }
        delete rooms[msg.room_id];
        renderRooms();
        break;

      case 'member_joined':
        if (rooms[msg.room_id]) {
          rooms[msg.room_id].members.add(msg.client_id);
          renderRooms();
          if (currentRoom === msg.room_id) {
            updateChatHeader();
            addSystemMsg(`Client ${msg.client_id} joined`);
          }
        }
        break;

      case 'member_left':
        if (rooms[msg.room_id]) {
          rooms[msg.room_id].members.delete(msg.client_id);
          renderRooms();
          if (currentRoom === msg.room_id) {
            updateChatHeader();
            addSystemMsg(`Client ${msg.client_id} left`);
          }
        }
        break;

      case 'chat':
        if (currentRoom === msg.room_id) {
          addMsg(msg.text, msg.sender === clientId ? 'out' : 'in');
        }
        break;

      case 'error':
        toast(msg.text, 'error');
        break;

      case 'join_ok':
        currentRoom = msg.room_id;
        showPanel('chat');
        document.getElementById('chat-room-id').textContent = msg.room_id;
        updateChatHeader();
        clearMessages();
        addSystemMsg('You joined the room');
        renderRooms();
        break;
    }
  }

  // ── Room actions ──
  function createRoom() {
    const roomId = crypto.randomUUID().slice(0, 8).toUpperCase();
    ws.send(JSON.stringify({ type: 'create_room', room_id: roomId }));
  }

  function joinRoomById() {
    const id = document.getElementById('join-input').value.trim().toUpperCase();
    if (!id) return toast('Enter a room code', 'error');
    ws.send(JSON.stringify({ type: 'join_room', room_id: id }));
    document.getElementById('join-input').value = '';
  }

  function joinRoom(roomId) {
    if (currentRoom === roomId) return;
    ws.send(JSON.stringify({ type: 'join_room', room_id: roomId }));
  }

  function deleteRoom() {
    if (!currentRoom) return;
    ws.send(JSON.stringify({ type: 'delete_room', room_id: currentRoom }));
  }

  function sendMsg() {
    const input = document.getElementById('msg-input');
    const text = input.value.trim();
    if (!text || !currentRoom) return;
    ws.send(JSON.stringify({ type: 'chat', room_id: currentRoom, text }));
    input.value = '';
  }

  // ── UI helpers ──
  function showPanel(name) {
    document.getElementById('join-panel').style.display = name === 'join' ? 'flex' : 'none';
    document.getElementById('chat-panel').style.display = name === 'chat' ? 'flex' : 'none';
  }

  function clearMessages() {
    document.getElementById('messages').innerHTML = '';
  }

  function addMsg(text, type) {
    const el = document.createElement('div');
    el.className = `msg msg-${type}`;
    el.textContent = text;
    const msgs = document.getElementById('messages');
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function addSystemMsg(text) {
    const el = document.createElement('div');
    el.className = 'msg msg-system';
    el.textContent = text;
    const msgs = document.getElementById('messages');
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function updateChatHeader() {
    if (!currentRoom || !rooms[currentRoom]) return;
    const r = rooms[currentRoom];
    const count = r.members.size;
    document.getElementById('chat-room-id').textContent = currentRoom;
    document.getElementById('chat-room-meta').textContent =
      `${count}/2 members · created by ${r.creator === clientId ? 'you' : r.creator}`;
  }

  function copyRoomCode() {
    if (!currentRoom) return;
    navigator.clipboard.writeText(currentRoom);
    const btn = document.getElementById('copy-btn');
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy Code'; btn.classList.remove('copied'); }, 1800);
  }

  function renderRooms() {
    const list = document.getElementById('rooms-list');
    const ids = Object.keys(rooms);

    if (ids.length === 0) {
      list.innerHTML = `<div class="empty-rooms">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="display:block;margin:0 auto"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        No rooms yet.<br/>Create one to start chatting.</div>`;
      return;
    }

    list.innerHTML = ids.map(id => {
      const r = rooms[id];
      const count = r.members ? r.members.size : 0;
      const isFull = count >= 2;
      const isActive = id === currentRoom;
      const isMine = r.creator === clientId;
      const isMember = r.members && r.members.has(clientId);
      return `
        <div class="room-card ${isActive ? 'active' : ''} ${isFull && !isMember ? 'full' : ''}"
             onclick="${!isFull || isMember ? `joinRoom('${id}')` : ''}">
          <div class="room-info">
            <div class="room-id">${id}</div>
            <div class="room-meta">
              ${count}/2 members
              ${isMine ? '<span class="pill pill-yours">host</span>' : ''}
              ${isFull && !isMember ? '<span class="pill pill-full">full</span>' : '<span class="pill pill-open">open</span>'}
            </div>
          </div>
        </div>`;
    }).join('');
  }

  function toast(msg, type = '') {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.className = `show ${type}`;
    clearTimeout(el._t);
    el._t = setTimeout(() => { el.className = type; }, 2600);
  }

  // ── Init ──
  showPanel('join');
  connect();
</script>
</body>
</html>"""


# ── Server-side room & connection state ──
active_connections: dict[str, WebSocket] = {}   # client_id -> ws
rooms: dict[str, dict] = {}                     # room_id -> {creator, members: set}


async def broadcast_room_state():
    """Send full rooms snapshot to every connected client."""
    payload = {
        "type": "rooms_state",
        "rooms": {
            rid: {
                "creator": r["creator"],
                "members": list(r["members"]),
                "created": r.get("created", ""),
            }
            for rid, r in rooms.items()
        }
    }
    dead = []
    for cid, ws in active_connections.items():
        try:
            await ws.send_json(payload)
        except Exception:
            dead.append(cid)
    for cid in dead:
        active_connections.pop(cid, None)


async def notify(client_id: str, payload: dict):
    ws = active_connections.get(client_id)
    if ws:
        try:
            await ws.send_json(payload)
        except Exception:
            pass


@app.get("/")
async def get():
    return HTMLResponse(html)


@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await websocket.accept()
    active_connections[client_id] = websocket

    # Send current rooms state on connect
    await broadcast_room_state()

    try:
        while True:
            raw = await websocket.receive_text()
            msg = json.loads(raw)
            t = msg.get("type")

            # ── Create room ──
            if t == "create_room":
                room_id = msg["room_id"]
                if room_id in rooms:
                    await notify(client_id, {"type": "error", "text": "Room ID already exists"})
                    continue
                rooms[room_id] = {"creator": client_id, "members": {client_id}}
                await notify(client_id, {
                    "type": "join_ok",
                    "room_id": room_id,
                })
                await broadcast_room_state()

            # ── Join room ──
            elif t == "join_room":
                room_id = msg["room_id"]
                if room_id not in rooms:
                    await notify(client_id, {"type": "error", "text": "Room not found"})
                    continue
                room = rooms[room_id]
                if len(room["members"]) >= 2 and client_id not in room["members"]:
                    await notify(client_id, {"type": "error", "text": "Room is full (max 2 users)"})
                    continue
                room["members"].add(client_id)
                await notify(client_id, {"type": "join_ok", "room_id": room_id})
                # Notify existing members
                for mid in room["members"]:
                    if mid != client_id:
                        await notify(mid, {"type": "member_joined", "room_id": room_id, "client_id": client_id})
                await broadcast_room_state()

            # ── Delete room ──
            elif t == "delete_room":
                room_id = msg["room_id"]
                if room_id not in rooms:
                    continue
                room = rooms.pop(room_id)
                # Notify all members
                for mid in room["members"]:
                    await notify(mid, {"type": "room_deleted", "room_id": room_id})
                await broadcast_room_state()

            # ── Chat ──
            elif t == "chat":
                room_id = msg.get("room_id")
                if room_id not in rooms:
                    continue
                room = rooms[room_id]
                if client_id not in room["members"]:
                    continue
                text = msg.get("text", "")
                for mid in room["members"]:
                    await notify(mid, {
                        "type": "chat",
                        "room_id": room_id,
                        "sender": client_id,
                        "text": text,
                    })

            # ── Sync rooms ──
            elif t == "sync_rooms":
                await broadcast_room_state()

    except WebSocketDisconnect:
        active_connections.pop(client_id, None)
        # Remove client from any rooms they're in
        for room_id, room in list(rooms.items()):
            if client_id in room["members"]:
                room["members"].discard(client_id)
                for mid in room["members"]:
                    await notify(mid, {"type": "member_left", "room_id": room_id, "client_id": client_id})
                # If room is empty, clean it up
                if not room["members"]:
                    rooms.pop(room_id, None)
        await broadcast_room_state()