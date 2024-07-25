import './signIn.css';
import { LuListTodo } from "react-icons/lu";
import SignInPopup from './signInPopup';
import SignUpPopup from './signUpPopup';
import { GrUserNew } from "react-icons/gr";
import { PiSignInThin } from "react-icons/pi";
import { useState } from 'react';



function SignIn(){


    const [isSignIn, setIsSignIn] = useState(true);

    const handleSignInClick = () => {
        setIsSignIn(true);
    };

    const handleSignUpClick = () => {
        setIsSignIn(false);
    };
    

    return(

        // PARENT CONTAINER
        <div className='sign-in'>

            {/* LOGO */}
            <div className='logo'>
                <h3>Lis<span>tify</span> <LuListTodo className='icon'/></h3>
            </div>
            {/* ENDS */}


            {/* ALL CONTENT PARENT */}
            <div className='display-sign-content'>


                {/* WELCOME MESSAGE */}
                <div className='welcome-message'>

                    <p>Welcome to Lis<span>tify</span> – where your goals take flight. Let's make every day a productive adventure!</p>
                    <div className='slogan'>
                        <img src='main.jpeg' alt='image-main'></img>
                        <img src='main-1.jpeg' alt='image-main'></img>
                    </div>
                </div>
                {/* ENDS */}



                {/* LOGIN BOX */}
                <div className='login-box'>

                    <div className='signIn-Nav'>
                        <button onClick={handleSignInClick}><PiSignInThin  className='icon'/> Sign In</button>
                        <button onClick={handleSignUpClick}><GrUserNew className='icon'/> Sign Up</button>
                    </div>


                    <div className='signIn-form'>
                        {isSignIn ? <SignInPopup /> : <SignUpPopup />}
                    </div>

                </div>
                {/* ENDS */}


            </div>
            {/* ALL CONTENT PRAENT ENDS */}


        </div>
        // PARENT CONTAINER ENDS
    )
}

export default SignIn;