import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Room } from "@/types";
import { toast } from "sonner";

interface RoomListProps {
  onJoinRoom: (room: Room) => void;
}

const RoomList = ({ onJoinRoom }: RoomListProps) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/rooms");
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      toast.error("Failed to fetch rooms");
    }
  };

  const createRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const capacity = parseInt(formData.get("capacity") as string);

    try {
      const response = await fetch("http://localhost:3001/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, capacity }),
      });

      if (response.ok) {
        toast.success("Room created!");
        setIsDialogOpen(false);
        fetchRooms();
      } else {
        toast.error("Failed to create room");
      }
    } catch (error) {
      toast.error("Unable to create room");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Office Rooms</h2>
          <p className="text-muted-foreground mt-1">Select a room to join or create your own</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-white hover-lift">
              + Create Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Room</DialogTitle>
            </DialogHeader>
            <form onSubmit={createRoom} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Input
                  name="name"
                  placeholder="Room Name"
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Input
                  name="capacity"
                  type="number"
                  placeholder="Capacity"
                  min="2"
                  max="50"
                  defaultValue="10"
                  required
                  className="h-12"
                />
              </div>
              <Button
                type="submit"
                className="w-full gradient-primary text-white"
                disabled={isCreating}
              >
                {isCreating ? "Creating..." : "Create Room"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card
            key={room.id}
            className="p-6 hover-lift cursor-pointer group"
            onClick={() => onJoinRoom(room)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold group-hover:text-primary transition-smooth">
                  {room.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {room.currentUsers} / {room.capacity} people
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center text-white font-bold">
                {room.currentUsers}
              </div>
            </div>
            
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full gradient-primary transition-all duration-500"
                style={{ width: `${(room.currentUsers / room.capacity) * 100}%` }}
              />
            </div>
            
            <Button
              className="w-full mt-4 gradient-accent text-white"
              onClick={(e) => {
                e.stopPropagation();
                onJoinRoom(room);
              }}
            >
              Join Room
            </Button>
          </Card>
        ))}
      </div>

      {rooms.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No rooms available. Create one to get started!</p>
        </div>
      )}
    </div>
  );
};

export default RoomList;
