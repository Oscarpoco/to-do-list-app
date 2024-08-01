// App.jsx
import './App.css';
import { useState } from 'react';
import Dashboard from './components/dashboard';
import SignIn from './components/signIn';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleAuthentication = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <div className="App">
      <main>
        {isAuthenticated ? (
          <Dashboard setIsAuthenticated={handleAuthentication} />
        ) : (
          <SignIn setIsAuthenticated={handleAuthentication} />
        )}
      </main>
    </div>
  );
}

export default App;
