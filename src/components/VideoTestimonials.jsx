import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const VideoTestimonials = () => {
  const scrollRef = useRef(null);
  
  // Ye state track karegi ki konsa video chal raha hai
  const [activeVideo, setActiveVideo] = useState(null);

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

  // Desktop ke liye manual scroll function
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-0 bg-[#001900] relative overflow-hidden">
      
      {/* HEADER */}
      <div className="text-center mb-8 md:mb-12">
        <h3 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-3">
          <span className="text-[#D4AF37]">▶</span> Video Testimonials
        </h3>
        <p className="text-emerald-400/80 mt-2 text-sm md:text-base font-medium">Hear directly from our successful clients</p>
      </div>

      {/* ================= DESKTOP VIEW (Manual Scroll with Arrows) ================= */}
      <div className="hidden md:block relative w-full max-w-[1400px] mx-auto px-16 group">
        
        <button 
          onClick={() => scroll('left')} 
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#001900]/80 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#001900] rounded-full flex items-center justify-center backdrop-blur-md border-2 border-[#D4AF37] transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronLeft size={28} strokeWidth={3} />
        </button>

        <div 
          ref={scrollRef} 
          className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory py-6 mask-edges"
        >
          {videoTestimonials.map((item, index) => {
            const uniqueId = `desk-${index}`;
            return (
              <div key={uniqueId} className="snap-center">
                <VideoCard 
                  item={item} 
                  isActive={activeVideo === uniqueId}
                  onPlay={() => setActiveVideo(uniqueId)}
                  onClose={() => setActiveVideo(null)}
                />
              </div>
            );
          })}
        </div>

        <button 
          onClick={() => scroll('right')} 
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#001900]/80 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#001900] rounded-full flex items-center justify-center backdrop-blur-md border-2 border-[#D4AF37] transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronRight size={28} strokeWidth={3} />
        </button>

      </div>

      {/* ================= MOBILE VIEW (Auto Marquee with Pause logic) ================= */}
      <div className="md:hidden block relative w-full overflow-hidden gradient-mask pt-4 pb-8">
        <div 
          className="flex gap-5 animate-marquee-slow w-max"
          // JS ke through animation pause ho jayegi jab bhi koi activeVideo hoga
          style={{ animationPlayState: activeVideo ? 'paused' : 'running' }}
        >
          {videoTestimonials.map((item, index) => {
            const uniqueId = `mob-1-${index}`;
            return (
              <VideoCard 
                key={uniqueId} 
                item={item} 
                isActive={activeVideo === uniqueId}
                onPlay={() => setActiveVideo(uniqueId)}
                onClose={() => setActiveVideo(null)}
              />
            );
          })}
          
          {videoTestimonials.map((item, index) => {
            const uniqueId = `mob-2-${index}`;
            return (
              <VideoCard 
                key={uniqueId} 
                item={item} 
                isActive={activeVideo === uniqueId}
                onPlay={() => setActiveVideo(uniqueId)}
                onClose={() => setActiveVideo(null)}
              />
            );
          })}
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .animate-marquee-slow {
          animation: marquee-mobile 50s linear infinite;
        }
        @keyframes marquee-mobile {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .gradient-mask {
          mask-image: linear-gradient(to right, transparent, #001900 10%, #001900 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, #001900 10%, #001900 90%, transparent);
        }
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);
        }
      `}</style>
    </section>
  );
};

// --- VIDEO CARD COMPONENT ---
const VideoCard = ({ item, isActive, onPlay, onClose }) => {
  const videoId = item.video.split('/').pop();
  const highResThumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const standardThumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const [imgSrc, setImgSrc] = useState(highResThumb);

  return (
    <div className="w-[200px] h-[350px] md:w-[240px] md:h-[420px] flex-shrink-0 relative rounded-xl overflow-hidden border-[3px] border-[#D4AF37] shadow-[0_5px_20px_rgba(212,175,55,0.15)] group hover:shadow-[0_8px_30px_rgba(212,175,55,0.3)] transition-all duration-300 bg-[#0a0a0a]">
      
      {!isActive ? (
        // STATE 1: THUMBNAIL VIEW
        <div 
          className="w-full h-full relative cursor-pointer"
          onClick={onPlay}
        >
          <img 
            src={imgSrc} 
            alt={item.name} 
            onError={() => setImgSrc(standardThumb)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.6)] group-hover:scale-110 transition-transform">
              <span className="text-[#D4AF37] ml-1 text-xl">▶</span>
            </div>
          </div>
        </div>
      ) : (
        // STATE 2: PLAYING VIEW
        <>
          {/* Close Button to stop video and resume scroll */}
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 z-50 w-8 h-8 bg-black/70 hover:bg-red-600 text-white rounded-full flex items-center justify-center border border-white/20 transition-colors shadow-lg"
          >
            ✕
          </button>
          
          <iframe
            width="100%"
            height="100%"
            src={`${item.video}?autoplay=1&rel=0`}
            title={item.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full object-cover absolute top-0 left-0"
          ></iframe>
        </>
      )}

      {/* OVERLAY (Srif tab dikhega jab video NAHI chal rahi ho) */}
      {!isActive && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 pt-12 pointer-events-none z-10 transition-opacity">
          <h4 className="text-white font-bold text-sm md:text-base text-center drop-shadow-md mb-2">
            {item.name}
          </h4>
          <div className="flex justify-center">
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#D4AF37] font-extrabold bg-[#D4AF37]/10 px-3 py-1 rounded-md border border-[#D4AF37]/40 backdrop-blur-md">
              Verified
            </span>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default VideoTestimonials;
