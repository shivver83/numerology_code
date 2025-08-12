import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';  // Import your existing header component
import "./ContactPage.css";

const emailIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#EA4335" // Google red color
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: '8px', verticalAlign: 'middle' }}
  >
    <path d="M4 4h16v16H4z" fill="#fff" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const phoneIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    fill="#34A853" // Google green
    viewBox="0 0 16 16"
    style={{ marginRight: '8px', verticalAlign: 'middle' }}
  >
    <path d="M3.654 1.328a.678.678 0 0 1 .97-.212l2.317 1.634c.329.232.445.66.274 1.02l-1.05 2.1a.678.678 0 0 1-.58.38l-1.664.08c-.71.034-1.35.35-1.803.868C1.207 8.11.56 11.27 2.107 13.223a12.623 12.623 0 0 0 3.96 3.26c.55.28 1.197.12 1.56-.446l.651-.935a.678.678 0 0 1 .569-.31l1.637.045c.363.01.68-.215.769-.555l.679-2.08a.678.678 0 0 1 .34-.436l2.116-1.5a.678.678 0 0 1 .897.107l1.782 2.015a.678.678 0 0 1-.033.987l-1.453 1.325a1.745 1.745 0 0 1-1.913.307c-1.464-.7-3.196-2.39-5.151-4.346-1.956-1.956-3.646-3.687-4.346-5.15a1.745 1.745 0 0 1 .307-1.914l1.324-1.452a.678.678 0 0 1 .987-.033l2.015 1.782a.678.678 0 0 1 .108.897l-1.5 2.115a.678.678 0 0 1-.436.34l-2.08.68a.678.678 0 0 1-.555-.77l.045-1.637a.678.678 0 0 1 .38-.58l2.1-1.05c.36-.171.788-.055 1.02.274l1.633 2.317a.678.678 0 0 1-.212.97l-2.456 1.837a.678.678 0 0 1-.755.03l-2.797-1.865a.678.678 0 0 1-.3-.374l-1.13-2.993a.678.678 0 0 1 .243-.756l2.456-1.838z"/>
  </svg>
);

const locationIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    fill="#4285F4" // Google blue
    viewBox="0 0 16 16"
    style={{ marginRight: '8px', verticalAlign: 'middle' }}
  >
    <path d="M8 0a5.53 5.53 0 0 0-5.5 5.5c0 3.28 5.5 10.5 5.5 10.5s5.5-7.22 5.5-10.5A5.53 5.53 0 0 0 8 0zm0 8a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
  </svg>
);

const instagramIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    fill="#C13584" // Instagram pink-purple
    viewBox="0 0 24 24"
    style={{ marginRight: '8px', verticalAlign: 'middle' }}
  >
    <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5Zm0 1.5h8.5A4.25 4.25 0 0 1 20.5 7.75v8.5a4.25 4.25 0 0 1-4.25 4.25h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5Zm4.25 2.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 1.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm3.5-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"/>
  </svg>
);

function ContactPage() {
  return (
    <>
      {/* Insert the header component here */}
      <Header />

      <div className="contact-container">
        <video autoPlay muted loop playsInline className="video-bg">
          <source src="/numerology.mp4" type="video/mp4" />
        </video>

        <div className="contact-content">
          <h2>Contact Us</h2>

          <table className="contact-table">
            <tbody>
              <tr>
                <td className="icon-cell">{emailIcon}</td>
                <td>Email:</td>
                <td>
                  <a href="mailto:9amitgupta99@gmail.com">9amitgupta99@gmail.com</a>
                </td>
              </tr>
              <tr>
                <td className="icon-cell">{phoneIcon}</td>
                <td>Phone:</td>
                <td>
                  <a href="tel:+917428552116">+91-7428552116</a>
                </td>
              </tr>
              <tr>
                <td className="icon-cell">{locationIcon}</td>
                <td>Address:</td>
                <td>Sector 51, Noida</td>
              </tr>
              <tr>
                <td className="icon-cell">{instagramIcon}</td>
                <td>Instagram:</td>
                <td>
                  <a
                    href="https://instagram.com/happinessccreattions"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @happinessccreattions
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
