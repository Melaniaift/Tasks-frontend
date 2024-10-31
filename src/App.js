import './App.css';
import { Navbar, Footer } from './components/index';
import { BrowserRouter as Router } from 'react-router-dom';
import { Board } from './pages/index';
import { useState } from 'react'

function App() {

  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const refresh = () => {
    setRefreshTrigger(prev => !prev);
  };

  return (
    <Router>
      <Navbar refresh={refresh}/>
      <Board onRefresh={refreshTrigger} />
      <Footer/>
    </Router>
  );
}

export default App;
