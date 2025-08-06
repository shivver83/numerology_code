import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="navbar">
          <div className="logo">
            <img src="/logo.png" alt="Numerology Logo" />
            <span>Numerology Vibes</span>
          </div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/life-path">Life Path Number</Link></li>
              <li><Link to="/destiny">Destiny Number</Link></li>
              <li><Link to="/soul-urge">Soul Urge Number</Link></li>
              <li><Link to="/personality">Personality Number</Link></li>
              <li><Link to="/guide">Guide</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/life-path" element={<LifePath />} />
            <Route path="/destiny" element={<Destiny />} />
            <Route path="/soul-urge" element={<SoulUrge />} />
            <Route path="/personality" element={<Personality />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return <div><h2>Welcome to Numerology Vibes</h2><p>Explore your numbers and destiny!</p></div>;
}
function LifePath() {
  return <div><h2>Life Path Number</h2><p>Details and calculator here...</p></div>;
}
function Destiny() {
  return <div><h2>Destiny Number</h2><p>Details and calculator here...</p></div>;
}
function SoulUrge() {
  return <div><h2>Soul Urge Number</h2><p>Details and calculator here...</p></div>;
}
function Personality() {
  return <div><h2>Personality Number</h2><p>Details and calculator here...</p></div>;
}
function Guide() {
  return (
    <div>
      <h2>Calculation Guide</h2>
      <img src="/life_path_numbers_guide.png" alt="Life Path Guide" style={{ maxWidth: '90%', borderRadius: '12px' }} />
    </div>
  );
}
function About() {
  return <div><h2>About Us</h2><p>Info about the site...</p></div>;
}
function Contact() {
  return <div><h2>Contact</h2><p>Form or contact info here...</p></div>;
}

export default App;
