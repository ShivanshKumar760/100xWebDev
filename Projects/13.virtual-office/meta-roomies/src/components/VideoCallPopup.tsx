import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Player } from "@/types";
import { X, Mic, MicOff, Video, VideoOff } from "lucide-react";
import SimplePeer from "simple-peer";
import { Socket } from "socket.io-client";
import { toast } from "sonner";

interface VideoCallPopupProps {
  peer: Player;
  socket: Socket;
  onClose: () => void;
}

const VideoCallPopup = ({ peer, socket, onClose }: VideoCallPopupProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<SimplePeer.Instance | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    initializeCall();
    
    return () => {
      cleanup();
    };
  }, []);

  const initializeCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      
      localStreamRef.current = stream;
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Create peer connection
      const peerConnection = new SimplePeer({
        initiator: true,
        trickle: false,
        stream: stream,
      });

      peerConnection.on("signal", (data) => {
        socket.emit("call-user", {
          userToCall: peer.id,
          signalData: data,
          from: socket.id,
        });
      });

      peerConnection.on("stream", (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
        setIsConnecting(false);
        toast.success("Call connected!");
      });

      peerConnectionRef.current = peerConnection;

      // Listen for call acceptance
      socket.on("call-accepted", (signal) => {
        peerConnection.signal(signal);
      });

      // Listen for incoming calls
      socket.on("incoming-call", ({ from, signal }) => {
        peerConnection.signal(signal);
      });

    } catch (error) {
      console.error("Error initializing call:", error);
      toast.error("Failed to access camera/microphone");
      onClose();
    }
  };

  const cleanup = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.destroy();
    }
    socket.off("call-accepted");
    socket.off("incoming-call");
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const endCall = () => {
    cleanup();
    socket.emit("end-call", { peerId: peer.id });
    onClose();
  };

  return (
    <Card className="fixed inset-8 glass shadow-glow animate-scale-in z-50 flex flex-col">
      <div className="p-4 border-b flex items-center justify-between gradient-primary">
        <h3 className="font-semibold text-white">Video Call with {peer.username}</h3>
        <Button
          size="sm"
          variant="ghost"
          onClick={endCall}
          className="text-white hover:bg-white/20"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 relative bg-muted">
        {isConnecting && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Connecting...</p>
            </div>
          </div>
        )}
        
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className="absolute bottom-4 right-4 w-64 h-48 object-cover rounded-lg border-2 border-white shadow-lg"
        />
      </div>

      <div className="p-6 border-t flex items-center justify-center gap-4">
        <Button
          size="lg"
          variant={isMuted ? "destructive" : "secondary"}
          onClick={toggleMute}
          className="w-16 h-16 rounded-full"
        >
          {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </Button>
        
        <Button
          size="lg"
          variant={isVideoOff ? "destructive" : "secondary"}
          onClick={toggleVideo}
          className="w-16 h-16 rounded-full"
        >
          {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
        </Button>
        
        <Button
          size="lg"
          variant="destructive"
          onClick={endCall}
          className="w-16 h-16 rounded-full"
        >
          <X className="w-6 h-6" />
        </Button>
      </div>
    </Card>
  );
};

export default VideoCallPopup;
