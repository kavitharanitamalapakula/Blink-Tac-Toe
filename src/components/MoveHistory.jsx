import React from 'react';

const MoveHistory = ({ playerMoves }) => {
  return (
    <div className="move-history">
      {[1, 2].map(player => (
        <div key={player} className="move-history-card">
          <h3 className="move-history-title">
            Player {player} Recent Moves
          </h3>
          <div className="move-history-emojis">
            {playerMoves[player].slice(-3).map((move, index) => (
              <span key={index} className="move-emoji">{move.emoji}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoveHistory;
