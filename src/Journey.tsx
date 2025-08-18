// src/Journey.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";

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

      <div className="relative min-h-screen text-white">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover -z-10"
        >
          <source src="/numerology.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-black/60 p-6">
          {/* Smaller heading */}
          <h1 className="text-xl md:text-2xl font-bold mb-8 drop-shadow-lg tracking-wide">
            Your Numerology Journey
          </h1>

          {/* Questions */}
          <div className="w-full max-w-2xl space-y-8">
            {questions.map((item, index) => (
              <motion.div
                key={index}
                className="rounded-2xl overflow-hidden shadow-2xl 
                           bg-gradient-to-r from-purple-900/50 via-indigo-800/40 to-blue-900/50
                           backdrop-blur-xl border border-white/20 relative"
                whileHover={{ scale: 1.02, boxShadow: "0px 0px 25px rgba(180,130,255,0.6)" }}
                transition={{ duration: 0.4 }}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center p-5 text-left text-lg font-semibold focus:outline-none"
                >
                  {item.q}
                  <span className="ml-2 text-xl">{openIndex === index ? "−" : "+"}</span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 text-base leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Flowing glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 blur-2xl animate-pulse -z-10"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
