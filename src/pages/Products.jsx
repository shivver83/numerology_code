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
              className="group relative bg-[#07220d] border border-emerald-900/30 rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col"
            >
              
              {/* Image Container - Showing 1st Image */}
              <div className="relative h-64 overflow-hidden bg-[#001900] p-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#07220d]/80 z-10"></div>
                <img 
                  // CHANGE: Use first image from array
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 relative z-0"
                />
              </div>

              {/* Content */}
              <div className="p-6 pt-2 flex flex-col flex-grow relative z-20">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-gray-400 text-sm line-clamp-2 mb-6 flex-grow">
                  {product.description[0]}
                </p>

                <div className="flex items-center gap-2 text-yellow-400 text-sm font-bold tracking-wider uppercase group-hover:gap-3 transition-all">
                  View Details <ArrowRight size={16} />
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
