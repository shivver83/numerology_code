// src/Journey.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import './Journey.css'; // optional if you want to add custom styles

const questions = [
  { q: "What is Numerology?", a: "Numerology is the mystical study of numbers and their influence on human life, personality, and destiny." },
  { q: "How will this provide remedies?", a: "Numerology provides remedies by identifying imbalances in your name, date of birth, or life cycles, and suggesting corrections through numbers, mantras, colors, or gemstones." },
  { q: "What is the correct 'Role & Goal' for me?", a: "Based on your numerology chart, we can align your natural strengths with the right role and life goals that bring you fulfillment and success." },
  { q: "What career is best for my children?", a: "Numerology can reveal your children’s talents and inclinations, helping you guide them toward a career path aligned with their destiny numbers." },
  { q: "How can Numerology improve my health?", a: "By balancing vibrations in your name and environment, numerology can reduce stress, harmonize energies, and promote better physical and mental well-being." },
  { q: "How can Numerology help improve relationships?", a: "It reveals compatibility between partners, helps resolve conflicts by understanding personality traits, and guides timing for harmony in relationships." },
];

export default function Journey() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Header />

      {/* Video Background */}
      <div className="video-background fixed inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/numerology.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark overlay to improve readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start px-6 pt-32">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
          Your Numerology Journey
        </h1>

        {/* Content container without transparency */}
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 space-y-6 z-20">
          {questions.map((item, index) => (
            <div key={index}>
              {/* Question */}
              <div
                className="flex justify-between items-center cursor-pointer font-bold text-black text-lg"
                onClick={() => toggle(index)}
              >
                <span>{item.q}</span>
                <span>{openIndex === index ? "−" : "+"}</span>
              </div>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="mt-2 p-4 bg-gray-100 text-black rounded">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
