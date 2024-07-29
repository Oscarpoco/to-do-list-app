// App.jsx
import './App.css';
import { useState } from 'react';
import Dashboard from './components/dashboard';
import SignIn from './components/signIn';
import Loader from './components/Loader';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthentication = (status) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAuthenticated(status);
      setIsLoading(false);
    }, 2000);
  };

  if (isLoading) {
    return <Loader name="Processing" />;
  }

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
