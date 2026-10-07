'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSealClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    // Give animation time to play out spring physics before proceeding
    setTimeout(() => {
      onOpen();
    }, 1400);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75dvh] w-full px-4 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="relative w-full max-w-[340px] aspect-[4/3] flex items-center justify-center"
      >
        {/* Shadow glow around envelope */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/20 to-[#4A3B32]/10 blur-2xl rounded-2xl" />

        {/* Envelope Base Container - overflow-visible allows card to pop up smoothly out of envelope */}
        <div className="relative w-full h-full bg-[#FAF6F0] rounded-2xl border-2 border-[#D4AF37]/40 shadow-2xl overflow-visible flex flex-col justify-end">
          
          {/* Card preview sliding up out of envelope pocket */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isOpen ? { y: -90, opacity: 1, scale: 1.02 } : { y: 50, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 16,
              delay: 0.2,
            }}
            className="absolute top-4 left-4 right-4 h-44 bg-white/95 backdrop-blur-md rounded-xl border border-[#D4AF37]/35 shadow-2xl p-4 flex flex-col justify-between z-25"
          >
            <div className="flex justify-between items-center border-b border-[#D4AF37]/20 pb-2">
              <span className="font-serif-title text-[#4A3B32] font-semibold text-sm">
                Para: Angeles
              </span>
              <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
            </div>
            <p className="text-xs text-[#4A3B32]/80 italic line-clamp-3 leading-relaxed font-sans">
              "Llegaste cuando no buscaba nada, pero me di cuenta de que eras exactamente lo que me faltaba..."
            </p>
            <span className="text-[10px] text-right text-[#D4AF37] font-semibold tracking-wider uppercase">
              Abriendo carta... ❤️
            </span>
          </motion.div>

          {/* Envelope Pocket Body (Scalable SVG) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20 rounded-2xl"
            viewBox="0 0 340 255"
            preserveAspectRatio="none"
          >
            {/* Left Flap */}
            <polygon points="0,0 0,255 170,140" fill="#EFE6D8" opacity="0.95" />
            {/* Right Flap */}
            <polygon points="340,0 340,255 170,140" fill="#EAE0D0" opacity="0.95" />
            {/* Bottom Flap */}
            <polygon points="0,255 340,255 170,125" fill="#F3ECE0" />
            {/* Subtle Inner Pocket Lines */}
            <polyline points="0,0 170,140 340,0" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
            <polyline points="0,255 170,125 340,255" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
          </svg>

          {/* Top Flap (Animating SVG triangle) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}
            className="absolute top-0 left-0 right-0 h-[130px] z-10 pointer-events-none"
          >
            <svg
              className="w-full h-full filter drop-shadow-md rounded-t-2xl"
              viewBox="0 0 340 130"
              preserveAspectRatio="none"
            >
              <polygon points="0,0 340,0 170,130" fill="#E6DBCB" />
              <polyline points="0,0 170,130 340,0" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.4" />
            </svg>
          </motion.div>

          {/* Wax Seal Button */}
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              animate={
                isOpen
                  ? { scale: [1, 1.2, 0], opacity: 0 }
                  : {
                      scale: [1, 1.04, 1],
                      boxShadow: [
                        "0 0 0 0px rgba(212,175,55,0.4)",
                        "0 0 0 10px rgba(212,175,55,0)",
                        "0 0 0 0px rgba(212,175,55,0.4)",
                      ],
                    }
              }
              transition={
                isOpen
                  ? { duration: 0.4 }
                  : { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }
              onClick={handleSealClick}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#B8860B] to-[#8B6508] p-1 shadow-xl flex items-center justify-center border-2 border-[#FFF8DC]/60 cursor-pointer active:scale-95 transition-transform"
            >
              <div className="w-full h-full rounded-full border border-dashed border-[#FFF8DC]/70 flex flex-col items-center justify-center bg-[#A67C1E]/40 backdrop-blur-xs">
                <span className="font-serif-title text-white text-xs tracking-widest font-bold drop-shadow">
                  A & D
                </span>
                <Heart className="w-2.5 h-2.5 text-white/90 fill-white mt-0.5" />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Prompt label underneath envelope */}
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -bottom-10 text-xs text-[#4A3B32]/70 font-sans tracking-wide"
        >
          Presiona el sello de cera para abrir
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Envelope;
