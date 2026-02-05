import React, { useState } from 'react';
import { 
  Calculator, Sparkles, RefreshCw, 
  User, Mail, Phone, Calendar, Users, Grid3X3 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- HELPER LOGIC ---
const chaldeanMap = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
};

const reduceToSingleDigit = (num) => {
  while (num > 9) {
    num = num.toString().split("").reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return num;
};

const generateLoshuGrid = (dob, driverNum, conductorNum, kuanNum) => {
  if (!dob) return null;
  const digits = dob.replace(/\D/g, '').split('').map(Number).filter(n => n >= 1 && n <= 9);
  [driverNum, conductorNum, kuanNum].forEach(num => {
    if (num && num >= 1 && num <= 9) digits.push(num);
  });
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  digits.forEach(n => { counts[n] += 1; });
  return counts;
};

const calculateKuanNumber = (dob, gender) => {
  if (!dob || !gender) return null;
  const year = new Date(dob).getFullYear();
  let sum = year.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
  while (sum > 9) {
    sum = sum.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  let kuanNum;
  if (gender.toLowerCase() === "male" || gender.toLowerCase() === "boy") {
    kuanNum = 11 - sum;
  } else {
    kuanNum = sum + 4;
  }
  while (kuanNum > 9) {
    kuanNum = kuanNum.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return kuanNum;
};

const FreeCalculator = () => {
  // --- STATE MANAGEMENT ---
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    gender: ''
  });

  // Results State
  const [results, setResults] = useState(null); 
  const [loading, setLoading] = useState(false);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateLifePathNumber = (dob) => {
    const digits = dob.replace(/\D/g, '').split('').map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);
    while (sum > 9) sum = sum.toString().split('').reduce((a, b) => a + Number(b), 0);
    return sum;
  };

  const calculateDriverNumber = (dob) => {
    const digits = dob.replace(/\D/g, '');
    if (digits.length >= 8) {
      const dayStr = digits.slice(-2);
      let day = parseInt(dayStr, 10);
      if (isNaN(day)) day = 0;
      while (day > 9) day = day.toString().split('').reduce((a, b) => a + Number(b), 0);
      return day;
    }
    return 0;
  };

  const calculateChaldeanChart = (name) => {
    const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
    const letterValues = cleanName.split('').map(letter => ({
      letter, value: chaldeanMap[letter] || 0
    }));
    const total = reduceToSingleDigit(letterValues.reduce((sum, lv) => sum + lv.value, 0));
    return { letterValues, total };
  };

  const getAnalysis = (driverNum, conductorNum) => {
    const analysis = [];
    if (driverNum === conductorNum) analysis.push("Your Driver and Conductor numbers are the same, showing strong internal alignment.");
    else analysis.push("Your Driver and Conductor numbers differ, indicating dynamic energies at play.");
    
    if (driverNum % 2 === 0) analysis.push("An even Driver number suggests balance and harmony in your approach.");
    else analysis.push("An odd Driver number shows a passionate and assertive nature.");
    
    if (conductorNum > 5) analysis.push("A high Conductor number reflects strong influence over your surroundings.");
    else analysis.push("A lower Conductor number indicates thoughtful introspection.");
    
    return analysis;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dateOfBirth) return;

    setLoading(true);

    // Simulate Calculation Delay for effect
    setTimeout(async () => {
      const lifePathNumber = calculateLifePathNumber(formData.dateOfBirth);
      const driver = calculateDriverNumber(formData.dateOfBirth);
      const kuan = calculateKuanNumber(formData.dateOfBirth, formData.gender);
      const grid = generateLoshuGrid(formData.dateOfBirth, driver, lifePathNumber, kuan);

      const names = formData.name.trim().split(/\s+/);
      const firstName = names[0] || '';
      const lastName = names.length > 1 ? names.slice(1).join(' ') : '';

      const firstNameChart = calculateChaldeanChart(firstName);
      const lastNameChart = calculateChaldeanChart(lastName);

      // Save Data to API (Optional)
      try {
        await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            date_of_birth: formData.dateOfBirth,
            life_path_number: lifePathNumber,
            email: formData.email,
            phone: formData.phone,
            gender: formData.gender
          })
        });
      } catch (err) {
        console.error("API Submission failed", err);
      }

      setResults({
        driver,
        conductor: lifePathNumber,
        kuan,
        loshuGrid: grid,
        firstNameChart,
        lastNameChart,
        analysis: getAnalysis(driver, lifePathNumber)
      });
      
      setLoading(false);
    }, 1500);
  };

  // Render Loshu Cell with Theme Colors
  const renderLoshuCell = (num) => {
    if (!results || !results.loshuGrid) return null;
    const count = results.loshuGrid[num] || 0;
    
    // Check if this number is a core number
    const isDriver = results.driver === num;
    const isConductor = results.conductor === num;
    const isKuan = results.kuan === num;

    // Theme Colors for Highlights
    let bgClass = 'bg-white/5 border-white/10 text-gray-400'; // Default empty
    if (count > 0) bgClass = 'bg-white/10 border-white/20 text-white font-bold'; // Present
    
    // Highlight logic
    if (count > 0) {
        if (isDriver) bgClass = 'bg-yellow-500/20 border-yellow-500 text-yellow-400 font-bold shadow-[0_0_10px_rgba(234,179,8,0.3)]';
        else if (isConductor) bgClass = 'bg-purple-500/20 border-purple-500 text-purple-400 font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)]';
        else if (isKuan) bgClass = 'bg-green-500/20 border-green-500 text-green-400 font-bold shadow-[0_0_10px_rgba(34,197,94,0.3)]';
    }

    return (
      <div className={`h-16 flex items-center justify-center rounded-xl border text-xl transition-all ${bgClass}`}>
        {count > 0 ? Array(count).fill(num).join('') : '-'}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pt-10 pb-20 px-6">
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-purple-400 tracking-widest uppercase text-xs font-bold mb-2 block">Discover Your Destiny</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Free Numerology <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Calculator</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Unlock the hidden meaning behind your name and birth date.
          </p>
        </div>

        <div className="bg-[#1e293b]/30 border border-white/10 p-8 md:p-12 rounded-[2rem] backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none"></div>

          {!results ? (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              
              {/* Name & Gender Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-400 ml-1">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 pl-12 text-white focus:border-purple-500 outline-none transition-all" placeholder="Amit Gupta" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-400 ml-1">Gender</label>
                    <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <select name="gender" value={formData.gender} onChange={handleInputChange} required className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 pl-12 text-white focus:border-purple-500 outline-none appearance-none cursor-pointer">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
              </div>

              {/* DOB */}
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-gray-400 ml-1">Date of Birth</label>
                <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 pl-12 text-white focus:border-purple-500 outline-none transition-all text-gray-300" />
                </div>
              </div>

              {/* Contact Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-400 ml-1">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 pl-12 text-white focus:border-purple-500 outline-none transition-all" placeholder="you@example.com" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-400 ml-1">Phone</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 pl-12 text-white focus:border-purple-500 outline-none transition-all" placeholder="9876543210" />
                    </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center justify-center gap-3 mt-4"
              >
                {loading ? (
                  <>Calculating... <RefreshCw className="animate-spin" /></>
                ) : (
                  <>Reveal My Readings <Calculator /></>
                )}
              </button>
            </form>
          ) : (
            // --- RESULT VIEW ---
            <div className="animate-fade-in-up relative z-10 space-y-10">
              
              {/* 1. Core Numbers Section */}
              <div className="text-center">
                  <div className="inline-block p-3 rounded-full bg-white/5 border border-white/10 mb-4">
                    <Sparkles className="text-yellow-400 w-6 h-6 animate-pulse" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-6">Your Cosmic Blueprint</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Driver */}
                      <div className="bg-black/40 border border-yellow-500/30 p-6 rounded-2xl flex flex-col items-center">
                          <span className="text-gray-400 text-xs uppercase tracking-widest mb-2">Driver (Birth)</span>
                          <span className="text-6xl font-bold text-yellow-400 drop-shadow-lg">{results.driver}</span>
                      </div>
                      {/* Conductor */}
                      <div className="bg-black/40 border border-purple-500/30 p-6 rounded-2xl flex flex-col items-center">
                          <span className="text-gray-400 text-xs uppercase tracking-widest mb-2">Conductor (Destiny)</span>
                          <span className="text-6xl font-bold text-purple-400 drop-shadow-lg">{results.conductor}</span>
                      </div>
                      {/* Kuan */}
                      <div className="bg-black/40 border border-green-500/30 p-6 rounded-2xl flex flex-col items-center">
                          <span className="text-gray-400 text-xs uppercase tracking-widest mb-2">Kuan Number</span>
                          <span className="text-6xl font-bold text-green-400 drop-shadow-lg">{results.kuan}</span>
                      </div>
                  </div>
                  
                  {/* Analysis Text */}
                  <div className="mt-6 bg-white/5 border border-white/10 p-6 rounded-2xl text-left">
                      <h3 className="text-lg font-bold text-white mb-2">Analysis</h3>
                      {results.analysis.map((line, idx) => (
                          <p key={idx} className="text-gray-300 text-sm mb-2 last:mb-0">✨ {line}</p>
                      ))}
                  </div>
              </div>

              {/* 2. Loshu Grid Section */}
              <div>
                  <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                          <Grid3X3 className="text-blue-400" size={20}/> Loshu Grid
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">Highlighted numbers match your Core Numbers</p>
                  </div>
                  <div className="max-w-xs mx-auto grid grid-cols-3 gap-3 p-4 bg-black/40 border border-white/10 rounded-2xl">
                      {renderLoshuCell(4)} {renderLoshuCell(9)} {renderLoshuCell(2)}
                      {renderLoshuCell(3)} {renderLoshuCell(5)} {renderLoshuCell(7)}
                      {renderLoshuCell(8)} {renderLoshuCell(1)} {renderLoshuCell(6)}
                  </div>
              </div>

              {/* 3. Chaldean Name Chart Section */}
              <div className="grid md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">First Name Vibration</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                          {results.firstNameChart.letterValues.map((item, idx) => (
                              <div key={idx} className="flex flex-col items-center bg-white/5 p-2 rounded-lg min-w-[2.5rem]">
                                  <span className="text-xs text-gray-400">{item.letter}</span>
                                  <span className="font-bold text-yellow-400">{item.value}</span>
                              </div>
                          ))}
                      </div>
                      <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl">
                          <span className="text-sm font-medium">Total Vibration</span>
                          <span className="text-2xl font-bold text-white">{results.firstNameChart.total}</span>
                      </div>
                  </div>

                  {/* Last Name */}
                  <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Last Name Vibration</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                          {results.lastNameChart.letterValues.map((item, idx) => (
                              <div key={idx} className="flex flex-col items-center bg-white/5 p-2 rounded-lg min-w-[2.5rem]">
                                  <span className="text-xs text-gray-400">{item.letter}</span>
                                  <span className="font-bold text-blue-400">{item.value}</span>
                              </div>
                          ))}
                      </div>
                      <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl">
                          <span className="text-sm font-medium">Total Vibration</span>
                          <span className="text-2xl font-bold text-white">{results.lastNameChart.total}</span>
                      </div>
                  </div>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col gap-4 text-center pt-6 border-t border-white/10">
                <div className="p-4 bg-yellow-900/20 border border-yellow-500/20 rounded-xl">
                  <p className="text-yellow-200 text-sm">
                    <strong>Note:</strong> This is a preliminary digital calculation. For a deep, personalized reading connecting these numbers to your life events, consult Amit Gupta.
                  </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button onClick={() => setResults(null)} className="text-gray-400 hover:text-white underline text-sm">
                        Calculate for someone else
                    </button>
                    <Link to="/contact" className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-white transition-colors">
                        Book Consultation
                    </Link>
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
