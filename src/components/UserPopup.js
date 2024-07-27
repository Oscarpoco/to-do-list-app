// UserPopup.js
import React from 'react';
import './UserPopup.css';

const UserPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>User Profile</h2>
        <p>Details about the user.</p>
        <button onClick={onClose}>+</button>
      </div>
    </div>
  );
};

export default UserPopup;
