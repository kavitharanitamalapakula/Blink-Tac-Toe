import React from 'react';

import { Home, RotateCcw } from './Icons';

const GameHeader = ({ onBackToMenu, onReset, gameMode }) => {
  return (
    <div className="game-header">
      <button onClick={onBackToMenu} className="header-button">
        <Home size={20} />
        Menu
      </button>
      
      <h1 className="game-title">
        {gameMode === 'offline' ? '👥 2 Players' : '🤖 vs Computer'}
      </h1>
      
      <button onClick={onReset} className="header-button">
        <RotateCcw size={20} />
        Reset
      </button>
    </div>
  );
};

export default GameHeader;
