import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight, MessageCircle, ScanLine, Eye } from 'lucide-react';

const Footer = () => {
  // --- HIT COUNTER LOGIC START ---
  const [views, setViews] = useState(0);
  
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzir-aXNnbI_t-iK950WTOdQm7ddUei29u7tTxR6V2a4N1QNgHS58FX0dsHnJ7vSNw_6Q/exec"; 

  useEffect(() => {
    fetch(GOOGLE_SCRIPT_URL)
      .then((res) => res.json())
      .then((data) => {
        setViews(data.count);
      })
      .catch((err) => {
        console.error("Counter Error:", err);
        setViews(1350); 
      });
  }, []);
  // --- HIT COUNTER LOGIC END ---

  return (
    // UPDATED: Background changed to Deep Green + Top Border
    <footer className="bg-[#022c22] border-t border-white/10 pt-20 pb-10 font-sans relative overflow-hidden">
      
      {/* UPDATED: Background Glow to Green */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-green-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3"> 
              <img 
                src="/images/logo.png"  
                alt="Happiness Ccreattions Logo"  
                className="w-14 h-14 object-contain rounded-lg hover:scale-105 transition-transform"  
              />
              <span className="text-2xl font-bold text-white italic">Happiness Ccreattions</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transforming Lives Through Numerology. Unlock your true potential with Amit Gupta's expert guidance.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Youtube size={20} />} href="https://www.youtube.com/@happinessccreattions9" color="hover:bg-red-600" />
              <SocialIcon icon={<Instagram size={20} />} href="https://www.instagram.com/happinessccreattions/" color="hover:bg-pink-600" />
              <SocialIcon icon={<Facebook size={20} />} href="https://www.facebook.com/9amitgupta" color="hover:bg-blue-600" />
              <SocialIcon icon={<MessageCircle size={20} />} href="https://whatsapp.com/channel/0029VbBwGqG6LwHtOqjVnu3h" color="hover:bg-green-600" />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <FooterLink to="/" text="Home" />
              <FooterLink to="/about" text="About Amit Gupta" />
              <FooterLink to="/services" text="Our Services" />
              <FooterLink to="/journey" text="Journey" />
              <FooterLink to="/contact" text="Contact Us" />
            </ul>
          </div>

          {/* Column 3: Contact Info & QR Code */}
          <div>
            <h3 className="text-white font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                {/* UPDATED: Icon Color to Green/Emerald */}
                <MapPin size={18} className="text-emerald-400 shrink-0 mt-1" />
                <span>1022, Siddhi Block, Mahagunpuram, NH 24, Ghaziabad 201002</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={18} className="text-emerald-400 shrink-0" />
                <span>+91-7428552116</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={18} className="text-emerald-400 shrink-0" />
                <span>9amitgupta99@gmail.com</span>
              </li>
            </ul>

            {/* QR CODE WIDGET */}
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-3 rounded-xl max-w-[250px] hover:bg-white/10 transition-colors group">
                <div className="bg-white p-1 rounded-lg shrink-0">
                    <img 
                        src="/images/qr-code.jpg" 
                        alt="Scan QR" 
                        className="w-14 h-14 object-contain"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-white font-bold text-sm flex items-center gap-2">
                        Scan Now <ScanLine size={14} className="text-yellow-400"/>
                    </span>
                    <span className="text--[10px] text-gray-400 mb-1">For Digital Profile</span>
                    {/* UPDATED: Badge color to Green/Emerald */}
                    <span className="text-[10px] bg-emerald-600/20 text-emerald-300 px-2 py-0.5 rounded-full w-fit border border-emerald-500/30">
                        TapOnn
                    </span>
                </div>
            </div>

          </div>

          {/* Column 4: Newsletter & HIT COUNTER */}
          <div>
            <h3 className="text-white font-bold mb-6">Weekly Wisdom</h3>
            <p className="text-gray-400 text-sm mb-4">Get lucky numbers and tips directly in your inbox.</p>
            
            <div className="relative mb-6">
              <input 
                type="email" 
                placeholder="Your email address" 
                // UPDATED: Focus border to Green
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:border-emerald-500 outline-none transition-all"
              />
              {/* UPDATED: Button to Green */}
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors">
                <ArrowRight size={16} className="text-white" />
              </button>
            </div>

            {/* HIT COUNTER */}
            <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500 shrink-0">
                    <Eye size={20} />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Total Visitors</span>
                    <span className="text-white font-mono font-bold text-xl leading-none">
                        {views > 0 ? views.toLocaleString() : '...'}
                    </span>
                </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Happiness Ccreattions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

// Helper Components
const SocialIcon = ({ icon, href, color }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all hover:text-white hover:-translate-y-1 ${color}`}
  >
    {icon}
  </a>
);

const FooterLink = ({ to, text }) => (
  <li>
    {/* UPDATED: Hover text color and dot color to Emerald/Green */}
    <Link to={to} className="text-gray-400 text-sm hover:text-emerald-400 transition-colors flex items-center gap-2 group">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
      {text}
    </Link>
  </li>
);

export default Footer;
