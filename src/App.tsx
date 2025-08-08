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

function App() {
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

    const lifePathNumber = calculateLifePathNumber(formData.dateOfBirth);
    const driver = calculateDriverNumber(formData.dateOfBirth);
    const { letterValues, total } = calculateChaldeanChart(formData.name);
    const grid = generateLoshuGrid(formData.dateOfBirth);

    setConductorNumber(lifePathNumber);
    setDriverNumber(driver);
    setChaldeanData(letterValues);
    setNameTotal(total);
    setLoshuGrid(grid);

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
        setSubmitMessage(`❌ Error: ${result.message}`);
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
      {/* NAVIGATION HEADER */}
      <nav className="navbar">
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

      {/* HERO */}
      <header className="App-header">
        <h1>🔢 Discover Your Numerology</h1>
        <video className="guide-video-full" src="/numerology.mp4" autoPlay loop muted playsInline />
      </header>

      {/* FORM SECTION */}
      <section className="user-form-section">
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
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '✨ Calculating...' : 'Get My Reading'}
            </button>
          </form>
          {submitMessage && <div>{submitMessage}</div>}
        </div>
      </section>

      {/* RESULTS */}
      {driverNumber !== null && conductorNumber !== null && (
        <div className="numerology-result-container">
          <div className="result-card">
            <h3>🌟 Your Core Numbers</h3>
            <p>Driver Number: {driverNumber}</p>
            <p>Conductor Number: {conductorNumber}</p>
          </div>

          <div className="result-card">
            <h3>🔮 Chaldean Numerology Chart</h3>
            <table>
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
                <tr>
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
              <p>(Numbers repeated = presence, "-" = missing)</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
