import React, { useState } from 'react';

const BlockButton = ({ onBlock }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  
  const handleInitialClick = () => {
    setShowConfirm(true);
  };
  
  const handleConfirm = () => {
    onBlock();
    setShowConfirm(false);
  };
  
  const handleCancel = () => {
    setShowConfirm(false);
  };
  
  if (showConfirm) {
    return (
      <div className="block-confirm">
        <span>Bloquer cette personne ?</span>
        <div className="block-confirm-buttons">
          <button onClick={handleConfirm} className="block-confirm-yes">Oui</button>
          <button onClick={handleCancel} className="block-confirm-no">Non</button>
        </div>
      </div>
    );
  }
  
  return (
    <button onClick={handleInitialClick} className="block-button">
      Bloquer
    </button>
  );
};

export default BlockButton;