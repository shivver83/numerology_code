import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ContactPage from './ContactPage';

function HomePage() {
  return (
    <>
      <header className="App-header">
        <h1>Life Path Numbers Guide</h1>
        <img
          src="/numerology.png"
          alt="What Numbers Speak ...."
          className="guide-image-full"
        />
      </header>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar full-width">
          <div className="logo">🔮 Numerology</div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><a href="#about">About Happiness Creations</a></li>
            <li><a href="#consultation">Consultation</a></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        {/* Footer */}
        <footer className="footer">
          <a href="#rateus" className="rate-link">⭐ Rate Us</a>
        </footer>
      </div>
    </Router>
  );
}

export default App;

