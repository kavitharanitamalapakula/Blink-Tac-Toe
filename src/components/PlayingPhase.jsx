import React from 'react';
import GameStatus from './GameStatus';
import Board from './Board';
import MoveHistory from './MoveHistory';

const PlayingPhase = ({
  winner,
  isComputerTurn,
  currentPlayer,
  playerCategories,
  playerMoves,
  board,
  onCellClick
}) => {
  return (
    <>
      <GameStatus
        winner={winner}
        isComputerTurn={isComputerTurn}
        currentPlayer={currentPlayer}
        playerCategories={playerCategories}
        playerMoves={playerMoves}
      />

      <div className='main-container' style={{display:"flex", justifyContent:"space-around"}}>
        <Board
          board={board}
          onCellClick={onCellClick}
          winner={winner}
          isComputerTurn={isComputerTurn}
        />

        <MoveHistory playerMoves={playerMoves} />
      </div>
    </>
  );
};

export default PlayingPhase;
