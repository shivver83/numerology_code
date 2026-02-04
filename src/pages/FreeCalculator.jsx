import React, { useState } from 'react';
import { Calculator, Sparkles, RefreshCw } from 'lucide-react';

const FreeCalculator = () => {
  const [dob, setDob] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- GENERAL MEANINGS (Sample Data) ---
  const interpretations = {
    1: { title: "The Leader (Sun)", desc: "You are independent, ambitious, and a born leader. You have the drive to succeed and prefer to pave your own path rather than follow others." },
    2: { title: "The Peacemaker (Moon)", desc: "You are sensitive, diplomatic, and cooperative. You thrive in partnerships and have a natural ability to understand others' emotions." },
    3: { title: "The Creative (Jupiter)", desc: "You are expressive, artistic, and optimistic. You have a great sense of humor and inspire others with your communication skills." },
    4: { title: "The Hard Worker (Rahu)", desc: "You are practical, organized, and disciplined. You build solid foundations and are the person everyone relies on for stability." },
    5: { title: "The Adventurer (Mercury)", desc: "You love freedom, travel, and change. You are adaptable and curious, always looking for the next exciting experience." },
    6: { title: "The Nurturer (Venus)", desc: "You are responsible, caring, and family-oriented. You have a magnetic personality and love to create harmony in your surroundings." },
    7: { title: "The Seeker (Ketu)", desc: "You are analytical, spiritual, and introspective. You love to uncover deep truths and often enjoy your own company to think deeply." },
    8: { title: "The Powerhouse (Saturn)", desc: "You are ambitious, goal-oriented, and focused on material success. You have strong management skills and are built for big achievements." },
    9: { title: "The Humanitarian (Mars)", desc: "You are compassionate, generous, and selfless. You care about the bigger picture and want to make the world a better place." },
  };

  // --- CALCULATION LOGIC ---
  const calculateLifePath = (e) => {
    e.preventDefault();
    if (!dob) return;
    
    setLoading(true);

    // Thoda delay taaki "Calculating..." feel aaye
    setTimeout(() => {
      const digits = dob.replace(/-/g, '').split('').map(Number);
      let sum = digits.reduce((a, b) => a + b, 0);

      // Reduce to single digit (unless 11, 22, 33 - but for simple sample we do single)
      while (sum > 9) {
        const sumDigits = sum.toString().split('').map(Number);
        sum = sumDigits.reduce((a, b) => a + b, 0);
      }

      setResult(sum);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-purple-400 tracking-widest uppercase text-xs font-bold mb-2 block">Discover Yourself</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Free Life Path <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Calculator</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Enter your date of birth to reveal your core personality traits according to Numerology.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-[#1e293b]/30 border border-white/10 p-8 md:p-12 rounded-[2rem] backdrop-blur-md relative overflow-hidden">
          
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none"></div>

          {!result ? (
            <form onSubmit={calculateLifePath} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-gray-400 ml-1">Date of Birth</label>
                <input 
                  type="date" 
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-xl text-white focus:border-purple-500 outline-none transition-all placeholder-gray-600"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>Calculating... <RefreshCw className="animate-spin" /></>
                ) : (
                  <>Reveal My Number <Calculator /></>
                )}
              </button>
            </form>
          ) : (
            // RESULT VIEW
            <div className="text-center animate-fade-in-up relative z-10">
              <div className="inline-block p-4 rounded-full bg-white/5 border border-white/10 mb-6">
                <Sparkles className="text-yellow-400 w-8 h-8 animate-pulse" />
              </div>
              
              <h2 className="text-gray-400 uppercase tracking-widest font-bold text-sm mb-2">Your Life Path Number</h2>
              <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-6 drop-shadow-2xl">
                {result}
              </div>
              
              <h3 className="text-3xl font-bold text-purple-400 mb-4">{interpretations[result].title}</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
                {interpretations[result].desc}
              </p>

              <div className="flex flex-col gap-3">
                <button onClick={() => setResult(null)} className="text-gray-400 hover:text-white underline text-sm">
                  Check Another Date
                </button>
                <div className="p-4 bg-yellow-900/20 border border-yellow-500/20 rounded-xl mt-4">
                  <p className="text-yellow-200 text-sm">
                    <strong>Note:</strong> This is a general reading. For a detailed analysis of your name and destiny, book a personal consultation.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default FreeCalculator;
