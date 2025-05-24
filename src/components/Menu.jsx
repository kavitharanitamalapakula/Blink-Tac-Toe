import React from 'react';
import { Users, Computer } from './Icons';

const Menu = ({ onSelectOffline, onSelectOnline }) => {
  return (
    <div className="menu-container">
      <div className="menu-card fade-in">
        <h1 className="menu-title">🎮 Tic Tac Toe</h1>
        <p className="menu-subtitle">Ultimate Emoji Edition</p>
        
        <div className="menu-buttons">
          <button
            onClick={onSelectOffline}
            className="menu-button offline"
          >
            <Users size={24} />
            Play Offline (2 Players)
          </button>
          
          <button
            onClick={onSelectOnline}
            className="menu-button online"
          >
            <Computer size={24} />
            Play Online (vs Computer)
          </button>
        </div>

        <div className="menu-features">
          <p>
            ✨ Features: Emoji categories, vanishing pieces, guaranteed winner!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
