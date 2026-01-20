// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const http = require("http");
// const socketIo = require("socket.io");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// app.use(cors());
// app.use(express.json());

// // MongoDB Connection

// // User Schema
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   phone: String,
//   role: { type: String, enum: ["rider", "driver"], default: "rider" },
//   location: {
//     lat: Number,
//     lng: Number,
//   },
//   isActive: { type: Boolean, default: false },
// });

// const User = mongoose.model("User", userSchema);

// // Ride Schema
// const rideSchema = new mongoose.Schema({
//   rider: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   pickup: {
//     lat: Number,
//     lng: Number,
//     address: String,
//   },
//   dropoff: {
//     lat: Number,
//     lng: Number,
//     address: String,
//   },
//   status: {
//     type: String,
//     enum: [
//       "requested",
//       "accepted",
//       "arrived",
//       "started",
//       "completed",
//       "cancelled",
//     ],
//     default: "requested",
//   },
//   fare: Number,
//   distance: Number,
//   paymentStatus: { type: String, default: "pending" },
//   createdAt: { type: Date, default: Date.now },
// });

// const Ride = mongoose.model("Ride", rideSchema);

// // Auth Middleware
// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   if (!token) return res.status(401).json({ error: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, "your-secret-key");
//     req.userId = decoded.userId;
//     next();
//   } catch (err) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// };

// // Routes
// app.post("/api/auth/register", async (req, res) => {
//   try {
//     const { name, email, password, phone, role } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//       role,
//     });

//     await user.save();
//     const token = jwt.sign({ userId: user._id }, "your-secret-key");
//     res.json({ token, user: { id: user._id, name, email, role } });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// app.post("/api/auth/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const token = jwt.sign({ userId: user._id }, "your-secret-key");
//     res.json({
//       token,
//       user: { id: user._id, name: user.name, email, role: user.role },
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// app.get("/api/user/profile", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select("-password");
//     res.json(user);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// app.post("/api/rides/request", authMiddleware, async (req, res) => {
//   try {
//     const { pickup, dropoff, fare, distance } = req.body;

//     const ride = new Ride({
//       rider: req.userId,
//       pickup,
//       dropoff,
//       fare,
//       distance,
//     });

//     await ride.save();

//     // Notify nearby drivers
//     io.emit("newRideRequest", {
//       rideId: ride._id,
//       pickup: ride.pickup,
//       dropoff: ride.dropoff,
//       fare: ride.fare,
//     });

//     res.json(ride);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// app.post("/api/rides/:rideId/accept", authMiddleware, async (req, res) => {
//   try {
//     const ride = await Ride.findById(req.params.rideId);

//     if (ride.status !== "requested") {
//       return res.status(400).json({ error: "Ride already accepted" });
//     }

//     ride.driver = req.userId;
//     ride.status = "accepted";
//     await ride.save();

//     const populatedRide = await Ride.findById(ride._id)
//       .populate("rider", "name phone")
//       .populate("driver", "name phone");

//     io.emit("rideAccepted", populatedRide);

//     res.json(populatedRide);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// app.put("/api/rides/:rideId/status", authMiddleware, async (req, res) => {
//   try {
//     const { status } = req.body;
//     const ride = await Ride.findByIdAndUpdate(
//       req.params.rideId,
//       { status },
//       { new: true }
//     ).populate("rider driver");

//     io.emit("rideStatusUpdate", ride);

//     res.json(ride);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// app.post("/api/rides/:rideId/payment", authMiddleware, async (req, res) => {
//   try {
//     const { paymentMethod } = req.body;

//     // Mock payment processing
//     const paymentSuccess = Math.random() > 0.1; // 90% success rate

//     if (paymentSuccess) {
//       const ride = await Ride.findByIdAndUpdate(
//         req.params.rideId,
//         { paymentStatus: "completed" },
//         { new: true }
//       );

//       res.json({ success: true, ride });
//     } else {
//       res.status(400).json({ success: false, error: "Payment failed" });
//     }
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// app.get("/api/rides/my-rides", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId);
//     const query =
//       user.role === "driver" ? { driver: req.userId } : { rider: req.userId };

//     const rides = await Ride.find(query)
//       .populate("rider", "name phone")
//       .populate("driver", "name phone")
//       .sort("-createdAt");

//     res.json(rides);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// app.get("/api/rides/available", authMiddleware, async (req, res) => {
//   try {
//     const rides = await Ride.find({ status: "requested" }).populate(
//       "rider",
//       "name phone"
//     );
//     res.json(rides);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // WebSocket for real-time updates
// io.on("connection", (socket) => {
//   console.log("Client connected:", socket.id);

//   socket.on("driverLocationUpdate", async (data) => {
//     const { driverId, location, rideId } = data;

//     // Update driver location in DB
//     await User.findByIdAndUpdate(driverId, { location });

//     // Broadcast to rider
//     io.emit("driverLocation", { rideId, location });
//   });

//   socket.on("updateLocation", async (data) => {
//     const { userId, location } = data;
//     await User.findByIdAndUpdate(userId, { location, isActive: true });
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });

// const PORT = process.env.PORT || 5000;
// mongoose
//   .connect("mongodb://localhost:27017/uber-clone")
//   .then(() => {
//     console.log("Connected to MongoDB");
//     server.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  role: { type: String, enum: ["rider", "driver"], default: "rider" },
  location: {
    lat: Number,
    lng: Number,
  },
  isActive: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

