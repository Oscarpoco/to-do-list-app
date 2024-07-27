import './signInPopup.css';

function SignInPopup() {
    

    

    return (
        <div className='signInPopup'>
            <div className='title'>Sign In</div>
            <form>
                <input
                    type='email'
                    id='username'
                    placeholder='Email'
                    required
                />
                <input
                    type='password'
                    id='password'
                    placeholder='Password'
                    required
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default SignInPopup;
