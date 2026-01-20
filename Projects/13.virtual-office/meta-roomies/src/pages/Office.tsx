import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import RoomList from "@/components/RoomList";
import ChatPopup from "@/components/ChatPopup";
import VideoCallPopup from "@/components/VideoCallPopup";
import MeetingRoom from "@/components/MeetingRoom";
import OfficeScene from "@/game/OfficeScene";
import { User, Room, Player, ChatMessage } from "@/types";

interface OfficeProps {
  user: User & { token: string };
  onLogout: () => void;
}

const Office = ({ user, onLogout }: OfficeProps) => {
  const gameRef = useRef<Phaser.Game | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [showRoomList, setShowRoomList] = useState(true);
  const [nearbyPlayer, setNearbyPlayer] = useState<Player | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showMeeting, setShowMeeting] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    // Connect to socket
    socketRef.current = io("http://localhost:3001", {
      auth: { token: user.token },
    });

    socketRef.current.on("connect", () => {
      toast.success("Connected to server");
    });

    socketRef.current.on("player-nearby", (player: Player) => {
      setNearbyPlayer(player);
    });

    socketRef.current.on("player-left-range", () => {
      setNearbyPlayer(null);
      setShowChat(false);
      setShowVideoCall(false);
    });

    socketRef.current.on("chat-message", (message: ChatMessage) => {
      setChatMessages(prev => [...prev, message]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [user.token]);

  const joinRoom = (room: Room) => {
    if (gameRef.current) {
      gameRef.current.destroy(true);
    }

    setCurrentRoom(room);
    setShowRoomList(false);

    // Initialize Phaser game
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: "game-container",
      width: 1280,
      height: 720,
      backgroundColor: "#2d3748",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false,
        },
      },
      scene: [OfficeScene],
    };

    gameRef.current = new Phaser.Game(config);
    
    // Pass socket and user info to game scene
    gameRef.current.registry.set("socket", socketRef.current);
    gameRef.current.registry.set("user", user);
    gameRef.current.registry.set("roomId", room.id);

    // Join room via socket
    socketRef.current?.emit("join-room", { roomId: room.id, user });
    
    toast.success(`Joined ${room.name}`);
  };

  const handleStartChat = () => {
    setShowChat(true);
  };

  const handleStartVideoCall = () => {
    setShowVideoCall(true);
  };

  const handleSendMessage = (message: string) => {
    if (nearbyPlayer && socketRef.current) {
      const chatMessage: ChatMessage = {
        id: Date.now().toString(),
        fromUserId: user.id,
        fromUsername: user.username,
        toUserId: nearbyPlayer.id,
        message,
        timestamp: new Date(),
      };
      
      socketRef.current.emit("send-message", chatMessage);
      setChatMessages(prev => [...prev, chatMessage]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="glass border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Metaverse Office
            </h1>
            {currentRoom && (
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">{currentRoom.name}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, <span className="font-medium text-foreground">{user.username}</span>
            </span>
            {currentRoom && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCurrentRoom(null);
                  setShowRoomList(true);
                  if (gameRef.current) {
                    gameRef.current.destroy(true);
                  }
                  socketRef.current?.emit("leave-room");
                }}
              >
                Leave Room
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {showRoomList ? (
          <RoomList onJoinRoom={joinRoom} />
        ) : (
          <div className="space-y-4">
            <div id="game-container" className="rounded-lg overflow-hidden shadow-soft border" />
            
            {nearbyPlayer && !showChat && !showVideoCall && (
              <div className="glass fixed bottom-8 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-glow animate-fade-in">
                <p className="text-sm mb-3 text-center">
                  You're near <span className="font-medium text-primary">{nearbyPlayer.username}</span>
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleStartChat}
                    className="gradient-primary text-white hover-lift"
                  >
                    💬 Chat
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleStartVideoCall}
                    className="gradient-accent text-white hover-lift"
                  >
                    📹 Video Call
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {showChat && nearbyPlayer && (
        <ChatPopup
          peer={nearbyPlayer}
          messages={chatMessages.filter(
            m => (m.fromUserId === nearbyPlayer.id || m.toUserId === nearbyPlayer.id)
          )}
          onSendMessage={handleSendMessage}
          onClose={() => setShowChat(false)}
        />
      )}

      {showVideoCall && nearbyPlayer && socketRef.current && (
        <VideoCallPopup
          peer={nearbyPlayer}
          socket={socketRef.current}
          onClose={() => setShowVideoCall(false)}
        />
      )}

      {showMeeting && currentRoom && (
        <MeetingRoom
          room={currentRoom}
          onClose={() => setShowMeeting(false)}
        />
      )}
    </div>
  );
};

export default Office;
