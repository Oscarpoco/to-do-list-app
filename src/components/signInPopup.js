import React, { useState } from 'react';
import './signInPopup.css';
import CustomizedSnackbars from './toastNotification';

function SignInPopup({ setIsSignIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const validate = () => {
    if (username === '' || username === null) {
      setSnackbar({ open: true, message: 'Please enter the username', severity: 'warning' });
      return false;
    }

    if (password === '' || password === null) {
      setSnackbar({ open: true, message: 'Please enter the password', severity: 'warning' });
      return false;
    }

    return true;
  };

  const proceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch(`http://localhost:3030/users/${username}`)
        .then((res) => res.json())
        .then((resp) => {
          if (Object.keys(resp).length === 0) {
            setSnackbar({ open: true, message: "User not found", severity: 'error' });
          } else {
            if (resp.password === password) {
              setSnackbar({ open: true, message: 'Sign in successful', severity: 'success' });
              setIsSignIn(true);
            } else {
              setSnackbar({ open: true, message: 'Incorrect password', severity: 'error' });
            }
          }
        })
        .catch((err) => {
          setSnackbar({ open: true, message: 'Error: ' + err.message, severity: 'error' });
        });
    }
  };

  return (
    <div className='signInPopup'>
      <div className='title'>Sign In</div>
      <form onSubmit={proceedLogin}>
        <input
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder='Email'
        />
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button type='submit'>Submit</button>
      </form>
      <CustomizedSnackbars
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
}

export default SignInPopup;
