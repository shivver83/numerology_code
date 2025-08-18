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

      {/* Video Background Container */}
      <div className="video-background">
        <video autoPlay muted loop playsInline>
          <source src="/numerology.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay to darken video */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Content on top of video */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start text-white px-6 pt-32">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center drop-shadow-lg">
          Your Numerology Journey
        </h1>

        <div className="w-full max-w-4xl space-y-6">
          {questions.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-4 text-left text-lg font-semibold text-white"
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
                    {/* Answer with white font */}
                    <div className="p-4 text-base leading-relaxed text-white">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
