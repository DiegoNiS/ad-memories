'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import { Heart, Sparkles, Compass, Sun } from 'lucide-react';
import { recordProposalAcceptance } from '@/lib/supabaseClient';
import { getTimeElapsed, padZero, TimeElapsed } from '@/utils/timeHelpers';

// Colors: Yellows, Golds, Sunflowers, Warm Terracotta
const SUNFLOWER_COLORS = [
  '#D4AF37',
  '#FFD700',
  '#FFC107',
  '#FFA000',
  '#F59E0B',
  '#4A3B32',
  '#FFF8DC',
  '#FEF3C7'
];

export const FinalCelebration: React.FC = () => {
  const [acceptedDate, setAcceptedDate] = useState<Date>(new Date());
  const [elapsed, setElapsed] = useState<TimeElapsed>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [windowDimensions, setWindowDimensions] = useState({ width: 390, height: 844 });
  const [isConfettiActive, setIsConfettiActive] = useState(true);

  useEffect(() => {
    // Record timestamp in Supabase
    recordProposalAcceptance().then((timestamp) => {
      setAcceptedDate(timestamp);
    });

    // Update window dimensions for confetti
    if (typeof window !== 'undefined') {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Stop intense confetti after 12 seconds to preserve performance
    const confettiTimer = setTimeout(() => {
      setIsConfettiActive(false);
    }, 12000);

    return () => clearTimeout(confettiTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(getTimeElapsed(acceptedDate, new Date()));
    }, 1000);

    return () => clearInterval(timer);
  }, [acceptedDate]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 25 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-between w-full max-w-md mx-auto min-h-[90dvh] pt-[env(safe-area-inset-top,20px)] pb-[env(safe-area-inset-bottom,20px)] px-4 select-none relative overflow-hidden"
    >
      {/* Confetti canvas overlay */}
      {isConfettiActive && (
        <ReactConfetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          colors={SUNFLOWER_COLORS}
          numberOfPieces={160}
          recycle={true}
          gravity={0.15}
          style={{ position: 'fixed', inset: 0, zIndex: 100, pointerEvents: 'none' }}
        />
      )}

      {/* Main Card */}
      <div className="w-full text-center space-y-4 pt-6 z-10">
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-[#FFD700] via-[#D4AF37] to-[#F59E0B] shadow-2xl border-4 border-white mb-2"
        >
          <Sun className="w-10 h-10 text-white fill-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif-title text-3xl sm:text-4xl font-extrabold text-[#4A3B32] tracking-wide"
        >
          Sabía que dirías que sí. ❤️
        </motion.h1>

        <p className="text-sm font-serif-title italic text-[#4A3B32]/85 px-4 leading-relaxed">
          &ldquo;Prometo cuidar de ti, apoyarte en cada paso y hacer de nuestra vida un viaje lleno de amor y sonrisas.&rdquo;
        </p>
      </div>

      {/* Official Romance Counter Section */}
      <div className="w-full my-auto py-4 z-10 space-y-3">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center space-x-1.5 text-[#D4AF37] text-xs font-serif-title uppercase font-bold tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>NUESTRO TIEMPO OFICIAL</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="text-xs text-[#4A3B32]/75 font-sans font-medium">
            Tiempo construyendo nuestra historia oficial:
          </p>
        </div>

        {/* Live Timer Grid */}
        <div className="grid grid-cols-4 gap-2 px-1">
          {/* Days */}
          <div className="ios-glass p-3 rounded-xl flex flex-col items-center justify-center border border-[#D4AF37]/30 shadow-md">
            <span className="font-serif-title text-xl font-bold text-[#4A3B32]">
              {elapsed.days}
            </span>
            <span className="text-[9px] font-sans font-bold text-[#D4AF37] uppercase tracking-wider mt-0.5">
              Días
            </span>
          </div>

          {/* Hours */}
          <div className="ios-glass p-3 rounded-xl flex flex-col items-center justify-center border border-[#D4AF37]/30 shadow-md">
            <span className="font-serif-title text-xl font-bold text-[#4A3B32]">
              {padZero(elapsed.hours)}
            </span>
            <span className="text-[9px] font-sans font-bold text-[#D4AF37] uppercase tracking-wider mt-0.5">
              Horas
            </span>
          </div>

          {/* Minutes */}
          <div className="ios-glass p-3 rounded-xl flex flex-col items-center justify-center border border-[#D4AF37]/30 shadow-md">
            <span className="font-serif-title text-xl font-bold text-[#4A3B32]">
              {padZero(elapsed.minutes)}
            </span>
            <span className="text-[9px] font-sans font-bold text-[#D4AF37] uppercase tracking-wider mt-0.5">
              Min
            </span>
          </div>

          {/* Seconds */}
          <div className="ios-glass p-3 rounded-xl flex flex-col items-center justify-center border border-[#D4AF37]/30 shadow-md">
            <motion.span
              key={elapsed.seconds}
              initial={{ scale: 1.2, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-serif-title text-xl font-bold text-[#4A3B32]"
            >
              {padZero(elapsed.seconds)}
            </motion.span>
            <span className="text-[9px] font-sans font-bold text-[#D4AF37] uppercase tracking-wider mt-0.5">
              Seg
            </span>
          </div>
        </div>
      </div>

      {/* Romantic Future Promises Card */}
      <div className="w-full ios-glass p-4 rounded-2xl border border-[#D4AF37]/40 shadow-xl z-10 space-y-2 text-left mb-4">
        <div className="flex items-center space-x-2 text-[#4A3B32] border-b border-[#D4AF37]/20 pb-2">
          <Compass className="w-4 h-4 text-[#D4AF37]" />
          <span className="font-serif-title font-bold text-xs uppercase tracking-wider">
            Nuestras próximas aventuras
          </span>
        </div>
        <ul className="text-xs text-[#4A3B32]/85 font-sans space-y-1.5 list-disc list-inside">
          <li>Viajar juntos y descubrir lugares increíbles.</li>
          <li>Pijamadas con mascarillas faciales y buenas películas.</li>
          <li>Lomo saltado preparado con todo el amor.</li>
          <li>Construir un futuro firme e inquebrantable.</li>
        </ul>
      </div>

      <div className="flex items-center justify-center space-x-1 text-xs text-[#D4AF37] font-serif-title font-semibold z-10 pb-2">
        <Heart className="w-3.5 h-3.5 fill-[#D4AF37]" />
        <span>A & D • Para Siempre</span>
        <Heart className="w-3.5 h-3.5 fill-[#D4AF37]" />
      </div>
    </motion.div>
  );
};

export default FinalCelebration;
