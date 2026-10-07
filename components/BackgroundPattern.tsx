'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fontGreatVibes } from '@/app/fonts';

export const BackgroundPattern: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#FDFBF7] overflow-hidden pointer-events-none select-none">
      {/* Soft Ambient Glows */}
      <div 
        className="absolute -top-[20%] -left-[10%] w-[140%] h-[70%] rounded-full opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(253,251,247,0) 70%)',
        }}
      />
      <div 
        className="absolute -bottom-[20%] -right-[10%] w-[140%] h-[70%] rounded-full opacity-35 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(243,229,171,0.25) 0%, rgba(253,251,247,0) 70%)',
        }}
      />

      {/* EASTER EGG 1: Intertwined Names "Diego & Angeles" in Calligraphy */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-full max-w-md h-auto opacity-[0.08] transition-opacity duration-1000"
          viewBox="0 0 500 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="#4A3B32"
            fontSize="56"
            className={fontGreatVibes.className}
            fontStyle="italic"
            fontWeight="bold"
            letterSpacing="2"
          >
            Diego &amp; Angeles
          </text>
        </svg>
      </div>

      {/* EASTER EGG 2: Flying Birds Silhouettes across Top */}
      <motion.div
        initial={{ x: '-20vw', y: 0 }}
        animate={{ x: '120vw', y: [0, -12, 5, 0] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-12 left-0 flex space-x-6 opacity-30 scale-75"
      >
        {/* Bird 1 */}
        <svg className="w-8 h-8 fill-[#4A3B32]" viewBox="0 0 24 24">
          <path d="M 2 12 Q 7 6 12 12 Q 17 6 22 12 Q 17 10 12 15 Q 7 10 2 12 Z" />
        </svg>
        {/* Bird 2 */}
        <svg className="w-6 h-6 fill-[#D4AF37] mt-3" viewBox="0 0 24 24">
          <path d="M 2 12 Q 7 6 12 12 Q 17 6 22 12 Q 17 10 12 15 Q 7 10 2 12 Z" />
        </svg>
      </motion.div>

      {/* EASTER EGG 3: Sprouting Flowers on Bottom Edge */}
      <div className="absolute bottom-0 left-0 right-0 h-16 flex justify-between items-end px-6 opacity-40">
        {/* Flower Left */}
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-end space-x-1"
        >
          <svg className="w-6 h-10 fill-[#D4AF37]" viewBox="0 0 24 40">
            <path d="M 12 40 L 12 15 Q 12 5 20 2 M 12 25 Q 4 18 2 28 Q 10 32 12 40" />
            <circle cx="20" cy="2" r="3" fill="#E5C158" />
          </svg>
          <svg className="w-8 h-12 fill-[#4A3B32]/70" viewBox="0 0 24 40">
            <path d="M 12 40 L 12 10 Q 12 2 4 0 M 12 20 Q 20 15 22 24 Q 14 28 12 40" />
            <circle cx="4" cy="0" r="4" fill="#D4AF37" />
          </svg>
        </motion.div>

        {/* Flower Center-Right */}
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="flex items-end space-x-1"
        >
          <svg className="w-7 h-10 fill-[#D4AF37]" viewBox="0 0 24 40">
            <path d="M 12 40 L 12 12 Q 12 4 18 2 M 12 22 Q 4 16 2 24 Q 10 28 12 40" />
            <circle cx="18" cy="2" r="3" fill="#F3E5AB" />
          </svg>
        </motion.div>
      </div>

      {/* EASTER EGG 4: Cute Pompompurin Peeking from Bottom Right Corner */}
      <motion.div
        animate={{
          y: [22, 4, 22],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-3 w-16 h-16 z-0"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Pompompurin Body (Golden Yellow Dog) */}
          <path
            d="M 20 100 C 20 50 80 50 80 100 Z"
            fill="#FFE066"
            stroke="#4A3B32"
            strokeWidth="2.5"
          />
          {/* Floppy Left Ear */}
          <ellipse cx="22" cy="65" rx="8" ry="16" fill="#FFE066" stroke="#4A3B32" strokeWidth="2" transform="rotate(-20 22 65)" />
          {/* Floppy Right Ear */}
          <ellipse cx="78" cy="65" rx="8" ry="16" fill="#FFE066" stroke="#4A3B32" strokeWidth="2" transform="rotate(20 78 65)" />
          {/* Brown Beret Cap */}
          <ellipse cx="50" cy="52" rx="16" ry="7" fill="#6B4226" stroke="#4A3B32" strokeWidth="2" />
          <rect x="48" y="43" width="4" height="4" fill="#6B4226" rx="1" />
          {/* Cute Eyes */}
          <circle cx="40" cy="68" r="2.5" fill="#4A3B32" />
          <circle cx="60" cy="68" r="2.5" fill="#4A3B32" />
          {/* Nose & Mouth */}
          <ellipse cx="50" cy="72" rx="2" ry="1.5" fill="#4A3B32" />
          <path d="M 47 75 Q 50 78 53 75" fill="none" stroke="#4A3B32" strokeWidth="1.5" strokeLinecap="round" />
          {/* Rosy Cheeks */}
          <circle cx="33" cy="72" r="3" fill="#FFB7B2" opacity="0.6" />
          <circle cx="67" cy="72" r="3" fill="#FFB7B2" opacity="0.6" />
        </svg>
      </motion.div>
    </div>
  );
};

export default BackgroundPattern;
