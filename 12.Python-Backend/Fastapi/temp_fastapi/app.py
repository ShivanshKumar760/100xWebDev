# from fastapi import FastAPI
# from pydantic import BaseModel

# app=FastAPI()
# post_db={}
# class UserPostIn(BaseModel):
#     body:str

# class UserPost(UserPostIn):
#     id:int

# @app.post("/",response_model=UserPost)
# async def create_post(post:UserPostIn):
#     data=post.model_dump()
#     last_record_id=len(post_db)
#     new_post={**data,"id":last_record_id}
#     post_db[last_record_id]=new_post
#     return new_post


# @app.get("/",response_model=list[UserPost])
# async def get_all_post():
#     return list(post_db.values())

# from fastapi import FastAPI, WebSocket, WebSocketDisconnect
# from fastapi.responses import HTMLResponse
# from fastapi.staticfiles import StaticFiles


# app = FastAPI()
# app.mount("/static", StaticFiles(directory="static"), name="static")

# # HTML frontend client included in response
# html = """<!DOCTYPE html>
# <html>
#   <head>
#     <title>FastAPI Chat</title>
#     <script src="https://tailwindcss.com"></script>
#   </head>
#   <body class="bg-gray-100 h-screen flex flex-col">
#     <div
#       class="container mx-auto max-w-2xl bg-white shadow-md rounded-lg mt-10 flex flex-col h-[80vh]"
#     >
#       <div class="p-4 border-b bg-blue-600 text-white rounded-t-lg">
#         <h1 class="text-xl font-bold">Real-time Chat</h1>
#         <p id="status" class="text-xs text-blue-200">Connecting...</p>
#       </div>

#       <ul id="messages" class="flex-1 p-4 overflow-y-auto space-y-2 list-none">
#         <!-- Messages will appear here -->
#       </ul>

#       <form id="chat-form" class="p-4 border-t flex gap-2">
#         <input
#           type="text"
#           id="messageText"
#           autocomplete="off"
#           placeholder="Type a message..."
#           class="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
#         />
#         <button
#           class="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
#         >
#           Send
#         </button>
#       </form>
#     </div>

#     <script>
#       // Generate a random ID for this session
#       const client_id = Math.floor(Math.random() * 1000);
#       const ws = new WebSocket(`ws://localhost:8000/ws/${client_id}`);
#       const messages = document.getElementById("messages");
#       const status = document.getElementById("status");

#       ws.onopen = () => {
#         status.innerText = `Connected as Client #${client_id}`;
#         status.classList.replace("text-blue-200", "text-green-200");
#       };

#       ws.onmessage = (event) => {
#         const li = document.createElement("li");
#         li.className = "bg-gray-200 p-2 rounded-lg w-fit max-w-[80%]";
#         li.innerText = event.data;
#         messages.appendChild(li);
#         messages.scrollTop = messages.scrollHeight; // Auto-scroll
#       };

#       ws.onclose = () => {
#         status.innerText = "Disconnected from server";
#         status.classList.replace("text-green-200", "text-red-300");
#       };

#       document.getElementById("chat-form").onsubmit = (e) => {
#         e.preventDefault();
#         const input = document.getElementById("messageText");
#         if (input.value) {
#           ws.send(input.value);
#           input.value = "";
#         }
#       };
#     </script>
#   </body>
# </html>"""

# # class ConnectionManager:
# #     def __init__(self):
# #         self.active_connections: list[WebSocket] = []

# #     async def connect(self, websocket: WebSocket):
# #         await websocket.accept()
# #         self.active_connections.append(websocket)

# #     def disconnect(self, websocket: WebSocket):
# #         self.active_connections.remove(websocket)

# #     async def broadcast(self, message: str):
# #         for connection in self.active_connections:
# #             await connection.send_text(message)
# #     async def send_personal_message(self, message: str, recipient_id: int):
# #         if recipient_id in self.active_connections:
# #             websocket = self.active_connections[recipient_id]
# #             await websocket.send_text(message)

# class ConnectionManager:
#     def __init__(self):
#         # Store as {client_id: websocket}
#         self.active_connections: dict[int, WebSocket] = {}

#     async def connect(self, client_id: int, websocket: WebSocket):
#         await websocket.accept()
#         self.active_connections[client_id] = websocket

#     def disconnect(self, client_id: int):
#         if client_id in self.active_connections:
#             del self.active_connections[client_id]

#     async def send_personal_message(self, message: str, recipient_id: int,client_id:int):
#         # Find the specific user's websocket
#         if recipient_id in self.active_connections:
#             websocket = self.active_connections[recipient_id]
#             await websocket.send_text(message)
#             websocket_sender = self.active_connections[client_id]
#             await websocket_sender.send_text(f"Message sent to Client #{recipient_id}")
            


# manager = ConnectionManager()

# @app.get("/")
# async def get():
#     return HTMLResponse(html)

# # @app.websocket("/ws/{client_id}")
# # async def websocket_endpoint(websocket: WebSocket, client_id: int):
# #     await manager.connect(websocket)
# #     print(f"this is a websocket connection {websocket}") 
# #     await websocket.send_text(f"Client #{client_id} joined the chat")#what this will do is send a message to the client that just connected, not to all clients. If you want to broadcast this message to all clients, you should use manager.broadcast instead of websocket.send_text.
# #     try:
# #         while True:
# #             data = await websocket.receive_text()
# #             await manager.broadcast(f"Client #{client_id} says: {data}")
# #     except WebSocketDisconnect:
# #         manager.disconnect(websocket)
# #         await manager.broadcast(f"Client #{client_id} left the chat")


# @app.websocket("/ws/{client_id}")
# async def websocket_endpoint(websocket: WebSocket, client_id: int):
#     await manager.connect(client_id, websocket)
#     try:
#         while True:
#             data = await websocket.receive_text()
            
#             # Expecting format "target_id:message"
#             if ":" in data:
#                 target_id_str, message = data.split(":", 1)
#                 target_id = int(target_id_str)
                
#                 await manager.send_personal_message(
#                     f"Private from {client_id}: {message}", 
#                     target_id,
#                     client_id
#                 )
#             else:
#                 await websocket.send_text("Error: Use 'id:message' format")
                
#     except WebSocketDisconnect:
#         manager.disconnect(client_id)