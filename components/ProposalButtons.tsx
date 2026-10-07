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
    <div className="fixed inset-0 z-50 bg-[#FDFFF0] flex flex-col justify-between min-h-[100dvh] h-[100dvh] py-12 sm:py-16 px-6 select-none overflow-hidden">
      {/* Falling Autumn Leaves particle system in background */}
      <FallingLeaves />

      {/* Top Section: Header with ZERO box styling (pure typography floating over background) */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full text-center space-y-3 pt-2 z-10"
      >
        {/* Heart Icon Badge without heavy card box */}
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center justify-center text-[#D4AF37] mb-1"
        >
          <Heart className="w-10 h-10 fill-[#D4AF37]" />
        </motion.div>

        {/* Header Text: "Angeles mi amor..." (Zero boxes, pure typography) */}
        <h1 className={`${fontPlayfair.className} text-4xl sm:text-5xl font-extrabold text-[#4A3B32] tracking-wide`}>
          Angeles mi amor...
        </h1>

        {/* Proposal Question: "¿Quieres ser mi novia?" (Zero boxes, pure typography) */}
        <p className={`${fontPlayfair.className} text-3xl sm:text-4xl font-extrabold text-[#D4AF37] tracking-wider pt-1`}>
          ¿Quieres ser mi novia?
        </p>
      </motion.div>

      {/* Middle Section: Breathing Room Space for Persistence Messages (Pure Floating Typography without boxes) */}
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

      {/* Bottom Section: Buttons */}
      <div className="w-full max-w-xs mx-auto space-y-4 flex flex-col items-center justify-center z-10 pb-2">
        {/* YES BUTTON - Vibrant Gold Gradient, Throbbing like a beating heart */}
        <motion.button
          whileHover={{ scale: yesScale * 1.04 }}
          whileTap={{ scale: yesScale * 0.95 }}
          animate={{
            scale: [yesScale, yesScale * 1.05, yesScale],
            rotate: noCount > 0 ? [-1, 1, 0] : 0,
            boxShadow: [
              "0 0 15px 2px rgba(212,175,55,0.4)",
              "0 0 35px 10px rgba(212,175,55,0.8)",
              "0 0 15px 2px rgba(212,175,55,0.4)",
            ],
          }}
          transition={{
            scale: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
            boxShadow: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
          }}
          onClick={onAccept}
          className={`${fontPlayfair.className} w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-[#4A3B32] font-extrabold text-xl sm:text-2xl shadow-2xl flex items-center justify-center space-x-2 border border-white/80 cursor-pointer active:scale-95 transition-all`}
        >
          <Sparkles className="w-5 h-5 text-[#4A3B32]" />
          <span>¡SÍ!</span>
          <Heart className="w-5 h-5 text-[#4A3B32] fill-[#4A3B32]" />
        </motion.button>

        {/* NO BUTTON - Minimal, dark text, static position */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleNoClick}
          className="w-full py-3 px-6 rounded-xl text-[#4A3B32]/75 font-sans-ui font-semibold text-base border border-[#4A3B32]/15 cursor-pointer active:bg-[#4A3B32]/10 transition-colors text-center"
        >
          No
        </motion.button>

        <p className={`${fontGreatVibes.className} text-xl text-[#D4AF37] font-bold text-center pt-1`}>
          Te elijo a ti, todos los días de mi vida ❤️
        </p>
      </div>
    </div>
  );
};

export default ProposalButtons;
