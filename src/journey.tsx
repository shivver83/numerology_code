// src/Journey.tsx
import { useState } from "react";

const faqs = [
  {
    question: "What is Numerology?",
    answer:
      "Numerology is the mystical study of numbers and how they influence our lives. It helps reveal personality traits, strengths, weaknesses, and life patterns through numbers derived from names and birthdates.",
  },
  {
    question: "How will this provide remedies?",
    answer:
      "Based on your numerology chart, remedies such as using specific numbers, colors, mantras, or name corrections can balance your energies and bring positive outcomes.",
  },
  {
    question: "What is the correct 'Role & Goal' for me?",
    answer:
      "Numerology helps identify your life path and destiny number, guiding you toward the right role in life and the goals that align with your strengths.",
  },
  {
    question: "What career is best for my children?",
    answer:
      "By analyzing your children's birth numbers and destiny numbers, numerology suggests career paths where they are most likely to succeed and feel fulfilled.",
  },
  {
    question: "How can Numerology improve my health?",
    answer:
      "Numbers are linked with energies of the body. By balancing these numbers through remedies, numerology may help reduce stress, improve mental clarity, and support better lifestyle choices.",
  },
  {
    question: "How can Numerology help improve relationships?",
    answer:
      "Numerology highlights compatibility and differences between people’s numbers. It provides guidance on how to nurture harmony, resolve conflicts, and strengthen bonds.",
  },
];

export default function Journey() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="aboutus-container relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="background-video absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/numerology.mp4" type="video/mp4" />
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-50 text-white p-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Numerology Journey</h1>
        <div className="w-full max-w-2xl">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 py-4 cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <p className="text-lg font-semibold">{faq.question}</p>
              {openIndex === index && (
                <p className="mt-2 text-base text-gray-200">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

