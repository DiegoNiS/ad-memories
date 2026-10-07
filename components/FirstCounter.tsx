'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, Sparkles } from 'lucide-react';
import { getTimeElapsed, padZero, TimeElapsed } from '@/utils/timeHelpers';

interface FirstCounterProps {
  onNext: () => void;
}

export const FirstCounter: React.FC<FirstCounterProps> = ({ onNext }) => {
  const [elapsed, setElapsed] = useState<TimeElapsed>(getTimeElapsed());

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(getTimeElapsed());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-between w-full max-w-md mx-auto min-h-[85dvh] pt-[env(safe-area-inset-top,20px)] pb-[env(safe-area-inset-bottom,20px)] px-4 select-none"
    >
      {/* Header section */}
      <div className="w-full text-center pt-4 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#4A3B32]">
          <Clock className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs font-serif-title font-semibold tracking-wider">
            NUESTRA HISTORIA
          </span>
        </div>

        <h2 className="font-serif-title text-[#4A3B32] text-xl font-bold leading-snug px-2">
          Todo empezó con un &ldquo;Hola&rdquo; el 6 de septiembre de 2026 a las 11:25 PM.
        </h2>

        <p className="text-sm text-[#4A3B32]/75 font-sans tracking-wide">
          Desde ese instante, han pasado:
        </p>
      </div>

      {/* Counter Cards Grid */}
      <div className="w-full my-6 grid grid-cols-2 gap-3.5 px-2">
        {/* Days */}
        <motion.div
          whileHover={{ y: -2 }}
          className="ios-glass p-4 rounded-2xl flex flex-col items-center justify-center border border-[#D4AF37]/30 shadow-lg"
        >
          <span className="font-serif-title text-3xl font-extrabold text-[#4A3B32] tracking-tight">
            {elapsed.days}
          </span>
          <span className="text-[11px] font-sans font-semibold text-[#D4AF37] tracking-widest uppercase mt-1">
            Días
          </span>
        </motion.div>

        {/* Hours */}
        <motion.div
          whileHover={{ y: -2 }}
          className="ios-glass p-4 rounded-2xl flex flex-col items-center justify-center border border-[#D4AF37]/30 shadow-lg"
        >
          <span className="font-serif-title text-3xl font-extrabold text-[#4A3B32] tracking-tight">
            {padZero(elapsed.hours)}
          </span>
          <span className="text-[11px] font-sans font-semibold text-[#D4AF37] tracking-widest uppercase mt-1">
            Horas
          </span>
        </motion.div>

        {/* Minutes */}
        <motion.div
          whileHover={{ y: -2 }}
          className="ios-glass p-4 rounded-2xl flex flex-col items-center justify-center border border-[#D4AF37]/30 shadow-lg"
        >
          <span className="font-serif-title text-3xl font-extrabold text-[#4A3B32] tracking-tight">
            {padZero(elapsed.minutes)}
          </span>
          <span className="text-[11px] font-sans font-semibold text-[#D4AF37] tracking-widest uppercase mt-1">
            Minutos
          </span>
        </motion.div>

        {/* Seconds */}
        <motion.div
          whileHover={{ y: -2 }}
          className="ios-glass p-4 rounded-2xl flex flex-col items-center justify-center border border-[#D4AF37]/30 shadow-lg relative overflow-hidden"
        >
          <motion.span
            key={elapsed.seconds}
            initial={{ scale: 1.15, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="font-serif-title text-3xl font-extrabold text-[#4A3B32] tracking-tight"
          >
            {padZero(elapsed.seconds)}
          </motion.span>
          <span className="text-[11px] font-sans font-semibold text-[#D4AF37] tracking-widest uppercase mt-1">
            Segundos
          </span>
        </motion.div>
      </div>

      {/* Footer text and Next Button */}
      <div className="w-full text-center space-y-5 pb-4 px-2">
        <p className="text-sm text-[#4A3B32]/90 font-serif-title italic leading-relaxed px-3">
          &ldquo;Y después de todo este tiempo conociendo a la mujer más increíble, tengo una petición importante que hacerte...&rdquo;
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={onNext}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#4A3B32] to-[#634E43] text-white font-serif-title font-semibold text-base shadow-xl flex items-center justify-center space-x-2 border border-[#D4AF37]/40 cursor-pointer"
        >
          <span>Siguiente</span>
          <Sparkles className="w-5 h-5 text-[#D4AF37]" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FirstCounter;
