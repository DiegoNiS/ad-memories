'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClimaxCountdownProps {
  onComplete: () => void;
}

const ROMAN_NUMERALS = ["V", "IV", "III", "II", "I"];

export const ClimaxCountdown: React.FC<ClimaxCountdownProps> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [isFlashed, setIsFlashed] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    // Stage 1: Countdown V..I (1 second each)
    if (index < ROMAN_NUMERALS.length) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (index === ROMAN_NUMERALS.length) {
      // Immediately after "I", trigger background flash to #FDFFF0
      setIsFlashed(true);
      
      // Reveal "Angeles Saico..." shortly after flash
      const nameTimer = setTimeout(() => {
        setShowName(true);
      }, 400);

      // Pause 1.5s after showing name before showing question
      const questionTimer = setTimeout(() => {
        setShowQuestion(true);
      }, 1900); // 400ms + 1500ms pause

      // Move to proposal buttons after user reads question
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 4200);

      return () => {
        clearTimeout(nameTimer);
        clearTimeout(questionTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [index, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-colors duration-200 select-none px-6 ${
        isFlashed ? 'bg-[#FDFFF0]' : 'bg-[#1A1A1A]'
      }`}
    >
      <AnimatePresence mode="wait">
        {!isFlashed ? (
          /* Countdown Roman Numerals */
          <motion.div
            key={ROMAN_NUMERALS[index]}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-serif-title font-extrabold text-6xl sm:text-7xl text-[#D4AF37] tracking-widest drop-shadow-2xl"
          >
            {ROMAN_NUMERALS[index]}
          </motion.div>
        ) : (
          /* Warm White Light Flash Screen Content */
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            {showName && (
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-serif-title text-3xl sm:text-4xl font-bold text-[#4A3B32] tracking-wide"
              >
                Angeles Saico...
              </motion.h1>
            )}

            {showQuestion && (
              <motion.p
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                className="font-serif-title text-2xl sm:text-3xl font-extrabold text-[#D4AF37] tracking-wider drop-shadow-sm"
              >
                ¿Quieres ser mi novia?
              </motion.p>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClimaxCountdown;
