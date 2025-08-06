import './App.css';

function App() {
  return (
    <div className="App">
      {/* Top Navigation Bar */}
      <nav className="navbar full-width">
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
          src="/numerology.png"
          alt="What Numbers Speak ...."
          className="guide-image-full"
        />
      </header>

      {/* Bottom Pane */}
      <footer className="footer">
        <a href="#rateus" className="rate-link">⭐ Rate Us</a>
      </footer>
    </div>
  );
}

export default App;
