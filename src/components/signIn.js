import './signIn.css';
import { LuListTodo } from "react-icons/lu";
import SignInPopup from './signInPopup';
import SignUpPopup from './signUpPopup';
import { GrUserNew } from "react-icons/gr";
import { PiSignInThin } from "react-icons/pi";

function SignIn(){
    return(
        <div className='sign-in'>
            <div className='logo'>
                <h3>Lis<span>tify</span> <LuListTodo className='icon'/></h3>
            </div>
            <div className='display-sign-content'>
                <div className='welcome-message'>
                    <p>Welcome to Lis<span>tify</span> – where your goals take flight. Let's make every day a productive adventure!</p>
                    <div className='slogan'>
                        
                        <img src='main.jpeg' alt='image-main'></img>
                        <img src='main-1.jpeg' alt='image-main'></img>
                    </div>
                </div>
                <div className='login-box'>
                    <div className='signIn-Nav'>
                        <button><PiSignInThin  className='icon'/> Sign In</button>
                        <button><GrUserNew className='icon'/> Sign Up</button>
                    </div>
                    <div className='signIn-form'>
                        <SignInPopup />
                        {/* <SignUpPopup /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;