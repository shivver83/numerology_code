import React from 'react';
import { Quote, Star, Youtube, Instagram, Compass, Gem, Lightbulb, ScanLine } from 'lucide-react'; 

const About = () => {
  return (
    // CHANGE 1: Main Background to Ultra Dark Green (#001900)
    <div className="min-h-screen bg-[#001900] text-white font-sans overflow-x-hidden pt-24 pb-20">
      
      {/* --- BACKGROUND DECOR --- */}
      {/* CHANGE 2: Updated blobs to Green/Emerald tones */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-green-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- HERO SECTION: HEADLINE --- */}
        <div className="text-center mb-20 animate-fade-in-down">
          {/* CHANGE 3: Subheading color to Emerald */}
          <span className="text-emerald-400 tracking-[0.2em] uppercase text-sm font-semibold mb-2 block">The Face Behind the Brand</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-emerald-500">Expert</span>
          </h1>
          {/* CHANGE 4: Divider gradient */}
          <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full"></div>
        </div>

        {/* --- MAIN PROFILE SECTION --- */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-24">
          
          {/* LEFT: IMAGE & STATS */}
          <div className="relative group animate-fade-in-up">
            {/* Image Frame with Glow */}
            {/* CHANGE 5: Glow gradient to Green/Gold */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-green-600 to-yellow-500 rounded-[2rem] blur opacity-40 group-hover:opacity-60 transition duration-700"></div>
            
            {/* CHANGE 6: Image Container Background */}
            <div className="relative bg-[#07220d] rounded-[2rem] overflow-hidden border border-emerald-900/30 h-[600px]">
              {/* PLACEHOLDER IMAGE */}
              <img 
                src="images/amitgupta.jpg" 
                alt="Amit Gupta Numerologist" 
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0"
              />
              
              {/* Overlay Name Tag */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#001900] via-[#001900]/80 to-transparent p-8">
                <h2 className="text-3xl font-bold text-white">Amit Gupta</h2>
                <p className="text-emerald-300 font-medium">Numerologist</p>
                <p className="text-gray-400 text-sm mt-1">Ghaziabad, Uttar Pradesh</p>
              </div>
            </div>

            {/* Social Proof Badges */}
            {/* CHANGE 7: Badge Backgrounds */}
            <div className="absolute -right-6 top-10 bg-[#07220d] border border-emerald-900/30 p-4 rounded-xl shadow-xl flex items-center gap-3 backdrop-blur-md animate-float-slow">
               <div className="p-2 bg-red-600/20 rounded-full text-red-500"><Youtube size={24} /></div>
               <div>
                 <p className="font-bold text-white">YouTube</p>
                 <p className="text-xs text-gray-400">Trusted Voice</p>
               </div>
            </div>
            
            <div className="absolute -left-6 bottom-32 bg-[#07220d] border border-emerald-900/30 p-4 rounded-xl shadow-xl flex items-center gap-3 backdrop-blur-md animate-float-reverse">
               <div className="p-2 bg-pink-600/20 rounded-full text-pink-500"><Instagram size={24} /></div>
               <div>
                 <p className="font-bold text-white">Instagram</p>
                 <p className="text-xs text-gray-400">Community Leader</p>
               </div>
            </div>
          </div>

          {/* RIGHT: CONTENT & PHILOSOPHY */}
          <div className="space-y-8 animate-fade-in-up delay-200">
            
            {/* The Quote */}
            {/* CHANGE 8: Quote Box Background */}
            <div className="relative bg-[#07220d] border-l-4 border-yellow-400 p-8 rounded-r-2xl border-y border-r border-emerald-900/30">
              <Quote className="absolute top-4 left-4 text-emerald-900/20 transform -scale-x-100" size={60} />
              <p className="relative z-10 text-2xl font-light italic text-gray-200 leading-relaxed">
                "Numbers are not just symbols; they are the <span className="text-yellow-400 font-bold">language of the universe</span>."
              </p>
            </div>

            {/* The Bio Text */}
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Amit Gupta is a distinguished Numerologist based in <strong className="text-white">Ghaziabad, Uttar Pradesh</strong>. With a deep passion for occult sciences, Amit founded <strong className="text-emerald-400">Happiness Ccreattions</strong> with a single mission: to bring clarity, peace, and prosperity to people's lives.
              </p>
              <p>
                Unlike traditional astrologers who may focus solely on fear-based predictions, Amit believes in <strong className="text-white border-b-2 border-emerald-500/50">empowerment</strong>. His approach combines ancient wisdom with modern practicality.
              </p>
            </div>

            {/* Key Approach Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <ApproachCard 
                icon={<Lightbulb className="text-yellow-400" />} 
                title="Actionable Remedies"
                desc="Spelling adjustments & minimal lifestyle changes."
              />
              <ApproachCard 
                icon={<Compass className="text-emerald-400" />} 
                title="Harmony"
                desc="Finding balance in your home and workspace."
              />
              <ApproachCard 
                icon={<Gem className="text-teal-400" />} 
                title="Crystal Healing"
                desc="Recommendations for maximum positive results."
              />
            </div>
            
            {/* --- QR CODE SECTION --- */}
            {/* CHANGE 9: QR Section Background */}
            <div className="mt-8 relative overflow-hidden bg-gradient-to-r from-[#07220d] to-[#001900] border border-emerald-900/30 rounded-2xl p-6 flex items-center gap-6 shadow-[0_0_40px_rgba(16,185,129,0.1)] group hover:border-emerald-500/50 transition-all">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-[40px] pointer-events-none"></div>

                {/* QR Image Container */}
                <div className="relative shrink-0 bg-white p-2 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <img 
                        src="images/qr-code.jpg" 
                        alt="Scan to Connect" 
                        className="w-24 h-24 object-contain"
                    />
                </div>

                {/* Text Content */}
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <ScanLine size={18} className="text-emerald-400" />
                        <h4 className="text-xl font-bold text-white">Connect Instantly</h4>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">Scan with any app to access my digital profile and book a session.</p>
                    <span className="inline-block px-3 py-1 bg-[#001900] rounded-full text-[10px] font-bold tracking-widest uppercase text-yellow-400 border border-emerald-900/30">
                        TAPONN
                    </span>
                </div>
            </div>
            {/* --- END QR CODE SECTION --- */}

          </div>
        </div>


        {/* --- MISSION STATEMENT SECTION --- */}
        <div className="relative mt-32">
          {/* Decorative Lines */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
          
          {/* CHANGE 10: Mission Card Background */}
          <div className="relative max-w-4xl mx-auto bg-[#07220d] border border-emerald-900/30 rounded-[3rem] p-12 text-center shadow-[0_0_50px_rgba(16,185,129,0.1)]">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#001900] px-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <Star className="text-white fill-current" size={32} />
              </div>
            </div>
            
            <h3 className="text-emerald-400 font-bold tracking-widest uppercase mb-6 mt-4">Our Mission</h3>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-2">
              To demystify the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-emerald-400">science of Numerology</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-light mt-4">
              ...and make it an accessible tool for everyone to design a happier, more successful life.
            </p>
          </div>
        </div>

      </div>

      {/* Internal Style for float animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

// Reusable Small Card Component
const ApproachCard = ({ icon, title, desc }) => (
  // CHANGE 11: Small Card Background
  <div className="flex items-start gap-4 p-4 bg-[#07220d] border border-emerald-900/30 rounded-xl hover:bg-[#092b1f] transition-colors">
    <div className="mt-1">{icon}</div>
    <div>
      <h4 className="font-bold text-white text-sm">{title}</h4>
      <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default About;
