// Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// LOADER
import Loader from './Loader';
import CustomizedSnackbars from './toastNotification';

// CSS
import './Register.css';

function Register({onLogin}) {

  // LOCAL STATE
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // TOAST STATE
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // NAVIGATOR
  const navigate = useNavigate();

  // HANDLE TOAST
  const handleToast = (message, severity = 'success') => {
    setToast({
      open: true,
      message,
      severity
    });
  };
  // ENDS

  // CLOSE TOAST
  const closeToast = () => {
    setToast(prev => ({ ...prev, open: false }));
  };
  // ENDS

  // HANDLE LOGIN
  const handleSubmiTLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      onLogin(data.token);
      navigate('/todos');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  // ENDS

  // HANDLE SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      handleToast('User created successfully');
      await handleSubmiTLogin();
      setEmail("");
      setPassword("");

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  // ENDS

  // RENDER REMAINING CODE
  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>
        
        {/* ERROR */}
        {error && <div className="error-message">{error}</div>}
        {/* ENDS */}
        
        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit">
            
            {isLoading ? <Loader/> : 'Register'}
          </button>
        </form>
        
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      {/* ENDS */}

      {/* TOAST */}
      <CustomizedSnackbars
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={closeToast}
      />
      {/* ENDS */}
    </div>
  );
}

export default Register;