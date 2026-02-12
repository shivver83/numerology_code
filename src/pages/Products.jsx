import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { yantras } from '../data/yantras';

const Products = () => {
  return (
    <div className="min-h-screen bg-[#001900] text-white font-sans pt-32 pb-20 px-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-yellow-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-down">
          <span className="text-emerald-400 tracking-widest uppercase text-xs font-bold mb-2 block">Sacred Geometry</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Energised <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-green-400 to-emerald-500">Yantras</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Powerful tools to correct planetary defects and amplify positive vibrations in your life.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {yantras.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              // Card Background: Rich Green (#0a281e) - Not Black
              className="group relative bg-[#0a281e] border border-emerald-500/20 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.25)] flex flex-col"
            >
              
              {/* --- IMAGE AREA with 5-LAYER SOLAR SYSTEM EFFECT --- */}
              <div className="relative h-80 p-6 flex items-center justify-center overflow-hidden">
                
                {/* Center Glow Behind Product */}
                <div className="absolute inset-0 bg-radial-gradient from-[#0a281e] to-[#051510] opacity-60"></div>

                {/* --- SOLAR SYSTEM ORBITS (5 RINGS with MOVING PLANETS) --- */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    
                    {/* Orbit 1 (Smallest - Inner) - YELLOW GLOW */}
                    <div className="absolute w-[140px] h-[140px] border border-emerald-500/5 rounded-full animate-[spin_4s_linear_infinite]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_#facc15]"></div>
                    </div>

                    {/* Orbit 2 - EMERALD GLOW (Reverse Spin) */}
                    <div className="absolute w-[190px] h-[190px] border border-emerald-500/5 rounded-full animate-[spin_7s_linear_infinite_reverse]">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]"></div>
                    </div>

                    {/* Orbit 3 - ORANGE GLOW */}
                    <div className="absolute w-[240px] h-[240px] border border-emerald-500/5 rounded-full animate-[spin_10s_linear_infinite]">
                        <div className="absolute top-1/2 right-0 translate-x-1/2 w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_10px_#f97316]"></div>
                    </div>

                    {/* Orbit 4 - CYAN GLOW (Reverse Spin) */}
                    <div className="absolute w-[290px] h-[290px] border border-emerald-500/5 rounded-full animate-[spin_14s_linear_infinite_reverse]">
                        <div className="absolute top-1/2 left-0 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee]"></div>
                    </div>

                    {/* Orbit 5 (Largest) - PURPLE GLOW */}
                    <div className="absolute w-[340px] h-[340px] border border-emerald-500/5 rounded-full animate-[spin_20s_linear_infinite]">
                        <div className="absolute bottom-10 right-10 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_#c084fc]"></div>
                    </div>

                </div>

                {/* Product Image (Sitting in the center of the solar system) */}
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-all duration-700 relative z-10"
                />
              </div>

              {/* --- CONTENT AREA --- */}
              <div className="p-6 bg-[#0a281e] border-t border-emerald-500/20 flex flex-col flex-grow relative z-20">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-emerald-100/70 text-sm line-clamp-2 mb-6 flex-grow leading-relaxed">
                  {product.description[0]}
                </p>

                <div className="flex items-center justify-between mt-auto">
                   <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-900/50 text-emerald-300 border border-emerald-500/30 tracking-wider uppercase">
                      Energised
                   </span>
                   <div className="flex items-center gap-2 text-yellow-400 text-sm font-bold tracking-wider uppercase group-hover:gap-3 transition-all">
                     View Details <ArrowRight size={16} />
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Products;
