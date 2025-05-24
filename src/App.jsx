import React, { useState } from 'react';

import { Users, Computer, RotateCcw, Home } from './components/Icons';
import GameHeader from './components/GameHeader';
import MenuPhase from './components/MenuPhase';
import CategorySelectionPhase from './components/CategorySelectionPhase';
import PlayingPhase from './components/PlayingPhase';
import { useGameLogic } from './hooks/useGameLogic';
import GameInstructions from './components/GameInstructions';
import "./App.css"
import "./styles/Board.css"
import "./styles/Animations.css"
import "./styles/CategorySelection.css"
import "./styles/GameLayout.css"
import "./styles/GameStatus.css"
import "./styles/Header.css"
import "./styles/Menu.css"
import "./styles/MoveHistory.css"
import "./styles/Responsive.css"
import "./styles/WinnerModal.css"

const EMOJI_CATEGORIES = {
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵'],
  fruits: ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🥭', '🍑', '🍍', '🥝', '🥥'],
  vehicles: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🏍️'],
  sports: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🥍'],
  food: ['🍕', '🍔', '🌭', '🍟', '🍿', '🧄', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈'],
  nature: ['🌸', '🌼', '🌻', '🌺', '🌷', '🌹', '🥀', '🌊', '🌙', '⭐', '🌟', '☀️', '🌤️', '⛅', '🌈']
};

const App = () => {
  const {
    gameMode,
    setGameMode,
    currentPlayer,
    board,
    playerCategories,
    playerMoves,
    winner,
    gamePhase,
    isComputerTurn,
    handleCellClick,
    handleCategorySelect,
    resetGame,
    backToMenu
  } = useGameLogic();

  const [showInstructions, setShowInstructions] = useState(false);

  const openInstructions = () => setShowInstructions(true);
  const closeInstructions = () => setShowInstructions(false);

  if (gameMode === 'menu') {
    return (
      <MenuPhase
        onSelectOffline={() => setGameMode('offline')}
        onSelectOnline={() => setGameMode('online')}
      />
    );
  }

  return (
    <div className="game-container">
      <div className="game-wrapper">
        <GameHeader
          onBackToMenu={backToMenu}
          onReset={resetGame}
          gameMode={gameMode}
          onOpenInstructions={openInstructions}
        />

        {gamePhase === 'category-selection' && (
          <CategorySelectionPhase
            categories={EMOJI_CATEGORIES}
            playerCategories={playerCategories}
            onSelectCategory={handleCategorySelect}
            gameMode={gameMode}
          />
        )}

        {gamePhase === 'playing' && (
          <PlayingPhase
            winner={winner}
            isComputerTurn={isComputerTurn}
            currentPlayer={currentPlayer}
            playerCategories={playerCategories}
            playerMoves={playerMoves}
            board={board}
            onCellClick={handleCellClick}
          />
        )}

        {showInstructions && (
          <div className="winner-modal-overlay">
            <div className="winner-container">
              <GameInstructions onClose={closeInstructions} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
