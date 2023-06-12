import React from "react";
import "./styles/GameBoard.css";

const GameBoard = ({ squares, handleSquareClick }) => {
  const renderSquare = (i) => {
    return (
      <button className="square" onClick={() => handleSquareClick(i)}>
        {squares[i]}
      </button>
    );
  };

  return (
    <div className="game-board">
      {[0, 1, 2].map((row) => (
        <div key={row} className="grid-row">
          {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
