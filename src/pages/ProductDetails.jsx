import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, CheckCircle2, Star, ShieldCheck, Sparkles } from 'lucide-react';
import { yantras } from '../data/yantras';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = yantras.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (product) {
        setActiveImage(product.images[0]);
    }
    window.scrollTo(0, 0);
  }, [id, product]);

  if (!product) return null;

  return (
    // FIX 1: Strict width control to prevent horizontal scrolling
    <div className="min-h-screen bg-[#001900] text-white font-sans pt-24 pb-20 w-full max-w-[100vw] overflow-x-hidden relative">
      
      {/* Background Ambience */}
      <div className="fixed top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-emerald-900/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Back Button */}
        <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group text-sm md:text-base"
        >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform"/> Back to Yantras
        </button>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            
            {/* --- LEFT: IMAGE GALLERY SECTION --- */}
            <div className="space-y-4 w-full">
                
                {/* 1. Main Image Display */}
                <div className="relative w-full aspect-square md:aspect-auto md:h-[500px] bg-[#0a281e] border border-emerald-500/20 rounded-3xl p-6 flex items-center justify-center shadow-2xl overflow-hidden group">
                    
                    {/* Inner Glow */}
                    <div className="absolute inset-0 bg-radial-gradient from-[#0a281e] to-[#051510] opacity-60"></div>
                    
                    {/* Animated Rings */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                        <div className="absolute w-[70%] h-[70%] border border-emerald-500/10 rounded-full animate-[spin_15s_linear_infinite]"></div>
                        <div className="absolute w-[90%] h-[90%] border border-emerald-500/5 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
                    </div>

                    {/* The Image */}
                    <img 
                        src={activeImage} 
                        alt={product.name} 
                        className="w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-500 transform group-hover:scale-105 relative z-10"
                    />
                </div>

                {/* 2. Thumbnails Grid (FIXED: 5 Columns, No Scroll) */}
                <div className="w-full">
                    {/* 'grid-cols-5' forces exactly 5 items in one row */}
                    <div className="grid grid-cols-5 gap-2 md:gap-3"> 
                        {product.images.map((img, index) => (
                            <button 
                                key={index}
                                onClick={() => setActiveImage(img)}
                                // 'aspect-square' ensures boxes remain square regardless of screen width
                                className={`relative w-full aspect-square rounded-lg md:rounded-xl border p-1 bg-[#0a281e] overflow-hidden transition-all duration-300 ${
                                    activeImage === img 
                                    ? 'border-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.3)] ring-1 ring-yellow-400/50' 
                                    : 'border-emerald-500/20 opacity-70 hover:opacity-100'
                                }`}
                            >
                                <img src={img} alt={`view-${index}`} className="w-full h-full object-contain" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- RIGHT: PRODUCT INFO --- */}
            <div className="space-y-6 md:space-y-8 w-full">
                <div>
                    {/* Title with overflow wrap to prevent text pushing width */}
                    <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 leading-tight break-words">
                        {product.name}
                    </h1>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-full">
                            Energised & Activated
                        </span>
                        <div className="flex items-center gap-1 text-emerald-400 text-sm">
                            <Star size={14} fill="currentColor" /> 
                            <span className="font-semibold">Premium Quality</span>
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-emerald-900/50 via-emerald-500/30 to-emerald-900/50"></div>

                {/* Description Points */}
                <div className="space-y-4">
                    <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                        <Sparkles size={18} className="text-yellow-400" /> Benefits
                    </h3>
                    <ul className="space-y-3">
                        {product.description.map((point, index) => (
                            <li key={index} className="flex items-start gap-3 text-gray-300 text-sm md:text-base leading-relaxed p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="p-3 md:p-4 bg-[#0a281e] border border-emerald-500/20 rounded-xl flex items-center gap-3">
                        <ShieldCheck className="text-emerald-400 shrink-0" size={24} />
                        <div>
                            <p className="text-white font-bold text-sm">Authentic</p>
                            <p className="text-gray-500 text-[10px] md:text-xs">Vedic Geometry</p>
                        </div>
                    </div>
                    <div className="p-3 md:p-4 bg-[#0a281e] border border-emerald-500/20 rounded-xl flex items-center gap-3">
                        <Sparkles className="text-yellow-400 shrink-0" size={24} />
                        <div>
                            <p className="text-white font-bold text-sm">Energised</p>
                            <p className="text-gray-500 text-[10px] md:text-xs">Ready to use</p>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="pt-2 pb-6 md:pb-0">
                    <a 
                        href={`https://wa.me/917428552116?text=Hello, I am interested in buying *${product.name}*. Please share the price and details.`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl font-bold text-white uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 text-sm md:text-base animate-pulse-slow"
                    >
                        <MessageCircle size={20} /> Inquire on WhatsApp
                    </a>
                    <p className="text-center text-gray-500 text-[10px] md:text-xs mt-3">
                        *Authentic Panchdhatu / Copper / Silver Yantras available.
                    </p>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
