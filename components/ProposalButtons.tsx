'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

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
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-between w-full max-w-md mx-auto min-h-[82dvh] pt-[env(safe-area-inset-top,20px)] pb-[env(safe-area-inset-bottom,20px)] px-4 select-none"
    >
      {/* Title Header */}
      <div className="w-full text-center space-y-3 pt-4">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] shadow-lg border-2 border-white mb-1"
        >
          <Heart className="w-7 h-7 text-[#4A3B32] fill-[#4A3B32]" />
        </motion.div>

        <h1 className="font-serif-title text-3xl sm:text-4xl font-extrabold text-[#4A3B32] tracking-wide">
          Angeles Saico
        </h1>

        <p className="font-serif-title text-xl sm:text-2xl font-bold text-[#D4AF37] tracking-wider px-2">
          ¿Quieres ser mi novia?
        </p>
      </div>

      {/* EXTERNAL PERSISTENCE MESSAGE (Appears OUTSIDE the buttons with AnimatePresence) */}
      <div className="w-full h-16 flex items-center justify-center px-4 my-2 text-center">
        <AnimatePresence mode="wait">
          {currentMessageIndex >= 0 && (
            <motion.div
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="px-4 py-2 rounded-xl ios-glass border border-[#D4AF37]/40 shadow-sm"
            >
              <p className="font-serif-title text-sm sm:text-base font-semibold text-[#4A3B32] italic">
                &ldquo;{PERSISTENCE_MESSAGES[currentMessageIndex]}&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BUTTONS CONTAINER */}
      <div className="w-full space-y-5 my-auto py-4 flex flex-col items-center justify-center relative">
        {/* YES BUTTON - Grows up to 1.5 max & Throbs/Vibrates when NO is pressed */}
        <motion.button
          whileHover={{ scale: yesScale * 1.04 }}
          whileTap={{ scale: yesScale * 0.95 }}
          animate={
            noCount > 0
              ? {
                  scale: [yesScale, yesScale * 1.05, yesScale],
                  rotate: [-1, 1, 0],
                  boxShadow: [
                    "0 0 15px 2px rgba(212,175,55,0.4)",
                    "0 0 35px 10px rgba(212,175,55,0.8)",
                    "0 0 15px 2px rgba(212,175,55,0.4)",
                  ],
                }
              : {
                  scale: 1,
                  boxShadow: [
                    "0 0 15px 2px rgba(212,175,55,0.4)",
                    "0 0 25px 5px rgba(212,175,55,0.6)",
                    "0 0 15px 2px rgba(212,175,55,0.4)",
                  ],
                }
          }
          transition={{
            scale: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
            boxShadow: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
          }}
          onClick={onAccept}
          className="w-full max-w-xs py-4 px-8 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-[#4A3B32] font-serif-title font-extrabold text-xl shadow-2xl flex items-center justify-center space-x-2 border-2 border-white/80 cursor-pointer active:scale-95 transition-all z-20"
        >
          <Sparkles className="w-6 h-6 text-[#4A3B32]" />
          <span>¡SÍ! ❤️</span>
        </motion.button>

        {/* NO BUTTON - Text NEVER changes ("No") and stays STATIC in position */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleNoClick}
          className="w-full max-w-xs py-3 px-6 rounded-xl bg-white/70 backdrop-blur-md text-[#4A3B32]/70 font-sans font-semibold text-sm border border-[#4A3B32]/20 shadow-md cursor-pointer active:bg-[#4A3B32]/10 transition-colors text-center z-10"
        >
          No
        </motion.button>
      </div>

      <p className="text-xs text-[#4A3B32]/60 font-sans italic text-center pb-2">
        Te elijo a ti, todos los días de mi vida ❤️
      </p>
    </motion.div>
  );
};

export default ProposalButtons;
