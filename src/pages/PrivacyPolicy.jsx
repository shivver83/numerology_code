import React from 'react';
import { Shield, Lock, Eye } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    // CHANGE 1: Main Background to Ultra Dark Green (#001900)
    <div className="min-h-screen bg-[#001900] text-white font-sans pt-32 pb-20 px-6 relative overflow-hidden">
      
      {/* Background Ambience - Added Green/Gold Glows for consistency */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-yellow-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        {/* CHANGE 2: Border color updated */}
        <div className="mb-12 border-b border-emerald-900/30 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {/* CHANGE 3: Gradient Text to Gold/Emerald */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-green-400 to-emerald-500">
              Privacy Policy
            </span>
          </h1>
          <p className="text-gray-400">Last Updated: January 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-300 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              {/* CHANGE 4: Icon Color to Emerald */}
              <Shield className="text-emerald-500" /> Your Data is Sacred
            </h2>
            <p>
              At <strong>Happiness Ccreations</strong>, we understand that your personal details—specifically your <strong>Date of Birth, Time of Birth, and Place of Birth</strong>—are the blueprint of your life. We treat this information with the utmost respect and confidentiality. We use your data solely for the purpose of generating Numerology charts and Vastu analysis to guide you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              {/* CHANGE 5: Icon Color to Gold */}
              <Eye className="text-yellow-500" /> Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Personal Identity:</strong> Name, Email Address, and Phone Number.</li>
              <li><strong>Cosmic Details:</strong> Date of Birth, Time of Birth, and Place of Birth (strictly for calculation).</li>
              <li><strong>Vastu Details:</strong> Floor plans or directions of your property if you opt for Vastu consultation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              {/* CHANGE 6: Icon Color to Green */}
              <Lock className="text-green-500" /> How We Use Your Information
            </h2>
            <p>
              We do not sell, trade, or rent your personal identification information to others. Your data is used for:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Calculating your Life Path, Destiny, and Kua Numbers.</li>
              <li>Sending you your personalized reports and remedies.</li>
              <li>Improving our website and customer service.</li>
              <li>Sending periodic emails regarding lucky dates or tips (only if subscribed).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Cookies & Tracking</h2>
            <p>
              Our website may use "cookies" to enhance user experience. These are small files stored on your device to help us understand how visitors use our site. You can choose to set your web browser to refuse cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at: <br />
              {/* CHANGE 7: Email Color to Emerald */}
              <span className="text-emerald-400 font-medium">9amitgupta99@gmail.com</span>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
