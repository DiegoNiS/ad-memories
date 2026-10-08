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
  const [showProposalQuestion, setShowProposalQuestion] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  // Staggered Timed Sequence: 
  // - 3.5s: Proposal Question text fades in smoothly
  // - 4.8s (1.3s later): Interactive ¡SÍ! and No buttons fade in smoothly
  useEffect(() => {
    const questionTimer = setTimeout(() => {
      setShowProposalQuestion(true);
    }, 3500);

    const buttonsTimer = setTimeout(() => {
      setShowButtons(true);
    }, 4800);

    return () => {
      clearTimeout(questionTimer);
      clearTimeout(buttonsTimer);
    };
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
      className="fixed inset-0 z-50 bg-[#FDFFF0] flex flex-col justify-between min-h-[100dvh] h-[100dvh] pt-20 sm:pt-24 pb-32 sm:pb-36 px-6 select-none overflow-hidden"
    >
      {/* Falling Autumn Leaves particle system in background */}
      <FallingLeaves />

      {/* 1. TOP HEADER: Appears slightly first */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.95, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="w-full flex flex-col items-center z-10 space-y-1.5"
      >
        <div className="flex items-center space-x-3 opacity-70">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="flex items-center space-x-1.5 text-[#D4AF37]">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
            <span className={`${fontGreatVibes.className} text-2xl text-[#6D5245] font-bold tracking-widest`}>
              D &amp; A
            </span>
            <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
          </div>
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
        <p className={`${fontGreatVibes.className} text-2xl text-[#D4AF37] font-semibold tracking-wide text-center drop-shadow-xs`}>
          Te elijo a ti, todos los días de mi vida ❤️
        </p>
      </motion.div>

      {/* 2. PROPOSAL QUESTION SECTION: Positioned above center, fades in after 3.5 seconds */}
      <div className="w-full max-w-sm mx-auto flex flex-col items-center text-center space-y-2 z-10 pt-4 pb-2">
        <AnimatePresence>
          {showProposalQuestion && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="flex flex-col items-center space-y-2"
            >
              {/* Animated Heart Icon Badge */}
              <motion.div
                animate={{ scale: [1, 1.14, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center justify-center text-[#D4AF37] mb-0.5"
              >
                <Heart className="w-10 h-10 fill-[#D4AF37]" />
              </motion.div>

              {/* Header Text: "Mi linda Angeles..." */}
              <h1 className={`${fontPlayfair.className} text-3xl sm:text-4xl font-extrabold text-[#5C4538] tracking-wide`}>
                Mi linda Angeles...
              </h1>

              {/* Proposal Question: "¿Quieres ser mi novia?" */}
              <h2 className={`${fontPlayfair.className} text-3xl sm:text-4xl font-extrabold text-[#D4AF37] tracking-wider`}>
                ¿Quieres ser mi novia?
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. PERSISTENCE MESSAGES: Positioned in the gap between question and buttons */}
      <div className="w-full max-w-sm mx-auto my-auto flex items-center justify-center px-4 text-center z-10 min-h-[50px]">
        <AnimatePresence mode="wait">
          {currentMessageIndex >= 0 && (
            <motion.p
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={`${fontPlayfair.className} text-xl sm:text-2xl font-semibold text-[#6D5245] italic leading-snug drop-shadow-xs`}
            >
              {PERSISTENCE_MESSAGES[currentMessageIndex]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* 4. BOTTOM BUTTONS: Fades in 1.3 seconds after proposal question */}
      <div className="w-full max-w-xs mx-auto z-20 relative flex flex-col items-center min-h-[130px] justify-end">
        <AnimatePresence>
          {showButtons && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
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
                onClick={async () => {
                  try {
                    await fetch('/api/accept-proposal', { method: 'POST' });
                  } catch (e) {
                    console.error('Failed to post proposal acceptance:', e);
                  }
                  onAccept();
                }}
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
                className="w-full py-3 px-6 rounded-xl text-[#5C4538] font-sans-ui font-semibold text-base border border-[#5C4538]/20 cursor-pointer active:bg-[#4A3B32]/10 transition-colors text-center bg-white/50 backdrop-blur-xs"
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

  // Keep latest positions in refs so intervals can reference them without causing effect dependency resets
  const cinPosRef = React.useRef(cinPos);
  const pomPosRef = React.useRef(pomPos);
  cinPosRef.current = cinPos;
  pomPosRef.current = pomPos;

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
    // Cinnamoroll Teleport Timer: Every 4.5s, fades out, recalculates non-overlapping position, fades in
    const cinTimer = setInterval(() => {
      setCinVisible(false);
      setTimeout(() => {
        const nextPos = generateNonOverlappingPos(pomPosRef.current);
        setCinPos(nextPos);
        setCinVisible(true);
      }, 350);
    }, 4500);

    // Pompompurin Teleport Timer: Every 5.2s, fades out, recalculates non-overlapping position, fades in
    const pomTimer = setInterval(() => {
      setPomVisible(false);
      setTimeout(() => {
        const nextPos = generateNonOverlappingPos(cinPosRef.current);
        setPomPos(nextPos);
        setPomVisible(true);
      }, 350);
    }, 5200);

    return () => {
      clearInterval(cinTimer);
      clearInterval(pomTimer);
    };
  }, []);

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
