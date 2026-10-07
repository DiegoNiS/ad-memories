'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight } from 'lucide-react';

interface LoveLetterProps {
  onNext: () => void;
}

const LETTER_LINES = [
  "Mi amada Angeles,",
  "siento que hay tanto por decirte y tantas formas de expresarlo.",
  "Eres una chica única, bella, preciosa. Eres una princesita para mí.",
  "Mi niña, mi linda Angeles... hermosa.",
  "Llegaste cuando no buscaba nada, pero me di cuenta de que eras exactamente lo que me faltaba para que mi vida estuviera completa.",
  "Me encanta todo de ti y me maravillo contigo todos los días.",
  "Sé que a veces la mente hace ruido y los miedos aparecen.",
  "Pero quiero que sepas algo: a pesar de cualquier caos, siempre voy a buscar sobreexplicarte todo,",
  "voy a cuidar de ti, a darte la seguridad que mereces, a apaciguar tus enredos y a asegurarme de que estés bien y seas inmensamente feliz siempre.",
  "No hay cosa que no haría por ti, porque mi paz la encuentro cuando te veo sonreír.",
  "Eres mi prioridad y quiero amarte con toda mi alma.",
];

export const LoveLetter: React.FC<LoveLetterProps> = ({ onNext }) => {
  const [showFull, setShowFull] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-between w-full max-w-md mx-auto h-[90dvh] pt-[env(safe-area-inset-top,20px)] pb-[env(safe-area-inset-bottom,20px)] px-4 select-none"
    >
      {/* Top Header */}
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
            onClick={() => setShowFull(true)}
            className="text-xs text-[#D4AF37] font-sans-ui font-semibold underline decoration-dotted underline-offset-4 cursor-pointer active:opacity-60"
          >
            Mostrar todo
          </button>
        )}
      </div>

      {/* Main Letter Card - NO AUTO-SCROLL (Focus remains strictly at top) */}
      <div className="relative w-full flex-1 my-3 overflow-hidden rounded-2xl ios-glass border border-[#D4AF37]/35 shadow-2xl flex flex-col">
        {/* Decorative Gold Corners */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/60 rounded-tl z-10" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/60 rounded-tr z-10" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/60 rounded-bl z-10" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/60 rounded-br z-10" />

        {/* Line-by-Line Handwriting Reveal (NO Auto-Scroll) */}
        <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-[#D4AF37]/30 text-[#4A3B32] space-y-4">
          <div className="space-y-3">
            {LETTER_LINES.map((line, idx) => (
              <motion.p
                key={idx}
                initial={showFull ? { opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' } : {
                  clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
                  opacity: 0,
                  y: 4,
                }}
                animate={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1.1,
                  delay: showFull ? 0 : idx * 0.45,
                  ease: [0.25, 1, 0.5, 1],
                }}
                style={{ fontFamily: "'Great Vibes', 'Dancing Script', cursive" }}
                className="font-cursive text-2xl sm:text-3xl leading-relaxed tracking-wide font-semibold text-[#4A3B32]"
              >
                {line}
              </motion.p>
            ))}

            {/* Cursive Signature Line */}
            <motion.div
              initial={showFull ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: showFull ? 0 : LETTER_LINES.length * 0.45 + 0.3,
              }}
              style={{ fontFamily: "'Great Vibes', 'Dancing Script', cursive" }}
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
          <motion.button
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#4A3B32] to-[#634E43] text-white font-serif-title font-semibold text-base shadow-xl flex items-center justify-center space-x-2 border border-[#D4AF37]/40 cursor-pointer"
          >
            <span>Ver Nuestros Sueños</span>
            <ChevronRight className="w-5 h-5 text-[#D4AF37]" />
          </motion.button>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LoveLetter;
