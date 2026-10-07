'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundPattern: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#FDFBF7] overflow-hidden pointer-events-none select-none">
      {/* Soft Ambient Radial Glows */}
      <div 
        className="absolute -top-[20%] -left-[10%] w-[140%] h-[70%] rounded-full opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(253,251,247,0) 70%)',
        }}
      />
      <div 
        className="absolute -bottom-[20%] -right-[10%] w-[140%] h-[70%] rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(74,59,50,0.12) 0%, rgba(253,251,247,0) 70%)',
        }}
      />

      {/* SVG Container centered for the grand letter 'D' made of 'te amo' text pattern */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-full h-full max-w-lg max-h-[80vh] opacity-[0.08] transition-opacity duration-1000"
          viewBox="0 0 400 500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Pattern repeating 'te amo' text in minuscule grid */}
            <pattern
              id="teAmoPattern"
              x="0"
              y="0"
              width="48"
              height="20"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(-15)"
            >
              <text
                x="2"
                y="14"
                fill="#4A3B32"
                fontSize="9.5"
                fontFamily="Playfair Display, Cinzel, serif"
                fontWeight="700"
                letterSpacing="0.5"
              >
                te amo
              </text>
            </pattern>
          </defs>

          {/* Grand Letter D filled exclusively with the 'te amo' pattern */}
          <path
            d="M 100 70 L 220 70 C 310 70 340 130 340 250 C 340 370 310 430 220 430 L 100 430 Z M 150 120 L 150 380 L 210 380 C 270 380 290 330 290 250 C 290 170 270 120 210 120 Z"
            fill="url(#teAmoPattern)"
          />
        </svg>
      </div>

      {/* Dynamic Floating Decorative Sparkles */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-8 w-2 h-2 rounded-full bg-[#D4AF37]"
      />
      <motion.div
        animate={{
          y: [0, 15, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-1/3 right-10 w-3 h-3 rounded-full bg-[#D4AF37]/50 blur-[1px]"
      />
    </div>
  );
};

export default BackgroundPattern;
