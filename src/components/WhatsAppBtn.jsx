import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppBtn = () => {
  return (
    <a
      href="https://wa.me/917428552116" // Amit Ji ka number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all hover:scale-110 hover:-translate-y-1 group flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={32} fill="white" className="text-white" />
      
      {/* Hover par Tooltip */}
      <span className="absolute right-full mr-4 bg-white text-black px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with Us
      </span>
    </a>
  );
};

export default WhatsAppBtn;
