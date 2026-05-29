// Modal.js
import React from 'react';
import './ImageModal.css'; // Import your CSS file for styling
import logo from '../assets/logoretreat.png'
const ImageModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="image-modal-overlay w-full h-full bg-black/90" onClick={onClose}>
      <div className="image-modal-content max-w-5xl min-w-full h-full justify-center bg-transparent items-center" onClick={(e) => e.stopPropagation()}>

        <button className="image-modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default ImageModal;