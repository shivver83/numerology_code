// src/Journey.tsx
import { useState, useEffect } from "react";
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
  const [analysis, setAnalysis] = useState<string[]>([]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Populate analysis programmatically (like app.tsx)
  useEffect(() => {
    const tempAnalysis: string[] = [];
    questions.forEach((item) => {
      tempAnalysis.push(item.a);
    });
    setAnalysis(tempAnalysis);
  }, []);

  return (
    <>
      <Header />

      {/* Video Background */}
      <div className="video-background fixed inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/numerology.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start px-6 pt-32 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-green-500">
          Your Numerology Journey
        </h1>

        <ul className="w-full max-w-4xl space-y-6">
          {questions.map((item, index) => (
            <li key={index}>
              {/* Question */}
              <div
                className="flex justify-between items-center cursor-pointer font-bold text-white text-lg md:text-xl"
                onClick={() => toggle(index)}
              >
                <span>{item.q}</span>
                <span className="ml-2">{openIndex === index ? "−" : "+"}</span>
              </div>

              {/* Answer from analysis array */}
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="mt-2 font-bold text-white text-lg md:text-lg bg-blue-600 p-3 rounded-md">
                      {analysis[index]}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
