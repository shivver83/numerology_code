// src/App.tsx
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

const generateLoshuGrid = (
  dob: string, 
  driverNum?: number | null, 
  conductorNum?: number | null, 
  kuanNum?: number | null
) => {
  if (!dob) return null;
  const digits = dob.replace(/\D/g, '').split('').map(Number).filter(n => n >= 1 && n <= 9);
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  digits.forEach(n => { counts[n] += 1; });

  // Ensure driver, conductor, kuan are shown at least once if defined and valid
  [driverNum, conductorNum, kuanNum].forEach(num => {
    if (num && num >= 1 && num <= 9 && counts[num] === 0) {
      counts[num] = 1;
    }
  });

  return counts;
};


// Calculate Kuan Number based on DOB and gender
const calculateKuanNumber = (dob: string, gender: string): number | null => {
  if (!dob || !gender) return null;
  const year = new Date(dob).getFullYear();
  let lastTwo = year % 100;
  let sum = Math.floor(lastTwo / 10) + (lastTwo % 10);
  if (sum > 9) sum = Math.floor(sum / 10) + (sum % 10);

  let kuanNum: number;
  if (gender.toLowerCase() === 'male') {
    kuanNum = 10 - sum;
  } else if (gender.toLowerCase() === 'female') {
    kuanNum = sum + 5;
  } else {
    kuanNum = 10 - sum; // Default to male calculation if other
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
  const [kuanNumber, setKuanNumber] = useState<number | null>(null);
 
  const [firstNameData, setFirstNameData] = useState<{ letter: string; value: number }[]>([]);
  const [firstNameTotal, setFirstNameTotal] = useState<number | null>(null);

  const [lastNameData, setLastNameData] = useState<{ letter: string; value: number }[]>([]);
  const [lastNameTotal, setLastNameTotal] = useState<number | null>(null);

  
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

  // Keep reducing until single digit
  while (sum > 9) {
    sum = sum
      .toString()
      .split('')
      .reduce((a, b) => a + Number(b), 0);
  }

  return sum;
};


  const calculateDriverNumber = (dob: string): number => {
  const digits = dob.replace(/\D/g, '');
  if (digits.length >= 8) {
    const dayStr = digits.slice(-2); // last 2 digits = day
    let day = parseInt(dayStr, 10);
    if (isNaN(day)) day = 0;

    // Keep reducing until single digit
    while (day > 9) {
      day = day
        .toString()
        .split('')
        .reduce((a, b) => a + Number(b), 0);
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
    setContactUsGlow(false);

    const lifePathNumber = calculateLifePathNumber(formData.dateOfBirth);
    const driver = calculateDriverNumber(formData.dateOfBirth);
    const kuan = calculateKuanNumber(formData.dateOfBirth, formData.gender);
    const { letterValues, total } = calculateChaldeanChart(formData.name);
    const grid = generateLoshuGrid(formData.dateOfBirth, driver, lifePathNumber, kuan);


    setConductorNumber(lifePathNumber);
    setDriverNumber(driver);
    setKuanNumber(kuan);
    
    
    setLoshuGrid(grid);
    const names = formData.name.trim().split(/\s+/);
    const firstName = names[0] || '';
    const lastName = names.length > 1 ? names.slice(1).join(' ') : '';

    // Calculate Chaldean for first and last names separately
  const { letterValues: firstLetters, total: firstTotal } = calculateChaldeanChart(firstName);
  const { letterValues: lastLetters, total: lastTotal } = calculateChaldeanChart(lastName);
  setFirstNameData(firstLetters);
  setFirstNameTotal(firstTotal);
  setLastNameData(lastLetters);
  setLastNameTotal(lastTotal);
  setContactUsGlow(true);

    setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
   
  // Render each Loshu grid cell with count and highlight for Driver/Conductor/Kuan numbers
  const renderLoshuCell = (num: number) => {
    if (!loshuGrid) return '-';
    const count = loshuGrid[num] || 0;

    const isDriver = driverNumber === num;
    const isConductor = conductorNumber === num;
    const isKuan = kuanNumber === num;

    // pastel colors
    const driverColor = '#fff9c4';   // pastel yellow
    const conductorColor = '#bbdefb';// pastel blue
    const kuanColor = '#c8e6c9';     // pastel green

    let background = 'transparent';
    if (isDriver && isConductor && isKuan) {
      background = `linear-gradient(135deg, ${driverColor}, ${conductorColor}, ${kuanColor})`;
    } else if ((isDriver && isConductor) || (isDriver && isKuan) || (isConductor && isKuan)) {
      // two-color gradients (choose the two that matched)
      if (isDriver && isConductor) background = `linear-gradient(135deg, ${driverColor}, ${conductorColor})`;
      else if (isDriver && isKuan) background = `linear-gradient(135deg, ${driverColor}, ${kuanColor})`;
      else if (isConductor && isKuan) background = `linear-gradient(135deg, ${conductorColor}, ${kuanColor})`;
    } else if (isDriver) {
      background = driverColor;
    } else if (isConductor) {
      background = conductorColor;
    } else if (isKuan) {
      background = kuanColor;
    } else {
      background = 'white';
    }

    return (
      <div
        style={{
          position: 'relative',
          padding: '8px',
          minHeight: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          fontSize: '1.15rem',
          color: '#000',
          borderRadius: '8px',
          border: '1px solid rgba(0,0,0,0.08)',
          background,
          boxShadow: (isDriver || isConductor || isKuan) ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
          transition: 'transform 120ms ease, box-shadow 120ms ease'
        }}
        aria-label={`loshu-cell-${num}`}
        title={count <= 0 ? 'Missing' : `${count} occurrence${count > 1 ? 's' : ''}`}
      >
        {count <= 0 ? (
          <span style={{ color: '#999' }}>-</span>
        ) : (
          <>
            {Array.from({ length: count }, (_, i) => (
              <span key={i} style={{ margin: '0 4px' }}>{num}</span>
            ))}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <video autoPlay loop muted playsInline className="video-background">
        <source src="/numerology.mp4" type="video/mp4" />
      </video>

      <nav className="navbar navbar-gradient-bg">
        <div className="navbar-logo">
          <img src="/Logo.png" alt="Numerology Logo" className="logo-img" />
          <span
  className="brand-name"
  style={{
    fontSize: '0.9rem',
    fontStyle: 'italic',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontWeight: '600',   // semi-bold for style and clarity
    letterSpacing: '0.02em', // subtle spacing for better readability
  }}
>
  Happiness Ccreattions
</span>
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
            role="button"
            tabIndex={0}
            style={{ color: '#ffffff', cursor: 'pointer', padding: '0.5rem 1rem', userSelect: 'none', outline: 'none', }}
            onClick={handleVisitCountClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleVisitCountClick();
    }
  }}
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
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} disabled={isSubmitting} />
            </div>
            <div>
              <label>Phone:</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required disabled={isSubmitting} />
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
  <h3>🔮 Chaldean Numerology Chart - First Name</h3>
  {firstNameData.length === 0 ? (
    <p>No first name entered.</p>
  ) : (
    <table className="styled-table">
      <thead>
        <tr><th>Letter</th><th>Value</th></tr>
      </thead>
      <tbody>
        {firstNameData.map((lv, i) => (
          <tr key={i}>
            <td>{lv.letter}</td>
            <td>{lv.value}</td>
          </tr>
        ))}
        <tr className="total-row">
          <td><strong>Total</strong></td>
          <td><strong>{firstNameTotal}</strong></td>
        </tr>
      </tbody>
    </table>
  )}

  <h3>🔮 Chaldean Numerology Chart - Last Name</h3>
  {lastNameData.length === 0 ? (
    <p>No last name entered.</p>
  ) : (
    <table className="styled-table">
      <thead>
        <tr><th>Letter</th><th>Value</th></tr>
      </thead>
      <tbody>
        {lastNameData.map((lv, i) => (
          <tr key={i}>
            <td>{lv.letter}</td>
            <td>{lv.value}</td>
          </tr>
        ))}
        <tr className="total-row">
          <td><strong>Total</strong></td>
          <td><strong>{lastNameTotal}</strong></td>
        </tr>
      </tbody>
    </table>
  )}
</div>


          {loshuGrid && (
            <div className="result-card">
              <h3>🧮 Loshu Grid</h3>
              <div className="loshu-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
                maxWidth: '420px',
                margin: '0 auto'
              }}>
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
              To get your thorough numerological analysis {' '}
              <Link to="/contact" style={{ textDecoration: 'underline', color: '#ff4500', fontWeight: '900' }}>
                Get an appointment now!
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
