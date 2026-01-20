// server.js - Express + WebSocket Server with MongoDB
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/metaverse', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Database Schemas
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  avatar: {
    id: Number,
    color: String,
    name: String
  },
  lastSeen: { type: Date, default: Date.now },
  totalTimeSpent: { type: Number, default: 0 }
});

const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
  activeUsers: [{ type: String }],
  maxUsers: { type: Number, default: 50 }
});

const chatMessageSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Room = mongoose.model('Room', roomSchema);
const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

// In-memory storage for active connections
const rooms = new Map(); // roomId -> Set of WebSocket clients
const clients = new Map(); // WebSocket -> client data

// WebSocket Connection Handler
wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);
      
      switch (data.type) {
        case 'join':
          await handleJoin(ws, data);
          break;
        
        case 'move':
          handleMove(ws, data);
          break;
        
        case 'chat':
          await handleChat(ws, data);
          break;
        
        case 'disconnect':
          handleDisconnect(ws);
          break;
      }
    } catch (error) {
      console.error('Error handling message:', error);
      ws.send(JSON.stringify({ type: 'error', message: error.message }));
    }
  });

  ws.on('close', () => {
    handleDisconnect(ws);
  });
});

// Handle user joining a room
async function handleJoin(ws, data) {
  const { roomId, username, avatar } = data;
  
  try {
    // Find or create room
    let room = await Room.findOne({ roomId });
    
    if (!room) {
      room = new Room({
        roomId,
        createdBy: username,
        activeUsers: [username]
      });
      await room.save();
    } else {
      if (!room.activeUsers.includes(username)) {
        room.activeUsers.push(username);
        await room.save();
      }
    }

    // Create or update user
    let user = await User.findOne({ username });
    if (!user) {
      user = new User({ username, avatar });
      await user.save();
    } else {
      user.lastSeen = new Date();
      user.avatar = avatar;
      await user.save();
    }

    // Add client to room
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }
    rooms.get(roomId).add(ws);

    // Store client data
    const clientId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    clients.set(ws, {
      id: clientId,
      username,
      avatar,
      roomId,
      position: data.position || { x: 300, y: 400 },
      joinedAt: Date.now()
    });

    // Get all users in room
    const roomUsers = [];
    rooms.get(roomId).forEach(client => {
      const clientData = clients.get(client);
      if (clientData) {
        roomUsers.push({
          id: clientData.id,
          username: clientData.username,
          avatar: clientData.avatar,
          position: clientData.position
        });
      }
    });

    // Send current room state to new user
    ws.send(JSON.stringify({
      type: 'joined',
      userId: clientId,
      users: roomUsers
    }));

    // Broadcast new user to others in room
    broadcastToRoom(roomId, {
      type: 'user_joined',
      user: {
        id: clientId,
        username,
        avatar,
        position: data.position || { x: 300, y: 400 }
      }
    }, ws);

    // Load recent chat history
    const recentChats = await ChatMessage.find({ roomId })
      .sort({ timestamp: -1 })
      .limit(50);
    
    ws.send(JSON.stringify({
      type: 'chat_history',
      messages: recentChats.reverse()
    }));

  } catch (error) {
    console.error('Error in handleJoin:', error);
    ws.send(JSON.stringify({ type: 'error', message: 'Failed to join room' }));
  }
}

// Handle user movement
function handleMove(ws, data) {
  const client = clients.get(ws);
  if (!client) return;

  client.position = data.position;

  // Broadcast position to all users in room
  broadcastToRoom(client.roomId, {
    type: 'user_moved',
    userId: client.id,
    position: data.position
  }, ws);
}

