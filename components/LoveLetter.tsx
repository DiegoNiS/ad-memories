'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight } from 'lucide-react';

interface LoveLetterProps {
  onNext: () => void;
}

const PARAGRAPH_1 =
  "Mi amada Angeles, siento que hay tanto por decirte y tantas formas de expresarlo. Eres una chica única, bella, preciosa. Eres una princesita para mí. Mi niña, mi linda Angeles... hermosa. Llegaste cuando no buscaba nada, pero me di cuenta de que eras exactamente lo que me faltaba para que mi vida estuviera completa. Me encanta todo de ti y me maravillo contigo todos los días.";

const PARAGRAPH_2 =
  "Sé que a veces la mente hace ruido y los miedos aparecen. Pero quiero que sepas algo: a pesar de cualquier caos, siempre voy a buscar sobreexplicarte todo, voy a cuidar de ti, a darte la seguridad que mereces, a apaciguar tus enredos y a asegurarme de que estés bien y seas inmensamente feliz siempre. No hay cosa que no haría por ti, porque mi paz la encuentro cuando te veo sonreír. Eres mi prioridad y quiero amarte con toda mi alma.";

export const LoveLetter: React.FC<LoveLetterProps> = ({ onNext }) => {
  const [showFull, setShowFull] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0);

  useEffect(() => {
    // Smooth left-to-right fluid handwriting mask reveal (0% to 100%)
    const duration = 4000; // 4 seconds total smooth handwriting sweep
    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setRevealProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setShowFull(true);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const handleSkip = () => {
    setRevealProgress(100);
    setShowFull(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-between w-full max-w-md mx-auto h-[90dvh] pt-[env(safe-area-inset-top,20px)] pb-[env(safe-area-inset-bottom,20px)] px-4 select-none"
    >
      {/* Header */}
      <div className="w-full flex items-center justify-between py-2 border-b border-[#D4AF37]/25 pb-2">
        <div className="flex items-center space-x-2">
          <Heart className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
          <span
            style={{ fontFamily: "'Great Vibes', 'Dancing Script', cursive" }}
            className="font-cursive text-[#4A3B32] font-bold text-3xl sm:text-4xl tracking-wide"
          >
            De Diego Para Angeles
          </span>
        </div>

        {!showFull && (
          <button
            onClick={handleSkip}
            className="text-xs text-[#D4AF37] font-sans-ui font-semibold underline decoration-dotted underline-offset-4 cursor-pointer active:opacity-60"
          >
            Mostrar todo
          </button>
        )}
      </div>

      {/* Main Letter Card - NO AUTO-SCROLL (Scroll focus stays at top) */}
      <div className="relative w-full flex-1 my-3 overflow-hidden rounded-2xl ios-glass border border-[#D4AF37]/35 shadow-2xl flex flex-col">
        {/* Decorative Gold Corners */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/60 rounded-tl" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/60 rounded-tr" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/60 rounded-bl" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/60 rounded-br" />

        {/* Cursive Handwriting Letter Container with Left-to-Right Mask Wipe (NO Auto Scroll) */}
        <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-[#D4AF37]/30 text-[#4A3B32] space-y-4">
          <div className="relative">
            {/* Paragraph 1 */}
            <p
              style={{
                fontFamily: "'Great Vibes', 'Dancing Script', cursive",
                clipPath: showFull ? 'none' : `polygon(0 0, ${Math.min(revealProgress * 2, 100)}% 0, ${Math.min(revealProgress * 2, 100)}% 100%, 0 100%)`,
                transition: 'clip-path 0.05s linear',
              }}
              className="font-cursive text-2xl sm:text-3xl leading-relaxed tracking-wide font-semibold"
            >
              {PARAGRAPH_1}
            </p>

            {/* Paragraph 2 */}
            <p
              style={{
                fontFamily: "'Great Vibes', 'Dancing Script', cursive",
                clipPath: showFull ? 'none' : `polygon(0 0, ${Math.max(0, (revealProgress - 50) * 2)}% 0, ${Math.max(0, (revealProgress - 50) * 2)}% 100%, 0 100%)`,
                transition: 'clip-path 0.05s linear',
              }}
              className="font-cursive text-2xl sm:text-3xl leading-relaxed tracking-wide font-semibold mt-4"
            >
              {PARAGRAPH_2}
            </p>

            {/* Cursive Signature */}
            <motion.div
              style={{ fontFamily: "'Great Vibes', 'Dancing Script', cursive" }}
              animate={{ opacity: revealProgress > 90 || showFull ? 1 : 0 }}
              className="pt-6 text-right font-cursive text-3xl sm:text-4xl text-[#D4AF37] font-bold"
            >
              ~ Con todo mi amor, Diego ❤️
            </motion.div>
          </div>
        </div>
      </div>

      {/* Action Footer Button */}
      <div className="w-full h-14 flex items-center justify-center">
        <AnimatePresence>
          {(revealProgress > 80 || showFull) && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#4A3B32] to-[#634E43] text-white font-serif-title font-semibold text-base shadow-xl flex items-center justify-center space-x-2 border border-[#D4AF37]/40 cursor-pointer"
            >
              <span>Ver Nuestros Sueños</span>
              <ChevronRight className="w-5 h-5 text-[#D4AF37]" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LoveLetter;
