import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
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
              className="group relative bg-[#051a15] border border-emerald-900/30 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] flex flex-col"
            >
              
              {/* --- IMAGE AREA with SPOTLIGHT EFFECT --- */}
              <div className="relative h-72 p-6 flex items-center justify-center overflow-hidden">
                
                {/* 1. Deep Dark Base */}
                <div className="absolute inset-0 bg-[#001005]"></div>

                {/* 2. Spotlight Gradient (The Highlight Logic) */}
                {/* This puts a glowing emerald light BEHIND the product */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-600/20 via-[#001005]/50 to-[#001005] opacity-80 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* 3. Subtle Rotating Ring (Optional Visual Interest) */}
                <div className="absolute w-[120%] h-[120%] border border-emerald-500/5 rounded-full animate-[spin_20s_linear_infinite] group-hover:border-emerald-500/20 transition-colors pointer-events-none"></div>

                {/* Product Image */}
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  // Drop shadow added to make the silver/metal pop against the glow
                  className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:drop-shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-700 relative z-10"
                />
              </div>

              {/* --- CONTENT AREA --- */}
              <div className="p-6 bg-gradient-to-b from-[#051a15] to-[#020f0c] border-t border-emerald-900/30 flex flex-col flex-grow relative z-20">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-gray-400 text-sm line-clamp-2 mb-6 flex-grow leading-relaxed">
                  {product.description[0]}
                </p>

                <div className="flex items-center justify-between mt-auto">
                   <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-900/30 text-emerald-400 border border-emerald-900/50">
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
