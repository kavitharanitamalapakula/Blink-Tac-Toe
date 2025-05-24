import { useState } from 'react';

export const getRandomEmoji = (categoryEmojis, usedEmojis, setUsedEmojis, playerId) => {
  const availableEmojis = categoryEmojis.filter(emoji => !usedEmojis[playerId].includes(emoji));
  
  if (availableEmojis.length === 0) {
    setUsedEmojis(prev => ({ ...prev, [playerId]: [] }));
    return categoryEmojis[Math.floor(Math.random() * categoryEmojis.length)];
  }
  
  return availableEmojis[Math.floor(Math.random() * availableEmojis.length)];
};

export const checkWinner = (board, WINNING_LINES) => {
  for (let line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[b] && board[c]) {
      if (board[a].player === board[b].player && board[b].player === board[c].player) {
        return { player: board[a].player, line };
      }
    }
  }
  return null;
};

export const findWinningMove = (board, player, WINNING_LINES) => {
  for (let line of WINNING_LINES) {
    const [a, b, c] = line;
    const lineCells = [board[a], board[b], board[c]];
    const playerCount = lineCells.filter(cell => cell && cell.player === player).length;
    const emptyIndices = line.filter(index => !board[index]);
    if (playerCount === 2 && emptyIndices.length === 1) {
      return emptyIndices[0];
    }
  }
  return null;
};
