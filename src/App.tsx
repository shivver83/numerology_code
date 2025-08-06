import './App.css';

function App() {
  return (
    <div className="App">
      {/* Top Navigation Bar */}
      <nav className="navbar">
        <div className="logo">🔮 Numerology</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="#about">About Happiness Creations</a></li>
          <li><a href="#consultation">Consultation</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <header className="App-header">
        <h1>Life Path Numbers Guide</h1>
        <img
          src="/life_path_numbers_guide.png"
          alt="Life Path Numbers Guide"
          className="guide-image"
        />
      </header>
    </div>
  );
}

export default App;
