const WebSocket = require("ws");
const http = require("http");

const PORT = 8080;

// Create HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket Dogfight Server Running\n");
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Store game rooms
const rooms = new Map();

class GameRoom {
  constructor(name) {
    this.name = name;
    this.players = new Map();
    this.bullets = [];
  }

  addPlayer(playerId, ws) {
    this.players.set(playerId, {
      id: playerId,
      ws: ws,
      position: { x: 0, y: 100, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      health: 100,
    });

    console.log(
      `Player ${playerId} joined room ${this.name}. Total players: ${this.players.size}`
    );

    // Notify all players about room state
    this.broadcastRoomState();
  }

  removePlayer(playerId) {
    this.players.delete(playerId);
    console.log(
      `Player ${playerId} left room ${this.name}. Total players: ${this.players.size}`
    );

    // Notify remaining players
    this.broadcast({
      type: "playerLeft",
      playerId: playerId,
    });

    // Clean up empty room
    if (this.players.size === 0) {
      rooms.delete(this.name);
      console.log(`Room ${this.name} closed (empty)`);
    }
  }

  broadcast(data, excludeId = null) {
    const message = JSON.stringify(data);
    this.players.forEach((player, id) => {
      if (id !== excludeId && player.ws.readyState === WebSocket.OPEN) {
        player.ws.send(message);
      }
    });
  }

  broadcastRoomState() {
    this.broadcast({
      type: "roomState",
      playerCount: this.players.size,
      players: Array.from(this.players.keys()),
    });
  }

  updatePlayer(playerId, data) {
    const player = this.players.get(playerId);
    if (player) {
      if (data.position) player.position = data.position;
      if (data.rotation) player.rotation = data.rotation;
      if (data.health !== undefined) player.health = data.health;
    }
  }

  handleBullet(data) {
    // Broadcast bullet to all other players
    this.broadcast(data, data.playerId);
  }

  handleHit(shooterId, targetId, damage) {
    const target = this.players.get(targetId);
    if (target) {
      target.health -= damage;

      // Broadcast hit
      this.broadcast({
        type: "hit",
        shooterId: shooterId,
        targetId: targetId,
        damage: damage,
        newHealth: target.health,
      });

      // Check if player is eliminated
      if (target.health <= 0) {
        this.broadcast({
          type: "playerEliminated",
          playerId: targetId,
          winnerId: shooterId,
        });

        // Notify winner
        const shooter = this.players.get(shooterId);
        if (shooter && shooter.ws.readyState === WebSocket.OPEN) {
          shooter.ws.send(
            JSON.stringify({
              type: "victory",
              defeatedPlayer: targetId,
            })
          );
        }

        console.log(`Player ${targetId} eliminated by ${shooterId}`);
      }
    }
  }
}

// WebSocket connection handling
wss.on("connection", (ws) => {
  let currentPlayerId = null;
  let currentRoom = null;

  console.log("New client connected");

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);

      switch (data.type) {
        case "join":
          currentPlayerId = data.playerId;
          const roomName = data.room || "default";

          // Get or create room
          if (!rooms.has(roomName)) {
            rooms.set(roomName, new GameRoom(roomName));
          }
          currentRoom = rooms.get(roomName);

          // Add player to room
          currentRoom.addPlayer(currentPlayerId, ws);

          // Send confirmation
          ws.send(
            JSON.stringify({
              type: "joined",
              playerId: currentPlayerId,
              room: roomName,
              playerCount: currentRoom.players.size,
            })
          );

          // If 2 players, start game
          if (currentRoom.players.size === 2) {
            currentRoom.broadcast({
              type: "gameStart",
              message: "Battle begins!",
            });
          }
          break;

        case "playerUpdate":
          if (currentRoom && currentPlayerId) {
            currentRoom.updatePlayer(currentPlayerId, data);
            // Broadcast to other players
            currentRoom.broadcast(data, currentPlayerId);
          }
          break;

        case "bulletFired":
          if (currentRoom) {
            currentRoom.handleBullet(data);
          }
          break;

        case "hit":
          if (currentRoom && currentPlayerId) {
            currentRoom.handleHit(currentPlayerId, data.targetId, data.damage);
          }
          break;

        case "ping":
          ws.send(JSON.stringify({ type: "pong" }));
          break;
      }
    } catch (error) {
      console.error("Error handling message:", error);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    if (currentRoom && currentPlayerId) {
      currentRoom.removePlayer(currentPlayerId);
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`╔════════════════════════════════════════╗`);
  console.log(`║  🛩️  Dogfight WebSocket Server 🛩️   ║`);
  console.log(`╠════════════════════════════════════════╣`);
  console.log(`║  Server running on port ${PORT}         ║`);
  console.log(`║  WebSocket: ws://localhost:${PORT}      ║`);
  console.log(`╚════════════════════════════════════════╝`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\nShutting down server...");
  wss.close(() => {
    console.log("WebSocket server closed");
    server.close(() => {
      console.log("HTTP server closed");
      process.exit(0);
    });
  });
});
