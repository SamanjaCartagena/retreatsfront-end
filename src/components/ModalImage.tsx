import React from 'react';
import './ModalImage.css'; // Import your CSS file for styling
import { Button } from './ui/button';
const ModalImage = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="modal-overlay1 justify-center items-center" onClick={onClose}>
            <div className="items-center justify-center">
      <div className="modal-content1 justify-center items-center h-800" onClick={(e) => e.stopPropagation()}>

        <Button className="modal-close-button1 bg-black text-white hover:bg-lime-700 opacity-75" onClick={onClose}>
          &times;
        </Button>
        {children}
        </div>
      </div>
    </div>
  );
};

export default ModalImage;