import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//store rooms
const rooms = new Map();

const getRoom = (roomId) => {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      id: roomId,
      users: new Map(),
      code: "// Start coding here...",
      messages: [],
    });
  }
  return rooms.get(roomId);
};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  //join room
  socket.on("join-room", ({ roomId, username }) => {
    console.log(`User ${username} joining room: ${roomId}`);

    //join room
    socket.join(roomId);

    //get room and user
    const room = getRoom(roomId);
    room.users.set(socket.id, {
      id: socket.id,
      username,
      roomId,
    });

    //emit a message
    socket.emit("room-state", {
      code: room.code,
      messages: room.messages,
      users: Array.from(room.users.values()),
    });

    socket.to(roomId).emit("user-joined", {
      userId: socket.id,
      username,
    });

    // Send updated user list to all
    io.to(roomId).emit("users-update", Array.from(room.users.values()));
  });

  socket.on("chat-message", ({ roomId, message }) => {
    const room = getRoom(roomId);
    const user = room.users.get(socket.id);

    if (user) {
      const chatMessage = {
        id: Date.now(),
        type: "user",
        username: user.username,
        text: message,
        timestamp: new Date(),
      };

      // Store message in room
      room.messages.push(chatMessage);

      // Broadcast to all in room including sender
      io.to(roomId).emit("chat-message", chatMessage);
    }
  });

  // Code update
  socket.on("code-update", ({ roomId, code }) => {
    const room = getRoom(roomId);
    room.code = code;

    // Broadcast to others (not sender)
    socket.to(roomId).emit("code-update", code);
  });

  // WebRTC Signaling - these events handle peer-to-peer connection setup

  // When user is ready to start video call
  socket.on("ready-for-call", ({ roomId }) => {
    // Notify all other users in room that this user is ready
    socket.to(roomId).emit("user-ready-for-call", {
      userId: socket.id,
    });
  });

  // WebRTC Offer - first step in establishing connection
  socket.on("webrtc-offer", ({ roomId, targetUserId, offer }) => {
    console.log(`Sending offer from ${socket.id} to ${targetUserId}`);

    // Forward offer to specific user
    io.to(targetUserId).emit("webrtc-offer", {
      fromUserId: socket.id,
      offer,
    });
  });

  // WebRTC Answer - response to offer
  socket.on("webrtc-answer", ({ roomId, targetUserId, answer }) => {
    console.log(`Sending answer from ${socket.id} to ${targetUserId}`);

    // Forward answer to specific user
    io.to(targetUserId).emit("webrtc-answer", {
      fromUserId: socket.id,
      answer,
    });
  });

  // ICE Candidate - network path information for connection
  socket.on("ice-candidate", ({ roomId, targetUserId, candidate }) => {
    console.log(`Sending ICE candidate from ${socket.id} to ${targetUserId}`);

    // Forward ICE candidate to specific user
    io.to(targetUserId).emit("ice-candidate", {
      fromUserId: socket.id,
      candidate,
    });
  });

  // Disconnect handler
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);

    // Find and remove user from all rooms
    rooms.forEach((room, roomId) => {
      if (room.users.has(socket.id)) {
        const user = room.users.get(socket.id);
        room.users.delete(socket.id);

        // Notify others
        socket.to(roomId).emit("user-left", {
          userId: socket.id,
          username: user.username,
        });

        // Send updated user list
        io.to(roomId).emit("users-update", Array.from(room.users.values()));

        // Delete room if empty
        if (room.users.size === 0) {
          rooms.delete(roomId);
          console.log(`Room ${roomId} deleted (empty)`);
        }
      }
    });
  });
});

// app.get("/", (req, res) => {
//   res.send("Welcome the server is running !");
// });

app.get("/api/rooms/:roomId", (req, res) => {
  const { roomId } = req.params;
  const room = rooms.get(roomId);

  if (room) {
    res.json({
      exists: true,
      userCount: room.users.size,
    });
  } else {
    res.json({
      exists: false,
      userCount: 0,
    });
  }
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    rooms: rooms.size,
    timestamp: new Date(),
  });
});

// app.listen(3000, function () {
//   console.log("Server is running on port 3000");
// });

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, closing server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
