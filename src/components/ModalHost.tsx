import React from 'react';
import './Modal.css'; // Import your CSS file for styling
import logo from '../assets/logoretreat.png'
const ModalHost = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="modal-overlay justify-center items-center h-screen" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <img src={logo} style={{width:'80px', height:'80px', marginLeft:'110px', marginBottom:'10px'}}/>

        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
        </div>
    </div>
  );
};

export default ModalHost;