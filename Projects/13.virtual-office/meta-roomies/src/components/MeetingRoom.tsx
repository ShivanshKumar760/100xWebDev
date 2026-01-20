import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Room } from "@/types";
import { X, ExternalLink } from "lucide-react";

interface MeetingRoomProps {
  room: Room;
  onClose: () => void;
}

const MeetingRoom = ({ room, onClose }: MeetingRoomProps) => {
  const zoomLink = `https://zoom.us/j/${room.id}`;
  const googleMeetLink = `https://meet.google.com/${room.id}`;

  return (
    <Card className="fixed inset-8 glass shadow-glow animate-scale-in z-50 flex flex-col">
      <div className="p-4 border-b flex items-center justify-between gradient-primary">
        <h3 className="font-semibold text-white">Meeting Room - {room.name}</h3>
        <Button
          size="sm"
          variant="ghost"
          onClick={onClose}
          className="text-white hover:bg-white/20"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Join the Meeting</h2>
            <p className="text-muted-foreground">
              Select your preferred platform to join the group meeting
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 hover-lift cursor-pointer" onClick={() => window.open(zoomLink, '_blank')}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                  Z
                </div>
                <div>
                  <h3 className="text-xl font-bold">Zoom</h3>
                  <p className="text-sm text-muted-foreground">Video conferencing</p>
                </div>
              </div>
              <Button className="w-full gradient-primary text-white">
                Open Zoom <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Card>

            <Card className="p-6 hover-lift cursor-pointer" onClick={() => window.open(googleMeetLink, '_blank')}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg bg-green-500 flex items-center justify-center text-white text-2xl font-bold">
                  G
                </div>
                <div>
                  <h3 className="text-xl font-bold">Google Meet</h3>
                  <p className="text-sm text-muted-foreground">Video conferencing</p>
                </div>
              </div>
              <Button className="w-full gradient-accent text-white">
                Open Google Meet <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </div>

          <div className="glass p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Meeting Links</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Zoom:</span>
                <code className="px-2 py-1 bg-muted rounded text-xs">{zoomLink}</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Google Meet:</span>
                <code className="px-2 py-1 bg-muted rounded text-xs">{googleMeetLink}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MeetingRoom;
