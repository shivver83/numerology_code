import './App.css';
import { useState } from 'react';

// Chaldean mapping
const chaldeanMap: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
};

const reduceToSingleDigit = (num: number) => {
  while (num > 9 && num !== 11 && num !== 22) {
    num = num
      .toString()
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return num;
};

const generateLoshuGrid = (dob: string) => {
  if (!dob) return null;
  const digits = dob
    .replace(/\D/g, '')
    .split('')
    .map(Number)
    .filter(n => n >= 1 && n <= 9);
  const counts: Record<number, number> = {};
  for (let i = 1; i <= 9; i++) counts[i] = 0;
  digits.forEach(d => counts[d]++);
  return counts;
};

export default function App() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [result, setResult] = useState<{
    nameNumber: number;
    dobNumber: number;
    loshuGrid: Record<number, number> | null;
  } | null>(null);

  const calculateNumerology = () => {
    if (!name || !dob) return;

    const nameNumber = reduceToSingleDigit(
      name
        .toUpperCase()
        .replace(/[^A-Z]/g, '')
        .split('')
        .reduce((sum, char) => sum + (chaldeanMap[char] || 0), 0)
    );

    const dobNumber = reduceToSingleDigit(
      dob.replace(/\D/g, '').split('').reduce((sum, digit) => sum + parseInt(digit), 0)
    );

    const loshuGrid = generateLoshuGrid(dob);

    setResult({ nameNumber, dobNumber, loshuGrid });
  };

  return (
    <div className="App">
      {/* HEADER / NAVBAR */}
      <nav className="navbar fixed-navbar">
        <div className="navbar-logo">
          <img src="/Logo.png" alt="Numerology Logo" className="logo-img" />
          <span className="brand-name">Numerology</span>
        </div>
        <ul className="navbar-menu">
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Get Your Journey</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </nav>

      {/* BACKGROUND VIDEO */}
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src="/numerology.mp4" type="video/mp4" />
        </video>
      </div>

      {/* FORM SECTION */}
      <section className="user-form-section">
        <div className="form-container mystic-form">
          <h2>🔮 Get Your Personal Numerology Reading</h2>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <button onClick={calculateNumerology}>Calculate</button>
        </div>
      </section>

      {/* RESULTS */}
      {result && (
        <section className="results-section">
          <h3>Numerology Results</h3>
          <p><strong>Name Number:</strong> {result.nameNumber}</p>
          <p><strong>DOB Number:</strong> {result.dobNumber}</p>
          {result.loshuGrid && (
            <div className="loshu-grid">
              {Object.entries(result.loshuGrid).map(([num, count]) => (
                <div key={num} className="grid-cell">
                  {num}: {count}
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
