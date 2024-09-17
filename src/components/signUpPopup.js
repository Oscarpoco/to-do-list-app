import React, { useState, useEffect } from 'react';
import './signUpPopup.css';
import CustomizedSnackbars from './toastNotification';
import setupDatabase from '../SQLjs/sql';

function SignUpPopup({setIsAuthenticated}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: '' });
  const [dbMethods, setDbMethods] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initError, setInitError] = useState(null);

  useEffect(() => {
    async function initDb() {
      try {
        const methods = await setupDatabase();
        setDbMethods(methods);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to initialize database:", error);
        setInitError(error.message);
        setIsLoading(false);
      }
    }
    initDb();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const isStrongPassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
  };

  const isValidate = () => {
    let isProceed = true;
    let errorMessage = 'Please enter the value in ';

    if (!username.trim()) {
      isProceed = false;
      errorMessage += 'username ';
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(username)) {
      isProceed = false;
      errorMessage = 'Please enter a valid email';
    }

    if (!password.trim()) {
      isProceed = false;
      errorMessage += 'password ';
    } else if (!isStrongPassword(password)) {
      isProceed = false;
      errorMessage = 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character';
    }

    if (password !== confirmPassword) {
      isProceed = false;
      errorMessage = 'Passwords do not match';
    }

    if (!isProceed) {
      setSnackbar({ open: true, message: errorMessage, type: 'warning' });
    }

    return isProceed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) {
      setSnackbar({ open: true, message: 'Database is still initializing, please wait.', type: 'warning' });
      return;
    }

    if (initError) {
      setSnackbar({ open: true, message: `Database initialization failed: ${initError}`, type: 'error' });
      return;
    }

    if (isValidate()) {
      if (!dbMethods) {
        setSnackbar({ open: true, message: 'Database not initialized properly. Please refresh the page.', type: 'error' });
        return;
      }

      try {
        const result = await dbMethods.signUp(username, password);

        if (result.success) {

          setTimeout(()=>{
            localStorage.setItem('userId', result.userId);
          }, 1)
          setSnackbar({ open: true, message: 'Sign up successful', type: 'success' });
          setIsAuthenticated(true);
        } else {
          setSnackbar({ open: true, message: `Sign up failed: ${result.error}`, type: 'error' });
        }
      } catch (error) {
        setSnackbar({ open: true, message: `Sign up failed: ${error.message}`, type: 'error' });
      }
    }
  };

  if (isLoading) {
    return <div>Initializing database...</div>;
  }

  if (initError) {
    return <div>Failed to initialize database: {initError}</div>;
  }

  return (
    <div className='signUpPopup'>
      <div className='title'>Sign Up</div>
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
        <input
          type='password'
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder='Confirm Password'
          autoComplete='auto'
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

export default SignUpPopup;