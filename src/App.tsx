import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import ContactPage from './ContactPage';

function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitMessage('');

  if (!formData.name.trim() || !formData.dateOfBirth) {
    setSubmitMessage('Please fill in all fields');
    setIsSubmitting(false);
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      setSubmitMessage('Thank you! Your information has been submitted successfully.');
      setFormData({ name: '', dateOfBirth: '' });
    } else {
      setSubmitMessage(`Error: ${data.message}`);
    }
  } catch (error) {
    setSubmitMessage('There was an error submitting your information. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <>
      <header className="App-header">
        <h1>🔢 Discover Your Life Path Number</h1>
        <img
          src="/numerology.png"
          alt="What Numbers Speak ...."
          className="guide-image-full"
        />
      </header>

      {/* User Information Form */}
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

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Get My Reading'}
            </button>

            {submitMessage && (
              <div className={`submit-message ${submitMessage.includes('error') ? 'error' : 'success'}`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar full-width">
          <div className="logo">
            <img src="/Logo.png" alt="Numerology Logo" className="logo-img" />
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><a href="#about">About Happiness Creations</a></li>
            <li><a href="#consultation">Consultation</a></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        {/* Footer */}
        <footer className="footer">
          <a href="#rateus" className="rate-link">⭐ Rate Us</a>
        </footer>
      </div>
    </Router>
  );
}

export default App;
