import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// COMPONENTS
import Login from "./components/signIn.js";
import Register from './components/Register.js';
import TodoList from './components/dashboard.js';
// ENDS

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  // HANDLE LOGIN
  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };
  // ENDS

  // HANDLE LOGOUT
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };
  // ENDS

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={!token ? <Login onLogin={handleLogin} /> : <Navigate to="/todos" />} />
          <Route path="/register" element={!token ? <Register onLogin={handleLogin}/> : <Navigate to="/todos" />} />
          <Route path="/todos" element={token ? <TodoList token={token} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={token ? "/todos" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;