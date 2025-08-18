// src/Journey.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";

const questions = [
  { q: "What is Numerology?", a: "Numerology is the mystical study of numbers and their influence on human life, personality, and destiny." },
  { q: "How do Numerology work?", a: "Numerology provides remedies by identifying imbalances in your name, date of birth, or life cycles, and suggesting corrections through numbers, mantras, colors, or gemstones." },
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start px-6 pt-32">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-green-400 glow">
          Your Numerology Journey
        </h1>

        {/* White dropdown container with extra spacing */}
        <div className="w-full max-w-4xl space-y-8 z-20"> {/* Increased space-y for more gap */}
          {questions.map((item, index) => (
            <motion.div
              key={index}
              className="rounded-2xl border border-gray-200 shadow-md overflow-hidden mb-6" // mb-6 adds more vertical spacing
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Question with light pink background */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-4 text-left text-lg font-semibold text-black bg-pink-100"
              >
                {item.q}
                <span className="ml-2 text-xl">{openIndex === index ? "−" : "+"}</span>
              </button>

              {/* Answer inside same dropdown with jet bold black */}
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <button
                      className="w-full flex justify-start items-center p-4 text-left text-lg font-bold text-black"
                      disabled
                      style={{ color: "#000000" }}
                    >
                      {item.a}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Glow effect CSS for heading */}
      <style>{`
        .glow {
          text-shadow:
            0 0 5px #aaff00,
            0 0 10px #ccff33,
            0 0 20px #aaff00,
            0 0 30px #ccff33;
          animation: pulseGlow 2s infinite alternate;
        }

        @keyframes pulseGlow {
          0% {
            text-shadow:
              0 0 3px #aaff00,
              0 0 6px #ccff33,
              0 0 10px #aaff00,
              0 0 15px #ccff33;
          }
          100% {
            text-shadow:
              0 0 5px #aaff00,
              0 0 10px #ccff33,
              0 0 20px #aaff00,
              0 0 30px #ccff33;
          }
        }
      `}</style>
    </>
  );
}