// Ride Schema
const rideSchema = new mongoose.Schema({
  rider: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  pickup: {
    lat: Number,
    lng: Number,
    address: String,
  },
  dropoff: {
    lat: Number,
    lng: Number,
    address: String,
  },
  status: {
    type: String,
    enum: [
      "requested",
      "accepted",
      "arrived",
      "started",
      "completed",
      "cancelled",
    ],
    default: "requested",
  },
  fare: Number,
  distance: Number,
  paymentStatus: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const Ride = mongoose.model("Ride", rideSchema);

// Message Schema for Chat
const messageSchema = new mongoose.Schema({
  ride: { type: mongoose.Schema.Types.ObjectId, ref: "Ride" },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  senderRole: { type: String, enum: ["rider", "driver"] },
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

// Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Routes
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    await user.save();
    const token = jwt.sign({ userId: user._id }, "your-secret-key");
    res.json({ token, user: { id: user._id, name, email, role } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "your-secret-key");
    res.json({
      token,
      user: { id: user._id, name: user.name, email, role: user.role },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/user/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/rides/request", authMiddleware, async (req, res) => {
  try {
    const { pickup, dropoff, fare, distance } = req.body;

    const ride = new Ride({
      rider: req.userId,
      pickup,
      dropoff,
      fare,
      distance,
    });

    await ride.save();

    const populatedRide = await Ride.findById(ride._id).populate(
      "rider",
      "name phone"
    );

    // Notify nearby drivers
    io.emit("newRideRequest", {
      rideId: ride._id,
      pickup: ride.pickup,
      dropoff: ride.dropoff,
      fare: ride.fare,
      rider: populatedRide.rider,
    });

    res.json(ride);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/rides/:rideId/accept", authMiddleware, async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);

    if (!ride) {
      return res.status(404).json({ error: "Ride not found" });
    }

    if (ride.status !== "requested") {
      return res.status(400).json({ error: "Ride already accepted" });
    }

    ride.driver = req.userId;
    ride.status = "accepted";
    await ride.save();

    const populatedRide = await Ride.findById(ride._id)
      .populate("rider", "name phone")
      .populate("driver", "name phone");

    // Notify the specific rider
    io.emit("rideAccepted", {
      rideId: populatedRide._id,
      ride: populatedRide,
      riderId: populatedRide.rider._id,
    });

    res.json(populatedRide);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/rides/:rideId/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const ride = await Ride.findByIdAndUpdate(
      req.params.rideId,
      { status },
      { new: true }
    ).populate("rider driver");

    io.emit("rideStatusUpdate", ride);

    res.json(ride);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/rides/:rideId/payment", authMiddleware, async (req, res) => {
  try {
    const { paymentMethod } = req.body;

    // Mock payment processing
    const paymentSuccess = Math.random() > 0.1; // 90% success rate

    if (paymentSuccess) {
      const ride = await Ride.findByIdAndUpdate(
        req.params.rideId,
        { paymentStatus: "completed" },
        { new: true }
      );

      res.json({ success: true, ride });
    } else {
      res.status(400).json({ success: false, error: "Payment failed" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/rides/my-rides", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const query =
      user.role === "driver" ? { driver: req.userId } : { rider: req.userId };

    const rides = await Ride.find(query)
      .populate("rider", "name phone")
      .populate("driver", "name phone")
      .sort("-createdAt");

    res.json(rides);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/rides/available", authMiddleware, async (req, res) => {
  try {
    const rides = await Ride.find({ status: "requested" }).populate(
      "rider",
      "name phone"
    );
    res.json(rides);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Chat Routes
app.get("/api/rides/:rideId/messages", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({ ride: req.params.rideId })
      .populate("sender", "name")
      .sort("timestamp");
    res.json(messages);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/rides/:rideId/messages", authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    const user = await User.findById(req.userId);

    const newMessage = new Message({
      ride: req.params.rideId,
      sender: req.userId,
      senderRole: user.role,
      message,
    });

    await newMessage.save();
    const populatedMessage = await Message.findById(newMessage._id).populate(
      "sender",
      "name"
    );

    // Broadcast message to both rider and driver
    io.emit("newMessage", {
      rideId: req.params.rideId,
      message: populatedMessage,
    });

    res.json(populatedMessage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// WebSocket for real-time updates
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("joinRide", (rideId) => {
    socket.join(rideId);
    console.log(`Socket ${socket.id} joined ride ${rideId}`);
  });

  socket.on("driverLocationUpdate", async (data) => {
    const { driverId, location, rideId } = data;

    // Update driver location in DB
    await User.findByIdAndUpdate(driverId, { location });

    // Broadcast to specific ride room
    io.to(rideId).emit("driverLocation", { rideId, location });
  });

  socket.on("sendMessage", async (data) => {
    const { rideId, senderId, message, senderRole } = data;

    try {
      const newMessage = new Message({
        ride: rideId,
        sender: senderId,
        senderRole,
        message,
      });

      await newMessage.save();
      const populatedMessage = await Message.findById(newMessage._id).populate(
        "sender",
        "name"
      );

      // Broadcast to ride room
      io.to(rideId).emit("newMessage", {
        rideId,
        message: populatedMessage,
      });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  });

  socket.on("updateLocation", async (data) => {
    const { userId, location } = data;
    await User.findByIdAndUpdate(userId, { location, isActive: true });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect("mongodb://localhost:27017/uber-clone")
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
