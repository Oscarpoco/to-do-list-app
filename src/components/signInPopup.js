import './signInPopup.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignInPopup({HandleAuthentication}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dummy authentication check
        if (username === 'user' && password === 'password') {
            
            navigate('/dashboard');
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div className='signInPopup'>
            <div className='title'>Sign In</div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    id='username'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                <button type='submit' onClick={HandleAuthentication}>Submit</button>
            </form>
        </div>
    );
}

export default SignInPopup;
