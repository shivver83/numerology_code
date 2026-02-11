import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialScroll = () => {
  // --- DATA: 5 Clients with Images ---
  const testimonials = [
    {
      name: "Rohan Verma",
      location: "Delhi",
      text: "Business was stuck for 2 years. Amit ji suggested a small name correction and a lucky launch date. Sales doubled in 3 months!",
      role: "Business Owner",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Sneha Kapoor",
      location: "Noida",
      text: "My marriage was facing a lot of misunderstandings. The vibration matching and remedies brought peace back to our home.",
      role: "Software Engineer",
      img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Vikram Singh",
      location: "Ghaziabad",
      text: "I didn't believe in numbers until I met Amit Sir. His prediction about my job change was 100% accurate. Highly recommended.",
      role: "Marketing Head",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Anjali Mehta",
      location: "Mumbai",
      text: "We were facing health issues in our new flat. The Vastu corrections without demolition worked like magic. Feeling positive now.",
      role: "Architect",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Rahul Sharma",
      location: "Bangalore",
      text: "The Life Path guidance gave me clarity on which career to choose. I am finally happy with my profession.",
      role: "Data Analyst",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    // UPDATED: Background changed to Ultra Dark Green (#001900) + Top Border
    <section className="py-24 px-0 bg-[#001900] relative overflow-hidden border-t border-emerald-900/30">
      
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        {/* UPDATED: Subheading Color */}
        <span className="text-yellow-400 tracking-widest uppercase text-sm font-semibold">Success Stories</span>
        <h2 className="text-4xl font-bold mt-2 text-white">What Our Clients Say</h2>
      </div>

      {/* --- MARQUEE CONTAINER --- */}
      <div className="relative w-full overflow-hidden gradient-mask">
        
        {/* Track that moves */}
        <div className="flex gap-8 animate-marquee w-max hover:pause">
          
          {/* Original List */}
          {testimonials.map((item, index) => (
            <TestimonialCard key={index} item={item} />
          ))}

          {/* Duplicate List (Seamless Loop ke liye) */}
          {testimonials.map((item, index) => (
            <TestimonialCard key={`dup-${index}`} item={item} />
          ))}

        </div>
      </div>

      {/* CSS for Animation */}
      <style>{`
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        /* Fade edges - Updated mask to match new background */
        .gradient-mask {
          mask-image: linear-gradient(to right, transparent, #001900 10%, #001900 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, #001900 10%, #001900 90%, transparent);
        }
      `}</style>
    </section>
  );
};

// --- Single Card Component ---
const TestimonialCard = ({ item }) => (
  // UPDATED: Card BG to Dark Green Tint (#07220d) & Border
  <div className="w-[350px] md:w-[400px] flex-shrink-0 bg-[#07220d] border border-emerald-900/30 p-8 rounded-3xl relative backdrop-blur-sm group hover:bg-[#092b1f] transition-colors">
    
    {/* UPDATED: Quote Icon Color to Emerald Tint */}
    <Quote className="absolute top-6 right-6 text-emerald-900/40 w-16 h-16 group-hover:text-emerald-500/10 transition-colors" />

    {/* Header: Image & Name */}
    <div className="flex items-center gap-4 mb-6">
      {/* UPDATED: Image Border Gradient to Green/Emerald */}
      <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-br from-green-500 to-emerald-400">
        <img 
          src={item.img} 
          alt={item.name} 
          className="w-full h-full rounded-full object-cover border-2 border-[#001900]"
        />
      </div>
      <div>
        <h4 className="font-bold text-white text-lg">{item.name}</h4>
        <p className="text-xs text-gray-400 uppercase tracking-wide">{item.role}, {item.location}</p>
      </div>
    </div>

    {/* Stars */}
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>

    {/* Text */}
    <p className="text-gray-300 leading-relaxed italic text-sm">
      "{item.text}"
    </p>
  </div>
);

export default TestimonialScroll;
