import './App.css';
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ContactPage from './ContactPage';

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
  const [chaldeanData, setChaldeanData] = useState<{ letter: string; value: number }[]>([]);
  const [nameTotal, setNameTotal] = useState<number | null>(null);
  const [loshuGrid, setLoshuGrid] = useState<Record<number, number> | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Modal + visit count state
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [loadingVisit, setLoadingVisit] = useState(false);
  const [visitError, setVisitError] = useState<string | null>(null);

  // State to control Contact Us menu glowing
  const [contactUsGlow, setContactUsGlow] = useState(false);

  // Ref for scrolling
  const formSectionRef = useRef<HTMLDivElement>(null);

  // Stop glowing when user navigates away
  useEffect(() => {
    setContactUsGlow(false);
  }, [location]);

  const handleVisitCountClick = async () => {
    setVisitError(null);
    setLoadingVisit(true);
    try {
      const res = await fetch('/api/count');
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server returned ${res.status}: ${text}`);
      }
      const data = await res.json();
      if (typeof data.count === 'number') {
        setVisitCount(data.count);
        setShowVisitModal(true);
      } else {
        throw new Error('Malformed response from server');
      }
    } catch (err: any) {
      console.error('Error fetching visit count:', err);
      setVisitError(err?.message || 'Error fetching visit count');
      setShowVisitModal(true);
    } finally {
      setLoadingVisit(false);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showVisitModal) setShowVisitModal(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showVisitModal]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateLifePathNumber = (dob: string): number => {
    const digits = dob.replace(/\D/g, '').split('').map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((a, b) => a + Number(b), 0);
    }
    return sum;
  };

  const calculateDriverNumber = (dob: string): number => {
    const digits = dob.replace(/\D/g, '');
    if (digits.length >= 8) {
      const dayStr = digits.slice(-2);
      let day = parseInt(dayStr, 10);
      if (isNaN(day)) day = 0;
      if ([11, 22, 33].includes(day)) return day;
      while (day > 9) {
        day = day.toString().split('').reduce((a, b) => a + Number(b), 0);
      }
      return day;
    }
    return 0;
  };

  const calculateChaldeanChart = (name: string) => {
    const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
    const letterValues = cleanName.split('').map(letter => ({
      letter,
      value: chaldeanMap[letter] || 0
    }));
    const total = reduceToSingleDigit(letterValues.reduce((sum, lv) => sum + lv.value, 0));
    return { letterValues, total };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setContactUsGlow(false); // reset glow before new calculation

    const lifePathNumber = calculateLifePathNumber(formData.dateOfBirth);
    const driver = calculateDriverNumber(formData.dateOfBirth);
    const { letterValues, total } = calculateChaldeanChart(formData.name);
    const grid = generateLoshuGrid(formData.dateOfBirth);

    setConductorNumber(lifePathNumber);
    setDriverNumber(driver);
    setChaldeanData(letterValues);
    setNameTotal(total);
    setLoshuGrid(grid);

    // Start Contact Us glow after grid appears
    setContactUsGlow(true);

    // Scroll to form section after results are shown
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          date_of_birth: formData.dateOfBirth,
          life_path_number: lifePathNumber,
          email: formData.email,
          phone: formData.phone,
          gender: formData.gender
        })
      });

      const result = await response.json();
      if (response.ok) {
        setSubmitMessage(`✅ Thank you, ${formData.name}! Your information has been submitted.`);
        setFormData({ name: '', dateOfBirth: '', email: '', phone: '', gender: '' });
      } else {
        setSubmitMessage(`❌ Error: ${result.message || 'Submission failed'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitMessage('❌ There was an error submitting your information.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <li><a href="#">About Us</a></li>
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

      {showVisitModal && (
        <div className="modal-overlay" onClick={() => setShowVisitModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Users Visited so far - </h2>
            {loadingVisit ? (
              <p>Loading...</p>
            ) : visitError ? (
              <p style={{ color: 'red' }}>{visitError}</p>
            ) : (
              <p className="visit-number">{visitCount ?? '0'}</p>
            )}
            <button onClick={() => setShowVisitModal(false)}>Close</button>
          </div>
        </div>
      )}

      <section className="user-form-section" ref={formSectionRef}>
        <div className="form-container mystic-form">
          <h2>🔮 Get Your Personal Numerology Reading</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Full Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required disabled={isSubmitting} />
            </div>
            <div>
              <label>Gender:</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange} required disabled={isSubmitting}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label>Date of Birth:</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required disabled={isSubmitting} />
            </div>
            <div>
              <label>Email (optional):</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} disabled={isSubmitting} />
            </div>
            <div>
              <label>Phone (optional):</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} disabled={isSubmitting} />
            </div>
            <button type="submit" disabled={isSubmitting} className="mystic-btn">
              {isSubmitting ? '✨ Calculating...' : 'Get My Reading'}
            </button>
          </form>
          {submitMessage && <div className="submit-message">{submitMessage}</div>}
        </div>
      </section>

      {driverNumber !== null && conductorNumber !== null && (
        <div className="numerology-result-container">
          <div className="result-card">
            <h3>🌟 Your Core Numbers</h3>
            <p>Driver Number: {driverNumber}</p>
            <p>Conductor Number: {conductorNumber}</p>
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
      </Routes>
    </Router>
  );
}
