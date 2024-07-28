import './signInPopup.css';
import { useState } from 'react';

function SignInPopup({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === 'okpoco15@gmail.com' && password === 'oscar@2000') {
            setIsAuthenticated(true);
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className='signInPopup'>
            <div className='title'>Sign In</div>
            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    id='username'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type='password'
                    id='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default SignInPopup;
