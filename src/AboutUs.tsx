import React from 'react';
import './AboutUs.css'; // We'll add some styling here for background

const AboutUs: React.FC = () => {
  return (
    <div className="aboutus-container">
      <video autoPlay muted loop className="background-video">
        <source src="/numerology.mp4" type="video/mp4" />
        </video>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/Logo.png" alt="Numerology Logo" className="logo-img" />
          <span className="brand-name">Happiness Ccreattions</span>
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
      <div className="aboutus-content">
        <h1>About Us</h1>
        <p>
          Myself Amit Gupta, a passionate and trained numerologist and life coach dedicated to helping you unlock the hidden power of numbers in your life. Numerology is much more than just numbers — it is an ancient science that reveals the unique vibrations influencing your personality, relationships, career, and destiny.
        </p>
        <p>
          Through personalized numerology readings, I guide you to understand your core strengths, challenges, and life’s purpose. By decoding your birth numbers and name vibrations, I provide insightful guidance to help you overcome obstacles, make confident decisions, and align your actions with your true path.
        </p>
        <p>
          My approach combines traditional numerology wisdom with practical life coaching techniques, empowering you to transform challenges into opportunities and create lasting positive change. Whether you seek clarity in love, career, health, or personal growth, numerology offers a powerful tool for self-awareness and healing.
        </p>
        <p>
          Join me on this transformative journey, and let numbers light the way to a more fulfilling, balanced, and successful life.
        </p>
        <p>
          Together, we will decode your destiny and unleash your fullest potential.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
