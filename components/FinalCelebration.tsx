'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import { Heart, Sparkles } from 'lucide-react';
import { recordProposalAcceptance } from '@/lib/supabaseClient';
import { getTimeElapsed, padZero, TimeElapsed } from '@/utils/timeHelpers';
import { fontGreatVibes, fontPlayfair } from '@/app/fonts';

const SUNFLOWER_COLORS = [
  '#D4AF37',
  '#FFD700',
  '#FFC107',
  '#FFA000',
  '#F59E0B',
  '#4A3B32',
  '#FFF8DC',
  '#FEF3C7',
];

export const FinalCelebration: React.FC = () => {
  const [acceptedDate, setAcceptedDate] = useState<Date>(new Date());
  const [elapsed, setElapsed] = useState<TimeElapsed>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [windowDimensions, setWindowDimensions] = useState({ width: 390, height: 844 });
  const [isConfettiActive, setIsConfettiActive] = useState(true);

  useEffect(() => {
    // Quiet POST to Supabase table: milestones, type: proposal
    recordProposalAcceptance().then((timestamp) => {
      setAcceptedDate(timestamp);
    });

    if (typeof window !== 'undefined') {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    const confettiTimer = setTimeout(() => {
      setIsConfettiActive(false);
    }, 15000);

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
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2, // Staggered entrance animation
          },
        },
      }}
      className="flex flex-col items-center justify-between w-full max-w-md mx-auto min-h-[90dvh] pt-[env(safe-area-inset-top,20px)] pb-[env(safe-area-inset-bottom,20px)] px-4 select-none relative overflow-hidden text-center"
    >
      {/* Sunflower & Gold Confetti */}
      {isConfettiActive && (
        <ReactConfetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          colors={SUNFLOWER_COLORS}
          numberOfPieces={190}
          recycle={true}
          gravity={0.14}
          style={{ position: 'fixed', inset: 0, zIndex: 100, pointerEvents: 'none' }}
        />
      )}

      {/* Main Header with Favorite Photo Together */}
      <div className="w-full text-center space-y-3 pt-4 z-10">
        {/* Favorite Photo Together Frame */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.8, rotate: -3 },
            visible: { opacity: 1, scale: 1, rotate: 0 },
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="inline-block relative p-2 bg-white rounded-2xl border-2 border-[#D4AF37]/50 shadow-2xl mb-1"
        >
          <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-xl overflow-hidden relative shadow-inner border border-[#4A3B32]/10">
            <img
              src="/photos/primera-foto.png"
              alt="Nuestra foto favorita"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.endsWith('.png')) {
                  target.src = target.src.replace('.png', '.jpg');
                } else {
                  target.src = '/photos/abrazados-sonriendo.png';
                }
              }}
            />
            <Heart className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37] absolute bottom-2 right-2 drop-shadow" />
          </div>
          {/* Subtle tape sticker at top */}
          <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 w-16 h-5 bg-[#D4AF37]/30 backdrop-blur-xs rounded-xs border border-white/80 shadow-xs" />
        </motion.div>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0 },
          }}
          className={`${fontPlayfair.className} text-3xl sm:text-4xl font-extrabold text-[#4A3B32] tracking-wide`}
        >
          Sabía que dirías que sí. ❤️
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0 },
          }}
          className={`${fontGreatVibes.className} text-2xl sm:text-3xl text-[#4A3B32] px-3 leading-relaxed font-bold`}
        >
          &ldquo;Eres mi niña hermosa, mi princesita y mi lugar seguro. Te prometo cuidar de ti con toda mi alma siempre.&rdquo;
        </motion.p>
      </div>

      {/* Official Romance Counter Section */}
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1 },
        }}
        className="w-full my-auto py-4 z-10 space-y-3"
      >
        <div className="text-center space-y-1">
          <div className="inline-flex items-center space-x-1.5 text-[#D4AF37] text-xs font-serif-title uppercase font-bold tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>NUESTRA HISTORIA OFICIAL</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="text-sm font-sans-ui font-semibold text-[#4A3B32]">
            Tiempo siendo enamorados oficiales:
          </p>
        </div>

        {/* Live Timer Grid */}
        <div className="grid grid-cols-4 gap-2 px-1">
          {/* Days */}
          <div className="ios-glass p-3.5 rounded-xl flex flex-col items-center justify-center border border-[#D4AF37]/35 shadow-md">
            <span className={`${fontPlayfair.className} text-2xl font-extrabold text-[#4A3B32]`}>
              {elapsed.days}
            </span>
            <span className="text-[10px] font-sans-ui font-bold text-[#D4AF37] uppercase tracking-wider mt-0.5">
              Días
            </span>
          </div>

          {/* Hours */}
          <div className="ios-glass p-3.5 rounded-xl flex flex-col items-center justify-center border border-[#D4AF37]/35 shadow-md">
            <span className={`${fontPlayfair.className} text-2xl font-extrabold text-[#4A3B32]`}>
              {padZero(elapsed.hours)}
            </span>
            <span className="text-[10px] font-sans-ui font-bold text-[#D4AF37] uppercase tracking-wider mt-0.5">
              Horas
            </span>
          </div>

          {/* Minutes */}
          <div className="ios-glass p-3.5 rounded-xl flex flex-col items-center justify-center border border-[#D4AF37]/35 shadow-md">
            <span className={`${fontPlayfair.className} text-2xl font-extrabold text-[#4A3B32]`}>
              {padZero(elapsed.minutes)}
            </span>
            <span className="text-[10px] font-sans-ui font-bold text-[#D4AF37] uppercase tracking-wider mt-0.5">
              Min
            </span>
          </div>

          {/* Seconds */}
          <div className="ios-glass p-3.5 rounded-xl flex flex-col items-center justify-center border border-[#D4AF37]/35 shadow-md">
            <motion.span
              key={elapsed.seconds}
              initial={{ scale: 1.2, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`${fontPlayfair.className} text-2xl font-extrabold text-[#4A3B32]`}
            >
              {padZero(elapsed.seconds)}
            </motion.span>
            <span className="text-[10px] font-sans-ui font-bold text-[#D4AF37] uppercase tracking-wider mt-0.5">
              Seg
            </span>
          </div>
        </div>
      </motion.div>

      {/* Footer Branding Signature (Goal list excluded as requested) */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        className={`${fontGreatVibes.className} flex items-center justify-center space-x-2 text-3xl text-[#D4AF37] font-bold z-10 pb-4`}
      >
        <Heart className="w-5 h-5 fill-[#D4AF37]" />
        <span>Diego &amp; Angeles • Para Siempre</span>
        <Heart className="w-4 h-4 fill-[#D4AF37]" />
      </motion.div>
    </motion.div>
  );
};

export default FinalCelebration;
