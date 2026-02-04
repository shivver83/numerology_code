import React from 'react';
import { Scale, AlertTriangle, BookOpen } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
              Terms of Service
            </span>
          </h1>
          <p className="text-gray-400">Last Updated: January 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-300 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="text-yellow-500" /> Introduction
            </h2>
            <p>
              Welcome to <strong>Happiness Ccreations</strong>. By accessing this website and booking our services (Numerology, Vastu, Name Correction), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Scale className="text-blue-500" /> Nature of Services
            </h2>
            <p>
              Our services are based on the ancient sciences of Numerology and Vastu Shastra. While we strive to provide accurate calculations and beneficial remedies:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Guidance, Not Fate:</strong> Our readings are meant to guide you. They show potential and vibrations, but your own efforts (Karma) play a significant role in your success.</li>
              <li><strong>No Guarantee:</strong> We do not guarantee specific results (e.g., winning a lottery, instant job promotion). Occult sciences work on aligning energies, which takes time.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="text-red-500" /> Disclaimer
            </h2>
            <p>
              The information provided by Happiness Ccreations is for educational and spiritual purposes only. It should not be considered as a substitute for professional advice in the fields of:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Medical Treatment or Diagnosis</li>
              <li>Legal Advice</li>
              <li>Financial Investment Advice</li>
            </ul>
            <p className="mt-2">
              We are not responsible for any decisions you make based on our readings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Consultation & Payments</h2>
            <p>
              All consultations must be booked in advance. Payments for reports and sessions are non-refundable once the service has been delivered or the report has been generated, as this involves our time and effort in calculation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
            <p>
              All content on this website, including text, logos, and course materials, is the intellectual property of Amit Gupta and Happiness Ccreations. Unauthorized reproduction is prohibited.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
