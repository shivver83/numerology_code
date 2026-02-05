import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Brain, PenTool, Briefcase, Heart, Baby, CalendarDays, ShieldCheck } from 'lucide-react'; 
// Make sure this path is correct based on your folder structure
import TestimonialScroll from '../components/TestimonialScroll';

const Home = () => {
  // --- BACKGROUND ANIMATION CONFIG (Gold Numbers) ---
  const numbersConfig = [
    { num: 7, left: '5%', size: '6rem', duration: '12s', delay: '0s' },
    { num: 3, left: '25%', size: '8rem', duration: '15s', delay: '2s' },
    { num: 9, left: '45%', size: '5rem', duration: '10s', delay: '4s' },
    { num: 1, left: '65%', size: '7rem', duration: '14s', delay: '1s' },
    { num: 5, left: '85%', size: '6rem', duration: '11s', delay: '3s' },
    { num: 8, left: '15%', size: '10rem', duration: '20s', delay: '5s' },
    { num: 6, left: '35%', size: '9rem', duration: '18s', delay: '7s' },
    { num: 2, left: '55%', size: '11rem', duration: '22s', delay: '6s' },
    { num: 4, left: '75%', size: '12rem', duration: '19s', delay: '8s' },
    { num: 3, left: '10%', size: '15rem', duration: '30s', delay: '1s' },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-0">
        
        {/* Background Animation */}
        <div className="absolute inset-0">
          {numbersConfig.map((item, index) => (
            <div
              key={index}
              className="absolute font-bold opacity-0 animate-float-gold pointer-events-none"
              style={{
                left: item.left,
                fontSize: item.size,
                animation: `floatUpGold ${item.duration} linear infinite`,
                animationDelay: item.delay,
                color: 'rgba(255, 215, 0, 0.4)', 
                textShadow: '0 0 25px rgba(255, 223, 0, 0.3)',
                bottom: '-20%'
              }}
            >
              {item.num}
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-left gap-2 px-6 py-2 bg-white/10 border border-white/20 rounded-full text-yellow-400 text-sm font-medium backdrop-blur-md mb-4 animate-fade-in-down">
            <Sparkles size={16} className="animate-pulse" />
            <span className="text-xs md:text-sm text-left">Professional Numerology</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold leading-tight tracking-tight animate-fade-in-up">
            Align Your Numbers. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-2xl">
              Transform Your Life.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up delay-100">
            Professional Numerology by Amit Gupta. Unlock your true potential through the ancient science of numbers.
          </p>

          <div className="pt-8 animate-fade-in-up delay-200">
            <Link to="/journey">
              <button className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(168,85,247,0.5)] flex items-center gap-3 mx-auto">
                Get Your Personal Reading <ArrowRight />
              </button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      </div>


      {/* --- INTRODUCTION SECTION --- */}
      <section className="py-24 px-6 bg-[#0a0f1e] relative overflow-hidden">
        <div className="absolute right-0 top-20 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[80px]"></div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group z-10">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-purple-600/20 rounded-3xl blur-xl opacity-50"></div>
            <div className="relative">
              <h2 className="text-4xl font-bold mb-6">Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Happiness Ccreattions</span></h2>
              <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                Are you struggling with career blockages, relationship issues, or financial instability? The answers often lie in the <span className="text-yellow-400">vibrations</span> of your name and birth date.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                Led by <strong>Amit Gupta</strong>, a renowned Numerologist in Ghaziabad, we align your life with success with Numerology.
              </p>
              
              <div className="mt-8 flex gap-4">
                <div className="flex flex-col">
                   <span className="text-3xl font-bold text-white">10+</span>
                   <span className="text-xs text-gray-500 uppercase tracking-widest">Years Exp.</span>
                </div>
                <div className="w-[1px] h-12 bg-white/10"></div>
                <div className="flex flex-col">
                   <span className="text-3xl font-bold text-white">2300+</span>
                   <span className="text-xs text-gray-500 uppercase tracking-widest">Lives Changed</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side: The Cosmic Wheel */}
          <div className="flex justify-center items-center relative h-[400px]">
             <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-yellow-500/10 rounded-full blur-[60px] animate-pulse"></div>
             <div className="absolute w-[350px] h-[350px] border border-white/5 rounded-full animate-spin-slow flex justify-center items-center">
                <div className="absolute top-0 w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_15px_purple]"></div>
                <div className="absolute bottom-0 w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_15px_purple]"></div>
             </div>
             <div className="absolute w-[280px] h-[280px] border border-dashed border-yellow-500/30 rounded-full animate-reverse-spin flex justify-center items-center">
                <div className="absolute left-0 w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_20px_gold]"></div>
             </div>
             <div className="absolute w-[200px] h-[200px] border border-white/10 rounded-full flex justify-center items-center bg-[#0f172a]/50 backdrop-blur-sm">
                <div className="absolute w-[140px] h-[140px] border border-purple-400/30 rotate-45 transform"></div>
                <div className="absolute w-[140px] h-[140px] border border-pink-400/30 rotate-12 transform"></div>
             </div>
             <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-[#1e293b] to-black rounded-full border border-white/20 flex items-center justify-center shadow-2xl shadow-purple-900/50">
                <Sparkles size={40} className="text-yellow-400 animate-pulse" />
             </div>
             {/* Floating Numbers */}
             <div className="absolute top-10 right-20 text-white/20 font-bold text-xl animate-float-slow">3</div>
             <div className="absolute bottom-20 left-10 text-white/20 font-bold text-2xl animate-float-slow" style={{animationDelay: '1s'}}>9</div>
             <div className="absolute top-1/2 right-0 text-white/20 font-bold text-xl animate-float-slow" style={{animationDelay: '2s'}}>6</div>
          </div>
        </div>
      </section>


      {/* --- WHY CHOOSE US --- */}
      <section className="py-24 px-6 bg-black relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Brain size={40} className="text-blue-400" />}
              title="Scientific Approach"
              desc="We use logical, time-tested numerology methods to analyze vibrations, avoiding blind superstition."
            />
            <FeatureCard 
              icon={<Sparkles size={40} className="text-yellow-400" />}
              title="Personalized Remedies"
              desc="No two charts are the same. Your solutions are custom-made based on your unique birth coordinates."
            />
            <FeatureCard 
              icon={<ShieldCheck size={40} className="text-green-400" />}
              title="Holistic Guidance"
              desc="From Vastu Shastra to Name Correction, we offer complete occult solutions under one roof."
            />
          </div>
        </div>
      </section>

      {/* --- SCROLLING TESTIMONIALS --- */}
      <TestimonialScroll />

      {/* --- SERVICES OVERVIEW (CREATIVE) --- */}
      <section className="py-24 px-6 bg-[#050b14] relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-purple-400 tracking-widest uppercase text-xs font-bold mb-4 backdrop-blur-md">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
              Services We Offer
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <ServiceCard 
              number="01"
              icon={<CalendarDays size={32} />}
              title="Child Birth Planning"
              desc="The date of birth plays an important role in shaping a child’s life path. Through numerology, we study the expected delivery period and suggest favorable date ranges that align well with family numbers."
              color="text-yellow-400"
              gradient="from-yellow-500/20 to-orange-500/5"
              border="group-hover:border-yellow-500/50"
            />

            <ServiceCard 
              number="02"
              icon={<Baby size={32} />}
              title="New Born Numerology"
              desc="The first gift you give your child is their name. Ensure it resonates perfectly with their birth chart (Kundli). A harmonized name establishes a strong foundation for health and success."
              color="text-cyan-400"
              gradient="from-cyan-500/20 to-blue-500/5"
              border="group-hover:border-cyan-500/50"
            />

            <ServiceCard 
              number="03"
              icon={<PenTool size={32} />}
              title="Name Correction"
              desc="Is your spelling hindering your growth? We scientifically analyze and adjust your name's vibration to remove blockages and attract career opportunities without changing documents."
              color="text-pink-400"
              gradient="from-pink-500/20 to-purple-500/5"
              border="group-hover:border-pink-500/50"
            />

            <ServiceCard 
              number="04"
              icon={<Briefcase size={32} />}
              title="Business Numerology"
              desc="Your business name defines its market energy. We help you choose a lucky brand name, logo colors, and auspicious launch dates to ensure maximum profitability."
              color="text-blue-400"
              gradient="from-blue-500/20 to-indigo-500/5"
              border="group-hover:border-blue-500/50"
            />

            <ServiceCard 
              number="05"
              icon={<Heart size={32} />}
              title="Relationship Match"
              desc="Go beyond traditional matching. We analyze the vibration compatibility between partners' numbers to assess emotional, mental, and financial harmony."
              color="text-red-400"
              gradient="from-red-500/20 to-rose-500/5"
              border="group-hover:border-red-500/50"
            />

          </div>
        </div>
      </section>

      {/* Internal Styles */}
      <style>{`
        @keyframes floatUpGold {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-reverse-spin { animation: reverse-spin 15s linear infinite; }
      `}</style>
    </div>
  );
};

// --- Reusable Components ---

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-[#1e293b]/40 border border-white/10 p-8 rounded-2xl hover:bg-white/5 transition-all hover:-translate-y-2 group">
    <div className="mb-6 p-4 bg-white/5 rounded-xl inline-block group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

// --- UPDATED SERVICE CARD (Top Right Gold Number) ---
const ServiceCard = ({ number, icon, title, desc, color, gradient, border }) => (
  <div className={`group relative h-full p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent transition-all duration-500 hover:-translate-y-2`}>
    
    {/* Inner Card Content */}
    <div className={`relative h-full bg-[#0a0f1e] rounded-xl p-8 overflow-hidden border border-white/5 ${border} transition-colors duration-500 flex flex-col`}>
      
      {/* 1. Background Gradient Blob */}
      <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${gradient} rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

      {/* 2. NUMBER (Updated: Top Right, Smaller, Golden) */}
      <div className="absolute top-4 right-6 text-6xl font-serif font-bold text-yellow-500/10 group-hover:text-yellow-400/20 select-none z-0 transition-all duration-500">
        {number}
      </div>

      {/* 3. Header: Icon + Title */}
      <div className="relative z-10 flex items-center gap-4 mb-4">
        {/* Icon */}
        <div className={`flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 ${color} shadow-[0_0_15px_rgba(0,0,0,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
          {icon}
        </div>
        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
          {title}
        </h3>
      </div>

      {/* 4. Description */}
      <div className="relative z-10 flex-grow">
        <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
            {desc}
        </p>
      </div>

      {/* 5. Bottom Line Animation */}
      <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${gradient.replace('/20','')} transition-all duration-700 group-hover:w-full`}></div>
    </div>
  </div>
);

export default Home;
