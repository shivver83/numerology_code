import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialScroll = () => {

  // --- EXISTING TESTIMONIALS (UNCHANGED) ---
  const testimonials = [
    {
      name: "Rohan Verma",
      location: "Delhi",
      text: "Business was stuck for 2 years. Amit ji suggested a small name correction and a lucky launch date. Sales doubled in 3 months!",
      role: "Business Owner",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Sneha Kapoor",
      location: "Noida",
      text: "My marriage was facing a lot of misunderstandings. The vibration matching and remedies brought peace back to our home.",
      role: "Software Engineer",
      img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Vikram Singh",
      location: "Ghaziabad",
      text: "I didn't believe in numbers until I met Amit Sir. His prediction about my job change was 100% accurate. Highly recommended.",
      role: "Marketing Head",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Anjali Mehta",
      location: "Mumbai",
      text: "We were facing health issues in our new flat. The Vastu corrections without demolition worked like magic. Feeling positive now.",
      role: "Architect",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Rahul Sharma",
      location: "Bangalore",
      text: "The Life Path guidance gave me clarity on which career to choose. I am finally happy with my profession.",
      role: "Data Analyst",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    }
  ];

  // --- NEW VIDEO TESTIMONIALS ---
  const videoTestimonials = [
    { name: "Suman K Thakur", video: "https://www.youtube.com/embed/KJZZH_uTUmk" },
    { name: "Manoj Kumar", video: "https://www.youtube.com/embed/kpmCemfuutw" },
    { name: "Pannkaj D Gautam", video: "https://www.youtube.com/embed/0sORefzxvp8" },
    { name: "Shivanchal D Vermma", video: "https://www.youtube.com/embed/trJc2qwUIMg" },
    { name: "Diinesh Kumar Verma", video: "https://www.youtube.com/embed/RccvBU5eaBY" },
    { name: "Ashi Gupta", video: "https://www.youtube.com/embed/dEvJNgkWzQM" },
    { name: "Hradesh S Yadav", video: "https://www.youtube.com/embed/hwjE1q-apkY" },
    { name: "Dr Pinnky Sharrma", video: "https://www.youtube.com/embed/SSIY8F1bN6s" }
  ];

  return (
    <section className="py-24 px-0 bg-[#001900] relative overflow-hidden border-t border-emerald-900/30">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <span className="text-yellow-400 tracking-widest uppercase text-sm font-semibold">
          Success Stories
        </span>
        <h2 className="text-4xl font-bold mt-2 text-white">
          What Our Clients Say
        </h2>
      </div>

      {/* TEXT TESTIMONIAL MARQUEE */}
      <div className="relative w-full overflow-hidden gradient-mask mb-24">
        <div className="flex gap-8 animate-marquee w-max hover:pause">
          {testimonials.map((item, index) => (
            <TestimonialCard key={index} item={item} />
          ))}
          {testimonials.map((item, index) => (
            <TestimonialCard key={`dup-${index}`} item={item} />
          ))}
        </div>
      </div>

      {/* 🔥 VIDEO TESTIMONIALS SECTION */}
      <div className="mt-10">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
            <span className="text-red-500">▶</span> Video Testimonials
          </h3>
        </div>

        <div className="relative w-full overflow-hidden gradient-mask">
          <div className="flex gap-8 animate-marquee w-max hover:pause items-center">
            {videoTestimonials.map((item, index) => (
              <VideoCard key={index} item={item} />
            ))}
            {videoTestimonials.map((item, index) => (
              <VideoCard key={`dup-video-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* CSS */}
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
        .gradient-mask {
          mask-image: linear-gradient(to right, transparent, #001900 10%, #001900 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, #001900 10%, #001900 90%, transparent);
        }
      `}</style>

    </section>
  );
};

// --- EXISTING TEXT CARD (UNCHANGED) ---
const TestimonialCard = ({ item }) => (
  <div className="w-[350px] md:w-[400px] flex-shrink-0 bg-[#07220d] border border-emerald-900/30 p-8 rounded-2xl relative backdrop-blur-sm group hover:bg-[#092b1f] transition-colors">
    <Quote className="absolute top-6 right-6 text-emerald-900/40 w-16 h-16 group-hover:text-emerald-500/10 transition-colors" />

    <div className="flex items-center gap-4 mb-6">
      <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-br from-green-500 to-emerald-400">
        <img src={item.img} alt={item.name} className="w-full h-full rounded-full object-cover border-2 border-[#001900]" />
      </div>
      <div>
        <h4 className="font-bold text-white text-lg">{item.name}</h4>
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          {item.role}, {item.location}
        </p>
      </div>
    </div>

    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>

    <p className="text-gray-300 italic text-sm">
      "{item.text}"
    </p>
  </div>
);

// --- 🔥 NEW UNIQUE VERTICAL VIDEO CARD ---
const VideoCard = ({ item }) => (
  <div className="w-[260px] md:w-[280px] flex-shrink-0 relative rounded-[2rem] overflow-hidden border border-emerald-800/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] hover:border-emerald-500/60 transition-all duration-300 bg-black">
    
    {/* 9:16 Vertical Aspect Ratio Wrapper */}
    <div className="relative w-full aspect-[9/16]">
      <iframe
        width="100%"
        height="100%"
        src={item.video}
        title={item.name}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full object-cover"
      ></iframe>
    </div>

    {/* Gradient Overlay for Name (Bottom) */}
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#001900] via-[#001900]/80 to-transparent p-5 pt-16 pointer-events-none">
      <h4 className="text-white font-bold text-lg text-center drop-shadow-md mb-1">
        {item.name}
      </h4>
      <div className="flex justify-center">
        <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold bg-emerald-900/50 px-3 py-1 rounded-full border border-emerald-500/30 backdrop-blur-md">
          Verified Client
        </span>
      </div>
    </div>
  </div>
);

export default TestimonialScroll;
