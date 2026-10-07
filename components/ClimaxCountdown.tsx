'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClimaxCountdownProps {
  onComplete: () => void;
}

const THREE_SEC_ROMAN = ["III", "II", "I"];

export const ClimaxCountdown: React.FC<ClimaxCountdownProps> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [isFlashed, setIsFlashed] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Stage 1: Fast 3-second Countdown (1s per numeral: III -> II -> I)
    if (index < THREE_SEC_ROMAN.length) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (index === THREE_SEC_ROMAN.length) {
      // Abrupt background flash to warm white #FDFFF0 immediately after "I"
      setIsFlashed(true);
      
      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 350);

      // Move to proposal buttons after user reads message
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 4200);

      return () => {
        clearTimeout(contentTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [index, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-colors duration-200 select-none px-6 text-center ${
        isFlashed ? 'bg-[#FDFFF0]' : 'bg-[#1A1A1A]'
      }`}
    >
      <AnimatePresence mode="wait">
        {!isFlashed ? (
          /* Fast 3-second Roman Numerals Countdown (III, II, I) */
          <motion.div
            key={THREE_SEC_ROMAN[index]}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.3, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="font-serif-title font-extrabold text-7xl sm:text-8xl text-[#D4AF37] tracking-widest drop-shadow-2xl"
          >
            {THREE_SEC_ROMAN[index]}
          </motion.div>
        ) : (
          /* Warm White Light Flash Screen Content */
          <div className="flex flex-col items-center justify-center space-y-6 max-w-md">
            {showContent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 16,
                }}
                className="space-y-5"
              >
                <h1 className="font-serif-title text-xl sm:text-2xl font-bold text-[#4A3B32] leading-relaxed">
                  Hey mi niña preciosa! Estuve esperando mucho para decirte esto y creo que es un buen momento.
                </h1>

                <p className="font-serif-title text-3xl sm:text-4xl font-extrabold text-[#D4AF37] tracking-wider drop-shadow-sm pt-2">
                  ¿Quieres ser mi novia?
                </p>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClimaxCountdown;
