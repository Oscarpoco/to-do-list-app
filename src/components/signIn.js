import './signIn.css';
import { LuListTodo } from "react-icons/lu";
import SignInPopup from './signInPopup';
import SignUpPopup from './signUpPopup';
import { GrUserNew } from "react-icons/gr";
import { PiSignInThin } from "react-icons/pi";
import { useState } from 'react';

function SignIn({ setIsAuthenticated }) {
    const [isSignIn, setIsSignIn] = useState(true);

    const handleSignInClick = () => {
        setIsSignIn(true);
    };

    const handleSignUpClick = () => {
        setIsSignIn(false);
    };

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
                        {isSignIn ? <SignInPopup /> : <SignUpPopup />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
