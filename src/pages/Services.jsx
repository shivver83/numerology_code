import React from 'react';
import { Link } from 'react-router-dom';
import { PenTool, Briefcase, Heart, Sparkles, ArrowUpRight, Baby, Calendar, CheckCircle2, Crown } from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: "01",
      title: "Name Correction",
      subtitle: "Identity & Vibration",
      icon: <PenTool size={32} className="text-white" />,
      intro: "Your name is your most powerful mantra. A wrongly spelled name can create unnecessary struggles, health issues, and career blockages. We scientifically analyze your current name's vibration against your date of birth.",
      points: [
        "Balancing frequencies by adding or removing specific letters.",
        "Ensuring your name attracts opportunities, fame, and stability.",
        "Unlocking your hidden potential without changing official docs."
      ],
      color: "group-hover:shadow-pink-500/50 group-hover:border-pink-500/50",
      bgGradient: "from-pink-500/20 to-purple-500/20",
      iconBg: "bg-pink-500",
      bulletColor: "text-pink-400"
    },
    {
      id: "02",
      title: "Business Numerology",
      subtitle: "Brand & Profit",
      icon: <Briefcase size={32} className="text-white" />,
      intro: "A business name defines its market energy and financial potential. We calculate the numerological value of your brand to ensure it aligns with your industry and personal chart.",
      points: [
        "Choosing lucky launch dates and auspicious logo colors.",
        "Structuring business foundation for maximum profitability.",
        "Ensuring strong brand recall and rapid growth in the market."
      ],
      color: "group-hover:shadow-blue-500/50 group-hover:border-blue-500/50",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      iconBg: "bg-blue-500",
      bulletColor: "text-blue-400"
    },
    {
      id: "03",
      title: "Relationship Match",
      subtitle: "Love & Harmony",
      icon: <Heart size={32} className="text-white" />,
      intro: "Chemistry is emotional, but long-term compatibility is mathematical. We move beyond traditional matching to analyze the vibration between partners' Psychic and Destiny numbers.",
      points: [
        "Assessing emotional triggers and communication styles.",
        "Predicting and preventing potential conflicts beforehand.",
        "Providing remedies to harmonize the relationship for a lasting bond."
      ],
      color: "group-hover:shadow-red-500/50 group-hover:border-red-500/50",
      bgGradient: "from-red-500/20 to-rose-500/20",
      iconBg: "bg-red-500",
      bulletColor: "text-red-400"
    },
    {
      id: "04",
      title: "New Born Numerology",
      subtitle: "Foundation of Luck",
      icon: <Baby size={32} className="text-white" />,
      intro: "The first and most lasting gift you give your child is their name. A harmonized name establishes a strong foundation for their health, education, and future success.",
      points: [
        "Analyzing the baby's birth chart (Kundli) for the perfect name.",
        "Vibrating positively with their Life Path number.",
        "Attracting good fortune and confidence from the very beginning."
      ],
      color: "group-hover:shadow-yellow-500/50 group-hover:border-yellow-500/50",
      bgGradient: "from-yellow-500/20 to-orange-500/20",
      iconBg: "bg-yellow-500",
      bulletColor: "text-yellow-400"
    },
    {
      id: "05",
      title: "Child Birth Planning",
      subtitle: "Birth Date Prediction",
      icon: <Calendar size={32} className="text-white" />,
      intro: "Every birth date carries a unique vibration that influences a child’s personality and life direction. We provide guidance through a careful analysis of charts around the expected delivery date.",
      points: [
        "Identifying supportive and harmonious date ranges.",
        "Avoiding conflicting number combinations for a balanced life.",
        "Ideal for planned deliveries (C-section/Induction)."
      ],
      color: "group-hover:shadow-indigo-500/50 group-hover:border-indigo-500/50",
      bgGradient: "from-indigo-500/20 to-violet-500/20",
      iconBg: "bg-indigo-500",
      bulletColor: "text-indigo-400"
    },
    {
      id: "06",
      title: "One-to-One Consultation",
      subtitle: "Premium & Personalized",
      icon: <Crown size={32} className="text-white" />,
      intro: "Designed for individuals seeking exclusive, in-depth, and highly personalized guidance. Each session involves detailed analysis and focused attention on your unique numerological profile.",
      points: [
        "Limited availability to maintain high accuracy and quality.",
        "Time-intensive sessions tailored for clarity and depth.",
        "Charges determined by client location and session duration."
      ],
      color: "group-hover:shadow-emerald-500/50 group-hover:border-emerald-500/50",
      bgGradient: "from-emerald-500/20 to-teal-500/20",
      iconBg: "bg-emerald-500",
      bulletColor: "text-emerald-400"
    }
  ];

  return (
    // CHANGE 1: Main Background set to Ultra Dark Green (#001900)
    <div className="min-h-screen bg-[#001900] text-white font-sans pt-32 pb-20 px-6 relative overflow-hidden">
      
      {/* Background Ambience - Updated to Green/Emerald tones */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-green-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="animate-fade-in-down">
            <div className="flex items-center gap-2 mb-4">
              {/* CHANGE 2: Header accent colors to Emerald */}
              <span className="h-px w-8 bg-emerald-500"></span>
              <span className="text-emerald-400 uppercase tracking-widest text-xs font-bold">Our Expertise</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Crafting <br />

              {/* CHANGE 3: Main Gradient to Gold/Green */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-green-400 to-emerald-500 drop-shadow-lg">
                Your Destiny.
              </span>
            </h1>
          </div>
          <p className="text-gray-400 max-w-sm text-lg leading-relaxed text-right md:text-left animate-fade-in-up">
            From the moment of birth to building an empire, we align your vibrations with the universe.
          </p>
        </div>

        {/* --- BENTO GRID CARDS --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              // CHANGE 4: Card Base Background (#07220d) and Border
              className={`group relative p-8 rounded-[2rem] border border-emerald-900/30 bg-[#07220d] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-white/20 ${service.color} flex flex-col h-full`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl`}></div>

              {/* Giant Number */}
              <div className="absolute top-0 right-6 text-[8rem] md:text-[10rem] font-bold text-white/5 leading-none select-none group-hover:text-white/10 transition-colors duration-500">
                {service.id}
              </div>

              <div className="relative z-10 flex flex-col flex-grow">
                {/* Icon Box */}
                <div className={`w-14 h-14 ${service.iconBg} rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500 shrink-0`}>
                  {service.icon}
                </div>

                <div className="space-y-4 flex-grow">
                  {/* Title & Subtitle (Tag Line) */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 group-hover:text-white/80 transition-colors block mb-1">
                      {service.subtitle}
                    </span>
                    <h3 className="text-2xl font-bold group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  
                  {/* Intro Paragraph */}
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {service.intro}
                  </p>

                  {/* Bullet Points */}
                  <ul className="space-y-2 mt-2">
                    {service.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                        <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${service.bulletColor}`} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA */}
                <Link to="/contact" className="mt-8 pt-6 border-t border-emerald-900/30 flex items-center justify-between group-hover:border-white/20 transition-colors shrink-0 cursor-pointer">
                  {/* CHANGE 5: CTA Text to Emerald/Green theme */}
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 group-hover:text-white transition-colors">Book Consultation</span>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* --- BOTTOM MAIN CTA --- */}
        <div className="mt-24 flex justify-center">
            <Link to="/journey" className="group relative px-10 py-5 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105">
                {/* CHANGE 6: Hover gradient to Green/Emerald */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <span className="relative z-10 flex items-center gap-2">
                    Start Your Journey <Sparkles size={20} />
                </span>
            </Link>
        </div>

      </div>
    </div>
  );
};

export default Services;
