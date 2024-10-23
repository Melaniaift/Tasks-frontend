import './App.css';
import { Navbar } from './components/index';
import { BrowserRouter as Router } from 'react-router-dom';
import { Board } from './pages/index';

function App() {
  return (
    <Router>
      <Navbar />
      <Board />
    </Router>
  );
}

export default App;
