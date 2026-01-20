import React, { useState, useEffect, useRef } from "react";
import {
  Users,
  MessageCircle,
  LogIn,
  Copy,
  Check,
  Wifi,
  WifiOff,
  AlertCircle,
} from "lucide-react";

const AVATARS = [
  { id: 1, color: "#FF6B6B", name: "Red" },
  { id: 2, color: "#4ECDC4", name: "Teal" },
  { id: 3, color: "#45B7D1", name: "Blue" },
  { id: 4, color: "#FFA07A", name: "Coral" },
  { id: 5, color: "#98D8C8", name: "Mint" },
  { id: 6, color: "#F7DC6F", name: "Yellow" },
  { id: 7, color: "#BB8FCE", name: "Purple" },
  { id: 8, color: "#85C1E2", name: "Sky" },
];

const OFFICE_ITEMS = [
  { type: "desk", x: 100, y: 150, width: 80, height: 60 },
  { type: "desk", x: 250, y: 150, width: 80, height: 60 },
  { type: "desk", x: 400, y: 150, width: 80, height: 60 },
  { type: "desk", x: 100, y: 300, width: 80, height: 60 },
  { type: "desk", x: 250, y: 300, width: 80, height: 60 },
  { type: "desk", x: 400, y: 300, width: 80, height: 60 },
  { type: "table", x: 600, y: 200, width: 120, height: 80 },
];

// CHANGE THESE TO YOUR BACKEND URLs
const WS_URL = "ws://localhost:3000";
const API_URL = "http://localhost:3000/api";

