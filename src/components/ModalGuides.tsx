import React from 'react';
import './ModalGuides.css'; // Import your CSS file for styling
import logo from '../assets/logoretreat.png'
const ModalGuides = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="modal-overlay justify-center items-center" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <img src={logo} style={{width:'100px', height:'100px',textAlign:'center', position:'absolute', top:'10px', left:'50%', transform:'translateX(-50%)', marginBottom:'10px'}}/>

        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
        </div>
    </div>
  );
};

export default ModalGuides;