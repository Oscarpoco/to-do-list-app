import React, { useState, useContext } from 'react';
import './signInPopup.css';
import CustomizedSnackbars from './toastNotification';
import axios from 'axios';
import AuthContext from './AuthContext';

function SignInPopup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const { setIsSignedIn } = useContext(AuthContext);

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

  const proceedLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.get('http://localhost:3001/users');
        const users = response.data;

        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
          localStorage.setItem('authToken', user.username);
          localStorage.setItem('userId', user.id); // Store userId in local storage
          localStorage.setItem('user', JSON.stringify(user));
          setSnackbar({ open: true, message: 'Sign in successful', severity: 'success' });
          setIsSignedIn(true);
        } else {
          setSnackbar({ open: true, message: 'Invalid username or password', severity: 'error' });
        }
      } catch (err) {
        setSnackbar({ open: true, message: 'Error: ' + err.message, severity: 'error' });
      }
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
