import './signUpPopup.css';
import axios from 'axios';
import { useState } from 'react';

function SignUpPopup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== verifyPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3004/users', {
                email,
                password
            });
            if (response.status === 201) {
                alert('User registered successfully');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Error registering user');
        }
    };

    return (
        <div className='signUpPopup'>
            <div className='title'>Sign Up</div>
            <form onSubmit={handleSignUp}>
                <input 
                    type='email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder='Email' 
                    required 
                />
                <input 
                    type='password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder='Password' 
                    required 
                />
                <input 
                    type='password' 
                    value={verifyPassword} 
                    onChange={(e) => setVerifyPassword(e.target.value)} 
                    placeholder='Verify Password' 
                    required 
                />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpPopup;
