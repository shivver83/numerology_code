import './App.css';
import { useState } from 'react';

// Chaldean mapping (unchanged)
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

// Generate Loshu grid counts (1..9) from any date string (handles yyyy-mm-dd or dd/mm/yyyy)
const generateLoshuGrid = (dob: string) => {
  if (!dob) return null;
  // extract only digits from input
  const digits = dob.replace(/\D/g, '').split('').map(Number).filter(n => n >= 1 && n <= 9);
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  digits.forEach(n => {
    if (counts[n] !== undefined) counts[n] += 1;
  });
  return counts;
};

function App() {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
    phone: ''
  });

  const [driverNumber, setDriverNumber] = useState<number | null>(null);
  const [conductorNumber, setConductorNumber] = useState<number | null>(null);
  const [chaldeanData, setChaldeanData] = useState<{ letter: string; value: number }[]>([]);
  const [nameTotal, setNameTotal] = useState<number | null>(null);
  const [loshuGrid, setLoshuGrid] = useState<Record<number, number> | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    // Support dd/mm/yyyy or yyyy-mm-dd by extracting digits and focusing on the day part
    // If input is from <input type="date"> it will be 'yyyy-mm-dd', so day is last two digits
    const digits = dob.replace(/\D/g, '');
    if (digits.length >= 8) {
      // try to detect format; if it was yyyy-mm-dd -> digits = YYYYMMDD, day = last two
      const dayStr = digits.slice(-2);
      let day = parseInt(dayStr, 10);
      if (isNaN(day)) day = 0;
      if ([11, 22, 33].includes(day)) return day;
      let sum = day;
      while (sum > 9) {
        sum = sum.toString().split('').reduce((a, b) => a + Number(b), 0);
      }
      return sum;
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
          phone: formData.phone
        })
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage(`✅ Thank you, ${formData.name}! Your information has been submitted.`);
        // NOTE: if you want to keep results visible after clearing the form, you may want to NOT clear here.
        setFormData({ name: '', dateOfBirth: '', email: '', phone: '' });
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

  // helper to render the Loshu cell: show repeated digits if present, else '-'
  const renderLoshuCell = (num: number) => {
    if (!loshuGrid) return '-';
    const count = loshuGrid[num] || 0;
    if (count <= 0) return <span style={{ color: '#999' }}>-</span>;
    // show repeated digit with small spacing
    const items = Array.from({ length: count }, (_, i) => (
      <span key={i} style={{ margin: '0 3px', fontWeight: 600 }}>{num}</span>
    ));
    return <div style={{ display: 'inline-block' }}>{items}</div>;
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

      {/* HERO IMAGE */}
      <header className="App-header">
        <h1>🔢 Discover Your Numerology</h1>
        <img src="/numerology.png" alt="What Numbers Speak..." className="guide-image-full" />
      </header>

      {/* FORM SECTION */}
      <section className="user-form-section">
        <div className="form-container">
          <h2>Get Your Personal Numerology Reading</h2>
          <p>Enter your details below to receive a personalized numerology analysis</p>

          <form onSubmit={handleSubmit} className="user-form">
            <div className="form-group">
              <label htmlFor="name">Full Name:</label>
              <input type="text" id="name" name="name" value={formData.name}
                onChange={handleInputChange} placeholder="Enter your full name"
                required disabled={isSubmitting} />
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth:</label>
              <input type="date" id="dateOfBirth" name="dateOfBirth"
                value={formData.dateOfBirth} onChange={handleInputChange}
                required disabled={isSubmitting} />
              <small style={{ color: '#666' }}>If testing with manual text, formats like dd/mm/yyyy or yyyy-mm-dd both work.</small>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email (optional):</label>
              <input type="email" id="email" name="email"
                value={formData.email} onChange={handleInputChange}
                disabled={isSubmitting} />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone (optional):</label>
              <input type="tel" id="phone" name="phone"
                value={formData.phone} onChange={handleInputChange}
                disabled={isSubmitting} />
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Get My Reading'}
            </button>

            {submitMessage && (
              <div className={`submit-message ${submitMessage.includes('❌') ? 'error' : 'success'}`}>
                {submitMessage}
              </div>
            )}
          </form>

          {/* NUMEROLOGY RESULTS */}
          {driverNumber !== null && conductorNumber !== null && (
            <div className="numerology-result">
              <h3>Your Numerology Numbers</h3>
              <p><strong>🔢 Driver Number:</strong> {driverNumber}</p>
              <p><strong>🛤️ Conductor (Life Path) Number:</strong> {conductorNumber}</p>

              {/* CHALDEAN CHART */}
              <h3>Chaldean Numerology Chart for "{formData.name}"</h3>
              <table border={1} cellPadding={5} style={{ margin: '10px auto', borderCollapse: 'collapse' }}>
                <thead>
                  <tr><th>Letter</th><th>Value</th></tr>
                </thead>
                <tbody>
                  {chaldeanData.map((lv, index) => (
                    <tr key={index}>
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

              {/* LOSHU GRID */}
              {loshuGrid && (
                <>
                  <h3>🧮 Loshu Grid</h3>
                  <table border={1} cellPadding={10} style={{ margin: '10px auto', borderCollapse: 'collapse', textAlign: 'center' }}>
                    <tbody>
                      <tr>
                        <td style={{ minWidth: 60 }}>{renderLoshuCell(4)}</td>
                        <td style={{ minWidth: 60 }}>{renderLoshuCell(9)}</td>
                        <td style={{ minWidth: 60 }}>{renderLoshuCell(2)}</td>
                      </tr>
                      <tr>
                        <td style={{ minWidth: 60 }}>{renderLoshuCell(3)}</td>
                        <td style={{ minWidth: 60 }}>{renderLoshuCell(5)}</td>
                        <td style={{ minWidth: 60 }}>{renderLoshuCell(7)}</td>
                      </tr>
                      <tr>
                        <td style={{ minWidth: 60 }}>{renderLoshuCell(8)}</td>
                        <td style={{ minWidth: 60 }}>{renderLoshuCell(1)}</td>
                        <td style={{ minWidth: 60 }}>{renderLoshuCell(6)}</td>
                      </tr>
                    </tbody>
                  </table>

                  <p style={{ color: '#666', textAlign: 'center' }}>
                    (Numbers repeated = presence, '-' = missing)
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
