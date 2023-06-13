import React, { useState } from "react";
import "./tictactoe.css";
import "bootstrap/dist/css/bootstrap.min.css";

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  const [showPopup, setShowPopup] = useState(true);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [winner, setWinner] = useState(null);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleSquareClick = (index) => {
    if (squares[index] || winner) {
      return;
    }

    const updatedSquares = [...squares];
    updatedSquares[index] = currentPlayer;
    setSquares(updatedSquares);
    setCurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));

    const gameWinner = calculateWinner(updatedSquares);
    if (gameWinner) {
      setWinner(gameWinner);
      updateScores(gameWinner);
    }
  };

  const calculateWinner = (squares) => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const updateScores = (winner) => {
    if (winner === "X") {
      setScoreX((prevScoreX) => prevScoreX + 1);
    } else {
      setScoreO((prevScoreO) => prevScoreO + 1);
    }
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  const handlePlayerNameChange = (event, player) => {
    if (player === "X") {
      setPlayerX(event.target.value);
    } else {
      setPlayerO(event.target.value);
    }
  };

  const handleStartGame = () => {
    if (playerX.trim() !== "" && playerO.trim() !== "") {
      setShowPopup(false);
    }
  };

  const handleNewGame = () => {
    setSquares(Array(9).fill(null));
    setCurrentPlayer("X");
    setScoreX(0);
    setScoreO(0);
    setWinner(null);
  };

  const getButtonColorClass = (value) => {
    if (value === "X") {
      return "x";
    } else if (value === "O") {
      return "o";
    }
    return "default";
  };

  return (
    <div className="tic-tac-toe container">
      <h1 className="text-center">Tic Tac Toe</h1>
      {showPopup ? (
        <div className="popup">
          <h2 className="text-center">Enter Player Names</h2>
          <div>
            <div className="form-group">
              <label htmlFor="playerX">Player X:</label>
              <input
                type="text"
                id="playerX"
                className="form-control"
                value={playerX}
                onChange={(e) => handlePlayerNameChange(e, "X")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="playerO">Player O:</label>
              <input
                type="text"
                id="playerO"
                className="form-control"
                value={playerO}
                onChange={(e) => handlePlayerNameChange(e, "O")}
              />
            </div>
            <button className="btn btn-primary" onClick={handleStartGame}>
              Start Game
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="status text-center">
            <h2>{`${currentPlayer === "X" ? playerX : playerO} plays.`}</h2>
            <h3>{`Player X ${playerX}: ${scoreX} vs Player O ${playerO}: ${scoreO}`}</h3>
            {winner && (
              <div className="winner-popup">
                <h2>{`${winner} wins!`}</h2>
              </div>
            )}
            <button className="btn btn-primary" onClick={handleReset}>
              New Game
            </button>
          </div>
          <div className="game-board">
            {[0, 1, 2].map((row) => (
              <div key={row} className="grid-row">
                {[0, 1, 2].map((col) => (
                  <button
                    key={col}
                    className={`square btn-${getButtonColorClass(
                      squares[row * 3 + col]
                    )}`}
                    onClick={() => handleSquareClick(row * 3 + col)}
                  >
                    {squares[row * 3 + col]}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
