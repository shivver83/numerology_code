// src/Journey.tsx
import { useState } from "react";
import Header from "./Header";

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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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

        {/* Dropdown */}
        <div className="w-full max-w-2xl mb-6">
          <select
            className="w-full p-4 text-lg font-semibold rounded-xl bg-white/10 text-white glow focus:outline-none"
            value={selectedIndex ?? ""}
            onChange={(e) => setSelectedIndex(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">Select a question</option>
            {questions.map((item, index) => (
              <option key={index} value={index}>
                {item.q}
              </option>
            ))}
          </select>
        </div>

        {/* Answer Panel */}
        {selectedIndex !== null && (
          <div className="w-full max-w-4xl p-6 text-base font-bold text-white rounded-xl bg-blue-600">
            {questions[selectedIndex].a}
          </div>
        )}
      </div>

      {/* Glow effect CSS for heading */}
      <style>{`
        .glow {
          text-shadow: 0 0 5px #aaff00, 0 0 10px #ccff33, 0 0 20px #aaff00, 0 0 30px #ccff33;
          animation: pulseGlow 2s infinite alternate;
        }
        @keyframes pulseGlow {
          0% { text-shadow: 0 0 3px #aaff00, 0 0 6px #ccff33, 0 0 10px #aaff00, 0 0 15px #ccff33; }
          100% { text-shadow: 0 0 5px #aaff00, 0 0 10px #ccff33, 0 0 20px #aaff00, 0 0 30px #ccff33; }
        }
      `}</style>
    </>
  );
}
