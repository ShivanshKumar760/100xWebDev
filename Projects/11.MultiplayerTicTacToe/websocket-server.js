const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// In-memory database
const rooms = new Map();

// Helper function to check winner
function checkWinner(board) {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (const [a, b, c] of winningCombos) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  // Check for draw
  if (board.every(cell => cell !== null)) {
    return 'draw';
  }

  return null;
}

// Room management
function createRoom(roomId) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      players: [],
      board: Array(9).fill(null),
      currentTurn: 'X',
      winner: null
    });
  }
  return rooms.get(roomId);
}

function addPlayerToRoom(roomId, ws) {
  const room = createRoom(roomId);
  
  if (room.players.length >= 2) {
    return { error: 'Room is full' };
  }

  const player = room.players.length === 0 ? 'X' : 'O';
  room.players.push({ ws, player, roomId });
  
  return { player, room };
}

function removePlayerFromRoom(ws) {
  for (const [roomId, room] of rooms.entries()) {
    const playerIndex = room.players.findIndex(p => p.ws === ws);
    
    if (playerIndex !== -1) {
      room.players.splice(playerIndex, 1);
      
      // Notify remaining players
      room.players.forEach(p => {
        p.ws.send(JSON.stringify({
          type: 'playerLeft',
          playerCount: room.players.length
        }));
      });
      
      // Remove room if empty
      if (room.players.length === 0) {
        rooms.delete(roomId);
        console.log(`Room ${roomId} deleted`);
      }
      
      return roomId;
    }
  }
  return null;
}

function broadcastGameState(roomId) {
  const room = rooms.get(roomId);
  if (!room) return;

  const gameState = {
    type: 'gameState',
    board: room.board,
    currentTurn: room.currentTurn,
    winner: room.winner
  };

  room.players.forEach(p => {
    p.ws.send(JSON.stringify(gameState));
  });
}

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      switch (data.type) {
        case 'join': {
          const result = addPlayerToRoom(data.roomId, ws);
          
          if (result.error) {
            ws.send(JSON.stringify({
              type: 'error',
              message: result.error
            }));
            return;
          }

          ws.send(JSON.stringify({
            type: 'joined',
            player: result.player,
            playerCount: result.room.players.length
          }));

          // Notify other players
          result.room.players.forEach(p => {
            if (p.ws !== ws) {
              p.ws.send(JSON.stringify({
                type: 'playerJoined',
                playerCount: result.room.players.length
              }));
            }
          });

          console.log(`Player ${result.player} joined room ${data.roomId}`);
          break;
        }

        case 'move': {
          const room = rooms.get(data.roomId);
          if (!room) {
            ws.send(JSON.stringify({
              type: 'error',
              message: 'Room not found'
            }));
            return;
          }

          const player = room.players.find(p => p.ws === ws);
          if (!player) {
            ws.send(JSON.stringify({
              type: 'error',
              message: 'Player not in room'
            }));
            return;
          }

          // Validate move
          if (room.winner) {
            ws.send(JSON.stringify({
              type: 'error',
              message: 'Game already ended'
            }));
            return;
          }

          if (player.player !== room.currentTurn) {
            ws.send(JSON.stringify({
              type: 'error',
              message: 'Not your turn'
            }));
            return;
          }

          if (room.board[data.index] !== null) {
            ws.send(JSON.stringify({
              type: 'error',
              message: 'Cell already occupied'
            }));
            return;
          }

          // Make move
          room.board[data.index] = player.player;
          room.winner = checkWinner(room.board);
          
          if (!room.winner) {
            room.currentTurn = room.currentTurn === 'X' ? 'O' : 'X';
          }

          broadcastGameState(data.roomId);
          break;
        }

        case 'reset': {
          const room = rooms.get(data.roomId);
          if (!room) return;

          room.board = Array(9).fill(null);
          room.currentTurn = 'X';
          room.winner = null;

          broadcastGameState(data.roomId);
          console.log(`Room ${data.roomId} reset`);
          break;
        }

        case 'leave': {
          removePlayerFromRoom(ws);
          break;
        }
      }
    } catch (error) {
      console.error('Error processing message:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid message format'
      }));
    }
  });

  ws.on('close', () => {
    const roomId = removePlayerFromRoom(ws);
    if (roomId) {
      console.log(`Player left room ${roomId}`);
    }
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// API endpoint to view active rooms (for debugging)
app.get('/rooms', (req, res) => {
  const roomsList = Array.from(rooms.entries()).map(([id, room]) => ({
    id,
    players: room.players.length,
    gameState: {
      board: room.board,
      currentTurn: room.currentTurn,
      winner: room.winner
    }
  }));
  res.json(roomsList);
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`WebSocket server is ready`);
});