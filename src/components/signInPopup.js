import './signInPopup.css';
// import { useState } from 'react';
import axios from 'axios';

function SignInPopup({ setIsAuthenticated }) {
    

    const onFinish = values =>{
        const {username, password} = values
        axios.post('http://localhost:3000/validatePassword', {username, password})
        .then(res =>{
            if(res.data.validation){
                setIsAuthenticated(true);
            }else{console.log('Wrong credentials')}
        })
    }

    return (
        <div className='signInPopup'>
            <div className='title'>Sign In</div>
            <form onClick={onFinish}>
                <input
                    type='text'
                    name='username'
                    placeholder='Email'
                   
                    required
                />
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                
                    required
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default SignInPopup;
