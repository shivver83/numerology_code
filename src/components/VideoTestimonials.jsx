import React from 'react';

const VideoTestimonials = () => {
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
    <section className="py-16 px-0 bg-[#001900] relative overflow-hidden">
      
      {/* HEADER */}
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
          <span className="text-red-500">▶</span> Video Testimonials
        </h3>
      </div>

      {/* VIDEO MARQUEE */}
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

export default VideoTestimonials;
