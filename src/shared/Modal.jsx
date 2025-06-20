import React from "react";
import '../styles/Modal.css';

function Modal({ isOpen, handleToggle, children, className }) {
  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className={`modal-content ${className ? className : ""}`}>
        {children}
        <button type="button" onClick={handleToggle}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
