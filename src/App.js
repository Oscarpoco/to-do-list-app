// App.jsx
import './App.css';
import Dashboard from './components/dashboard';
import SignIn from './components/signIn';
import { AuthProvider } from './components/AuthContext';
import React, { useContext } from 'react';
import AuthContext from './components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <main>
          <AuthConsumer />
        </main>
      </div>
    </AuthProvider>
  );
}

const AuthConsumer = () => {
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);

  return isSignedIn ? (
    <Dashboard setIsAuthenticated={setIsSignedIn} />
  ) : (
    <SignIn setIsAuthenticated={setIsSignedIn} />
  );
};

export default App;
