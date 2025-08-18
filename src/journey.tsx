// src/Journey.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    q: "What is Numerology?",
    a: "Numerology is the mystical study of numbers and their influence on human life, personality, and destiny.",
  },
  {
    q: "How will this provide remedies?",
    a: "Numerology provides remedies by identifying imbalances in your name, date of birth, or life cycles, and suggesting corrections through numbers, mantras, colors, or gemstones.",
  },
  {
    q: "What is the correct 'Role & Goal' for me?",
    a: "Based on your numerology chart, we can align your natural strengths with the right role and life goals that bring you fulfillment and success.",
  },
  {
    q: "What career is best for my children?",
    a: "Numerology can reveal your children’s talents and inclinations, helping you guide them toward a career path aligned with their destiny numbers.",
  },
  {
    q: "How can Numerology improve my health?",
    a: "By balancing vibrations in your name and environment, numerology can reduce stress, harmonize energies, and promote better physical and mental well-being.",
  },
  {
    q: "How can Numerology help improve relationships?",
    a: "It reveals compatibility between partners, helps resolve conflicts by understanding personality traits, and guides timing for harmony in relationships.",
  },
];

export default function Journey() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="aboutus-container relative min-h-screen text-white">
      {/* Background video */}
      <video autoPlay muted loop className="background-video absolute inset-0 w-full h-full object-cover -z-10">
        <source src="/numerology.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-black/50 p-6">
        <h1 className="text-4xl font-bold mb-8 drop-shadow-lg">Your Numerology Journey</h1>
        
        <div className="w-full max-w-2xl space-y-4">
          {questions.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-md border border-white/20"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-4 text-left text-lg font-semibold focus:outline-none hover:bg-white/20 transition"
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
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 text-base leading-relaxed">{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
