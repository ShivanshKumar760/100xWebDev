import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Player, ChatMessage } from "@/types";
import { X } from "lucide-react";

interface ChatPopupProps {
  peer: Player;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onClose: () => void;
}

const ChatPopup = ({ peer, messages, onSendMessage, onClose }: ChatPopupProps) => {
  const [message, setMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <Card className="fixed right-8 bottom-8 w-96 glass shadow-glow animate-fade-in z-50">
      <div className="p-4 border-b flex items-center justify-between gradient-primary">
        <h3 className="font-semibold text-white">Chat with {peer.username}</h3>
        <Button
          size="sm"
          variant="ghost"
          onClick={onClose}
          className="text-white hover:bg-white/20"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="h-80 p-4">
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.fromUserId === peer.id ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.fromUserId === peer.id
                    ? "bg-muted"
                    : "gradient-primary text-white"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button type="submit" className="gradient-primary text-white">
          Send
        </Button>
      </form>
    </Card>
  );
};

export default ChatPopup;
