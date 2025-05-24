import { useCallback } from 'react';
import { getRandomEmoji, checkWinner, findWinningMove } from './gameUtils';
import { WINNING_LINES, EMOJI_CATEGORIES } from './gameConstants';

export const useAIMove = (board, playerCategories, usedEmojis, playerMoves, setUsedEmojis, setPlayerMoves, setBoard, setCurrentPlayer, setIsComputerTurn, setAiThinking, setWinner) => {
  const makeAIMove = useCallback(() => {
    const emptySpots = board.map((cell, index) => cell === null ? index : null).filter(i => i !== null);
    if (emptySpots.length === 0) return;
    let moveIndex = findWinningMove(board, 2, WINNING_LINES);
    if (moveIndex === null) {
      moveIndex = findWinningMove(board, 1, WINNING_LINES);
    }
    if (moveIndex === null && board[4] === null) {
      moveIndex = 4;
    }
    const corners = [0, 2, 6, 8];
    if (moveIndex === null) {
      const availableCorners = corners.filter(corner => board[corner] === null);
      if (availableCorners.length > 0) {
        moveIndex = availableCorners[Math.floor(Math.random() * availableCorners.length)];
      }
    }
    if (moveIndex === null) {
      moveIndex = emptySpots[Math.floor(Math.random() * emptySpots.length)];
    }

    const emoji = getRandomEmoji(EMOJI_CATEGORIES[playerCategories[2]], usedEmojis, setUsedEmojis, 2);

    setUsedEmojis(prev => ({
      ...prev,
      2: [...prev[2], emoji]
    }));

    const newBoard = [...board];
    const move = { player: 2, emoji, index: moveIndex };

    if (playerMoves[2] && playerMoves[2].length >= 3) {
      const oldestMove = playerMoves[2][0];
      newBoard[oldestMove.index] = null;
      setPlayerMoves(prev => ({
        ...prev,
        2: [...(prev[2] || []).slice(1), move]
      }));
      newBoard[moveIndex] = { player: 2, emoji };
      setBoard(newBoard);
    } else {
      setPlayerMoves(prev => ({
        ...prev,
        2: [...(prev[2] || []), move]
      }));
      newBoard[moveIndex] = { player: 2, emoji };
      setBoard(newBoard);
    }

    const gameWinner = checkWinner(newBoard, WINNING_LINES);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setCurrentPlayer(1);
      setIsComputerTurn(false);
      setAiThinking(false);
    }
  }, [board, playerCategories, usedEmojis, playerMoves, setUsedEmojis, setPlayerMoves, setBoard, setCurrentPlayer, setIsComputerTurn, setAiThinking, setWinner]);

  return { makeAIMove };
};
