import React, { useState } from 'react';
import './signIn.css';
import { LuListTodo } from "react-icons/lu";
import SignInPopup from './signInPopup';
import SignUpPopup from './signUpPopup';
import { GrUserNew } from "react-icons/gr";
import { PiSignInThin } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { registerUser, authenticateUser } from '../statement';

function SignIn() {
    const [isSignIn, setIsSignIn] = useState(true);
    const navigate = useNavigate();

    const handleSignInClick = () => {
        setIsSignIn(true);
    };

    const handleSignUpClick = () => {
        setIsSignIn(false);
    };

    const handleRegister = (username, password) => {
        registerUser(username, password);
        setIsSignIn(true);
    };

    const handleLogin = (username, password) => {
        const user = authenticateUser(username, password);
        if (user) {
            navigate('/dashboard');
        } else {
            alert("Invalid username or password");
        }
    };

    return (
        <div className='sign-in'>
            <div className='logo'>
                <h3>Lis<span>tify</span> <LuListTodo className='icon' /></h3>
            </div>
            <div className='display-sign-content'>
                <div className='welcome-message'>
                    <p>Welcome to Lis<span>tify</span> – where your goals take flight. Let's make every day a productive adventure!</p>
                    <div className='slogan'>
                        <img src='main.jpeg' alt='image-main' />
                        <img src='main-1.jpeg' alt='image-main' />
                    </div>
                </div>
                <div className='login-box'>
                    <div className='signIn-Nav'>
                        <button onClick={handleSignInClick}><PiSignInThin className='icon' /> Sign In</button>
                        <button onClick={handleSignUpClick}><GrUserNew className='icon' /> Sign Up</button>
                    </div>
                    <div className='signIn-form'>
                        {isSignIn ? <SignInPopup onLogin={handleLogin} /> : <SignUpPopup onRegister={handleRegister} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
