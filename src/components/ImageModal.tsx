// Modal.js
import React from 'react';
import './ImageModal.css'; // Import your CSS file for styling
import logo from '../assets/logoretreat.png'
const ImageModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="modal-overlay justify-center items-center h-800px" onClick={onClose}>
            <div className="items-center justify-center">
      <div className="modal-content justify-center items-center h-auto" onClick={(e) => e.stopPropagation()}>
                    <img src={logo} style={{width:'80px', height:'80px', position:'relative', left:'10%', marginLeft:'110px', marginBottom:'10px'}}/>

        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;