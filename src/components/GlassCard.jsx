import React from 'react';

const GlassCard = ({ children, className = "" }) => {
  return (
    <div className={`relative group`}>
      {/* Background Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
      
      {/* Main Card */}
      <div className={`relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default GlassCard;