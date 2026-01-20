import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import userRoute from "./routes/users.js";
import conversationRoute from "./routes/conversations.js";
import messageRoute from "./routes/messages.js";
import cloudinaryPkg from "cloudinary"; // Default import for Cloudinary
import multer from "multer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const app = express();
const httpServer = http.createServer(app); // Create an HTTP server
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Allow frontend to connect
  },
});

const { v2: cloudinary } = cloudinaryPkg;
const port = process.env.PORT || 4000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend to make requests to backend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("common"));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

// File Upload Route
app.post("/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  try {
    const base64String = req.file.buffer.toString("base64");
    const folder = "public/images";

    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${base64String}`,
      {
        resource_type: "auto",
        folder: folder,
      }
    );

    res.send({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading image: " + error.message);
  }
});

// Socket.IO Logic
let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("A user connected.");

  // Add user to the list
  socket.on("addUser", (userId) => {
    console.log("User added:", userId);
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Handle message sending
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log(`Message sent from ${senderId} to ${receiverId}`);
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    } else {
      console.log("User not found or not connected:", receiverId);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

// MongoDB Connection and Server Start
mongoose
  .connect(process.env.MONGO_LOCAL)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start HTTP and WebSocket server
    httpServer.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    console.log("Oops! Could not connect to DB. Try again.");
  });
