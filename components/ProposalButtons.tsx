'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface ProposalButtonsProps {
  onAccept: () => void;
}

const NO_MESSAGES = [
  "No",
  "¿Estás segura?",
  "Todavía lo puedes pensar mejor...",
  "¿Y si lo reconsideras un poquito?",
  "Sé que a veces sobrepiensas, confía en mí.",
  "Prometí apaciguar tus enredos, déjame hacerlo.",
  "No me voy a rendir tan fácil.",
  "Tengo muchísima paciencia cuando se trata de ti.",
  "No hay cosa que no haría por ti.",
  "Vamos, sé que muy en el fondo quieres decir que sí.",
  "Piénsalo: tú, yo, y una pijamada con mascarillas faciales.",
  "¿Quién más te va a preparar lomo saltado?",
  "Angelito, te amo demasiado como para aceptar un no.",
  "Intentémoslo, te prometo que cuidaré de ti siempre.",
  "Mi lugar seguro eres tú... dime que sí."
];

export const ProposalButtons: React.FC<ProposalButtonsProps> = ({ onAccept }) => {
  const [noIndex, setNoIndex] = useState(0);

  const handleNoClick = () => {
    setNoIndex((prev) => (prev + 1) % NO_MESSAGES.length);
  };

  // Grow 'YES' button slightly as NO is pressed more times
  const yesScaleMultiplier = 1 + Math.min(noIndex * 0.04, 0.4);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-between w-full max-w-md mx-auto min-h-[80dvh] pt-[env(safe-area-inset-top,20px)] pb-[env(safe-area-inset-bottom,20px)] px-4 select-none"
    >
      {/* Question Header */}
      <div className="w-full text-center space-y-4 pt-6">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] shadow-lg border-2 border-white mb-2"
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

      {/* Buttons Container */}
      <div className="w-full space-y-4 my-auto py-6 flex flex-col items-center justify-center">
        {/* YES BUTTON - Constant Golden Glow */}
        <motion.button
          whileHover={{ scale: 1.05 * yesScaleMultiplier }}
          whileTap={{ scale: 0.95 * yesScaleMultiplier }}
          style={{ transform: `scale(${yesScaleMultiplier})` }}
          animate={{
            boxShadow: [
              "0 0 15px 2px rgba(212,175,55,0.4)",
              "0 0 30px 8px rgba(212,175,55,0.7)",
              "0 0 15px 2px rgba(212,175,55,0.4)",
            ],
          }}
          transition={{
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          onClick={onAccept}
          className="w-full max-w-xs py-4 px-8 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-[#4A3B32] font-serif-title font-extrabold text-xl shadow-2xl flex items-center justify-center space-x-2 border-2 border-white/80 cursor-pointer active:scale-95 transition-all"
        >
          <Sparkles className="w-6 h-6 text-[#4A3B32]" />
          <span>¡SÍ! ❤️</span>
        </motion.button>

        {/* NO BUTTON - Text fade-in / fade-out (0.5s) */}
        <div className="w-full max-w-xs min-h-[56px] flex items-center justify-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleNoClick}
            className="w-full py-3.5 px-4 rounded-xl bg-white/70 backdrop-blur-md text-[#4A3B32]/80 font-sans font-medium text-sm border border-[#4A3B32]/20 shadow-md cursor-pointer active:opacity-70 transition-all flex items-center justify-center text-center"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={noIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="block leading-snug"
              >
                {NO_MESSAGES[noIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Decorative caption */}
      <p className="text-xs text-[#4A3B32]/60 font-sans italic text-center pb-2">
        Responde con el corazón ❤️
      </p>
    </motion.div>
  );
};

export default ProposalButtons;
