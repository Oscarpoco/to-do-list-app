// SignIn.jsx
import './signIn.css';
import { LuListTodo } from "react-icons/lu";
import SignInPopup from './signInPopup';
import SignUpPopup from './signUpPopup';
import { GrUserNew } from "react-icons/gr";
import { PiSignInThin } from "react-icons/pi";
import { useState } from 'react';
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";
import Loader from './Loader';

function SignIn({ setIsAuthenticated }) {
    const [isSignIn, setIsSignIn] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    const handleSignInClick = () => {
        setIsSignIn(true);
    };

    const handleSignUpClick = () => {
        setIsSignIn(false);
    };

    const handleSignIn = async () => {
        setIsLoading(true);
        
        // Simulate authentication process
        setTimeout(() => {
            setIsAuthenticated(true);
            setIsLoading(false);
        }, 2000);
    };

    if (isLoading) {
        return <Loader name="Signing In" />;
    }

    return (
        <div className='sign-in'>
            <div className='logo'>
                <h3>Lis<span>tify</span> <LuListTodo className='icon'/></h3>
            </div>

            <div className='display-sign-content'>
                <div className='welcome-message'>
                    <p>Welcome to Lis<span>tify</span> – where your goals take flight. Let's make every day a productive adventure!</p>
                    <div className='slogan'>
                        <img src='main.jpeg' alt='image-main'/>
                        <img src='main-1.jpeg' alt='image-main'/>
                    </div>
                </div>

                <div className='login-box'>
                    <div className='signIn-Nav'>
                        <button onClick={handleSignInClick}><PiSignInThin className='icon'/> Sign In</button>
                        <button onClick={handleSignUpClick}><GrUserNew className='icon'/> Sign Up</button>
                    </div>

                    <div className='signIn-form'>
                        {isSignIn ? <SignInPopup setIsAuthenticated={handleSignIn} /> : <SignUpPopup />}
                    </div>
                </div>
            </div>
            <footer>
                <div className='social-icons'>
                    <FaFacebookF className='social'/>
                    <FaLinkedinIn className='social'/>
                    <IoLogoInstagram className='social'/>
                    <BsTwitterX className='social'/>
                </div>
                <div className='developer'>&copy; 2024 Gamefusion</div>
            </footer>
        </div>
    );
}

export default SignIn;
