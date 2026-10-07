'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';
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
  const [isRevealed, setIsRevealed] = useState(false);

  // 2-second delay reveal timer to let the romantic ambiance settle before showing interactive buttons
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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
      className="fixed inset-0 z-50 bg-[#FDFFF0] flex flex-col justify-between min-h-[100dvh] h-[100dvh] pt-14 sm:pt-16 pb-24 sm:pb-28 px-6 select-none overflow-hidden"
    >
      {/* Falling Autumn Leaves particle system in background */}
      <FallingLeaves />

      {/* Top Header: Sophisticated Crest with Gold Filigree, Stars, and Initials (D & A) */}
      <div className="w-full flex flex-col items-center pt-1 z-10 space-y-1.5">
        <div className="flex items-center space-x-3 opacity-70">
          <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="flex items-center space-x-1.5 text-[#D4AF37]">
            <Star className="w-3 h-3 fill-[#D4AF37]" />
            <span className={`${fontGreatVibes.className} text-xl text-[#4A3B32] font-bold tracking-widest`}>
              D &amp; A
            </span>
            <Star className="w-3 h-3 fill-[#D4AF37]" />
          </div>
          <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
        <p className={`${fontGreatVibes.className} text-xl text-[#D4AF37] font-semibold tracking-wide text-center drop-shadow-xs`}>
          Te elijo a ti, todos los días de mi vida ❤️
        </p>
      </div>

      {/* Middle Center Section: Lowered Proposal Question & Header (Perfectly Balanced Spacing) */}
      <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center my-auto z-10 text-center space-y-3 py-1">
        {/* Animated Heart Icon Badge */}
        <motion.div
          animate={{ scale: [1, 1.14, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center justify-center text-[#D4AF37] mb-0.5"
        >
          <Heart className="w-10 h-10 fill-[#D4AF37]" />
        </motion.div>

        {/* Header Text: "Angeles mi amor..." */}
        <h1 className={`${fontPlayfair.className} text-3xl sm:text-4xl font-extrabold text-[#4A3B32] tracking-wide`}>
          Angeles mi amor...
        </h1>

        {/* Proposal Question: "¿Quieres ser mi novia?" */}
        <h2 className={`${fontPlayfair.className} text-3xl sm:text-4xl font-extrabold text-[#D4AF37] tracking-wider`}>
          ¿Quieres ser mi novia?
        </h2>

        {/* Floating Persistence Messages space container */}
        <div className="w-full h-12 flex items-center justify-center pt-1">
          <AnimatePresence mode="wait">
            {currentMessageIndex >= 0 && (
              <motion.p
                key={currentMessageIndex}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`${fontPlayfair.className} text-lg sm:text-xl font-bold text-[#4A3B32] italic leading-snug drop-shadow-xs`}
              >
                &ldquo;{PERSISTENCE_MESSAGES[currentMessageIndex]}&rdquo;
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Interactive Section: Revealed smoothly after 2 seconds */}
      <div className="w-full max-w-xs mx-auto z-20 pb-1 relative flex flex-col items-center min-h-[140px] justify-end">
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full space-y-3 flex flex-col items-center"
            >
              {/* YES BUTTON - Vibrant Gold Gradient with Heart Icon */}
              <motion.button
                animate={{
                  scale: [yesScale, yesScale * 1.04, yesScale],
                  boxShadow: [
                    "0 0 15px 2px rgba(212,175,55,0.4)",
                    "0 0 30px 8px rgba(212,175,55,0.7)",
                    "0 0 15px 2px rgba(212,175,55,0.4)",
                  ],
                }}
                transition={{
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
                whileTap={{ scale: 0.92 }}
                onClick={handleNoClick}
                className="w-full py-3 px-6 rounded-xl text-[#4A3B32]/75 font-sans-ui font-semibold text-base border border-[#4A3B32]/15 cursor-pointer active:bg-[#4A3B32]/10 transition-colors text-center bg-white/40 backdrop-blur-xs"
              >
                No
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Yellow Grass Pasture & Smart Collision-Free Sanrio Teleporting Component */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-10 overflow-hidden">
        {/* Soft Yellow Grassland Silhouette SVG */}
        <svg className="absolute bottom-0 inset-x-0 w-full h-14 fill-[#E8D48A]/50 z-10" viewBox="0 0 400 40" preserveAspectRatio="none">
          <path d="M 0 40 Q 30 15 60 40 Q 90 20 120 40 Q 150 10 180 40 Q 210 25 240 40 Q 270 15 300 40 Q 330 20 360 40 Q 380 10 400 40 Z" />
        </svg>

        <SanrioSmartPopups />
      </div>
    </motion.div>
  );
};

// Smart Sanrio Popups Component: Generates random X percentages and prevents overlapping
const SanrioSmartPopups: React.FC = () => {
  const [cinPos, setCinPos] = useState<number>(10);
  const [pomPos, setPomPos] = useState<number>(70);
  const [cinVisible, setCinVisible] = useState<boolean>(true);
  const [pomVisible, setPomVisible] = useState<boolean>(true);

  // Helper to generate a random X percentage (5% to 75%) ensuring minimum 30% gap from current opposing character
  const generateNonOverlappingPos = (otherPos: number): number => {
    let newPos = Math.floor(Math.random() * 70) + 5;
    let attempts = 0;
    while (Math.abs(newPos - otherPos) < 28 && attempts < 15) {
      newPos = Math.floor(Math.random() * 70) + 5;
      attempts++;
    }
    return newPos;
  };

  useEffect(() => {
    // Cinnamoroll Teleport Timer: Fades out, recalculates non-overlapping position, fades in
    const cinTimer = setInterval(() => {
      setCinVisible(false);
      setTimeout(() => {
        setCinPos((prevCin) => generateNonOverlappingPos(pomPos));
        setCinVisible(true);
      }, 350);
    }, 4500);

    // Pompompurin Teleport Timer
    const pomTimer = setInterval(() => {
      setPomVisible(false);
      setTimeout(() => {
        setPomPos((prevPom) => generateNonOverlappingPos(cinPos));
        setPomVisible(true);
      }, 350);
    }, 5200);

    return () => {
      clearInterval(cinTimer);
      clearInterval(pomTimer);
    };
  }, [cinPos, pomPos]);

  return (
    <>
      {/* 1. CINNAMOROLL - 1.2x Larger Scale (w-24 h-24), Center-origin tilt wiggle, Raised 12px for grass clearance */}
      <AnimatePresence mode="wait">
        {cinVisible && (
          <motion.div
            key={`cin-${cinPos}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.95,
              rotate: [-5, 5, -5],
            }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{
              opacity: { duration: 0.4 },
              rotate: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{
              left: `${cinPos}%`,
              transformOrigin: "center center",
            }}
            className="w-24 h-24 absolute bottom-3 z-0 flex items-end justify-center pointer-events-none"
          >
            <img
              src="/extras/Cinnamoroll.png"
              alt="Cinnamoroll"
              className="w-full h-auto object-contain drop-shadow-md"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. POMPOMPURIN - 1.2x Proportionate Scale (w-24 h-24), Center-origin tilt wiggle */}
      <AnimatePresence mode="wait">
        {pomVisible && (
          <motion.div
            key={`pom-${pomPos}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.95,
              rotate: [5, -5, 5],
            }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{
              opacity: { duration: 0.4 },
              rotate: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{
              left: `${pomPos}%`,
              transformOrigin: "center center",
            }}
            className="w-24 h-24 absolute bottom-1 z-0 flex items-end justify-center pointer-events-none"
          >
            <img
              src="/extras/Pompompurin.png"
              alt="Pompompurin"
              className="w-full h-auto object-contain drop-shadow-md"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProposalButtons;
