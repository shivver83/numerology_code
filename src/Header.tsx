import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css'; // create this for styling your header/menu

interface HeaderProps {
  contactUsGlow?: boolean;
  onVisitCountClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ contactUsGlow, onVisitCountClick }) => {
  const location = useLocation();

  return (
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
        <li className={location.pathname === '/' ? 'active' : undefined}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === '/aboutus' ? 'active' : undefined}>
          <Link to="/aboutus">About Us</Link>
        </li>
        <li><a href="#">Get Your Journey</a></li>
        <li className={location.pathname === '/contact' ? (contactUsGlow ? 'contact-us-glow' : undefined) : undefined}>
          <Link to="/contact">Contact Us</Link>
        </li>
        <li
          style={{ fontWeight: 'bold', color: '#ffd700', cursor: 'pointer' }}
          onClick={onVisitCountClick}
        >
          Visit Count
        </li>
      </ul>
    </nav>
  );
};

export default Header;
