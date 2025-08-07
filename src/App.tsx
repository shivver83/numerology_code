import './App.css';
import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
    phone: ''
  });
const [driverNumber, setDriverNumber] = useState<number | null>(null);
const [conductorNumber, setConductorNumber] = useState<number | null>(null);

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
    const digits = dob.replace(/-/g, '').split('').map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((a, b) => a + Number(b), 0);
    }
    return sum;
  };
  
  const calculateDriverNumber = (dob: string): number => {
  const day = new Date(dob).getDate();
  if ([11, 22, 33].includes(day)) return day;
  let sum = day;
  while (sum > 9) {
    sum = sum.toString().split('').reduce((a, b) => a + Number(b), 0);
  }
  return sum;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const lifePathNumber = calculateLifePathNumber(formData.dateOfBirth);
    const driver = calculateDriverNumber(formData.dateOfBirth);

    setConductorNumber(lifePathNumber);
    setDriverNumber(driver);
    
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
        setSubmitMessage('✅ Thank you! Your information has been submitted.');
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
        <h1>🔢 Discover Your Life Path Number</h1>
        <img
          src="/numerology.png"
          alt="What Numbers Speak..."
          className="guide-image-full"
        />
      </header>

      {/* FORM SECTION */}
      <section className="user-form-section">
        <div className="form-container">
          <h2>Get Your Personal Numerology Reading</h2>
          <p>Enter your details below to receive a personalized numerology analysis</p>

          <form onSubmit={handleSubmit} className="user-form">
            <div className="form-group">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth:</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email (optional):</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone (optional):</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
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
        </div>
      </section>
    </div>
  );
}
{driverNumber !== null && conductorNumber !== null && (
  <div className="numerology-result">
    <h3>Your Numerology Numbers</h3>
    <p><strong>🔢 Driver Number:</strong> {driverNumber}</p>
    <p><strong>🛤️ Conductor (Life Path) Number:</strong> {conductorNumber}</p>
  </div>
)}

export default App;
