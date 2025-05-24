import React from 'react';
import CategorySelection from './CategorySelection';

const CategorySelectionPhase = ({ categories, playerCategories, onSelectCategory, gameMode }) => {
  return (
    <CategorySelection
      categories={categories}
      playerCategories={playerCategories}
      onSelectCategory={onSelectCategory}
      gameMode={gameMode}
    />
  );
};

export default CategorySelectionPhase;
