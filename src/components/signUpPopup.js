import React, { useState } from 'react';
import './signUpPopup.css';

function SignUpPopup({ onRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === verifyPassword) {
            onRegister(username, password);
        } else {
            alert("Passwords do not match");
        }
    };

    return (
        <div className='signUpPopup'>
            <div className='title'>Sign Up</div>
            <form onSubmit={handleSubmit}>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required />
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                <input type='password' value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} placeholder='Verify Password' required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpPopup;
