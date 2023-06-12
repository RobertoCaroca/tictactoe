import React, { useState } from "react";
import GameBoard from "./GameBoard";
import GameScore from "./GameScore";

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const handleSquareClick = (index) => {
    if (squares[index] || calculateWinner(squares)) {
      return;
    }

    const updatedSquares = [...squares];
    updatedSquares[index] = currentPlayer;
    setSquares(updatedSquares);
    setCurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
  };

  const calculateWinner = (squares) => {
    // Logic for calculating the winner
    // ...
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setCurrentPlayer("X");
  };

  const winner = calculateWinner(squares);

  return (
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      <GameScore
        currentPlayer={currentPlayer}
        winner={winner}
        handleReset={handleReset}
      />
      <GameBoard squares={squares} handleSquareClick={handleSquareClick} />
    </div>
  );
};

export default TicTacToe;
