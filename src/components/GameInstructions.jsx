import React from 'react';

const GameInstructions = ({ onClose }) => {
  return (
    <div className="game-instructions">
      <div className='close-button-container'style={{
        display: "flex", justifyContent: "end", border: "none",borderRadius:"50%",color:" white"
      }}>
        < button className="close-button" onClick={onClose} aria- label="Close Instructions">&times;</button>
      </div >
      <h2>How to Play Emoji Tic Tac Toe</h2>
      <ol>
        <li>Select a game mode: Play Offline (2 Players) or Play Online (vs Computer).</li>
        <li>Choose your emoji category during the category selection phase.</li>
        <li>Take turns placing your emoji on the 3x3 board by clicking on an empty cell.</li>
        <li>The first player to get 3 of their emojis in a row (horizontally, vertically, or diagonally) wins the game.</li>
        <li>You can reset the game or return to the menu at any time using the buttons in the header.</li>
      </ol>
      <p>Enjoy the game and have fun!</p>
    </div >
  );
};

export default GameInstructions;
