import React from 'react';
import Menu from './Menu';

const MenuPhase = ({ onSelectOffline, onSelectOnline }) => {
  return (
    <Menu
      onSelectOffline={onSelectOffline}
      onSelectOnline={onSelectOnline}
    />
  );
};

export default MenuPhase;
