const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/metaverse-office';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schemas
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
  createdAt: { type: Date, default: Date.now }
});

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  currentUsers: { type: Number, default: 0 },
  ownerId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Room = mongoose.model('Room', RoomSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET);
    res.json({ id: user._id, username: user.username, email: user.email, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET);
    res.json({ id: user._id, username: user.username, email: user.email, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Room Routes
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/rooms', async (req, res) => {
  try {
    const { name, capacity } = req.body;
    const room = new Room({
      name,
      capacity,
      ownerId: 'temp-owner', // You'd get this from authenticated user
    });
    await room.save();
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Socket.IO
const rooms = new Map(); // roomId -> Set of socket ids
const players = new Map(); // socketId -> player data

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', ({ roomId, user }) => {
    socket.join(roomId);
    
    const player = {
      id: socket.id,
      username: user.username,
      position: { x: 640, y: 500 },
      roomId,
    };
    
    players.set(socket.id, player);
    
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }
    rooms.get(roomId).add(socket.id);

    // Notify others in room
    socket.to(roomId).emit('player-joined', player);
    
    // Send existing players to new user
    const playersInRoom = Array.from(rooms.get(roomId))
      .filter(id => id !== socket.id)
      .map(id => players.get(id))
      .filter(Boolean);
    
    socket.emit('players-in-room', playersInRoom);
    
    // Update room count
    Room.findByIdAndUpdate(roomId, { currentUsers: rooms.get(roomId).size })
      .catch(err => console.error(err));
  });

  socket.on('player-move', ({ roomId, position }) => {
    const player = players.get(socket.id);
    if (player) {
      player.position = position;
      socket.to(roomId).emit('player-moved', {
        playerId: socket.id,
        position,
      });
    }
  });

  socket.on('send-message', (message) => {
    io.to(message.toUserId).emit('chat-message', message);
  });

  socket.on('call-user', ({ userToCall, signalData, from }) => {
    io.to(userToCall).emit('incoming-call', { signal: signalData, from });
  });

  socket.on('accept-call', ({ signal, to }) => {
    io.to(to).emit('call-accepted', signal);
  });

  socket.on('end-call', ({ peerId }) => {
    io.to(peerId).emit('call-ended');
  });

  socket.on('leave-room', () => {
    const player = players.get(socket.id);
    if (player) {
      const roomId = player.roomId;
      socket.to(roomId).emit('player-left', socket.id);
      
      if (rooms.has(roomId)) {
        rooms.get(roomId).delete(socket.id);
        if (rooms.get(roomId).size === 0) {
          rooms.delete(roomId);
        } else {
          Room.findByIdAndUpdate(roomId, { currentUsers: rooms.get(roomId).size })
            .catch(err => console.error(err));
        }
      }
      
      players.delete(socket.id);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    const player = players.get(socket.id);
    if (player) {
      socket.to(player.roomId).emit('player-left', socket.id);
      
      if (rooms.has(player.roomId)) {
        rooms.get(player.roomId).delete(socket.id);
        Room.findByIdAndUpdate(player.roomId, { currentUsers: rooms.get(player.roomId).size })
          .catch(err => console.error(err));
      }
      
      players.delete(socket.id);
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
