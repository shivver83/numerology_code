import React, { useState } from 'react';
import { 
  Calculator, Sparkles, RefreshCw, 
  User, Mail, Phone, Calendar, Users, Grid3X3 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- HELPER LOGIC (NO CHANGES HERE) ---
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
  // --- STATE MANAGEMENT (NO CHANGES) ---
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    gender: ''
  });

  const [results, setResults] = useState(null); 
  const [loading, setLoading] = useState(false);

  // --- GOOGLE SCRIPT URL (NO CHANGES) ---
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzir-aXNnbI_t-iK950WTOdQm7ddUei29u7tTxR6V2a4N1QNgHS58FX0dsHnJ7vSNw_6Q/exec";

  // --- HANDLERS (NO CHANGES) ---
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dateOfBirth) return;

    setLoading(true);

    // 1. Prepare Data for Google Sheet
    const dataToSend = new FormData();
    
    // Explicitly send to Sheet2
    dataToSend.append('sheetName', 'Sheet2'); 

    dataToSend.append('Name', formData.name);
    dataToSend.append('Gender', formData.gender);
    dataToSend.append('DOB', formData.dateOfBirth);
    dataToSend.append('Email', formData.email);
    dataToSend.append('Mobile_Number', formData.phone);
    dataToSend.append('Message', 'Calculated Free Numerology');

    // 2. Send Data to Google Sheet
    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: dataToSend,
        mode: "no-cors"
    })
    .then(() => {
        // Data save hone ke baad calculation perform karein
        performCalculation();
    })
    .catch((error) => {
        console.error("Error saving data:", error);
        // Agar error aaye tab bhi calculation dikha dein
        performCalculation();
    });
  };

  const performCalculation = () => {
    setTimeout(() => {
      const lifePathNumber = calculateLifePathNumber(formData.dateOfBirth);
      const driver = calculateDriverNumber(formData.dateOfBirth);
      const kuan = calculateKuanNumber(formData.dateOfBirth, formData.gender);
      const grid = generateLoshuGrid(formData.dateOfBirth, driver, lifePathNumber, kuan);

      const names = formData.name.trim().split(/\s+/);
      const firstName = names[0] || '';
      const lastName = names.length > 1 ? names.slice(1).join(' ') : '';

      const firstNameChart = calculateChaldeanChart(firstName);
      const lastNameChart = calculateChaldeanChart(lastName);

      // Combined Total
      const fullNameTotal = reduceToSingleDigit(firstNameChart.total + lastNameChart.total);

      setResults({
        driver,
        conductor: lifePathNumber,
        kuan,
        loshuGrid: grid,
        firstNameChart,
        lastNameChart,
        fullNameTotal,
        analysis: getAnalysis(driver, lifePathNumber)
      });
      
      setLoading(false);
    }, 1000);
  };

  // Render Loshu Cell with Theme Colors
  const renderLoshuCell = (num) => {
    if (!results || !results.loshuGrid) return null;
    const count = results.loshuGrid[num] || 0;
    
    // Check if this number is a core number
    const isDriver = results.driver === num;
    const isConductor = results.conductor === num;
    const isKuan = results.kuan === num;

    // Theme Colors for Highlights - UPDATED DEFAULT THEME
    // Changed default bg to blend with new dark blue theme
    let bgClass = 'bg-slate-800/50 border-slate-700/50 text-gray-400'; // Default empty
    if (count > 0) bgClass = 'bg-slate-700/80 border-slate-600/80 text-white font-bold'; // Present
    
    // Highlight logic - KEEPING THESE COLORS AS IS for distinction
    if (count > 0) {
        if (isDriver) bgClass = 'bg-yellow-500/20 border-yellow-500 text-yellow-400 font-bold shadow-[0_0_15px_rgba(234,179,8,0.4)]';
        else if (isConductor) bgClass = 'bg-purple-500/20 border-purple-500 text-purple-400 font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)]';
        else if (isKuan) bgClass = 'bg-green-500/20 border-green-500 text-green-400 font-bold shadow-[0_0_15px_rgba(34,197,94,0.4)]';
    }

    return (
      <div className={`h-16 flex items-center justify-center rounded-xl border text-xl transition-all ${bgClass}`}>
        {count > 0 ? Array(count).fill(num).join('') : '-'}
      </div>
    );
  };

  return (
    // CHANGE 1: Main Background changed from dark green to Deep Space Blue/Purple Gradient
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-black text-white font-sans pt-32 pb-20 px-6 overflow-hidden">
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          {/* CHANGE 2: Accent color changed from Emerald to Indigo/Purple */}
          <span className="text-indigo-400 tracking-widest uppercase text-xs font-bold mb-2 block animate-pulse">Discover Your Cosmic Destiny</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Free Numerology <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Calculator</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Unlock the hidden meaning behind your name and birth date using ancient wisdom.
          </p>
        </div>

        {/* CHANGE 3: Container Background changed to Dark Blue Glassmorphism with Indigo border */}
        <div className="bg-[#0B1120]/80 border border-indigo-500/20 p-8 md:p-12 rounded-[2rem] backdrop-blur-xl relative overflow-hidden shadow-2xl shadow-indigo-500/10">
          
          {/* CHANGE 4: Decorative Blobs (Glow effects) changed to purple/blue */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

          {!results ? (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              
              {/* Name & Gender Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-400 ml-1">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" size={20} />
                        {/* CHANGE 5: Input Fields styled with dark blue bg and focus purple */}
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-[#020617] border border-indigo-900/40 rounded-2xl p-4 pl-12 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all placeholder-gray-500" placeholder="Amit Gupta" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-400 ml-1">Gender</label>
                    <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" size={20} />
                        <select name="gender" value={formData.gender} onChange={handleInputChange} required className="w-full bg-[#020617] border border-indigo-900/40 rounded-2xl p-4 pl-12 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none appearance-none cursor-pointer text-gray-300">
                            <option className="bg-[#020617]" value="">Select Gender</option>
                            <option className="bg-[#020617]" value="Male">Male</option>
                            <option className="bg-[#020617]" value="Female">Female</option>
                            <option className="bg-[#020617]" value="Other">Other</option>
                        </select>
                    </div>
                </div>
              </div>

              {/* DOB */}
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-gray-400 ml-1">Date of Birth</label>
                <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" size={20} />
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required className="w-full bg-[#020617] border border-indigo-900/40 rounded-2xl p-4 pl-12 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all text-gray-300" />
                </div>
              </div>

              {/* Contact Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-400 ml-1">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" size={20} />
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-[#020617] border border-indigo-900/40 rounded-2xl p-4 pl-12 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all placeholder-gray-500" placeholder="you@example.com" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-400 ml-1">Phone</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" size={20} />
                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-[#020617] border border-indigo-900/40 rounded-2xl p-4 pl-12 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all placeholder-gray-500" placeholder="9876543210" />
                    </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                // CHANGE 6: Button Gradient changed from Green to Blue-Purple
                className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-lg uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-3 mt-4"
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
                  <div className="inline-block p-3 rounded-full bg-indigo-500/10 border border-indigo-400/20 mb-4 shadow-lg shadow-indigo-500/10">
                    <Sparkles className="text-purple-400 w-6 h-6 animate-pulse" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-6">Your Cosmic Blueprint</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Driver - Base BG changed to dark blue, Border/Text remains Yellow */}
                      <div className="bg-[#0B1120]/80 border border-yellow-500/30 p-6 rounded-2xl flex flex-col items-center shadow-lg shadow-yellow-500/5">
                          <span className="text-gray-400 text-xs uppercase tracking-widest mb-2">Driver (Birth)</span>
                          <span className="text-6xl font-bold text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">{results.driver}</span>
                      </div>
                      {/* Conductor - Base BG changed, Border/Text remains Purple */}
                      <div className="bg-[#0B1120]/80 border border-purple-500/30 p-6 rounded-2xl flex flex-col items-center shadow-lg shadow-purple-500/5">
                          <span className="text-gray-400 text-xs uppercase tracking-widest mb-2">Conductor (Destiny)</span>
                          <span className="text-6xl font-bold text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">{results.conductor}</span>
                      </div>
                      {/* Kuan - Base BG changed, Border/Text remains Green */}
                      <div className="bg-[#0B1120]/80 border border-green-500/30 p-6 rounded-2xl flex flex-col items-center shadow-lg shadow-green-500/5">
                          <span className="text-gray-400 text-xs uppercase tracking-widest mb-2">Kuan Number</span>
                          <span className="text-6xl font-bold text-green-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">{results.kuan}</span>
                      </div>
                  </div>
                  
                  {/* Analysis Text - BG changed to dark blue */}
                  <div className="mt-6 bg-[#0B1120]/60 border border-indigo-500/20 p-6 rounded-2xl text-left">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Sparkles size={18} className="text-purple-400"/> Analysis
                      </h3>
                      <div className="space-y-3">
                        {results.analysis.map((line, idx) => (
                            <p key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                              <span className="text-purple-500 mt-0.5">✨</span> {line}
                            </p>
                        ))}
                      </div>
                  </div>
              </div>

              {/* 2. Loshu Grid Section */}
              <div>
                  <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                          <Grid3X3 className="text-indigo-400" size={20}/> Loshu Grid
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">Highlighted numbers match your Core Numbers</p>
                  </div>
                  {/* Loshu Container BG changed */}
                  <div className="max-w-xs mx-auto grid grid-cols-3 gap-3 p-4 bg-[#0B1120]/80 border border-indigo-500/20 rounded-3xl shadow-xl">
                      {renderLoshuCell(4)} {renderLoshuCell(9)} {renderLoshuCell(2)}
                      {renderLoshuCell(3)} {renderLoshuCell(5)} {renderLoshuCell(7)}
                      {renderLoshuCell(8)} {renderLoshuCell(1)} {renderLoshuCell(6)}
                  </div>
              </div>

              {/* 3. Chaldean Name Chart Section */}
              <div>
                  <div className="grid md:grid-cols-2 gap-6">
                      {/* First Name - BG changed */}
                      <div className="bg-[#0B1120]/80 border border-indigo-500/20 rounded-2xl p-6 shadow-lg">
                          <h3 className="text-lg font-bold text-white mb-4 border-b border-indigo-500/20 pb-2">First Name Vibration</h3>
                          <div className="flex flex-wrap gap-2 mb-4">
                              {results.firstNameChart.letterValues.map((item, idx) => (
                                  // Inner Letter BG changed
                                  <div key={idx} className="flex flex-col items-center bg-[#020617] border border-indigo-900/50 p-2 rounded-lg min-w-[2.5rem]">
                                      <span className="text-xs text-gray-500">{item.letter}</span>
                                      <span className="font-bold text-yellow-400">{item.value}</span>
                                  </div>
                              ))}
                          </div>
                          <div className="flex justify-between items-center bg-indigo-950/50 p-3 rounded-xl border border-indigo-500/10">
                              <span className="text-sm font-medium text-indigo-200">Total</span>
                              <span className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{results.firstNameChart.total}</span>
                          </div>
                      </div>

                      {/* Last Name - BG changed */}
                      <div className="bg-[#0B1120]/80 border border-indigo-500/20 rounded-2xl p-6 shadow-lg">
                          <h3 className="text-lg font-bold text-white mb-4 border-b border-indigo-500/20 pb-2">Last Name Vibration</h3>
                          <div className="flex flex-wrap gap-2 mb-4">
                              {results.lastNameChart.letterValues.map((item, idx) => (
                                  // Inner Letter BG changed
                                  <div key={idx} className="flex flex-col items-center bg-[#020617] border border-indigo-900/50 p-2 rounded-lg min-w-[2.5rem]">
                                      <span className="text-xs text-gray-500">{item.letter}</span>
                                      <span className="font-bold text-blue-400">{item.value}</span>
                                  </div>
                              ))}
                          </div>
                          <div className="flex justify-between items-center bg-indigo-950/50 p-3 rounded-xl border border-indigo-500/10">
                              <span className="text-sm font-medium text-indigo-200">Total</span>
                              <span className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{results.lastNameChart.total}</span>
                          </div>
                      </div>
                  </div>

                  {/* Full Name Vibration Box - Updated to match new theme but keep Gold Highlight */}
                  <div className="mt-6 bg-[#0B1120]/90 border border-yellow-500/40 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-[0_0_30px_rgba(234,179,8,0.15)]">
                       <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-purple-500/5 to-blue-500/10 pointer-events-none"></div>
                       <div className="relative z-10 text-center md:text-left mb-4 md:mb-0">
                           <h3 className="text-2xl font-bold text-white mb-1">Full Name Vibration</h3>
                           <p className="text-gray-400 text-sm">The combined destiny number of your First and Last Name.</p>
                       </div>
                       <div className="relative z-10 flex items-center justify-center w-20 h-20 bg-[#020617] border-2 border-yellow-400 rounded-full shadow-[0_0_25px_rgba(234,179,8,0.4)] animate-pulse-slow">
                           <span className="text-4xl font-bold text-yellow-400">{results.fullNameTotal}</span>
                       </div>
                  </div>
              </div>

              {/* CTA Section - Updated borders and colors */}
              <div className="flex flex-col gap-4 text-center pt-8 border-t border-indigo-500/30">
                <div className="p-4 bg-indigo-950/40 border border-indigo-400/20 rounded-xl">
                  <p className="text-indigo-200 text-sm">
                    <strong>Note:</strong> This is a preliminary digital calculation. For a deep, personalized reading connecting these numbers to your life events, consult Amit Gupta.
                  </p>
                </div>
                <div className="flex justify-center gap-4 items-center">
                    <button onClick={() => setResults(null)} className="text-gray-400 hover:text-white underline text-sm transition-colors">
                        Calculate for someone else
                    </button>
                    {/* CTA Button gradient changed to Blue/Purple */}
                    <Link to="/contact" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold text-white transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5">
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
