// components/Modal.js
import React from 'react';
// modalStyles.js
export const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

export const modalContentStyle = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '24px',
  width: '90%',
  maxWidth: '400px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
  position: 'relative',
};

// export const closeButtonStyle = {
//   position: 'absolute',
//   top: '12px',
//   right: '12px',
//   background: 'none',
//   border: 'none',
//   cursor: 'pointer',
//   color: '#555',
// };

export default function Modal({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        {/* <button
          style={closeButtonStyle}
          onClick={onClose}
        >
          &times;
        </button> */}
        {children}
      </div>
    </div>
  );
}
