import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CalculationGuide from './pages/CalculationGuide';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';


<Link to="/guide">Calculation Guide</Link>

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<CalculationGuide />} />
      </Routes>
    </Router>
  );
}

export default App;

