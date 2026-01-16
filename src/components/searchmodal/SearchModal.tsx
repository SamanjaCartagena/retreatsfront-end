import React from 'react';
import './SearchModal.css'; // Import your CSS file for styling
import logo from '../../assets/logoretreat.png'
const SearchModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="modal-overlay justify-center items-start h-screen" onClick={onClose}>
            <div className="w-full max-w-xs items-center justify-center">
      <div className="modal-content justify-center items-center" onClick={(e) => e.stopPropagation()}>
                    <img src={logo} style={{width:'80px', height:'80px', marginLeft:'110px', marginBottom:'10px'}}/>

        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
