import React from 'react';

const Board = ({ board, onCellClick, winner, isComputerTurn }) => {
  if (!Array.isArray(board)) {
    console.error('Board prop is not an array:', board);
    return null;
  }

  const winningLine = winner?.line || [];

  return (
    <div className="board-container">
      <div className="board-grid">
        {board.map((cell, index) => {
          const isWinningCell = winningLine.includes(index);
          return (
            <button
              key={index}
              onClick={() => onCellClick(index)}
              className={`board-cell${isWinningCell ? ' winning-cell' : ''}`}
              disabled={cell !== null || winner || isComputerTurn}
            >
              {cell && cell.emoji}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