const VirtualOffice = () => {
  const [screen, setScreen] = useState("login");
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [myUserId, setMyUserId] = useState(null);
  const [users, setUsers] = useState({});
  const [myPosition, setMyPosition] = useState({ x: 300, y: 400 });
  const [chatTarget, setChatTarget] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");
  const [isBackendAvailable, setIsBackendAvailable] = useState(true);

  const wsRef = useRef(null);
  const canvasRef = useRef(null);
  const keysPressed = useRef({});
  const reconnectTimeoutRef = useRef(null);
  const pendingPositionUpdate = useRef(null);
  const lastPositionSent = useRef({ x: 300, y: 400 });

  // Check if backend is available
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(`${API_URL.replace("/api", "")}/health`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        setIsBackendAvailable(response.ok);
      } catch (err) {
        console.log(err);
        setIsBackendAvailable(false);
        setError(
          "Backend server not running. Please start the backend server first."
        );
      }
    };
    checkBackend();
  }, []);

  // WebSocket connection
  const connectWebSocket = (room, user, avatar) => {
    if (!isBackendAvailable) {
      setError(
        "Backend server is not available. Please start the backend server."
      );
      return;
    }

    try {
      console.log("Connecting to WebSocket:", WS_URL);
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("✅ WebSocket connected successfully");
        setConnected(true);
        setError("");

        // Send join message to backend
        const joinMessage = {
          type: "join",
          roomId: room,
          username: user,
          avatar: avatar,
          position: myPosition,
        };
        console.log("📤 Sending join message:", joinMessage);
        ws.send(JSON.stringify(joinMessage));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("📥 Received message:", data);
          handleWebSocketMessage(data);
        } catch (err) {
          console.error("Error parsing message:", err);
        }
      };

      ws.onerror = (error) => {
        console.error("❌ WebSocket error:", error);
        setError(
          "Connection error. Make sure backend server is running on port 3000."
        );
        setConnected(false);
      };

      ws.onclose = (event) => {
        console.log(
          "🔌 WebSocket disconnected. Code:",
          event.code,
          "Reason:",
          event.reason
        );
        setConnected(false);

        // Attempt to reconnect after 3 seconds if on office screen
        if (screen === "office") {
          console.log("🔄 Will attempt to reconnect in 3 seconds...");
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log("Attempting to reconnect...");
            connectWebSocket(room, user, avatar);
          }, 3000);
        }
      };
    } catch (error) {
      console.error("❌ Failed to create WebSocket:", error);
      setError("Failed to connect to server. Is the backend running?");
      setConnected(false);
    }
  };

  // Handle incoming WebSocket messages
  const handleWebSocketMessage = (data) => {
    switch (data.type) {
      case "joined": {
        console.log("✅ Successfully joined room. My user ID:", data.userId);
        setMyUserId(data.userId);

        // Convert users array to object
        const usersMap = {};
        data.users.forEach((user) => {
          console.log("👤 User in room:", user.username, user.id);
          usersMap[user.id] = user;
        });
        setUsers(usersMap);
        console.log("Total users in room:", Object.keys(usersMap).length);
        break;
      }

      case "user_joined":
        console.log("👋 New user joined:", data.user.username);
        setUsers((prev) => ({
          ...prev,
          [data.user.id]: data.user,
        }));
        break;

      case "user_moved":
        setUsers((prev) => {
          if (!prev[data.userId]) return prev;
          return {
            ...prev,
            [data.userId]: {
              ...prev[data.userId],
              position: data.position,
            },
          };
        });
        break;

      case "chat_message":
        console.log("💬 Chat message received from:", data.from);
        setChatMessages((prev) => [
          ...prev,
          {
            from: data.from,
            to: data.to,
            text: data.message,
            timestamp: new Date(data.timestamp).toLocaleTimeString(),
          },
        ]);
        break;

      case "chat_history": {
        console.log(
          "📜 Loaded chat history:",
          data.messages.length,
          "messages"
        );
        const history = data.messages.map((msg) => ({
          from: msg.from,
          to: msg.to,
          text: msg.message,
          timestamp: new Date(msg.timestamp).toLocaleTimeString(),
        }));
        setChatMessages(history);
        break;
      }

      case "user_left":
        console.log("👋 User left:", data.username);
        setUsers((prev) => {
          const newUsers = { ...prev };
          delete newUsers[data.userId];
          return newUsers;
        });
        break;

      case "error":
        console.error("❌ Server error:", data.message);
        setError(data.message);
        break;

      default:
        console.log("❓ Unknown message type:", data.type);
    }
  };

  const handleLogin = async () => {
    if (!username || !selectedAvatar) {
      setError("Please enter a name and select an avatar");
      return;
    }

    if (!isBackendAvailable) {
      setError("Backend server is not running. Please start it first.");
      return;
    }

    let room = roomId;
    if (!room) {
      room = "ROOM-" + Math.random().toString(36).substr(2, 6).toUpperCase();
      setRoomId(room);
    }

    console.log("🚀 Attempting to join room:", room, "as", username);
    connectWebSocket(room, username, selectedAvatar);
    setScreen("office");
  };

  const createNewRoom = async () => {
    try {
      const newRoomId =
        "ROOM-" + Math.random().toString(36).substr(2, 6).toUpperCase();

      console.log("🏠 Creating new room:", newRoomId);
      const response = await fetch(`${API_URL}/rooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: newRoomId,
          username: username || "Guest",
        }),
      });

      if (response.ok) {
        console.log("✅ Room created successfully");
        setRoomId(newRoomId);
      } else {
        console.log("⚠️ Room creation failed, using client-side ID");
        setRoomId(newRoomId);
      }
    } catch (error) {
      console.error("❌ Failed to create room:", error);
      const newRoomId =
        "ROOM-" + Math.random().toString(36).substr(2, 6).toUpperCase();
      setRoomId(newRoomId);
    }
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Send position updates to server (throttled)
  useEffect(() => {
    if (
      screen !== "office" ||
      !wsRef.current ||
      wsRef.current.readyState !== WebSocket.OPEN
    )
      return;

    // Only send if position changed significantly (at least 5 pixels)
    const dx = Math.abs(myPosition.x - lastPositionSent.current.x);
    const dy = Math.abs(myPosition.y - lastPositionSent.current.y);

    if (dx < 5 && dy < 5) return;

    if (pendingPositionUpdate.current) {
      clearTimeout(pendingPositionUpdate.current);
    }

    pendingPositionUpdate.current = setTimeout(() => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: "move",
            position: myPosition,
          })
        );
        lastPositionSent.current = { ...myPosition };
      }
    }, 50); // Send updates every 50ms max

    return () => {
      if (pendingPositionUpdate.current) {
        clearTimeout(pendingPositionUpdate.current);
      }
    };
  }, [myPosition, screen]);

  // Movement handling
  useEffect(() => {
    if (screen !== "office") return;

    const handleKeyDown = (e) => {
      keysPressed.current[e.key] = true;
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const moveInterval = setInterval(() => {
      let newX = myPosition.x;
      let newY = myPosition.y;
      const speed = 3;

      if (
        keysPressed.current["ArrowUp"] ||
        keysPressed.current["w"] ||
        keysPressed.current["W"]
      )
        newY -= speed;
      if (
        keysPressed.current["ArrowDown"] ||
        keysPressed.current["s"] ||
        keysPressed.current["S"]
      )
        newY += speed;
      if (
        keysPressed.current["ArrowLeft"] ||
        keysPressed.current["a"] ||
        keysPressed.current["A"]
      )
        newX -= speed;
      if (
        keysPressed.current["ArrowRight"] ||
        keysPressed.current["d"] ||
        keysPressed.current["D"]
      )
        newX += speed;

      // Boundary check
      newX = Math.max(20, Math.min(780, newX));
      newY = Math.max(20, Math.min(580, newY));

      if (newX !== myPosition.x || newY !== myPosition.y) {
        setMyPosition({ x: newX, y: newY });

        // Update own position in users locally for immediate feedback
        if (myUserId) {
          setUsers((prev) => {
            if (!prev[myUserId]) return prev;
            return {
              ...prev,
              [myUserId]: { ...prev[myUserId], position: { x: newX, y: newY } },
            };
          });
        }
      }
    }, 16);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearInterval(moveInterval);
    };
  }, [screen, myPosition, myUserId]);

  // Canvas rendering
  useEffect(() => {
    if (screen !== "office" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.fillStyle = "#F0F4F8";
    ctx.fillRect(0, 0, 800, 600);

    // Draw grid
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 1;
    for (let i = 0; i < 800; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 600);
      ctx.stroke();
    }
    for (let i = 0; i < 600; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(800, i);
      ctx.stroke();
    }

    // Draw office furniture
    OFFICE_ITEMS.forEach((item) => {
      if (item.type === "desk") {
        ctx.fillStyle = "#8B4513";
        ctx.fillRect(item.x, item.y, item.width, item.height);
        ctx.fillStyle = "#A0522D";
        ctx.fillRect(item.x + 5, item.y + 5, item.width - 10, item.height - 10);

        ctx.fillStyle = "#333";
        ctx.beginPath();
        ctx.arc(
          item.x + item.width / 2,
          item.y + item.height + 20,
          15,
          0,
          Math.PI * 2
        );
        ctx.fill();
      } else if (item.type === "table") {
        ctx.fillStyle = "#654321";
        ctx.fillRect(item.x, item.y, item.width, item.height);
        ctx.fillStyle = "#8B6914";
        ctx.fillRect(item.x + 5, item.y + 5, item.width - 10, item.height - 10);
      }
    });

    // Draw users
    Object.values(users).forEach((user) => {
      if (!user.position) return;

      const pos = user.position;

      // Avatar circle
      ctx.fillStyle = user.avatar.color;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
      ctx.fill();

      // Avatar border
      ctx.strokeStyle = user.id === myUserId ? "#FFD700" : "#FFF";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Username
      ctx.fillStyle = "#1a202c";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(user.username, pos.x, pos.y - 30);

      // Chat indicator if nearby
      if (myUserId && user.id !== myUserId) {
        const myUser = users[myUserId];
        if (myUser && myUser.position) {
          const distance = Math.hypot(
            myUser.position.x - pos.x,
            myUser.position.y - pos.y
          );

          if (distance < 80) {
            ctx.fillStyle = "rgba(59, 130, 246, 0.8)";
            ctx.fillRect(pos.x - 25, pos.y - 50, 50, 15);
            ctx.fillStyle = "#FFF";
            ctx.font = "10px Arial";
            ctx.fillText("Press C", pos.x, pos.y - 40);
          }
        }
      }
    });
  }, [screen, users, myUserId]);

  // Check for nearby users
  useEffect(() => {
    if (screen !== "office") return;

    const handleKeyPress = (e) => {
      if (e.key === "c" || e.key === "C") {
        if (!myUserId || !users[myUserId]) return;

        const myPos = users[myUserId].position;

        // Find nearby user
        const nearbyUser = Object.values(users).find((user) => {
          if (user.id === myUserId || !user.position) return false;
          const distance = Math.hypot(
            myPos.x - user.position.x,
            myPos.y - user.position.y
          );
          return distance < 80;
        });

        if (nearbyUser) {
          console.log("💬 Opening chat with:", nearbyUser.username);
          setChatTarget(nearbyUser);
        }
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [screen, users, myUserId]);

  const sendMessage = () => {
    if (
      !messageInput.trim() ||
      !chatTarget ||
      !wsRef.current ||
      wsRef.current.readyState !== WebSocket.OPEN
    ) {
      console.error(
        "Cannot send message:",
        !messageInput.trim()
          ? "empty message"
          : !chatTarget
          ? "no target"
          : "websocket not connected"
      );
      return;
    }

    console.log("📤 Sending message to:", chatTarget.username);
    wsRef.current.send(
      JSON.stringify({
        type: "chat",
        message: messageInput,
        to: chatTarget.username,
      })
    );

    setMessageInput("");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        console.log("🔌 Disconnecting WebSocket...");
        wsRef.current.send(JSON.stringify({ type: "disconnect" }));
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  if (screen === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <Users className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Virtual Office
            </h1>
            <p className="text-gray-600">Join or create a virtual workspace</p>
          </div>

          {!isBackendAvailable && (
            <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-yellow-800">
                    Backend Not Running
                  </p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Please start the backend server:
                    <br />
                    <code className="bg-yellow-100 px-2 py-1 rounded mt-1 inline-block">
                      cd backend && npm start
                    </code>
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Avatar
              </label>
              <div className="grid grid-cols-4 gap-3">
                {AVATARS.map((avatar) => (
                  <button
                    key={avatar.id}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`w-16 h-16 rounded-full transition-all ${
                      selectedAvatar?.id === avatar.id
                        ? "ring-4 ring-blue-500 scale-110"
                        : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: avatar.color }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room ID (optional)
              </label>
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Leave empty to create new"
              />
              <button
                onClick={createNewRoom}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
              >
                Generate New Room ID
              </button>
            </div>

            <button
              onClick={handleLogin}
              disabled={!username || !selectedAvatar || !isBackendAvailable}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Enter Office
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-full"
                style={{ backgroundColor: selectedAvatar?.color }}
              />
              <div>
                <p className="font-semibold">{username}</p>
                <p className="text-sm text-gray-600">Room: {roomId}</p>
              </div>
            </div>
            <button
              onClick={copyRoomId}
              className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? "Copied!" : "Copy Room ID"}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {connected ? (
                <Wifi className="w-5 h-5 text-green-600" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-600" />
              )}
              <span
                className={`text-sm font-medium ${
                  connected ? "text-green-600" : "text-red-600"
                }`}
              >
                {connected ? "Connected" : "Disconnected"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-5 h-5" />
              <span className="font-medium">
                {Object.keys(users).length} online
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="border-2 border-gray-300 rounded"
            />
            <p className="text-center mt-2 text-sm text-gray-600">
              Use Arrow Keys or WASD to move • Press C near others to chat
            </p>
            {!connected && (
              <p className="text-center mt-1 text-xs text-red-600">
                ⚠️ Not connected to server. Check if backend is running.
              </p>
            )}
          </div>

          {chatTarget && (
            <div className="bg-white rounded-lg shadow-lg p-4 w-80 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: chatTarget.avatar.color }}
                  />
                  <span className="font-semibold">{chatTarget.username}</span>
                </div>
                <button
                  onClick={() => setChatTarget(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto mb-4 space-y-2 max-h-96">
                {chatMessages
                  .filter(
                    (msg) =>
                      (msg.from === username &&
                        msg.to === chatTarget.username) ||
                      (msg.from === chatTarget.username &&
                        (msg.to === username || !msg.to))
                  )
                  .map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg ${
                        msg.from === username
                          ? "bg-blue-100 ml-auto max-w-xs"
                          : "bg-gray-100 mr-auto max-w-xs"
                      }`}
                    >
                      <p className="text-xs text-gray-600 mb-1">{msg.from}</p>
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {msg.timestamp}
                      </p>
                    </div>
                  ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={sendMessage}
                  disabled={!connected}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualOffice;
