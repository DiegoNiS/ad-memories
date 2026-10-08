'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BackgroundPattern from '@/components/BackgroundPattern';
import Envelope from '@/components/Envelope';
import LoveLetter from '@/components/LoveLetter';
import FutureList from '@/components/FutureList';
import PhotoAlbum from '@/components/PhotoAlbum';
import FirstCounter from '@/components/FirstCounter';
import PreClimax from '@/components/PreClimax';
import ProposalButtons from '@/components/ProposalButtons';
import FinalCelebration from '@/components/FinalCelebration';

export default function Home() {
  const [step, setStep] = useState<number>(1);
  const [isPreClimaxDone, setIsPreClimaxDone] = useState<boolean>(false);
  const [alreadyAcceptedDate, setAlreadyAcceptedDate] = useState<string | null>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState<boolean>(true);

  useEffect(() => {
    // Check if proposal was already accepted in Supabase
    async function checkStatus() {
      try {
        const res = await fetch('/api/proposal-status');
        const data = await res.json();

        if (data.accepted && data.acceptedAt) {
          setAlreadyAcceptedDate(data.acceptedAt);
          setStep(7); // Jump directly to celebration if already accepted
        }
      } catch (err) {
        console.error('Failed to fetch proposal status:', err);
      } finally {
        setIsLoadingStatus(false);
      }
    }

    checkStatus();
  }, []);

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 7));
  };

  if (isLoadingStatus) {
    return (
      <main className="relative min-h-[100dvh] w-full bg-[#FDFBF7] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      {/* Background pattern - Easter egg letter D with 'Diego & Angeles', birds, flowers, Pompompurin */}
      <BackgroundPattern />

      {/* Main App Container */}
      <div className="w-full max-w-lg min-h-[100dvh] flex flex-col items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Envelope onOpen={nextStep} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <LoveLetter onNext={nextStep} />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <FutureList onNext={nextStep} />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <PhotoAlbum onNext={nextStep} />
            </motion.div>
          )}

          {step === 5 && !isPreClimaxDone && (
            <motion.div
              key="step-5-counter"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <FirstCounter onNext={() => setIsPreClimaxDone(true)} />
            </motion.div>
          )}

          {step === 5 && isPreClimaxDone && (
            <motion.div
              key="step-5-preclimax"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <PreClimax onComplete={nextStep} />
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.6 } }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <ProposalButtons onAccept={nextStep} />
            </motion.div>
          )}

          {step === 7 && (
            <motion.div
              key="step-7"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="w-full"
            >
              <FinalCelebration initialDate={alreadyAcceptedDate} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
