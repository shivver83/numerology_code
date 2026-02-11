import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Youtube, Instagram, Facebook, MessageCircle, ChevronRight, Calculator } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Journey', path: '/journey' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* --- DESKTOP NAVBAR --- */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          // UPDATED: Changed bg-black/80 to Green tint bg-[#022c22]/90
          scrolled ? 'bg-[#022c22]/90 backdrop-blur-md py-3 border-b border-white/10' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* --- LOGO UPDATE START (Desktop) --- */}
          <Link to="/" className="flex items-center gap-3 group">
              <img 
                 src="/images/logo.png" 
                 alt="Happiness Ccreattions" 
                 className="w-12 h-12 object-contain rounded-lg hover:scale-105 transition-transform"
              />
              <span className="text-xl font-bold text-white tracking-wide">
                Happiness <span className="text-yellow-400">Ccreattions</span>
              </span>
          </Link>
          {/* --- LOGO UPDATE END --- */}

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium tracking-widest uppercase hover:text-yellow-400 transition-colors relative group ${
                  location.pathname === link.path ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`}></span>
              </Link>
            ))}
            
            {/* Desktop Calculator Link */}
            <Link 
                to="/calculator" 
                // UPDATED: Changed text-purple-400 to text-green-400
                className="text-sm font-medium tracking-widest uppercase text-green-400 hover:text-white transition-colors flex items-center gap-1"
            >
                <Calculator size={16} /> Free Calc
            </Link>

                
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50 relative"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={28} className="text-yellow-400" />
          </button>
        </div>
      </nav>


      {/* --- MOBILE MENU OVERLAY & FLOATING DRAWER --- */}
      
      {/* 1. Backdrop (Click to close) */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-500 md:hidden ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* 2. Floating Menu Drawer (Left Side) */}
      {/* UPDATED: Changed bg-[#0f172a] to bg-[#022c22] (Dark Green) */}
      <div 
        className={`fixed top-6 bottom-6 left-6 z-[70] w-[85%] max-w-[320px] bg-[#022c22]/95 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden transition-transform duration-500 md:hidden ${
            isOpen ? 'translate-x-0' : '-translate-x-[150%]'
        }`}
      >
        {/* Decorative Internal Glow - UPDATED Colors */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/20 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-500/10 rounded-full blur-[60px] pointer-events-none"></div>

        {/* Menu Header (Inside Drawer) */}
        <div className="p-6 flex justify-between items-center border-b border-white/5 relative z-10">
             {/* --- LOGO UPDATE START (Mobile Drawer) --- */}
             <div className="flex items-center gap-3">
                <img 
                    src="/images/logo.png" 
                    alt="Logo" 
                    className="w-10 h-10 object-contain rounded-lg"
                />
                <span className="font-bold text-white text-lg">Menu</span>
             </div>
             {/* --- LOGO UPDATE END --- */}

             <button 
                onClick={() => setIsOpen(false)}
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
             >
                <X size={20} />
             </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
            
            {/* Navigation Links */}
            <div className="space-y-2">
                {navLinks.map((link, index) => (
                    <Link 
                        key={link.name}
                        to={link.path}
                        className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                            location.pathname === link.path 
                            ? 'bg-white/10 text-yellow-400 border border-yellow-500/30' 
                            : 'hover:bg-white/5 text-gray-300 hover:text-white border border-transparent'
                        }`}
                    >
                        <span className="font-medium text-lg tracking-wide">{link.name}</span>
                        <ChevronRight size={18} className={`transition-transform ${location.pathname === link.path ? 'translate-x-1' : ''}`} />
                    </Link>
                ))}
            </div>

            {/* ACTION BUTTONS (Highlighted Boxes) */}
            <div className="space-y-4 pt-4 border-t border-white/10">
                
                {/* 1. Free Calculator - UPDATED: Changed Purple to Green Styles */}
                <Link to="/calculator" className="flex items-center gap-3 p-4 bg-green-900/20 border border-green-500/30 rounded-2xl group hover:bg-green-900/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                        <Calculator size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-white">Free Calculator</h4>
                        <p className="text-xs text-gray-400">Check your lucky numbers</p>
                    </div>
                </Link>

                

            </div>
        </div>

        {/* Social Footer */}
        <div className="p-6 border-t border-white/5 bg-black/20 flex justify-between items-center relative z-10">
             <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Follow Us</span>
             <div className="flex gap-3">
                <MobileSocialIcon href="https://wa.me/917428552116" icon={<MessageCircle size={18} />} color="text-green-400" />
                <MobileSocialIcon href="https://www.facebook.com/9amitgupta/" icon={<Facebook size={18} />} color="text-blue-400" />
                <MobileSocialIcon href="https://www.instagram.com/happinessccreattions/" icon={<Instagram size={18} />} color="text-pink-400" />
                <MobileSocialIcon href="https://www.youtube.com/@happinessccreattions9" icon={<Youtube size={18} />} color="text-red-400" />
             </div>
        </div>

      </div>
    </>
  );
};

// Helper Component for Social Icons
const MobileSocialIcon = ({ href, icon, color }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`p-2 bg-white/5 rounded-full border border-white/5 ${color} hover:bg-white/10 hover:scale-110 transition-all`}
    >
        {icon}
    </a>
);

export default Navbar;
