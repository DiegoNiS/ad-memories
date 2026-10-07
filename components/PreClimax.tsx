'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fontGreatVibes } from '@/app/fonts';
import { Sparkles, Heart } from 'lucide-react';

interface PreClimaxProps {
  onComplete: () => void;
}

const PRE_CLIMAX_TEXT = "Hey mi niña preciosa! Estuve esperando mucho para decirte esto y creo que es el momento perfecto...";

export const PreClimax: React.FC<PreClimaxProps> = ({ onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const charDelay = Math.floor(7000 / PRE_CLIMAX_TEXT.length);

    const timer = setInterval(() => {
      if (index < PRE_CLIMAX_TEXT.length) {
        setDisplayedText(PRE_CLIMAX_TEXT.substring(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, charDelay);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleScreenClick = () => {
    if (isTypingComplete) {
      onComplete();
    }
  };

  return (
    <div
      onClick={handleScreenClick}
      className={`fixed inset-0 z-50 bg-[#12111A] flex flex-col items-center justify-between select-none px-6 py-12 text-center overflow-hidden transition-cursor ${
        isTypingComplete ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      {/* Starry Night Atmosphere & Little Prince Moon Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.15),transparent_70%)] pointer-events-none" />

      {/* Floating Stars */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <motion.div
          animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 left-10 text-[#D4AF37]"
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-28 right-12 text-[#FFF8DC]"
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
        <motion.div
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-36 left-16 text-[#D4AF37]"
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>
      </div>

      {/* Top Accent: The Little Prince Rose SVG Illustration */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="pt-4 z-10 flex flex-col items-center shrink-0"
      >
        <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shadow-lg relative">
          {/* Glass dome over rose */}
          <div className="absolute inset-0 rounded-full border border-white/20 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
          {/* Glowing Little Prince Rose */}
          <Heart className="w-7 h-7 text-[#E63946] fill-[#E63946] drop-shadow-[0_0_12px_rgba(230,57,70,0.8)]" />
        </div>
        <span className="text-[10px] text-[#D4AF37] font-sans uppercase tracking-widest mt-1.5 opacity-80">
          ✦ Fue el tiempo que pasaste con tu rosa ✦
        </span>
      </motion.div>

      {/* Main Typing Text Container (Fixed min height so layout never jumps) */}
      <div className="my-auto z-10 px-2 max-w-md w-full flex flex-col items-center justify-center min-h-[140px] sm:min-h-[160px]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`${fontGreatVibes.className} text-3xl sm:text-4xl text-[#FFF8DC] leading-relaxed tracking-wide font-bold drop-shadow-md text-center`}
        >
          {displayedText}
          {!isTypingComplete && (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block ml-1.5 w-1.5 h-8 bg-[#D4AF37] align-middle rounded-full"
            />
          )}
        </motion.p>
      </div>

      {/* Bottom Section: Little Prince Image (1.5x larger), Quote, Subtitle & Smooth Tap Prompt */}
      <div className="w-full flex flex-col items-center z-10 pb-4 space-y-2 max-w-sm shrink-0">
        {/* Little Prince Image (1.5x larger: w-52 h-52 sm:w-60 sm:h-60) inside bottom container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-52 h-52 sm:w-60 sm:h-60 relative flex items-center justify-center -mb-2"
        >
          <img
            src="/extras/principito_blanco.png"
            alt="El Principito"
            className="w-full h-full object-contain drop-shadow-[0_0_18px_rgba(212,175,55,0.45)]"
          />
        </motion.div>

        {/* Authentic Little Prince Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 1 }}
          className={`${fontGreatVibes.className} text-xl sm:text-2xl text-[#D4AF37] italic text-center leading-snug font-bold drop-shadow-xs`}
        >
          &ldquo;Es mi rosa... no hay otra en el mundo como ella.&rdquo;
        </motion.p>

        {/* Permanent Subtitle */}
        <p className="text-xs text-[#D4AF37] font-serif-title italic tracking-wider opacity-80">
          Para la chica más especial del mundo...
        </p>

        {/* Reserved height for Tap Prompt so appearing never pushes text/image */}
        <div className="h-7 flex items-center justify-center pt-1">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isTypingComplete ? { opacity: [0.4, 1, 0.4] } : { opacity: 0 }}
            transition={
              isTypingComplete
                ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.6 }
            }
            className="text-sm text-[#FFF8DC] font-serif-title tracking-wider font-semibold drop-shadow-sm"
          >
            Presiona en cualquier lugar para continuar ✦
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default PreClimax;
