// UserPopup.jsx
import React, { useState } from 'react';
import './UserPopup.css'

function UserPopup({ profile, onClose, onProfileChange }) {
  const [username, setUsername] = useState(profile.username);
  const [password, setPassword] = useState(profile.password);
  const [picture, setPicture] = useState(profile.picture);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfile = { username, picture, password };
    onProfileChange(updatedProfile);
    onClose();
  };

  return (
    <div className='user-popup'>
      <div className='user-popup-content'>
        <button className='close-button' onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <div className='form-field'>
            <label>Username</label>
            <input type='text' value={username} onChange={handleUsernameChange} required />
          </div>
          <div className='form-field'>
            <label>Picture</label>
            <input type='file' accept='image/*' onChange={handlePictureChange} />
            {picture && <img src={picture} alt='Profile' className='preview' />}
          </div>
          <div className='form-field'>
            <label>Password</label>
            <input type='password' value={password} onChange={handlePasswordChange} required />
          </div>
          <button type='submit'>Save</button>
        </form>
      </div>
    </div>
  );
}

export default UserPopup;
