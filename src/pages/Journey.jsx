import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, Zap, Crown, Info, CalendarClock, Globe, ShieldCheck } from 'lucide-react';

const Journey = () => {
  const plans = [
    {
      name: "Basic Reading",
      price: "₹5,666",
      icon: <Star className="text-emerald-400" size={32} />,
      desc: "Perfect for getting started with Numerology.",
      features: [
        "Name Analysis",
        "Basic Numerology Traits",
        "Lucky Numbers & Colors",
        "Email Report",
        "Child Name Analysis",
        "Foreign Travel & Settlement Feasibility",
        "Navigation for Next 3 Years",
        "Remedies as per Birth Chart",
        "Business Numerology Analysis"
      ],
      popular: false,
      // CHANGE 1: Updated gradient to Emerald/Green
      gradient: "from-emerald-500/10 to-green-500/10",
      border: "border-emerald-500/30",
      btnStyle: "bg-[#001900] hover:bg-[#092b1f] border border-emerald-900/30",
      checkColor: "text-emerald-400"
    },
    {
      name: "Complete Destiny",
      price: "₹14,567",
      icon: <Zap className="text-black" size={32} />, 
      desc: "Our most recommended comprehensive plan.",
      features: [
        "Everything in Basic Reading",
        "One-on-One Call (30-40 Mins)",
        "Detailed Personal Guidance",
        "In-depth Q&A Session",
        "Note: Subsequent Consultation @ ₹5,666 (15 Mins)"
      ],
      popular: true, 
      // CHANGE 2: Kept Gold but refined for dark green bg
      gradient: "from-yellow-400 to-orange-500",
      border: "border-yellow-500",
      btnStyle: "bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-lg hover:shadow-yellow-500/25 text-black font-bold",
      checkColor: "text-yellow-400"
    },
    {
      name: "Life Coaching",
      price: "₹32,000",
      icon: <Crown className="text-teal-400" size={32} />,
      desc: "Exclusive mentorship for long-term success.",
      features: [
        "Everything in Destiny Plan",
        "3 Months Assistance",
        "Advanced Business Numerology",
        "Personalized Advanced Remedies",
        "Ongoing Priority Support",
        "Strategic Life Planning"
      ],
      popular: false,
      // CHANGE 3: Updated gradient to Teal/Cyan
      gradient: "from-teal-500/10 to-cyan-500/10",
      border: "border-teal-500/30",
      btnStyle: "bg-[#001900] hover:bg-[#092b1f] border border-emerald-900/30",
      checkColor: "text-teal-400"
    }
  ];

  return (
    // CHANGE 4: Main Background to Ultra Dark Green (#001900)
    <div className="min-h-screen bg-[#001900] text-white pt-28 pb-20 px-6 font-sans relative overflow-hidden">
      
      {/* Background Glow - Updated to Green/Gold mix */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto text-center space-y-4 mb-16 relative z-10">
        <h2 className="text-emerald-400 font-bold tracking-widest uppercase text-sm animate-pulse-slow">Start Your Transformation</h2>
        <h1 className="text-5xl md:text-6xl font-bold">Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-emerald-500">Path</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Whether you need a quick answer or a complete life overhaul, we have a journey designed for you.
        </p>
      </div>

      {/* --- PRICING CARDS --- */}
      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-24 relative z-10">
        {plans.map((plan, index) => (
          // CHANGE 5: Card Backgrounds to #07220d
          <div key={index} className={`relative flex flex-col group p-8 rounded-3xl border backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${plan.popular ? 'bg-[#07220d] border-yellow-500/50 shadow-orange-900/20 scale-105 z-10' : 'bg-[#07220d]/60 border-emerald-900/30 hover:border-emerald-500/30'}`}>
            
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1 text-black">
                <Star size={12} fill="currentColor" /> Most Popular
              </div>
            )}

            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-6 shadow-lg`}>
              {plan.icon}
            </div>

            <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{plan.desc}</p>
            
            <div className="flex items-baseline gap-1 mb-8 border-b border-emerald-900/30 pb-6">
              <span className="text-4xl font-bold">{plan.price}</span>
              {index === 1 && <span className="text-sm text-gray-500">/ session</span>}
            </div>

            <ul className="space-y-4 mb-8 text-gray-300 text-sm flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full bg-[#001900] flex items-center justify-center shrink-0 ${plan.checkColor}`}>
                    <Check size={12} />
                  </div>
                  <span className="leading-tight">{feature}</span>
                </li>
              ))}
            </ul>

            {/* LINK TO CONTACT PAGE */}
            <Link to="/contact" className={`block text-center w-full py-4 rounded-xl font-bold transition-all ${plan.btnStyle}`}>
              Select Plan
            </Link>
          </div>
        ))}
      </div>

      {/* --- BOOKING INFORMATION SECTION --- */}
      <div className="max-w-5xl mx-auto relative z-10">
        {/* CHANGE 6: Booking Card Background */}
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
                 {/* CHANGE 7: Updated info box to Green/Emerald */}
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
                   desc="Since each session requires focus, charges vary based on location and time commitment."
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
     {/* CHANGE 8: Icon BG updated */}
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
