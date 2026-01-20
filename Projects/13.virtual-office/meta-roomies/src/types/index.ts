export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  currentUsers: number;
  ownerId: string;
  createdAt: Date;
}

export interface Position {
  x: number;
  y: number;
}

export interface Player {
  id: string;
  username: string;
  position: Position;
  avatar?: string;
  roomId: string;
}

export interface ChatMessage {
  id: string;
  fromUserId: string;
  fromUsername: string;
  toUserId: string;
  message: string;
  timestamp: Date;
}

export interface VideoCallState {
  isActive: boolean;
  peerId?: string;
  peerUsername?: string;
  stream?: MediaStream;
}
