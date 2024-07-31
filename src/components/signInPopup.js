import './signInPopup.css';
import axios from 'axios';
import { useState } from 'react';

function SignInPopup({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3004/users?email=${email}&password=${password}`);
            if (response.data.length > 0) {
                // Generate a simple token (in a real app, this should be done on the server)
                const token = btoa(email + ':' + password);
                localStorage.setItem('authToken', token);
                setIsAuthenticated(true);
                alert('Login successful');
            } else {
                alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Error signing in:', error);
            alert('Error signing in');
        }
    };

    return (
        <div className='signInPopup'>
            <div className='title'>Sign In</div>
            <form onSubmit={handleSignIn}>
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
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default SignInPopup;
