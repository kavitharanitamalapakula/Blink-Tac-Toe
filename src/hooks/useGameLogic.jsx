import { useState, useEffect } from 'react';
import { EMOJI_CATEGORIES, WINNING_LINES } from './gameConstants';
import { getRandomEmoji, checkWinner, findWinningMove } from './gameUtils';
import { useAIMove } from './useAIMove';
import moveSoundFile from '../assets/sounds/move-sound.wav';
import winSoundFile from '../assets/sounds/win-sound.wav';

export const useGameLogic = (gameMode) => {
  const [gameModeState, setGameMode] = useState(gameMode || 'menu');
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerCategories, setPlayerCategories] = useState({ 1: null, 2: null });
  const [playerMoves, setPlayerMoves] = useState({ 1: [], 2: [] });
  const [usedEmojis, setUsedEmojis] = useState({ 1: [], 2: [] });
  const [winner, setWinner] = useState(null);
  const [gamePhase, setGamePhase] = useState('category-selection'); 
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);

  const moveSound = new Audio(moveSoundFile);
  const winSound = new Audio(winSoundFile);

  const { makeAIMove } = useAIMove(
    board,
    playerCategories,
    usedEmojis,
    playerMoves,
    setUsedEmojis,
    setPlayerMoves,
    setBoard,
    setCurrentPlayer,
    setIsComputerTurn,
    setAiThinking,
    setWinner
  );

  useEffect(() => {
    if (gameModeState === 'online' && currentPlayer === 2 && !winner && gamePhase === 'playing') {
      setIsComputerTurn(true);
      setAiThinking(true);
      makeAIMove();
    }
  }, [currentPlayer, gameModeState, winner, gamePhase, makeAIMove]);

  const handleCellClick = (index) => {
    if (board[index] || winner || (gameModeState === 'online' && currentPlayer === 2)) return;
    if (gamePhase !== 'playing') return;

    const emoji = getRandomEmoji(EMOJI_CATEGORIES[playerCategories[currentPlayer]], usedEmojis, setUsedEmojis, currentPlayer);

    setUsedEmojis(prev => ({
      ...prev,
      [currentPlayer]: [...prev[currentPlayer], emoji]
    }));

    const newBoard = [...board];
    const move = { player: currentPlayer, emoji, index };

    if (playerMoves[currentPlayer].length >= 3) {
      const oldestMove = playerMoves[currentPlayer][0];
      newBoard[oldestMove.index] = null;
      setPlayerMoves(prev => ({
        ...prev,
        [currentPlayer]: [...prev[currentPlayer].slice(1), move]
      }));
    } else {
      setPlayerMoves(prev => ({
        ...prev,
        [currentPlayer]: [...prev[currentPlayer], move]
      }));
    }

    newBoard[index] = { player: currentPlayer, emoji };
    setBoard(newBoard);

    moveSound.play();

    const gameWinner = checkWinner(newBoard, WINNING_LINES);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  useEffect(() => {
    if (winner) {
      winSound.play();
    }
  }, [winner]);

  const handleCategorySelect = (category) => {
    if (playerCategories[1] === null) {
      setPlayerCategories(prev => ({ ...prev, 1: category }));
      if (gameModeState === 'online') {
        const availableCategories = Object.keys(EMOJI_CATEGORIES).filter(cat => cat !== category);
        const computerCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
        setPlayerCategories(prev => ({ ...prev, 2: computerCategory }));
        setGamePhase('playing');
      }
    } else if (playerCategories[2] === null && gameModeState === 'offline') {
      if (category !== playerCategories[1]) {
        setPlayerCategories(prev => ({ ...prev, 2: category }));
        setGamePhase('playing');
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(1);
    setPlayerCategories({ 1: null, 2: null });
    setPlayerMoves({ 1: [], 2: [] });
    setUsedEmojis({ 1: [], 2: [] });
    setWinner(null);
    setGamePhase('category-selection');
    setIsComputerTurn(false);
    setAiThinking(false);
  };

  const backToMenu = () => {
    setGameMode('menu');
    resetGame();
  };

  return {
    gameMode: gameModeState,
    setGameMode,
    currentPlayer,
    board,
    playerCategories,
    playerMoves,
    winner,
    gamePhase,
    isComputerTurn,
    aiThinking, 
    handleCellClick,
    handleCategorySelect,
    resetGame,
    backToMenu
  };
};
