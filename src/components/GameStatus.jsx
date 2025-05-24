import React, { useEffect, useRef, useState } from 'react';

import anime from "../assets/animations/Dancing.gif"
const GameStatus = ({ winner, isComputerTurn, currentPlayer, playerCategories, playerMoves }) => {
  const audioRef = useRef(null);
  const [showWinner, setShowWinner] = useState(false);

  useEffect(() => {
    if (winner) {
      setShowWinner(true);
    }
  }, [winner]);

  useEffect(() => {
    if (winner && audioRef.current) {
      audioRef.current.play();
    }
  }, [winner]);

  const handleCloseWinner = () => {
    setShowWinner(false);
  };

  return (
    <>
      {winner && showWinner && (
        <div className="winner-modal-overlay">
          <div className='winner-container'>
            <button className="close-winner-btn" onClick={handleCloseWinner} aria-label="Close winner container">
              &#x2715;
            </button>
            <h2 className="winner-text">
              🎉 Player {winner.player} Wins! 🎉
            </h2>
            <img src={anime} alt="win-animation" />
            <audio ref={audioRef} src="/src/assets/sounds/win-sound.wav" />
          </div>
        </div>
      )}

      <div className="game-status" style={{ display: winner ? 'none' : 'block' }}>
        <h2 className="turn-text">
          {isComputerTurn ? '🤖 Computer is thinking...' : `Player ${currentPlayer}'s Turn`}
        </h2>
        <div className="players-info">
          <div className="player-info">
            Player 1: <span className="player-category">{playerCategories[1]}</span>
            <div className="player-moves">Moves: {playerMoves[1].length}/3</div>
          </div>
          <div className="player-info">
            Player 2: <span className="player-category">{playerCategories[2]}</span>
            <div className="player-moves">Moves: {playerMoves[2].length}/3</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameStatus;
