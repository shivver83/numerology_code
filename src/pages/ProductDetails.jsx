import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, CheckCircle2, Star, ShieldCheck, Sparkles } from 'lucide-react';
import { yantras } from '../data/yantras';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = yantras.find((p) => p.id === id);

  // State for switching Main Image
  const [activeImage, setActiveImage] = useState(null);

  // Set default image when product loads
  useEffect(() => {
    if (product) {
        setActiveImage(product.images[0]);
    }
    window.scrollTo(0, 0);
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#001900] flex items-center justify-center text-white">
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <Link to="/products" className="text-emerald-400 hover:underline">Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#001900] text-white font-sans pt-32 pb-20 px-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Back Button */}
        <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/> Back
        </button>

        <div className="grid md:grid-cols-2 gap-12 items-start">
            
            {/* LEFT: Image Gallery Section */}
            <div className="space-y-4">
                {/* Main Image Display */}
                <div className="relative bg-[#07220d] border border-emerald-900/30 rounded-3xl p-8 flex items-center justify-center shadow-2xl h-[400px] md:h-[500px]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/20 to-transparent rounded-3xl pointer-events-none"></div>
                    <img 
                        src={activeImage} 
                        alt={product.name} 
                        className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300"
                    />
                </div>

                {/* Thumbnails Grid */}
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {product.images.map((img, index) => (
                        <button 
                            key={index}
                            onClick={() => setActiveImage(img)}
                            className={`w-20 h-20 shrink-0 rounded-xl border-2 p-2 bg-[#07220d] transition-all duration-300 ${
                                activeImage === img 
                                ? 'border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.3)] scale-105' 
                                : 'border-emerald-900/30 hover:border-emerald-500/50'
                            }`}
                        >
                            <img src={img} alt={`view-${index}`} className="w-full h-full object-contain" />
                        </button>
                    ))}
                </div>
            </div>

            {/* RIGHT: Product Info */}
            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                        {product.name}
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold uppercase tracking-wider rounded-full">
                            Energised & Activated
                        </span>
                        <div className="flex items-center gap-1 text-emerald-400 text-sm">
                            <Star size={14} fill="currentColor" /> 
                            <span className="font-semibold">Premium Quality</span>
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-emerald-900/30"></div>

                {/* Description Points */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Benefits & Features</h3>
                    <ul className="space-y-4">
                        {product.description.map((point, index) => (
                            <li key={index} className="flex items-start gap-3 text-gray-300 leading-relaxed">
                                <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-1" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[#07220d] border border-emerald-900/30 rounded-xl flex items-center gap-3">
                        <ShieldCheck className="text-emerald-400" size={24} />
                        <div>
                            <p className="text-white font-bold text-sm">Authentic</p>
                            <p className="text-gray-500 text-xs">Vedic Geometry</p>
                        </div>
                    </div>
                    <div className="p-4 bg-[#07220d] border border-emerald-900/30 rounded-xl flex items-center gap-3">
                        <Sparkles className="text-yellow-400" size={24} />
                        <div>
                            <p className="text-white font-bold text-sm">Energised</p>
                            <p className="text-gray-500 text-xs">Ready to use</p>
                        </div>
                    </div>
                </div>

                {/* CTA Button - WhatsApp */}
                <div className="pt-4">
                    <a 
                        href={`https://wa.me/917428552116?text=I am interested in buying ${product.name}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl font-bold text-white uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3"
                    >
                        <MessageCircle size={20} /> Inquire to Buy
                    </a>
                    <p className="text-center text-gray-500 text-xs mt-3">
                        *Prices provided upon request based on size and material.
                    </p>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
