# Metaverse Office - Setup Guide

A virtual office space application inspired by Gather Town, featuring real-time collaboration, video calls, and interactive spaces.

## Features

- 🏢 **Virtual Office Spaces** - Create and join office rooms with customizable capacity
- 🚶 **2D Character Movement** - Navigate around the office using arrow keys (Phaser.js powered)
- 💬 **Real-time Chat** - Chat with nearby colleagues when you're in proximity
- 📹 **Video Calls** - WebRTC-powered 1-on-1 video calls
- 🎯 **Meeting Rooms** - Group meetings with Zoom/Google Meet integration
- 👥 **User Presence** - See other users moving around in real-time
- 🔐 **Authentication** - Secure login and signup system

## Tech Stack

### Frontend
- **React** - UI framework
- **TypeScript** - Type safety
- **Phaser.js** - 2D game engine for character movement
- **Socket.io Client** - Real-time communication
- **Simple Peer** - WebRTC implementation
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components

### Backend
- **Express.js** - Web server
- **Socket.io** - Real-time bidirectional communication
- **MongoDB + Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Prerequisites

- Node.js 16+ and npm
- MongoDB (local or MongoDB Atlas)

## Installation

### 1. Frontend Setup

```bash
# Install dependencies (already done in Lovable)
npm install

# Start the development server (already running)
npm run dev
```

The frontend will run on http://localhost:8080

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (optional)
echo "MONGODB_URI=mongodb://localhost:27017/metaverse-office" > .env
echo "JWT_SECRET=your-secret-key-here" >> .env
echo "PORT=3001" >> .env

# Start the server
npm run dev
```

The backend will run on http://localhost:3001

### 3. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB
# macOS
brew install mongodb-community

# Ubuntu
sudo apt-get install mongodb

# Start MongoDB
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in server/.env

## Usage

1. **Start Backend Server**
   ```bash
   cd server
   npm run dev
   ```

2. **Frontend is already running in Lovable**
   - Visit the preview on the right side

3. **Create an Account**
   - Click "Sign Up" tab
   - Enter username, email, and password

4. **Create or Join a Room**
   - Click "Create Room" to make a new office space
   - Or click on an existing room to join

5. **Move Around**
   - Use arrow keys ⬆️⬇️⬅️➡️ to move your character
   - Get close to other players to interact

6. **Interact with Others**
   - When near another player, a popup appears
   - Click "💬 Chat" for text messaging
   - Click "📹 Video Call" for 1-on-1 video

7. **Join Meetings**
   - Navigate to the Meeting Room area
   - Choose Zoom or Google Meet for group calls

## Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── ChatPopup.tsx          # Chat interface
│   │   ├── VideoCallPopup.tsx     # Video call UI
│   │   ├── MeetingRoom.tsx        # Meeting room interface
│   │   └── RoomList.tsx           # Room selection
│   ├── game/
│   │   └── OfficeScene.ts         # Phaser game scene
│   ├── pages/
│   │   ├── Auth.tsx               # Login/Signup
│   │   └── Office.tsx             # Main office view
│   ├── types/
│   │   └── index.ts               # TypeScript types
│   └── index.css                  # Design system
│
└── server/
    ├── index.js                   # Express + Socket.io server
    ├── package.json               # Backend dependencies
    └── README.md                  # Backend documentation
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login to existing account

### Rooms
- `GET /api/rooms` - Get all available rooms
- `POST /api/rooms` - Create new room

## Socket.io Events

### Emit (Client → Server)
- `join-room` - Join a specific room
- `player-move` - Update player position
- `send-message` - Send chat message
- `call-user` - Initiate video call
- `leave-room` - Leave current room

### Listen (Server → Client)
- `player-joined` - New player joined
- `player-moved` - Player position updated
- `player-left` - Player left room
- `chat-message` - Receive message
- `player-nearby` - Someone is nearby
- `incoming-call` - Receive call request

## Troubleshooting

### Frontend can't connect to backend
- Make sure backend is running on port 3001
- Check CORS settings in server/index.js
- Verify Socket.io connection URL in components

### MongoDB connection error
- Ensure MongoDB is running: `mongod`
- Check connection string in server
- Verify network access (if using Atlas)

### Video call not working
- Grant camera/microphone permissions
- Use HTTPS in production
- Check WebRTC compatibility

### Players not appearing
- Verify Socket.io connection
- Check browser console for errors
- Ensure room IDs match

## Next Steps

- 🎨 Customize office layouts and desk positions
- 👤 Add user avatars and profiles
- 🔊 Implement spatial audio
- 🎮 Add more interactive elements (whiteboards, screens)
- 📊 Analytics and user activity tracking
- 🌐 Deploy to production (Vercel + Railway/Heroku)

## Development Tips

- **Hot Reload**: Both frontend and backend support hot reload
- **Debugging**: Check browser console and server terminal logs
- **Testing**: Use multiple browser windows to simulate multiple users
- **MongoDB GUI**: Use MongoDB Compass for database visualization

## License

MIT

## Support

For issues and questions, check:
- Browser console for frontend errors
- Server terminal for backend errors
- MongoDB connection status
- Network tab for API calls
