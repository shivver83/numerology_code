import React, { useState } from 'react';
import { 
  Calculator, Sparkles, RefreshCw, 
  User, Mail, Phone, Calendar, Users, Grid3X3 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

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

// UPDATED: Now returns RAW total (unreduced) along with letter values
const calculateChaldeanChart = (name) => {
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
  const letterValues = cleanName.split('').map(letter => ({
    letter, value: chaldeanMap[letter] || 0
  }));
  const rawTotal = letterValues.reduce((sum, lv) => sum + lv.value, 0);
  return { letterValues, rawTotal };
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

  const [results, setResults] = useState(null); 
  const [loading, setLoading] = useState(false);

  // --- GOOGLE SCRIPT URL ---
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzir-aXNnbI_t-iK950WTOdQm7ddUei29u7tTxR6V2a4N1QNgHS58FX0dsHnJ7vSNw_6Q/exec";

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

    const dataToSend = new FormData();
    dataToSend.append('sheetName', 'Sheet2'); 
    dataToSend.append('Name', formData.name);
    dataToSend.append('Gender', formData.gender);
    dataToSend.append('DOB', formData.dateOfBirth);
    dataToSend.append('Email', formData.email);
    dataToSend.append('Mobile_Number', formData.phone);
    dataToSend.append('Message', 'Calculated Free Numerology');

    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: dataToSend,
        mode: "no-cors"
    })
    .then(() => {
        performCalculation();
    })
    .catch((error) => {
        console.error("Error saving data:", error);
        performCalculation();
    });
  };

  const performCalculation = () => {
    setTimeout(() => {
      const lifePathNumber = calculateLifePathNumber(formData.dateOfBirth);
      const driver = calculateDriverNumber(formData.dateOfBirth);
      const kuan = calculateKuanNumber(formData.dateOfBirth, formData.gender);
      const grid = generateLoshuGrid(formData.dateOfBirth, driver, lifePathNumber, kuan);

      // EXTRACT FIRST, MIDDLE, LAST NAME
      const names = formData.name.trim().split(/\s+/);
      let first = '', middle = '', last = '';
      
      if (names.length === 1) {
          first = names[0];
      } else if (names.length === 2) {
          first = names[0];
          last = names[1];
      } else if (names.length >= 3) {
          first = names[0];
          last = names[names.length - 1];
          // Join all middle words into one string for calculation
          middle = names.slice(1, -1).join(''); 
      }

      // Calculate charts (gives raw totals like 11, 15, 15)
      const firstChart = calculateChaldeanChart(first);
      const middleChart = calculateChaldeanChart(middle);
      const lastChart = calculateChaldeanChart(last);
      
      // Calculate Full Name Vibration (Sum of raw totals e.g. 11+15+15 = 41)
      const fullNameVibration = firstChart.rawTotal + middleChart.rawTotal + lastChart.rawTotal;
      
      // Calculate Combine Vibration (Reduce the 41 to single digit e.g. 5)
      const combineVibration = reduceToSingleDigit(fullNameVibration);

      setResults({
        driver,
        conductor: lifePathNumber,
        kuan,
        loshuGrid: grid,
        nameCharts: { first: firstChart, middle: middleChart, last: lastChart },
        fullNameVibration, 
        combineVibration,
        analysis: getAnalysis(driver, lifePathNumber)
      });
      
      setLoading(false);
    }, 1000);
  };

  const renderLoshuCell = (num) => {
    if (!results || !results.loshuGrid) return null;
    const count = results.loshuGrid[num] || 0;
    
    const isDriver = results.driver === num;
    const isConductor = results.conductor === num;
    const isKuan = results.kuan === num;

    let bgClass = 'bg-white/5 border-white/10 text-gray-400'; 
    if (count > 0) bgClass = 'bg-white/10 border-white/20 text-white font-bold'; 
    
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

  // Helper function to render a Name Box
  const renderNameBox = (title, chart, colorClass) => {
      if (!chart || chart.rawTotal === 0) return null;
      return (
          <div className="bg-[#001900] border border-emerald-900/30 rounded-2xl p-6 flex flex-col h-full">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-emerald-900/30 pb-2">{title}</h3>
              <div className="flex flex-wrap gap-2 mb-4 flex-grow">
                  {chart.letterValues.map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center bg-[#07220d] p-2 rounded-lg min-w-[2.5rem]">
                          <span className="text-xs text-gray-400">{item.letter}</span>
                          <span className={`font-bold ${colorClass}`}>{item.value}</span>
                      </div>
                  ))}
              </div>
              <div className="flex justify-between items-center bg-emerald-900/20 p-3 rounded-xl mt-auto">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-2xl font-bold text-white">{chart.rawTotal}</span>
              </div>
          </div>
      );
  };

  return (
    // STRICT ULTRA DARK GREEN THEME
    <div className="min-h-screen bg-[#001900] text-white font-sans pt-32 pb-20 px-6">

      <SEO 
        title="Free Numerology Calculator | Check Your Life Path Number" 
        description="Use our free online numerology calculator by Happiness Creations to discover your Life Path Number, Destiny Number, and hidden potentials instantly."
        canonicalUrl="https://happinessccreattions.in/calculator"
        keywords="free numerology calculator, life path number calculator, name numerology calculator, destiny number, online numerology reading free"
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-emerald-400 tracking-widest uppercase text-xs font-bold mb-2 block">Discover Your Destiny</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Free Numerology <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Calculator</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Unlock the hidden meaning behind your name and birth date.
          </p>
        </div>

        <div className="bg-[#07220d] border border-emerald-900/30 p-8 md:p-12 rounded-[2rem] backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>

          {!results ? (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-[#001900] border border-emerald-900/30 rounded-2xl p-4 pl-12 text-white focus:border-emerald-500 outline-none transition-all" placeholder="Amit Gupta" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">Gender</label>
                    <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <select name="gender" value={formData.gender} onChange={handleInputChange} required className="w-full bg-[#001900] border border-emerald-900/30 rounded-2xl p-4 pl-12 text-white focus:border-emerald-500 outline-none appearance-none cursor-pointer">
                            <option className="bg-[#001900]" value="">Select Gender</option>
                            <option className="bg-[#001900]" value="Male">Male</option>
                            <option className="bg-[#001900]" value="Female">Female</option>
                            <option className="bg-[#001900]" value="Other">Other</option>
                        </select>
                    </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">Date of Birth</label>
                <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required className="w-full bg-[#001900] border border-emerald-900/30 rounded-2xl p-4 pl-12 text-white focus:border-emerald-500 outline-none transition-all text-gray-300" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-[#001900] border border-emerald-900/30 rounded-2xl p-4 pl-12 text-white focus:border-emerald-500 outline-none transition-all" placeholder="you@example.com" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">Phone</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-[#001900] border border-emerald-900/30 rounded-2xl p-4 pl-12 text-white focus:border-emerald-500 outline-none transition-all" placeholder="9876543210" />
                    </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl font-bold text-lg uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-3 mt-4"
              >
                {loading ? (
                  <>Calculating... <RefreshCw className="animate-spin" /></>
                ) : (
                  <>Reveal My Readings <Calculator /></>
                )}
              </button>
            </form>
          ) : (
            <div className="animate-fade-in-up relative z-10 space-y-10">
              
              <div className="text-center">
                  <div className="inline-block p-3 rounded-full bg-white/5 border border-white/10 mb-4">
                    <Sparkles className="text-yellow-400 w-6 h-6 animate-pulse" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-6">Your Cosmic Blueprint</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Driver */}
                      <div className="bg-[#001900] border border-yellow-500/30 p-6 rounded-2xl flex flex-col items-center">
                          <span className="text-gray-400 text-xs uppercase tracking-widest mb-2">Driver (Birth)</span>
                          <span className="text-6xl font-bold text-yellow-400 drop-shadow-lg">{results.driver}</span>
                      </div>
                      
                      {/* Conductor */}
                      <div className="bg-[#001900] border border-purple-500/30 p-6 rounded-2xl flex flex-col items-center">
                          <span className="text-gray-400 text-xs uppercase tracking-widest mb-2">Conductor (Destiny)</span>
                          <span className="text-6xl font-bold text-purple-400 drop-shadow-lg">{results.conductor}</span>
                      </div>

                      {/* KUAN NUMBER - Highlighted with gradient */}
                      <div className="bg-gradient-to-b from-green-900/40 to-[#001900] border border-green-500/50 p-6 rounded-2xl flex flex-col items-center shadow-[0_0_20px_rgba(34,197,94,0.15)]">
                          <span className="text-gray-300 font-semibold text-xs uppercase tracking-widest mb-2">Kuan Number</span>
                          <span className="text-6xl font-bold text-green-400 drop-shadow-lg">{results.kuan}</span>
                      </div>
                  </div>
                  
                  <div className="mt-6 bg-[#001900] border border-emerald-900/30 p-6 rounded-2xl text-left">
                      <h3 className="text-lg font-bold text-white mb-2">Analysis</h3>
                      {results.analysis.map((line, idx) => (
                          <p key={idx} className="text-gray-300 text-sm mb-2 last:mb-0">✨ {line}</p>
                      ))}
                  </div>
              </div>

              <div>
                  <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                          <Grid3X3 className="text-blue-400" size={20}/> Loshu Grid
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">Highlighted numbers match your Core Numbers</p>
                  </div>
                  <div className="max-w-xs mx-auto grid grid-cols-3 gap-3 p-4 bg-[#001900] border border-emerald-900/30 rounded-2xl">
                      {renderLoshuCell(4)} {renderLoshuCell(9)} {renderLoshuCell(2)}
                      {renderLoshuCell(3)} {renderLoshuCell(5)} {renderLoshuCell(7)}
                      {renderLoshuCell(8)} {renderLoshuCell(1)} {renderLoshuCell(6)}
                  </div>
              </div>

              {/* --- NEW: FIRST, MIDDLE, LAST NAME BOXES --- */}
              <div>
                  <div className={`grid grid-cols-1 ${results.nameCharts.middle.rawTotal > 0 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
                      {renderNameBox("First Name Vibration", results.nameCharts.first, "text-yellow-400")}
                      {renderNameBox("Middle Name Vibration", results.nameCharts.middle, "text-purple-400")}
                      {renderNameBox("Last Name Vibration", results.nameCharts.last, "text-blue-400")}
                  </div>

                  {/* COMBINED TOTAL BOX */}
                  <div className="mt-6 bg-[#001900] border border-yellow-500/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-[0_0_20px_rgba(234,179,8,0.1)]">
                       <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-emerald-500/5 pointer-events-none"></div>
                       
                       <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
                           <h3 className="text-2xl font-bold text-white mb-1">Name Destiny</h3>
                           <p className="text-gray-400 text-sm">The complete vibration of your identity.</p>
                       </div>
                       
                       <div className="relative z-10 flex items-center gap-6 md:gap-10">
                           {/* Full Name Vibration (e.g. 41) */}
                           <div className="flex flex-col items-center">
                               <span className="text-gray-400 text-[10px] md:text-xs uppercase tracking-widest mb-1 text-center">Full Name<br/>Vibration</span>
                               <span className="text-3xl font-bold text-white">{results.fullNameVibration}</span>
                           </div>
                           
                           {/* Divider Line */}
                           <div className="h-12 w-px bg-yellow-500/30"></div>
                           
                           {/* Combine Vibration (e.g. 5) */}
                           <div className="flex flex-col items-center">
                               <span className="text-gray-400 text-[10px] md:text-xs uppercase tracking-widest mb-1 text-center">Combine<br/>Vibration</span>
                               <div className="w-14 h-14 md:w-16 md:h-16 bg-[#07220d] border border-yellow-500/50 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.2)] flex items-center justify-center">
                                   <span className="text-2xl md:text-3xl font-bold text-yellow-400">{results.combineVibration}</span>
                               </div>
                           </div>
                       </div>
                  </div>
              </div>

              <div className="flex flex-col gap-4 text-center pt-6 border-t border-emerald-900/30">
                <div className="p-4 bg-yellow-900/20 border border-yellow-500/20 rounded-xl">
                  <p className="text-yellow-200 text-sm">
                    <strong>Note:</strong> This is a preliminary digital calculation. For a deep, personalized reading connecting these numbers to your life events, consult Amit Gupta.
                  </p>
                </div>
                <div className="flex justify-center gap-4">
                    <button onClick={() => setResults(null)} className="text-gray-400 hover:text-white underline text-sm">
                        Calculate for someone else
                    </button>
                    <Link to="/contact" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-white transition-colors">
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
