import React, { useState, useEffect } from 'react';
import './signInPopup.css';
import CustomizedSnackbars from './toastNotification';
import setupDatabase from '../SQLjs/sql';

function SignInPopup({setIsAuthenticated}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: '' });
  const [dbMethods, setDbMethods] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initDb() {
      try {
        const methods = await setupDatabase();
        setDbMethods(methods);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to initialize database:", error);
        setSnackbar({ open: true, message: 'Failed to initialize database. Please refresh the page.', type: 'error' });
        setIsLoading(false);
      }
    }
    initDb();
  }, []);

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

    if (isLoading) {
      setSnackbar({ open: true, message: 'Database is still initializing, please wait.', type: 'warning' });
      return;
    }

    if (validate()) {
      if (!dbMethods) {
        setSnackbar({ open: true, message: 'Database not initialized properly. Please refresh the page.', type: 'error' });
        return;
      }

      try {
        const result = await dbMethods.signIn(username, password);

        if (result.success) {
          setTimeout(()=>{
            localStorage.setItem('authToken', result.user.username);
            localStorage.setItem('userId', result.user.userId);
          }, 1)
          setIsAuthenticated(true);
          setSnackbar({ open: true, message: 'Sign in successful', type: 'success' });
        } else {
          setSnackbar({ open: true, message: `Invalid username or password`, type: 'error' });
        }
      } catch (error) {
        setSnackbar({ open: true, message: `Sign in failed: ${error.message}`, type: 'error' });
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='signInPopup'>
      <div className='title'>Sign In</div>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder='Email'
          autoComplete='auto'
        />
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
          autoComplete='auto'
        />
        <button type='submit'>Submit</button>
      </form>

      {/* SNACKBAR */}
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