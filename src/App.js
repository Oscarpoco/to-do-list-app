// App.jsx
import './App.css';
import { useState } from 'react';
import Dashboard from './components/dashboard';
import SignIn from './components/signIn';



function App() {

  const [isSignedIn, setIsSignedIn] = useState(false)
  return (

      <div className="App">
        <main>
          {isSignedIn ? <Dashboard setIsSignedIn={setIsSignedIn} /> : <SignIn setIsSignedIn={setIsSignedIn} />}
        </main>
      </div>
 
  );
}


export default App;
