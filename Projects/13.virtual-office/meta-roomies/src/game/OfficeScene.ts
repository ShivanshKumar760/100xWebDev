import Phaser from "phaser";
import { Socket } from "socket.io-client";
import { User, Player, Position } from "@/types";

export default class OfficeScene extends Phaser.Scene {
  private player?: Phaser.GameObjects.Sprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private socket?: Socket;
  private user?: User & { token: string };
  private roomId?: string;
  private otherPlayers: Map<string, Phaser.GameObjects.Sprite> = new Map();
  private desks: Phaser.GameObjects.Rectangle[] = [];
  private meetingRoom?: Phaser.GameObjects.Rectangle;

  constructor() {
    super({ key: "OfficeScene" });
  }

  init() {
    this.socket = this.registry.get("socket");
    this.user = this.registry.get("user");
    this.roomId = this.registry.get("roomId");
  }

  create() {
    // Create office floor
    const floor = this.add.rectangle(640, 360, 1280, 720, 0x4a5568);
    
    // Create desks
    for (let i = 0; i < 8; i++) {
      const x = 200 + (i % 4) * 250;
      const y = 200 + Math.floor(i / 4) * 300;
      const desk = this.add.rectangle(x, y, 100, 60, 0x8b5cf6);
      this.desks.push(desk);
      
      // Add desk label
      this.add.text(x, y, `Desk ${i + 1}`, {
        fontSize: "12px",
        color: "#ffffff",
      }).setOrigin(0.5);
    }

    // Create meeting room
    this.meetingRoom = this.add.rectangle(1000, 360, 200, 300, 0x10b981);
    this.add.text(1000, 360, "Meeting\nRoom", {
      fontSize: "16px",
      color: "#ffffff",
      align: "center",
    }).setOrigin(0.5);

    // Create player
    this.player = this.add.sprite(640, 500, "");
    this.player.setDisplaySize(40, 40);
    
    // Draw player as a circle
    const graphics = this.add.graphics();
    graphics.fillStyle(0x00d9ff, 1);
    graphics.fillCircle(640, 500, 20);
    
    // Add player name
    this.add.text(640, 540, this.user?.username || "Player", {
      fontSize: "14px",
      color: "#ffffff",
      backgroundColor: "#00000088",
      padding: { x: 8, y: 4 },
    }).setOrigin(0.5);

    // Setup keyboard input
    this.cursors = this.input.keyboard?.createCursorKeys();

    // Socket listeners
    this.socket?.on("player-joined", (player: Player) => {
      this.addOtherPlayer(player);
    });

    this.socket?.on("player-moved", ({ playerId, position }: { playerId: string; position: Position }) => {
      this.updateOtherPlayer(playerId, position);
    });

    this.socket?.on("player-left", (playerId: string) => {
      this.removeOtherPlayer(playerId);
    });

    this.socket?.on("players-in-room", (players: Player[]) => {
      players.forEach(player => {
        if (player.id !== this.user?.id) {
          this.addOtherPlayer(player);
        }
      });
    });
  }

  update() {
    if (!this.player || !this.cursors) return;

    let velocityX = 0;
    let velocityY = 0;
    const speed = 200;

    if (this.cursors.left.isDown) {
      velocityX = -speed;
    } else if (this.cursors.right.isDown) {
      velocityX = speed;
    }

    if (this.cursors.up.isDown) {
      velocityY = -speed;
    } else if (this.cursors.down.isDown) {
      velocityY = speed;
    }

    // Update player position
    if (velocityX !== 0 || velocityY !== 0) {
      const dt = this.game.loop.delta / 1000;
      this.player.x += velocityX * dt;
      this.player.y += velocityY * dt;

      // Boundaries
      this.player.x = Phaser.Math.Clamp(this.player.x, 20, 1260);
      this.player.y = Phaser.Math.Clamp(this.player.y, 20, 700);

      // Emit position to server
      this.socket?.emit("player-move", {
        roomId: this.roomId,
        position: { x: this.player.x, y: this.player.y },
      });

      // Check proximity to other players
      this.checkPlayerProximity();
    }
  }

  private addOtherPlayer(player: Player) {
    const sprite = this.add.sprite(player.position.x, player.position.y, "");
    sprite.setDisplaySize(40, 40);
    
    const graphics = this.add.graphics();
    graphics.fillStyle(0xff6b6b, 1);
    graphics.fillCircle(player.position.x, player.position.y, 20);
    
    this.add.text(player.position.x, player.position.y + 40, player.username, {
      fontSize: "14px",
      color: "#ffffff",
      backgroundColor: "#00000088",
      padding: { x: 8, y: 4 },
    }).setOrigin(0.5);

    this.otherPlayers.set(player.id, sprite);
  }

  private updateOtherPlayer(playerId: string, position: Position) {
    const sprite = this.otherPlayers.get(playerId);
    if (sprite) {
      sprite.x = position.x;
      sprite.y = position.y;
    }
  }

  private removeOtherPlayer(playerId: string) {
    const sprite = this.otherPlayers.get(playerId);
    if (sprite) {
      sprite.destroy();
      this.otherPlayers.delete(playerId);
    }
  }

  private checkPlayerProximity() {
    if (!this.player) return;

    const proximityDistance = 100;
    let nearbyPlayer: Player | null = null;

    this.otherPlayers.forEach((sprite, playerId) => {
      const distance = Phaser.Math.Distance.Between(
        this.player!.x,
        this.player!.y,
        sprite.x,
        sprite.y
      );

      if (distance < proximityDistance) {
        nearbyPlayer = {
          id: playerId,
          username: "Player", // You'd get this from player data
          position: { x: sprite.x, y: sprite.y },
          roomId: this.roomId || "",
        };
      }
    });

    if (nearbyPlayer) {
      this.socket?.emit("player-nearby", nearbyPlayer);
    }
  }
}
