'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { fontPlayfair, fontGreatVibes } from '@/app/fonts';
import FallingLeaves from '@/components/FallingLeaves';

interface ProposalButtonsProps {
  onAccept: () => void;
}

const PERSISTENCE_MESSAGES = [
  "¿Estás segura?",
  "Todavía lo puedes pensar mejor...",
  "¿Y si lo reconsideras un poquito, princesita?",
  "Sé que a veces sobrepiensas, confía en mí.",
  "Prometí apaciguar tus enredos, déjame hacerlo.",
  "No me voy a rendir tan fácil por la mujer de mi vida.",
  "Tengo paciencia infinita cuando se trata de ti.",
  "No hay cosa que no haría por mi niña hermosa.",
  "Vamos, sé que muy en el fondo quieres decir que sí.",
  "Piénsalo: tú, yo, y tu asado de carne.",
  "¿Quién más te va a sobreexplicar todo con tanto amor?",
  "Mi linda Angeles, te amo demasiado como para aceptar un no.",
  "Intentémoslo, te prometo que cuidaré de ti como mi mayor tesoro.",
  "Mi lugar seguro eres tú...",
  "Dime que sí, mi niña preciosa."
];

export const ProposalButtons: React.FC<ProposalButtonsProps> = ({ onAccept }) => {
  const [noCount, setNoCount] = useState(0);

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
  };

  // SÍ button scale increases by 0.05 per 'No' press, capped at 1.5 max
  const yesScale = Math.min(1 + noCount * 0.05, 1.5);
  const currentMessageIndex = noCount > 0 ? (noCount - 1) % PERSISTENCE_MESSAGES.length : -1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 bg-[#FDFFF0] flex flex-col justify-between min-h-[100dvh] h-[100dvh] py-10 sm:py-14 px-6 select-none overflow-hidden"
    >
      {/* Falling Autumn Leaves particle system in background */}
      <FallingLeaves />

      {/* Top Section: Staggered Fade-in Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        className="w-full text-center space-y-3 pt-2 z-10"
      >
        {/* Heart Icon Badge */}
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center justify-center text-[#D4AF37] mb-1"
        >
          <Heart className="w-10 h-10 fill-[#D4AF37]" />
        </motion.div>

        {/* Header Text: "Angeles mi amor..." */}
        <h1 className={`${fontPlayfair.className} text-4xl sm:text-5xl font-extrabold text-[#4A3B32] tracking-wide`}>
          Angeles mi amor...
        </h1>

        {/* Proposal Question: "¿Quieres ser mi novia?" */}
        <p className={`${fontPlayfair.className} text-3xl sm:text-4xl font-extrabold text-[#D4AF37] tracking-wider pt-1`}>
          ¿Quieres ser mi novia?
        </p>
      </motion.div>

      {/* Middle Section: Floating Persistence Messages */}
      <div className="w-full my-auto flex items-center justify-center px-4 text-center z-10 min-h-[80px]">
        <AnimatePresence mode="wait">
          {currentMessageIndex >= 0 && (
            <motion.p
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className={`${fontPlayfair.className} text-xl sm:text-2xl font-bold text-[#4A3B32] italic leading-relaxed max-w-sm drop-shadow-xs`}
            >
              &ldquo;{PERSISTENCE_MESSAGES[currentMessageIndex]}&rdquo;
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Section: Buttons & Pompompurin Grassland */}
      <div className="w-full max-w-xs mx-auto space-y-4 flex flex-col items-center justify-center z-20 pb-4 relative">
        {/* YES BUTTON - Vibrant Gold Gradient with Heart Icon */}
        <motion.button
          initial={{ opacity: 0, y: 25 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: [yesScale, yesScale * 1.04, yesScale],
            boxShadow: [
              "0 0 15px 2px rgba(212,175,55,0.4)",
              "0 0 30px 8px rgba(212,175,55,0.7)",
              "0 0 15px 2px rgba(212,175,55,0.4)",
            ],
          }}
          transition={{
            opacity: { duration: 0.7, delay: 0.5 },
            y: { duration: 0.7, delay: 0.5 },
            scale: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
            boxShadow: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
          }}
          whileHover={{ scale: yesScale * 1.04 }}
          whileTap={{ scale: yesScale * 0.95 }}
          onClick={onAccept}
          className={`${fontPlayfair.className} w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-[#4A3B32] font-extrabold text-xl sm:text-2xl shadow-2xl flex items-center justify-center space-x-2 border border-white/80 cursor-pointer active:scale-95 transition-all`}
        >
          <Sparkles className="w-5 h-5 text-[#4A3B32]" />
          <span>¡SÍ!</span>
          <Heart className="w-5 h-5 text-[#4A3B32] fill-[#4A3B32]" />
        </motion.button>

        {/* NO BUTTON */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleNoClick}
          className="w-full py-3 px-6 rounded-xl text-[#4A3B32]/75 font-sans-ui font-semibold text-base border border-[#4A3B32]/15 cursor-pointer active:bg-[#4A3B32]/10 transition-colors text-center bg-white/40 backdrop-blur-xs"
        >
          No
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className={`${fontGreatVibes.className} text-xl text-[#D4AF37] font-bold text-center pt-1`}
        >
          Te elijo a ti, todos los días de mi vida ❤️
        </motion.p>
      </div>

      {/* Yellow Grass Pasture & Cute Sanrio Characters (Cinnamoroll & Pompompurin) */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-10 overflow-hidden">
        {/* Soft Yellow Grassland Silhouette SVG */}
        <svg className="absolute bottom-0 inset-x-0 w-full h-14 fill-[#E8D48A]/50 z-10" viewBox="0 0 400 40" preserveAspectRatio="none">
          <path d="M 0 40 Q 30 15 60 40 Q 90 20 120 40 Q 150 10 180 40 Q 210 25 240 40 Q 270 15 300 40 Q 330 20 360 40 Q 380 10 400 40 Z" />
        </svg>

        {/* 1. CINNAMOROLL (Left Side) - 1.5x Size (w-24 h-24), Smooth X-axis Slide & Soft Fade In/Out */}
        <motion.div
          animate={{
            x: [-15, 25, -15],
            opacity: [0.15, 0.95, 0.15],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-24 h-24 absolute bottom-0 left-2 z-0"
        >
          <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-sm">
            {/* Cinnamoroll White Body */}
            <ellipse cx="60" cy="75" rx="32" ry="22" fill="#FFFFFF" stroke="#6B7C96" strokeWidth="2" />
            {/* Left Big Floppy Ear */}
            <path d="M 35 68 C 15 60 2 75 10 88 C 20 95 38 82 40 76 Z" fill="#FFFFFF" stroke="#6B7C96" strokeWidth="2" />
            {/* Right Big Floppy Ear */}
            <path d="M 85 68 C 105 60 118 75 110 88 C 100 95 82 82 80 76 Z" fill="#FFFFFF" stroke="#6B7C96" strokeWidth="2" />
            {/* Blue Eyes */}
            <ellipse cx="48" cy="70" rx="3" ry="4" fill="#3B82F6" />
            <ellipse cx="72" cy="70" rx="3" ry="4" fill="#3B82F6" />
            {/* Pink Rosy Cheeks */}
            <ellipse cx="38" cy="76" rx="5" ry="3" fill="#FFB7C5" opacity="0.85" />
            <ellipse cx="82" cy="76" rx="5" ry="3" fill="#FFB7C5" opacity="0.85" />
            {/* Cute Mouth */}
            <path d="M 56 75 Q 60 78 64 75" fill="none" stroke="#6B7C96" strokeWidth="1.8" strokeLinecap="round" />
            {/* Cute Blue Bow Accent */}
            <path d="M 57 84 L 52 88 L 60 86 L 68 88 L 63 84 Z" fill="#60A5FA" />
          </svg>
        </motion.div>

        {/* 2. POMPOMPURIN (Right Side) - 1.5x Size (w-24 h-24), Smooth X-axis Slide & Soft Fade In/Out */}
        <motion.div
          animate={{
            x: [15, -25, 15],
            opacity: [0.15, 0.95, 0.15],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="w-24 h-24 absolute bottom-0 right-2 z-0"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            {/* Pompompurin Yellow Body */}
            <path d="M 18 100 C 18 45 82 45 82 100 Z" fill="#FFE066" stroke="#4A3B32" strokeWidth="2.5" />
            {/* Floppy Left Ear */}
            <ellipse cx="20" cy="62" rx="9" ry="18" fill="#FFE066" stroke="#4A3B32" strokeWidth="2" transform="rotate(-25 20 62)" />
            {/* Floppy Right Ear */}
            <ellipse cx="80" cy="62" rx="9" ry="18" fill="#FFE066" stroke="#4A3B32" strokeWidth="2" transform="rotate(25 80 62)" />
            {/* Brown Beret Cap */}
            <ellipse cx="50" cy="48" rx="18" ry="8" fill="#6B4226" stroke="#4A3B32" strokeWidth="2" />
            <rect x="48" y="38" width="4" height="5" fill="#6B4226" rx="1" />
            {/* Dark Eyes */}
            <circle cx="39" cy="66" r="3" fill="#4A3B32" />
            <circle cx="61" cy="66" r="3" fill="#4A3B32" />
            {/* Nose & Mouth */}
            <ellipse cx="50" cy="71" rx="2.5" ry="1.8" fill="#4A3B32" />
            <path d="M 46 74 Q 50 78 54 74" fill="none" stroke="#4A3B32" strokeWidth="1.8" strokeLinecap="round" />
            {/* Soft Rosy Cheeks */}
            <circle cx="30" cy="71" r="4" fill="#FFB7B2" opacity="0.8" />
            <circle cx="70" cy="71" r="4" fill="#FFB7B2" opacity="0.8" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProposalButtons;
