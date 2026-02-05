import React, { useRef, useState } from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Send, Calendar, Clock, Globe, MessageCircle, Car, Home, Smartphone, User, CheckCircle, AlertCircle, X, Sparkles, Briefcase } from 'lucide-react';
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  
  // Notification State
  const [notification, setNotification] = useState(null);

  // Aapka Google Script URL
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzir-aXNnbI_t-iK950WTOdQm7ddUei29u7tTxR6V2a4N1QNgHS58FX0dsHnJ7vSNw_6Q/exec"; 

  const onCaptchaChange = (val) => {
    setCaptchaToken(val);
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captchaToken) {
      showNotification('error', "Please verify that you are not a robot!");
      return;
    }

    setIsSubmitting(true);
    
    const formData = new FormData(formRef.current);

    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: formData,
      mode: "no-cors"
    })
    .then(() => {
      showNotification('success', 'Success! Your details have been saved. We will contact you shortly.');
      setIsSubmitting(false);
      setCaptchaToken(null);
      formRef.current.reset();
      window.grecaptcha.reset();
    })
    .catch((error) => {
      console.log(error);
      showNotification('error', 'Network Error. Please try again later.');
      setIsSubmitting(false);
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pt-32 pb-20 px-6 relative overflow-hidden">
      
      {/* --- PREMIUM BLACK & GOLD NOTIFICATION --- */}
      {notification && (
        <div className={`fixed top-24 right-6 z-[100] max-w-sm w-full p-5 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-start gap-4 transition-all duration-500 animate-bounce-in
            ${notification.type === 'success' 
                ? 'bg-black/90 border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.2)]' 
                : 'bg-black/90 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]'
            }`}>
            
            <div className={`p-2 rounded-full shrink-0 border ${notification.type === 'success' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                {notification.type === 'success' ? <Sparkles size={24} /> : <AlertCircle size={24} />}
            </div>

            <div className="flex-1 pt-1">
                <h4 className={`font-bold text-base mb-1 tracking-wide uppercase ${notification.type === 'success' ? 'text-yellow-400' : 'text-red-400'}`}>
                    {notification.type === 'success' ? 'Request Sent' : 'Error'}
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed font-medium">
                    {notification.message}
                </p>
            </div>

            <button onClick={() => setNotification(null)} className="text-gray-500 hover:text-white transition-colors pt-1">
                <X size={20} />
            </button>
        </div>
      )}

      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-yellow-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16 animate-fade-in-down">
          <span className="text-purple-400 tracking-widest uppercase text-xs font-bold mb-2 block">Get in Touch</span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Start Your Journey to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-lg">
              Happiness Today
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Whether you need a consultation or just want to say hi, we are here to guide you towards a better future.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT SIDE: INFO */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="grid gap-6">
              <ContactCard 
                icon={<MapPin className="text-red-400" />} 
                title="Visit Us" 
                value="1022, Siddhi Block, Mahagunpuram, NH 24, Ghaziabad 201002"
                isLink={true} 
                href="https://www.google.com/maps/search/?api=1&query=1022+Siddhi+Block+Mahagunpuram+Ghaziabad" 
                subValue="Click to view on Google Maps"
              />
              
              <ContactCard 
                icon={<Mail className="text-blue-400" />} title="Email Us" value="9amitgupta99@gmail.com" 
                isLink={true} href="mailto:9amitgupta99@gmail.com"
              />
              <ContactCard 
                icon={<Phone className="text-green-400" />} title="Phone / WhatsApp" value="+91-7428552116" 
                isLink={true} href="https://wa.me/917428552116"
              />
            </div>

            <div className="bg-[#1e293b]/30 border border-white/5 p-8 rounded-3xl backdrop-blur-md">
              <h3 className="text-xl font-bold mb-2">Stay Connected</h3>
              <p className="text-gray-400 text-sm mb-6">Follow us for daily tips and lucky numbers.</p>
              <div className="flex gap-4 flex-wrap">
                <SocialBtn icon={<Youtube size={20} />} label="YouTube" color="hover:bg-red-600" href="https://www.youtube.com/@happinessccreattions9" />
                <SocialBtn icon={<Instagram size={20} />} label="Instagram" color="hover:bg-pink-600" href="https://www.instagram.com/happinessccreattions/" />
                <SocialBtn icon={<Facebook size={20} />} label="Facebook" color="hover:bg-blue-600" href="https://www.facebook.com/9amitgupta" />
                <SocialBtn icon={<MessageCircle size={20} />} label="Whatsapp" color="hover:bg-green-600" href="https://whatsapp.com/channel/0029VbBwGqG6LwHtOqjVnu3h" />
              </div>
            </div>

            <div className="h-64 w-full rounded-3xl overflow-hidden border border-white/10 relative group">
              <div className="absolute inset-0 bg-indigo-900/20 mix-blend-overlay pointer-events-none z-10"></div>
              <iframe 
                src="https://maps.google.com/maps?q=Mahagunpuram%20NH%2024%20Ghaziabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
                allowFullScreen="" loading="lazy" className="grayscale hover:grayscale-0 transition-all duration-700 w-full h-full"
                title="Office Location"
              ></iframe>
            </div>

          </div>

          {/* RIGHT SIDE: FORM */}
          <div className="bg-[#0f1014] border border-white/10 p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden group animate-fade-in-up delay-200">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none"></div>

            <h3 className="text-2xl font-bold mb-6 relative z-10">Consultation Form</h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 relative z-10">
              
              {/* 1. Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Enter Your Name</label>
                <input type="text" name="Name" required placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 focus:bg-white/10 outline-none transition-all" />
              </div>

              {/* 2. Business Names (NEW) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1 flex items-center gap-1"><Briefcase size={12}/> Business Name 1</label>
                    <input type="text" name="businessname" placeholder="Primary Business" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 focus:bg-white/10 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1 flex items-center gap-1"><Briefcase size={12}/> Business Name 2</label>
                    <input type="text" name="businessname_1" placeholder="Secondary Business" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 focus:bg-white/10 outline-none transition-all" />
                  </div>
              </div>

              {/* 3. Gender & DOB */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1 flex items-center gap-1"><User size={12}/> Gender</label>
                    <div className="relative">
                        <select name="Gender" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 outline-none appearance-none cursor-pointer">
                            <option className="bg-[#1e293b]" value="">Select Gender</option>
                            <option className="bg-[#1e293b]" value="Male">Male</option>
                            <option className="bg-[#1e293b]" value="Female">Female</option>
                            <option className="bg-[#1e293b]" value="Other">Other</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
                    </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1 flex items-center gap-1"><Calendar size={12}/> Actual Date of Birth</label>
                  <input type="date" name="DOB" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-gray-300 focus:border-purple-500 focus:text-white outline-none transition-all" />
                </div>
              </div>

              {/* 4. Vehicle Numbers (UPDATED - 3 Fields) */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1 flex items-center gap-1"><Car size={12}/> Vehicle / Car Numbers</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input type="text" name="Vehicle_Number" placeholder="Vehicle 1" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 focus:bg-white/10 outline-none transition-all" />
                    <input type="text" name="Vehicle_Number_1" placeholder="Vehicle 2" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 focus:bg-white/10 outline-none transition-all" />
                    <input type="text" name="Vehicle_Number_2" placeholder="Vehicle 3" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 focus:bg-white/10 outline-none transition-all" />
                </div>
              </div>

              {/* 5. Mobile Numbers (UPDATED - 3 Fields) */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1 flex items-center gap-1"><Smartphone size={12}/> Mobile Numbers</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input type="text" name="Mobile_Number" required placeholder="Mobile 1" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 focus:bg-white/10 outline-none transition-all" />
                    <input type="text" name="Mobile_Number_1" placeholder="Mobile 2" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 focus:bg-white/10 outline-none transition-all" />
                    <input type="text" name="Mobile_Number_2" placeholder="Mobile 3" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 focus:bg-white/10 outline-none transition-all" />
                </div>
              </div>

               {/* 6. House Numbers (UPDATED - 3 Fields) */}
               <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1 flex items-center gap-1"><Home size={12}/> House/Plot/Shop Numbers</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input type="text" name="House_Number" placeholder="House/Plot/Shop" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 focus:bg-white/10 outline-none transition-all" />
                    <input type="text" name="House_Number_1" placeholder="House/Plot/Shop" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 focus:bg-white/10 outline-none transition-all" />
                    <input type="text" name="House_Number_2" placeholder="House/Plot/Shop" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 focus:bg-white/10 outline-none transition-all" />
                </div>
              </div>

              {/* 7. Message */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Your Message</label>
                <textarea name="Message" rows="4" placeholder="How can we help you?" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-purple-500 focus:bg-white/10 outline-none transition-all resize-none"></textarea>
              </div>
              
              <div className="py-2">
                <ReCAPTCHA
                  sitekey="6LcQBlosAAAAAC9T27Nx5E99JS8lqNnbNK0mKg2q" 
                  onChange={onCaptchaChange}
                  theme="dark"
                />
              </div>

              <button disabled={isSubmitting} className="w-full py-4 mt-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2 disabled:opacity-50">
                {isSubmitting ? 'Sending...' : 'Submit Request'} <Send size={18} />
              </button>

            </form>

            <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-3">Consultation Charges</h4>
                
                <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-gray-300 font-medium">Full Consultation</span>
                        <span className="text-yellow-400 font-bold text-lg">₹ 14,567</span>
                    </div>
                    
                    <div className="pt-1">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-300 font-medium">Specific Block</span>
                            <span className="text-yellow-400 font-bold text-lg">₹ 5,666</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            (For any one: Name change, Health, Marriage Compatibility, Business Partnership, Money Sector, Children's Education, Foreign settlement, Firm/Org name)
                        </p>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// ... Reusable Components ...
const ContactCard = ({ icon, title, value, isLink, href, subValue }) => (
  <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors group">
    <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:scale-110 transition-transform">{icon}</div>
    <div>
      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wide">{title}</h4>
      {isLink ? (
        <a href={href} className="text-lg font-semibold text-white hover:text-purple-400 transition-colors" target="_blank" rel="noopener noreferrer">{value}</a>
      ) : (
        <p className="text-lg font-semibold text-white">{value}</p>
      )}
       {subValue && <p className="text-xs text-gray-500 mt-1">{subValue}</p>}
    </div>
  </div>
);

const SocialBtn = ({ icon, label, color, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-4 py-3 bg-white/5 rounded-xl border border-white/10 transition-all hover:-translate-y-1 ${color} group`}>
    <div className="text-white group-hover:scale-110 transition-transform">{icon}</div>
    <span className="font-medium text-sm hidden md:block">{label}</span>
  </a>
);

export default Contact;
