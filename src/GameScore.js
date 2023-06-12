import React, { useState } from "react";
import "./styles/GameScore.css";

const GameScore = ({ currentPlayer, winner, handleReset }) => {
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");

  const handlePlayerNameChange = (event, player) => {
    if (player === "X") {
      setPlayerX(event.target.value);
    } else {
      setPlayerO(event.target.value);
    }
  };

  const handleStartGame = () => {
    if (playerX.trim() !== "" && playerO.trim() !== "") {
      setPlayerX(playerX.trim());
      setPlayerO(playerO.trim());
    }
  };

  const renderPlayerNames = () => {
    return (
      <div>
        <label>
          Player X:
          <input
            type="text"
            value={playerX}
            onChange={(e) => handlePlayerNameChange(e, "X")}
          />
        </label>
        <br />
        <label>
          Player O:
          <input
            type="text"
            value={playerO}
            onChange={(e) => handlePlayerNameChange(e, "O")}
          />
        </label>
        <br />
        <button onClick={handleStartGame}>Start Game</button>
      </div>
    );
  };

  const renderPopup = () => {
    return (
      <div className="popup">
        <h2>Enter Player Names</h2>
        {renderPlayerNames()}
      </div>
    );
  };

  return (
    <div className="game-score">
      {!(playerX && playerO) && renderPopup()}
      <div className="status">
        <h2>Next Player: {currentPlayer === "X" ? playerX : playerO}</h2>
        {winner ? <h2>Winner: {winner}</h2> : null}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default GameScore;
