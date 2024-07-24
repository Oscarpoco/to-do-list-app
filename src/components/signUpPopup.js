import './signUpPopup.css';


function SignUpPopup(){
    return(
        <div className='signUpPopup'>
            <div className='title'>Sign Up</div>
            <form>
                <input type='text' id='username' placeholder='Username' required></input>
                <input type='text' id='password' placeholder='Password' required></input>
                <input type='text' id='password' placeholder='Verify Password' required></input>
                <button>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpPopup;