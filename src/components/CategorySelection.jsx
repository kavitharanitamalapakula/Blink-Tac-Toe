import React from 'react';

const CategorySelection = ({ categories, playerCategories, onSelectCategory, gameMode }) => {
  return (
    <div className="category-container fade-in">
      <h2 className="category-title">
        {playerCategories[1] === null 
          ? 'Player 1: Choose your emoji category' 
          : 'Player 2: Choose your emoji category (different from Player 1)'}
      </h2>
      
      <div className="category-grid">
        {Object.entries(categories).map(([category, emojis]) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            disabled={playerCategories[1] === category}
            className="category-button"
          >
            <span className="category-emoji">{emojis[0]}</span>
            <span className="category-name">{category}</span>
            <span className="category-preview">{emojis.slice(1, 4).join(' ')}</span>
          </button>
        ))}
      </div>
      
      {playerCategories[1] && (
        <div className="category-selected">
          <p>
            Player 1 selected: <span>{playerCategories[1]}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CategorySelection;
