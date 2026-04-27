// Modal.js
import React from 'react';
import './ModalCancellation.css'; // Import your CSS file for styling
import logo from '../assets/logoretreat.png'
const ModalCancellation = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="modal-overlay justify-center items-center h-auto" onClick={onClose}>
            <div className="items-center justify-center">
      <div className="modal-content justify-center items-center h-auto" onClick={(e) => e.stopPropagation()}>
                    <img src={logo} style={{width:'100px', height:'100px',textAlign:'center', position:'absolute', top:'10px', left:'50%', transform:'translateX(-50%)', marginBottom:'10px'}}/>

        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
        </div>
      </div>
    </div>
  );
};

export default ModalCancellation;