import React, { useState, useContext } from 'react';
import './signInPopup.css';
import CustomizedSnackbars from './toastNotification';
import AuthContext from './AuthContext';
import setupDatabase from '../SQLjs/sql';

function SignInPopup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: '' });
  const { setIsSignedIn } = useContext(AuthContext);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const validate = () => {
    if (!username.trim()) {
      setSnackbar({ open: true, message: 'Please enter the username', type: 'warning' });
      return false;
    }

    if (!password.trim()) {
      setSnackbar({ open: true, message: 'Please enter the password', type: 'warning' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const dbMethods = await setupDatabase();
        const result = await dbMethods.signIn(username, password);

        if (result.success) {
          localStorage.setItem('authToken', result.user.username);
          localStorage.setItem('userId', result.user.id); // Store userId in local storage
          localStorage.setItem('user', JSON.stringify(result.user));
          setSnackbar({ open: true, message: 'Sign in successful', type: 'success' });
          setIsSignedIn(true);
        } else {
          setSnackbar({ open: true, message: `Invalid username or password`, type: 'error' });
        }
      } catch (error) {
        setSnackbar({ open: true, message: `Sign in failed: ${error.message}`, type: 'error' });
      }
    }
  };

  return (
    <div className='signInPopup'>
      <div className='title'>Sign In</div>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
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
        severity={snackbar.type}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
}

export default SignInPopup;
