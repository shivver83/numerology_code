// src/Journey.tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Numerology?",
    answer:
      "Numerology is the mystical study of numbers and their influence on human life, personality, and destiny.",
  },
  {
    question: "How will this provide remedies?",
    answer:
      "Numerology suggests personalized remedies through numbers, names, and vibrations to balance energies in life.",
  },
  {
    question: "What is correct 'Role & Goal' for me?",
    answer:
      "Numerology helps identify your life path number and guides you towards the most aligned role and goal in life.",
  },
  {
    question: "What career is best for my children?",
    answer:
      "By analyzing their birth date and name numbers, Numerology can suggest career paths most suitable for their growth.",
  },
  {
    question: "How Numerology can improve my health?",
    answer:
      "Certain numbers are linked to energy imbalances. Remedies through name corrections and vibrations may help overall health.",
  },
  {
    question: "How Numerology can help improve relationships?",
    answer:
      "Numerology identifies compatibility between partners and provides remedies to harmonize personal and professional relationships.",
  },
];

export default function Journey() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="aboutus-container relative w-full h-screen text-white">
      {/* Background Video */}
      <video autoPlay muted loop className="background-video absolute inset-0 w-full h-full object-cover -z-10">
        <source src="/numerology.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 -z-10" />

      {/* Accordion Section */}
      <div className="flex items-center justify-center h-full px-4">
        <div className="w-full max-w-3xl space-y-4">
          <h1 className="text-3xl font-bold text-center mb-6">Your Numerology Journey</h1>

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-lg font-medium text-left hover:bg-white/20 transition-all"
              >
                {faq.question}
                <ChevronDown
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer with smooth slide animation */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-4 text-base leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
