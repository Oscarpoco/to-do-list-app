import './signInPopup.css';
import { PiSignInThin } from "react-icons/pi";

function SignInPopup(){
    return(
        <div className='signInPopup'>
            <div className='title'>Sign In</div>
            <form>
                <input type='text' id='username' placeholder='Username' required></input>
                <input type='text' id='password' placeholder='Password' required></input>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SignInPopup;