// src/ContactPage.tsx
import "./ContactPage.css";

function ContactPage() {
  return (
    <div className="contact-container">
      <video autoPlay muted loop className="video-bg">
        <source src="/numerology.mp4" type="video/mp4" />
      </video>

      <div className="contact-content">
        <h2>Contact Us</h2>
        <p>Email: <a href="mailto:nventer@gmail.com">nventer@gmail.com</a></p>
        <p>Phone: <a href="tel:+917428552116">+91-7428552116</a></p>
        <p>Address: Sector 51, Noida, near Metro station, Hoshiarpur</p>
      </div>
    </div>
  );
}

export default ContactPage;
