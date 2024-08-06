import React, { useState } from 'react';
import './UserPopup.css';
import axios from 'axios';

function UserPopup({ profile, onClose, onProfileChange }) {
  const [username, setUsername] = useState(profile.username);
  const [password, setPassword] = useState(profile.password);
  const [picture, setPicture] = useState(profile.picture);
  const [name, setName] = useState(profile.name || '');
  const [phone, setPhone] = useState(profile.phone || '');

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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    const updatedProfile = { id: userId, username, picture, password, name, phone };
    try {
      await axios.put(`http://localhost:3001/users/${userId}`, updatedProfile);
      onProfileChange(updatedProfile);
      onClose();
    } catch (error) {
      console.error("There was an error updating the profile!", error);
    }
  };

  return (
    <div className='user-popup'>
      <div className='user-popup-content'>
        <button className='close-button' onClick={onClose}>+</button>
        <form onSubmit={handleSubmit}>
          <div className='form-field'>
            <label>Username</label>
            <input type='text' value={username} onChange={handleUsernameChange} required />
          </div>
          <div className='form-field'>
            <label>Name</label>
            <input type='text' value={name} onChange={handleNameChange} />
          </div>
          <div className='form-field'>
            <label>Phone</label>
            <input type='tel' value={phone} onChange={handlePhoneChange} />
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
