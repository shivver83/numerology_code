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
              // CHANGE 1: Lighter Green Background (#0a281e) so it looks Green, not Black
              className="group relative bg-[#0a281e] border border-emerald-500/20 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.25)] flex flex-col"
            >
              
              {/* --- IMAGE AREA with ROTATING GLOW RINGS --- */}
              <div className="relative h-80 p-6 flex items-center justify-center overflow-hidden">
                
                {/* A. Darker Center for Contrast */}
                <div className="absolute inset-0 bg-radial-gradient from-[#0a281e] to-[#051510] opacity-50"></div>

                {/* B. ANIMATED RINGS (Rotating Lines) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    
                    {/* Ring 1: Outer Dashed Ring (Slow Spin) */}
                    <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-emerald-500/20 animate-[spin_20s_linear_infinite]"></div>
                    
                    {/* Ring 2: Middle Dotted Ring (Reverse Spin - Yellow tint) */}
                    <div className="absolute w-[220px] h-[220px] rounded-full border border-dotted border-yellow-500/20 animate-[spin_15s_linear_infinite_reverse]"></div>
                    
                    {/* Ring 3: Inner Solid Glow Ring (Pulse) */}
                    <div className="absolute w-[160px] h-[160px] rounded-full border border-emerald-400/10 bg-emerald-500/5 animate-pulse blur-md"></div>
                    
                    {/* Ring 4: Hover Effect Ring (Expands on Hover) */}
                    <div className="absolute w-[200px] h-[200px] rounded-full border border-emerald-400/0 group-hover:border-emerald-400/30 group-hover:scale-125 transition-all duration-700"></div>
                </div>

                {/* Product Image */}
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  // Drop shadow + Hover Scale
                  className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-all duration-700 relative z-10"
                />
              </div>

              {/* --- CONTENT AREA --- */}
              {/* Content background blends with the card but keeps separation */}
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