// Handle chat messages
async function handleChat(ws, data) {
  const client = clients.get(ws);
  if (!client) return;

  try {
    // Save message to database
    const chatMessage = new ChatMessage({
      roomId: client.roomId,
      from: client.username,
      to: data.to,
      message: data.message
    });
    await chatMessage.save();

    // If private message, send only to target
    if (data.to) {
      const targetClient = findClientByUsername(client.roomId, data.to);
      if (targetClient) {
        targetClient.send(JSON.stringify({
          type: 'chat_message',
          from: client.username,
          message: data.message,
          timestamp: chatMessage.timestamp
        }));
      }
      
      // Send confirmation to sender
      ws.send(JSON.stringify({
        type: 'chat_message',
        from: client.username,
        to: data.to,
        message: data.message,
        timestamp: chatMessage.timestamp
      }));
    } else {
      // Broadcast to all in room
      broadcastToRoom(client.roomId, {
        type: 'chat_message',
        from: client.username,
        message: data.message,
        timestamp: chatMessage.timestamp
      });
    }
  } catch (error) {
    console.error('Error in handleChat:', error);
  }
}

// Handle user disconnect
async function handleDisconnect(ws) {
  const client = clients.get(ws);
  if (!client) return;

  try {
    const { roomId, username, joinedAt } = client;
    
    // Calculate session time
    const sessionTime = Date.now() - joinedAt;
    
    // Update user's total time
    await User.findOneAndUpdate(
      { username },
      { 
        $inc: { totalTimeSpent: sessionTime },
        lastSeen: new Date()
      }
    );

    // Remove from room
    if (rooms.has(roomId)) {
      rooms.get(roomId).delete(ws);
      
      // Update room's active users
      await Room.findOneAndUpdate(
        { roomId },
        { $pull: { activeUsers: username } }
      );

      // If room is empty, delete it
      if (rooms.get(roomId).size === 0) {
        rooms.delete(roomId);
        await Room.findOneAndDelete({ roomId });
      } else {
        // Notify others
        broadcastToRoom(roomId, {
          type: 'user_left',
          userId: client.id,
          username
        });
      }
    }

    clients.delete(ws);
    console.log(`User ${username} disconnected from room ${roomId}`);
  } catch (error) {
    console.error('Error in handleDisconnect:', error);
  }
}

// Helper function to broadcast to all clients in a room
function broadcastToRoom(roomId, message, excludeWs = null) {
  if (!rooms.has(roomId)) return;

  const messageStr = JSON.stringify(message);
  rooms.get(roomId).forEach(client => {
    if (client !== excludeWs && client.readyState === WebSocket.OPEN) {
      client.send(messageStr);
    }
  });
}

// Helper function to find client by username
function findClientByUsername(roomId, username) {
  if (!rooms.has(roomId)) return null;

  for (const client of rooms.get(roomId)) {
    const clientData = clients.get(client);
    if (clientData && clientData.username === username) {
      return client;
    }
  }
  return null;
}

// REST API Endpoints

// Get room info
app.get('/api/rooms/:roomId', async (req, res) => {
  try {
    const room = await Room.findOne({ roomId: req.params.roomId });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all active rooms
app.get('/api/rooms', async (req, res) => {
  try {
    const activeRooms = await Room.find({ activeUsers: { $ne: [] } });
    res.json(activeRooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new room
app.post('/api/rooms', async (req, res) => {
  try {
    const { roomId, username } = req.body;
    
    const existingRoom = await Room.findOne({ roomId });
    if (existingRoom) {
      return res.status(400).json({ error: 'Room already exists' });
    }

    const room = new Room({
      roomId,
      createdBy: username,
      activeUsers: []
    });
    await room.save();
    
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user statistics
app.get('/api/users/:username/stats', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      username: user.username,
      totalTimeSpent: user.totalTimeSpent,
      lastSeen: user.lastSeen,
      avatar: user.avatar
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get chat history for a room
app.get('/api/rooms/:roomId/messages', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const messages = await ChatMessage.find({ roomId: req.params.roomId })
      .sort({ timestamp: -1 })
      .limit(limit);
    
    res.json(messages.reverse());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    activeRooms: rooms.size,
    activeClients: clients.size
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`WebSocket server is ready`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server...');
  
  // Close all WebSocket connections
  wss.clients.forEach(client => {
    client.close();
  });
  
  server.close(() => {
    console.log('Server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});