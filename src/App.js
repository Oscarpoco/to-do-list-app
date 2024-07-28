import './App.css';
import { useState } from 'react';
import Dashboard from './components/dashboard';
import SignIn from './components/signIn';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div className="App">
            <main>
                {isAuthenticated ? <Dashboard  setIsAuthenticated={setIsAuthenticated}/> : <SignIn setIsAuthenticated={setIsAuthenticated} />}
            </main>
        </div>
    );
}

export default App;
