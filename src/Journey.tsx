{/* Fullscreen section with video background */}
<section className="relative min-h-screen flex items-start justify-center text-white overflow-hidden">
  {/* Background video */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover -z-20"
  >
    <source src="/numerology.mp4" type="video/mp4" />
  </video>

  {/* Dark overlay for readability */}
  <div className="absolute inset-0 bg-black/60 -z-10"></div>

  {/* Content shifted upward */}
  <div className="relative z-10 max-w-3xl px-6 pt-24 pb-12 text-center">
    <h1 className="text-2xl md:text-3xl font-bold mb-10 drop-shadow-lg tracking-wide">
      Your Numerology Journey
    </h1>

    {/* Questions */}
    <div className="space-y-6">
      {questions.map((item, index) => (
        <motion.div
          key={index}
          className="rounded-xl shadow-lg 
                     bg-gradient-to-r from-purple-900/60 via-indigo-800/50 to-blue-900/60
                     backdrop-blur-md border border-white/20"
          whileHover={{ scale: 1.02, boxShadow: "0px 0px 25px rgba(200,150,255,0.6)" }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between items-center p-4 text-left text-lg font-semibold"
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
                <div className="p-4 text-base leading-relaxed text-left">
                  {item.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  </div>
</section>
