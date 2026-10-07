'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight } from 'lucide-react';

interface LoveLetterProps {
  onNext: () => void;
}

const INTENSE_LETTER_TEXT =
  "Mi amada Angeles, no sé por dónde empezar... siento que hay tanto por decir. Para empezar, quisiera mencionar que eres una chica única, bella, preciosa. Eres una princesita para mí. Mi niña, mi linda Angeles... hermosa. Llegaste cuando no buscaba nada, pero me di cuenta de que eras exactamente lo que me faltaba para que mi vida estuviera completa. Me encanta todo de ti y me maravillo contigo todos los días.\n\nSé que a veces la mente hace ruido y los miedos aparecen. Pero quiero que sepas algo: a pesar de cualquier caos, siempre voy a buscar sobreexplicarte todo, voy a cuidar de ti, a darte la seguridad que mereces, a apaciguar tus enredos y a asegurarme de que estés bien y seas inmensamente feliz siempre. No hay cosa que no haría por ti, porque mi paz la encuentro cuando te veo sonreír. Eres mi prioridad y quiero amarte con toda mi alma.";

export const LoveLetter: React.FC<LoveLetterProps> = ({ onNext }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < INTENSE_LETTER_TEXT.length) {
        setDisplayedText(INTENSE_LETTER_TEXT.substring(0, index + 1));
        index++;

        if (letterRef.current) {
          letterRef.current.scrollTop = letterRef.current.scrollHeight;
        }
      } else {
        setIsCompleted(true);
        clearInterval(timer);
      }
    }, 28); // Fast 28ms typewriter reveal

    return () => clearInterval(timer);
  }, []);

  const handleSkip = () => {
    setDisplayedText(INTENSE_LETTER_TEXT);
    setIsCompleted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-between w-full max-w-md mx-auto h-[90dvh] pt-[env(safe-area-inset-top,20px)] pb-[env(safe-area-inset-bottom,20px)] px-4 select-none"
    >
      {/* Top Header */}
      <div className="w-full flex items-center justify-between py-2">
        <div className="flex items-center space-x-2">
          <Heart className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
          <span className="font-serif-title text-[#4A3B32] font-semibold text-lg">
            Para Mi Princesita
          </span>
        </div>

        {!isCompleted && (
          <button
            onClick={handleSkip}
            className="text-xs text-[#D4AF37] font-sans underline decoration-dotted underline-offset-4 cursor-pointer active:opacity-60"
          >
            Mostrar todo
          </button>
        )}
      </div>

      {/* Main Letter Card */}
      <div className="relative w-full flex-1 my-3 overflow-hidden rounded-2xl ios-glass border border-[#D4AF37]/35 shadow-2xl flex flex-col">
        {/* Decorative Gold Corners */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/60 rounded-tl" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/60 rounded-tr" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/60 rounded-bl" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/60 rounded-br" />

        {/* Scrollable Letter Content */}
        <div
          ref={letterRef}
          className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-[#D4AF37]/30 text-[#4A3B32] font-sans text-base leading-relaxed tracking-wide"
        >
          <p className="whitespace-pre-line font-medium">
            {displayedText}
            {!isCompleted && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block ml-0.5 w-2 h-4 bg-[#D4AF37] align-middle"
              />
            )}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="w-full h-14 flex items-center justify-center">
        <AnimatePresence>
          {isCompleted && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#4A3B32] to-[#634E43] text-white font-serif-title font-semibold text-base shadow-xl flex items-center justify-center space-x-2 border border-[#D4AF37]/40 cursor-pointer"
            >
              <span>Continuar</span>
              <ChevronRight className="w-5 h-5 text-[#D4AF37]" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LoveLetter;
