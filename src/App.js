import './App.css';
import Dashboard from './components/dashboard';
import SignIn from './components/signIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const HandleAuthentication = () =>{
    setIsAuthenticated(true)
  }

  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route
              exact
              path='/'
              element={
                <SignIn />
              }
            />
            <Route
              path='/dashboard'
              element={isAuthenticated ? <Dashboard /> : <SignIn onClick={HandleAuthentication} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
