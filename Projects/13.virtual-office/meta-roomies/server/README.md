# Metaverse Office Backend

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Set up MongoDB:
   - Install MongoDB locally or use MongoDB Atlas
   - Update the connection string in `index.js` if needed

3. Set environment variables (optional):
```bash
export MONGODB_URI="mongodb://localhost:27017/metaverse-office"
export JWT_SECRET="your-secret-key"
export PORT=3001
```

4. Start the server:
```bash
npm run dev  # Development with auto-reload
# or
npm start    # Production
```

The server will run on http://localhost:3001

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Create new user account
- POST `/api/auth/login` - Login existing user

### Rooms
- GET `/api/rooms` - Get all rooms
- POST `/api/rooms` - Create new room

## Socket.IO Events

### Client → Server
- `join-room` - Join a specific room
- `player-move` - Update player position
- `send-message` - Send chat message
- `call-user` - Initiate video call
- `accept-call` - Accept incoming call
- `end-call` - End video call
- `leave-room` - Leave current room

### Server → Client
- `player-joined` - New player joined room
- `player-moved` - Player moved in room
- `player-left` - Player left room
- `players-in-room` - List of players in room
- `chat-message` - Receive chat message
- `incoming-call` - Incoming video call
- `call-accepted` - Call was accepted
- `call-ended` - Call ended
- `player-nearby` - Another player is nearby
- `player-left-range` - Player moved away

## Technologies

- Express.js - Web framework
- Socket.IO - Real-time communication
- MongoDB + Mongoose - Database
- bcryptjs - Password hashing
- jsonwebtoken - Authentication tokens
- CORS - Cross-origin resource sharing
