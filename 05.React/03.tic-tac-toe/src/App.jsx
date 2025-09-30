import { useState } from "react";

import "./App.css";

function CreateBoard() {
  const [player, setPlayer] = useState("X"); // track whose turn it is
  const [board, setBoard] = useState(Array(9).fill(null)); // store each cell
  const [winner, setWinner] = useState(null); // track the winner

  const winningCombos = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];
  function checkGameStatus(newBoard) {
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a]; // return the winner ("X" or "O")
      }
    }
    return null; // no winner yet
  }
  function startGame(index) {
    if (board[index]) return; // prevent overwriting a cell

    const newBoard = [...board];
    newBoard[index] = player; // set clicked cell to current player
    setBoard(newBoard);
    const win = checkGameStatus(newBoard);
    if (win) {
      setWinner(win);
    } else {
      setPlayer(player === "X" ? "O" : "X"); // switch turn
    }

    // switch player
    // setPlayer(player === "X" ? "O" : "X");
  }
  return (
    <div
      className="board"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 100px)",
        gridTemplateRows: "repeat(3, 100px)",
        gap: "2px",
      }}
    >
      {board.map((cell, index) => (
        <div
          key={index}
          className="square"
          style={{
            backgroundColor: index % 2 === 0 ? "black" : "white",
            color: index % 2 === 0 ? "white" : "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #333",
          }}
        >
          <button onClick={() => startGame(index)}>{cell || "Click me"}</button>
        </div>
      ))}

      <div style={{ marginTop: "20px", fontSize: "1.5rem" }}>
        {winner
          ? `🎉 Winner: ${winner}`
          : board.every((cell) => cell !== null)
          ? "🤝 It's a draw!"
          : `Next Player: ${player}`}
      </div>
    </div>
  );
}
function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <CreateBoard />
    </>
  );
}

export default App;
