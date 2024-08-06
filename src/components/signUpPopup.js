import React, { useState, useEffect } from 'react';
import initSqlJs from 'sql.js';
import './signUpPopup.css';
import CustomizedSnackbars from './toastNotification';

function SignUpPopup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: '' });
  const [db, setDb] = useState(null);
  const [memory, setMemory] = useState(null);

  useEffect(() => {
    const initializeDatabase = async () => {
      const SQL = await initSqlJs({ 
        // Use a custom WebAssembly memory instance
        locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.5.0/${file}`,
        memory: memory ? new WebAssembly.Memory(memory) : undefined
      });
      
      // Initialize a new database
      const database = new SQL.Database();

      // Create tables
      database.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE,
          password TEXT
        );
      `);

      setDb(database);
    };

    // Initialize the WebAssembly memory
    const wasmMemory = new WebAssembly.Memory({ initial: 256, maximum: 256 });
    setMemory(wasmMemory);

    initializeDatabase();
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

    if (!isProceed) {
      setSnackbar({ open: true, message: errorMessage, type: 'warning' });
    }

    return isProceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidate()) {
      if (password !== confirmPassword) {
        setSnackbar({ open: true, message: 'Passwords do not match', type: 'error' });
        return;
      }

      if (db) {
        // Insert user data into the database
        try {
          const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
          stmt.run([username, password]);
          stmt.free();
          
          setSnackbar({ open: true, message: 'Sign up successful', type: 'success' });
        } catch (error) {
          setSnackbar({ open: true, message: 'Sign up failed: ' + error.message, type: 'error' });
        }
      } else {
        setSnackbar({ open: true, message: 'Database is not initialized', type: 'error' });
      }
    }
  };

  return (
    <div className='signUpPopup'>
      <div className='title'>Sign Up</div>
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
        <input
          type='password'
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder='Confirm Password'
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
