import { useState, useEffect, useRef } from "react";

function App() {
  const [ws, setWs] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const [player, setPlayer] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [status, setStatus] = useState("Enter a room ID to start");
  const [playerCount, setPlayerCount] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    // Connect to WebSocket server
    const socket = new WebSocket("ws://localhost:8080");
    
    socket.onopen = () => {
      console.log("Connected to server");
      setStatus("Connected! Enter a room ID to join or create a room");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case "joined":
          setJoined(true);
          setPlayer(data.player);
          setPlayerCount(data.playerCount);
          setStatus(`You are Player ${data.player}. ${data.playerCount === 2 ? "Game can start!" : "Waiting for opponent..."}`);
          break;
        
        case "playerJoined":
          setPlayerCount(data.playerCount);
          setStatus(`Opponent joined! You are ${player}. ${currentTurn}'s turn`);
          break;
        
        case "gameState":
          setBoard(data.board);
          setCurrentTurn(data.currentTurn);
          setWinner(data.winner);
          if (data.winner) {
            setStatus(data.winner === "draw" ? "It's a draw!" : `Player ${data.winner} wins! 🎉`);
          } else {
            setStatus(`Player ${data.currentTurn}'s turn`);
          }
          break;
        
        case "playerLeft":
          setPlayerCount(data.playerCount);
          setStatus("Opponent left the game");
          break;
        
        case "error":
          setStatus(`Error: ${data.message}`);
          break;
      }
    };

    socket.onclose = () => {
      console.log("Disconnected from server");
      setStatus("Disconnected from server");
    };

    setWs(socket);

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  const joinRoom = () => {
    if (!roomId.trim()) {
      setStatus("Please enter a room ID");
      return;
    }
    
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: "join",
        roomId: roomId.trim()
      }));
    }
  };

  const makeMove = (index) => {
    if (!joined || playerCount < 2) {
      setStatus("Waiting for opponent to join...");
      return;
    }
    
    if (board[index] || winner) return;
    
    if (currentTurn !== player) {
      setStatus("It's not your turn!");
      return;
    }

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: "move",
        roomId,
        index
      }));
    }
  };

  const resetGame = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: "reset",
        roomId
      }));
    }
  };

  const leaveRoom = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: "leave",
        roomId
      }));
    }
    setJoined(false);
    setRoomId("");
    setBoard(Array(9).fill(null));
    setPlayer(null);
    setCurrentTurn("X");
    setWinner(null);
    setPlayerCount(0);
    setStatus("Enter a room ID to start");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Multiplayer Tic-Tac-Toe
        </h1>

        {!joined ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room ID
              </label>
              <input
                ref={inputRef}
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && joinRoom()}
                placeholder="Enter room name (e.g., room1)"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>
            <button
              onClick={joinRoom}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Join Room
            </button>
            <p className="text-sm text-gray-600 text-center">{status}</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  Room: {roomId}
                </span>
                <span className="text-sm text-gray-600">
                  Players: {playerCount}/2
                </span>
              </div>
              <div className="text-sm font-medium text-purple-600">
                You are: Player {player}
              </div>
            </div>

            <div className="text-center text-lg font-semibold text-gray-800 min-h-[28px]">
              {status}
            </div>

            <div className="grid grid-cols-3 gap-2 mx-auto" style={{ width: "300px" }}>
              {board.map((cell, index) => (
                <button
                  key={index}
                  onClick={() => makeMove(index)}
                  disabled={!!cell || !!winner || currentTurn !== player || playerCount < 2}
                  className={`h-24 text-4xl font-bold rounded-lg transition-all ${
                    cell
                      ? cell === "X"
                        ? "bg-blue-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  } ${
                    !cell && !winner && currentTurn === player && playerCount === 2
                      ? "cursor-pointer transform hover:scale-105"
                      : "cursor-not-allowed opacity-75"
                  }`}
                >
                  {cell}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              {winner && (
                <button
                  onClick={resetGame}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Play Again
                </button>
              )}
              <button
                onClick={leaveRoom}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-colors"
              >
                Leave Room
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;