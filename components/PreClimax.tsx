'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PreClimaxProps {
  onComplete: () => void;
}

const PRE_CLIMAX_TEXT = "Hey mi niña preciosa! Estuve esperando mucho para decirte esto y creo que es un buen momento.";

export const PreClimax: React.FC<PreClimaxProps> = ({ onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    // Calculated delay per character so full typing takes ~4.2 seconds + 0.8s hold = 5 seconds total
    const charDelay = Math.floor(4200 / PRE_CLIMAX_TEXT.length);

    const timer = setInterval(() => {
      if (index < PRE_CLIMAX_TEXT.length) {
        setDisplayedText(PRE_CLIMAX_TEXT.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, charDelay);

    // Exact 5 seconds total reading duration before auto-proceeding to flash screen
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A1A] flex flex-col items-center justify-center select-none px-6 text-center">
      <div className="max-w-md space-y-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-serif-title text-xl sm:text-2xl font-bold text-[#FDFBF7] leading-relaxed tracking-wide"
        >
          {displayedText}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block ml-1 w-2.5 h-6 bg-[#D4AF37] align-middle"
          />
        </motion.p>
      </div>
    </div>
  );
};

export default PreClimax;
