import './App.css';
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ContactPage from './ContactPage';
import AboutUs from './AboutUs';

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
    num = num.toString().split("").reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return num;
};

const generateLoshuGrid = (dob: string) => {
  if (!dob) return null;
  const digits = dob.replace(/\D/g, '').split('').map(Number).filter(n => n >= 1 && n <= 9);
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  digits.forEach(n => { counts[n] += 1; });
  return counts;
};

// New function to calculate Kuan number
const calculateKuanNumber = (dob: string, gender: string): number | null => {
  if (!dob || !gender) return null;
  const year = new Date(dob).getFullYear();
  let lastTwo = year % 100;
  let sum = Math.floor(lastTwo / 10) + (lastTwo % 10);
  sum = sum > 9 ? (Math.floor(sum / 10) + (sum % 10)) : sum;

  let kuanNum: number;
  if (gender.toLowerCase() === 'male') {
    kuanNum = 10 - sum;
  } else if (gender.toLowerCase() === 'female') {
    kuanNum = sum + 5;
  } else {
    kuanNum = 10 - sum;
  }
  if (kuanNum > 9) kuanNum = Math.floor(kuanNum / 10) + (kuanNum % 10);
  return kuanNum;
};

function MainApp() {
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    gender: ''
  });

  const [driverNumber, setDriverNumber] = useState<number | null>(null);
  const [conductorNumber, setConductorNumber] = useState<number | null>(null);
  const [kuanNumber, setKuanNumber] = useState<number | null>(null);  // NEW STATE
  const [chaldeanData, setChaldeanData] = useState<{ letter: string; value: number }[]>([]);
  const [nameTotal, setNameTotal] = useState<number | null>(null);
  const [loshuGrid, setLoshuGrid] = useState<Record<number, number> | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // ... Other states and handlers unchanged ...

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setContactUsGlow(false);

    const lifePathNumber = calculateLifePathNumber(formData.dateOfBirth);
    const driver = calculateDriverNumber(formData.dateOfBirth);
    const kuan = calculateKuanNumber(formData.dateOfBirth, formData.gender);  // Calculate Kuan
    const { letterValues, total } = calculateChaldeanChart(formData.name);
    const grid = generateLoshuGrid(formData.dateOfBirth);

    setConductorNumber(lifePathNumber);
    setDriverNumber(driver);
    setKuanNumber(kuan);  // Set Kuan Number here
    setChaldeanData(letterValues);
    setNameTotal(total);
    setLoshuGrid(grid);

    setContactUsGlow(true);

    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    // ...rest of submit handler unchanged...
  };

  // Render helper unchanged
  const renderLoshuCell = (num: number) => {
    if (!loshuGrid) return '-';
    const count = loshuGrid[num] || 0;
    if (count <= 0) return <span style={{ color: '#999' }}>-</span>;
    return (
      <div>
        {Array.from({ length: count }, (_, i) => (
          <span key={i} style={{ margin: '0 3px', fontWeight: 600 }}>{num}</span>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <video autoPlay loop muted playsInline className="video-background">
        <source src="/numerology.mp4" type="video/mp4" />
      </video>

      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/Logo.png" alt="Numerology Logo" className="logo-img" />
          <span className="brand-name">Numerology</span>
        </div>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><a href="#">Get Your Journey</a></li>
          <li>
            <Link
              to="/contact"
              className={contactUsGlow ? "contact-us-glow" : undefined}
              data-testid="contact-us-link"
            >
              Contact Us
            </Link>
          </li>
          <li
            style={{ fontWeight: 'bold', color: '#ffd700', cursor: 'pointer' }}
            onClick={handleVisitCountClick}
          >
            Visit Count
          </li>
        </ul>
      </nav>

      {/* ... visit modal and form section unchanged ... */}

      {driverNumber !== null && conductorNumber !== null && (
        <div className="numerology-result-container">

          <div className="result-card" style={{
            background: 'linear-gradient(145deg, #2a2a2a, #4a4a4a)',
            border: '2px solid #ffd700',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
            color: '#ffffff'
          }}>
            <p style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#00bfff',
              textAlign: 'center',
              marginBottom: '1rem',
              textShadow: '0 0 10px rgba(0, 191, 255, 0.7)'
            }}>
              Here is your initial analysis....
            </p>
            <h3 style={{
              fontSize: '2rem',
              color: '#ff4500',
              textAlign: 'center',
              marginBottom: '1.5rem',
              textShadow: '0 0 10px rgba(255, 69, 0, 0.7)'
            }}>
              🌟 Your Core Numbers
            </h3>
            <p style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '0.5rem'
            }}>
              Driver Number: {driverNumber}
            </p>
            <p style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '0.5rem'
            }}>
              Conductor Number: {conductorNumber}
            </p>
            {kuanNumber !== null && (
              <p style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '0.5rem'
              }}>
                Kuan Number: {kuanNumber}
              </p>
            )}
          </div>

          <div className="result-card">
            <h3>🔮 Chaldean Numerology Chart</h3>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Letter</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {chaldeanData.map((lv, i) => (
                  <tr key={i}>
                    <td>{lv.letter}</td>
                    <td>{lv.value}</td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td><strong>Total</strong></td>
                  <td><strong>{nameTotal}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          {loshuGrid && (
            <div className="result-card">
              <h3>🧮 Loshu Grid</h3>
              <div className="loshu-grid">
                <div>{renderLoshuCell(4)}</div>
                <div>{renderLoshuCell(9)}</div>
                <div>{renderLoshuCell(2)}</div>
                <div>{renderLoshuCell(3)}</div>
                <div>{renderLoshuCell(5)}</div>
                <div>{renderLoshuCell(7)}</div>
                <div>{renderLoshuCell(8)}</div>
                <div>{renderLoshuCell(1)}</div>
                <div>{renderLoshuCell(6)}</div>
              </div>
              <p className="grid-note">(Numbers repeated = presence, "-" = missing)</p>

              {kuanNumber !== null && (
                <p style={{
                  marginTop: '1rem',
                  fontWeight: '700',
                  fontSize: '1.6rem',
                  color: '#ff8c00',
                  textAlign: 'center',
                  textShadow: '0 0 10px rgba(255, 140, 0, 0.8)'
                }}>
                  Your Kuan Number is: <strong>{kuanNumber}</strong>
                </p>
              )}
            </div>
          )}

          {/* Stylish message on center-right */}
          {loshuGrid && (
            <div
              className="contact-us-message"
              style={{
                position: 'fixed',
                top: '50%',
                right: '2rem',
                transform: 'translateY(-50%)',
                fontWeight: '700',
                fontSize: '2rem',
                color: '#ff8c00',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                padding: '1rem 1.5rem',
                borderRadius: '12px',
                boxShadow: '0 0 15px 3px rgba(255, 140, 0, 0.7)',
                userSelect: 'none',
                zIndex: 1000,
                textAlign: 'center',
                maxWidth: '320px',
                cursor: 'default',
                lineHeight: 1.3
              }}
            >
              To get your detailed Life path report kindly{' '}
              <Link to="/contact" style={{ textDecoration: 'underline', color: '#ff4500', fontWeight: '900' }}>
                Contact Us
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}
import './App.css';
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ContactPage from './ContactPage';
import AboutUs from './AboutUs';

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
    num = num.toString().split("").reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return num;
};

const generateLoshuGrid = (dob: string) => {
  if (!dob) return null;
  const digits = dob.replace(/\D/g, '').split('').map(Number).filter(n => n >= 1 && n <= 9);
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  digits.forEach(n => { counts[n] += 1; });
  return counts;
};

// New function to calculate Kuan number
const calculateKuanNumber = (dob: string, gender: string): number | null => {
  if (!dob || !gender) return null;
  const year = new Date(dob).getFullYear();
  let lastTwo = year % 100;
  let sum = Math.floor(lastTwo / 10) + (lastTwo % 10);
  sum = sum > 9 ? (Math.floor(sum / 10) + (sum % 10)) : sum;

  let kuanNum: number;
  if (gender.toLowerCase() === 'male') {
    kuanNum = 10 - sum;
  } else if (gender.toLowerCase() === 'female') {
    kuanNum = sum + 5;
  } else {
    kuanNum = 10 - sum;
  }
  if (kuanNum > 9) kuanNum = Math.floor(kuanNum / 10) + (kuanNum % 10);
  return kuanNum;
};

function MainApp() {
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    gender: ''
  });

  const [driverNumber, setDriverNumber] = useState<number | null>(null);
  const [conductorNumber, setConductorNumber] = useState<number | null>(null);
  const [kuanNumber, setKuanNumber] = useState<number | null>(null);  // NEW STATE
  const [chaldeanData, setChaldeanData] = useState<{ letter: string; value: number }[]>([]);
  const [nameTotal, setNameTotal] = useState<number | null>(null);
  const [loshuGrid, setLoshuGrid] = useState<Record<number, number> | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // ... Other states and handlers unchanged ...

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setContactUsGlow(false);

    const lifePathNumber = calculateLifePathNumber(formData.dateOfBirth);
    const driver = calculateDriverNumber(formData.dateOfBirth);
    const kuan = calculateKuanNumber(formData.dateOfBirth, formData.gender);  // Calculate Kuan
    const { letterValues, total } = calculateChaldeanChart(formData.name);
    const grid = generateLoshuGrid(formData.dateOfBirth);

    setConductorNumber(lifePathNumber);
    setDriverNumber(driver);
    setKuanNumber(kuan);  // Set Kuan Number here
    setChaldeanData(letterValues);
    setNameTotal(total);
    setLoshuGrid(grid);

    setContactUsGlow(true);

    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    // ...rest of submit handler unchanged...
  };

  // Render helper unchanged
  const renderLoshuCell = (num: number) => {
    if (!loshuGrid) return '-';
    const count = loshuGrid[num] || 0;
    if (count <= 0) return <span style={{ color: '#999' }}>-</span>;
    return (
      <div>
        {Array.from({ length: count }, (_, i) => (
          <span key={i} style={{ margin: '0 3px', fontWeight: 600 }}>{num}</span>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <video autoPlay loop muted playsInline className="video-background">
        <source src="/numerology.mp4" type="video/mp4" />
      </video>

      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/Logo.png" alt="Numerology Logo" className="logo-img" />
          <span className="brand-name">Numerology</span>
        </div>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><a href="#">Get Your Journey</a></li>
          <li>
            <Link
              to="/contact"
              className={contactUsGlow ? "contact-us-glow" : undefined}
              data-testid="contact-us-link"
            >
              Contact Us
            </Link>
          </li>
          <li
            style={{ fontWeight: 'bold', color: '#ffd700', cursor: 'pointer' }}
            onClick={handleVisitCountClick}
          >
            Visit Count
          </li>
        </ul>
      </nav>

      {/* ... visit modal and form section unchanged ... */}

      {driverNumber !== null && conductorNumber !== null && (
        <div className="numerology-result-container">

          <div className="result-card" style={{
            background: 'linear-gradient(145deg, #2a2a2a, #4a4a4a)',
            border: '2px solid #ffd700',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
            color: '#ffffff'
          }}>
            <p style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#00bfff',
              textAlign: 'center',
              marginBottom: '1rem',
              textShadow: '0 0 10px rgba(0, 191, 255, 0.7)'
            }}>
              Here is your initial analysis....
            </p>
            <h3 style={{
              fontSize: '2rem',
              color: '#ff4500',
              textAlign: 'center',
              marginBottom: '1.5rem',
              textShadow: '0 0 10px rgba(255, 69, 0, 0.7)'
            }}>
              🌟 Your Core Numbers
            </h3>
            <p style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '0.5rem'
            }}>
              Driver Number: {driverNumber}
            </p>
            <p style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '0.5rem'
            }}>
              Conductor Number: {conductorNumber}
            </p>
            {kuanNumber !== null && (
              <p style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '0.5rem'
              }}>
                Kuan Number: {kuanNumber}
              </p>
            )}
          </div>

          <div className="result-card">
            <h3>🔮 Chaldean Numerology Chart</h3>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Letter</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {chaldeanData.map((lv, i) => (
                  <tr key={i}>
                    <td>{lv.letter}</td>
                    <td>{lv.value}</td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td><strong>Total</strong></td>
                  <td><strong>{nameTotal}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          {loshuGrid && (
            <div className="result-card">
              <h3>🧮 Loshu Grid</h3>
              <div className="loshu-grid">
                <div>{renderLoshuCell(4)}</div>
                <div>{renderLoshuCell(9)}</div>
                <div>{renderLoshuCell(2)}</div>
                <div>{renderLoshuCell(3)}</div>
                <div>{renderLoshuCell(5)}</div>
                <div>{renderLoshuCell(7)}</div>
                <div>{renderLoshuCell(8)}</div>
                <div>{renderLoshuCell(1)}</div>
                <div>{renderLoshuCell(6)}</div>
              </div>
              <p className="grid-note">(Numbers repeated = presence, "-" = missing)</p>

              {kuanNumber !== null && (
                <p style={{
                  marginTop: '1rem',
                  fontWeight: '700',
                  fontSize: '1.6rem',
                  color: '#ff8c00',
                  textAlign: 'center',
                  textShadow: '0 0 10px rgba(255, 140, 0, 0.8)'
                }}>
                  Your Kuan Number is: <strong>{kuanNumber}</strong>
                </p>
              )}
            </div>
          )}

          {/* Stylish message on center-right */}
          {loshuGrid && (
            <div
              className="contact-us-message"
              style={{
                position: 'fixed',
                top: '50%',
                right: '2rem',
                transform: 'translateY(-50%)',
                fontWeight: '700',
                fontSize: '2rem',
                color: '#ff8c00',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                padding: '1rem 1.5rem',
                borderRadius: '12px',
                boxShadow: '0 0 15px 3px rgba(255, 140, 0, 0.7)',
                userSelect: 'none',
                zIndex: 1000,
                textAlign: 'center',
                maxWidth: '320px',
                cursor: 'default',
                lineHeight: 1.3
              }}
            >
              To get your detailed Life path report kindly{' '}
              <Link to="/contact" style={{ textDecoration: 'underline', color: '#ff4500', fontWeight: '900' }}>
                Contact Us
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}
