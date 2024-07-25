import React, { useState } from 'react';
import './signInPopup.css';

function SignInPopup({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div className='signInPopup'>
            <div className='title'>Sign In</div>
            <form onSubmit={handleSubmit}>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required />
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SignInPopup;
