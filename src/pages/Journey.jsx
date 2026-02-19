import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Info, CalendarClock, Globe, ShieldCheck, Sparkles, ArrowRight, Rocket } from 'lucide-react';

const Journey = () => {
  return (
    <div className="min-h-screen bg-[#001900] text-white pt-28 pb-20 px-6 font-sans relative overflow-hidden">
      
      {/* Background Glow - Green/Gold mix */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto text-center space-y-4 mb-16 relative z-10">
        <h2 className="text-emerald-400 font-bold tracking-widest uppercase text-sm animate-pulse-slow">Start Your Transformation</h2>
        <h1 className="text-5xl md:text-6xl font-bold">
            Take Charge of Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-emerald-500">Destiny</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          The universe has brought you here for a reason. It's time to align your vibrations and unlock your true potential.
        </p>
      </div>

      {/* --- NEW INTERACTIVE CALL TO ACTION (Replaced Pricing) --- */}
      <div className="max-w-5xl mx-auto mb-24 relative z-10">
        <div className="relative bg-[#07220d] border border-emerald-500/30 rounded-[2rem] p-8 md:p-16 text-center shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden group">
            
            {/* Animated Inner Glow */}
            <div className="absolute inset-0 bg-radial-gradient from-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-emerald-900/30 border border-emerald-500/50 rounded-full flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-bounce-slow">
                    <Rocket className="text-yellow-400" size={40} />
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                    Are you ready to change your life <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">TODAY?</span>
                </h2>
                
                <p className="text-gray-300 md:text-xl leading-relaxed max-w-3xl mb-10">
                    Stop waiting for the "right time". Whether you are feeling stuck in your career, facing relationship hurdles, or seeking clarity in life—the numbers hold the answers. 
                    <br/><br/>
                    A single consultation with <strong>Amit Gupta</strong> can provide the exact remedies and name corrections you need to turn your struggles into success.
                </p>

                <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all duration-300"
                >
                    Consult Now & Change Your Life <ArrowRight size={24} />
                </Link>
                
                <p className="mt-6 text-sm text-emerald-400 flex items-center gap-2">
                    <Sparkles size={16} /> Over 2300+ lives transformed
                </p>
            </div>
        </div>
      </div>

      {/* --- BOOKING INFORMATION SECTION --- */}
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#07220d] border border-emerald-900/30 p-8 md:p-12">
           
           {/* Decor Glow */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>

           <div className="flex flex-col md:flex-row gap-10 items-start">
             
             {/* Left: Heading & Icon */}
             <div className="md:w-1/3">
                 <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
                    <CalendarClock className="text-emerald-400" size={32} />
                 </div>
                 <h2 className="text-3xl font-bold mb-4">Booking Information</h2>
                 <p className="text-gray-400 leading-relaxed">
                   Please read the guidelines carefully before requesting a consultation. We value your time and commitment.
                 </p>
                 
                 {/* Info Box */}
                 <div className="mt-8 p-4 bg-emerald-900/20 rounded-xl border border-emerald-500/20 flex gap-3">
                    <Info className="text-emerald-400 shrink-0" size={20} />
                    <p className="text-xs text-emerald-200/80">
                      Sessions are confirmed only after mutual alignment and availability.
                    </p>
                 </div>
             </div>

             {/* Right: Points */}
             <div className="md:w-2/3 grid gap-6">
                 <BookingPoint 
                   icon={<ShieldCheck size={20} className="text-emerald-400" />}
                   title="Prior Booking Only"
                   desc="One-to-one personalized consultations are available by prior booking only. Limited slots available."
                 />
                 <BookingPoint 
                   icon={<Globe size={20} className="text-teal-400" />}
                   title="Online Consultations"
                   desc="All consultations will be conducted online for your convenience."
                 />
                 <BookingPoint 
                   icon={<Star size={20} className="text-yellow-400" />}
                   title="Dedicated Preparation"
                   desc="Since each session requires focus, charges vary based on the specific issue, location, and time commitment."
                 />
                 
                 <div className="mt-4 pt-6 border-t border-emerald-900/30">
                    <p className="text-gray-300 italic text-sm mb-4">
                      "If you are seeking serious numerological guidance and are willing to invest the necessary time and commitment, you may proceed with the booking request."
                    </p>
                    {/* LINK TO CONTACT PAGE */}
                    <Link to="/contact" className="inline-block px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-emerald-500/25 transition-all">
                       Proceed to Booking
                    </Link>
                 </div>
             </div>
           </div>
        </div>
      </div>

    </div>
  );
};

// Helper Component for Booking Points
const BookingPoint = ({ icon, title, desc }) => (
  <div className="flex gap-4">
     <div className="w-10 h-10 rounded-full bg-[#001900] flex items-center justify-center shrink-0 border border-emerald-900/30">
       {icon}
     </div>
     <div>
        <h4 className="font-bold text-white mb-1">{title}</h4>
        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
     </div>
  </div>
);

export default Journey;
