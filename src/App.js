import './App.css';
import Dashboard from './components/dashboard';
import SignIn from './components/signIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route exact path='/' element={<SignIn />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
