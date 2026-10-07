'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FallingParticle {
  id: number;
  type: 'leaf' | 'petal';
  startX: number;
  swayX: number;
  size: number;
  duration: number;
  delay: number;
  rotateEnd: number;
  color: string;
}

const AUTUMN_COLORS = [
  'rgba(212, 175, 55, 0.45)',  // Golden
  'rgba(200, 125, 85, 0.40)',  // Copper / Rust
  'rgba(217, 130, 43, 0.35)',  // Warm desaturated orange
  'rgba(180, 100, 60, 0.38)',  // Deep autumn red-brown
];

const PETAL_COLORS = [
  'rgba(229, 57, 53, 0.55)',   // Deep Rose Red
  'rgba(216, 27, 96, 0.50)',   // Crimson Pink
  'rgba(240, 98, 146, 0.45)',  // Soft Rose Pink
  'rgba(194, 24, 91, 0.52)',   // Ruby Red
];

export const FallingLeaves: React.FC = () => {
  const particles: FallingParticle[] = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      const isPetal = i % 2 === 0;
      return {
        id: i,
        type: isPetal ? 'petal' : 'leaf',
        startX: (i * 4.2 + Math.random() * 6) % 100, // Spread across viewport width (0-100%)
        swayX: Math.random() * 45 - 22, // Wind sway (-22px to 22px)
        size: isPetal ? 16 + Math.random() * 12 : 18 + Math.random() * 14,
        duration: 9 + Math.random() * 11, // Fall duration (9s to 20s)
        delay: Math.random() * 10, // Staggered delays
        rotateEnd: 180 + Math.random() * 360,
        color: isPetal
          ? PETAL_COLORS[i % PETAL_COLORS.length]
          : AUTUMN_COLORS[i % AUTUMN_COLORS.length],
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            top: '-8vh',
            left: `${p.startX}%`,
            opacity: 0,
            rotate: 0,
            x: 0,
          }}
          animate={{
            top: '108vh',
            opacity: [0, 0.85, 0.85, 0],
            rotate: p.rotateEnd,
            x: [0, p.swayX, -p.swayX, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
            x: {
              duration: p.duration * 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
          }}
          style={{ position: 'absolute', width: p.size, height: p.size }}
        >
          {p.type === 'leaf' ? (
            /* Autumn Leaf SVG */
            <svg
              viewBox="0 0 24 24"
              className="w-full h-full"
              style={{ fill: p.color }}
            >
              <path d="M 12 2 C 11.5 5 9 6.5 7 6 C 8.5 8 7 11 4.5 10 C 6 12.5 5 15 2 16 C 5.5 17 8 16 10.5 17.5 C 11 19.5 11.5 22 12 24 C 12.5 22 13 19.5 13.5 17.5 C 16 16 18.5 17 22 16 C 19 15 18 12.5 19.5 10 C 17 11 15.5 8 17 6 C 15 6.5 12.5 5 12 2 Z" />
            </svg>
          ) : (
            /* Rose Petal SVG */
            <svg
              viewBox="0 0 24 24"
              className="w-full h-full filter drop-shadow-xs"
              style={{ fill: p.color }}
            >
              <path d="M 12 2 C 7 3 2 8 2 14 C 2 19 7 22 12 22 C 17 22 22 19 22 14 C 22 8 17 3 12 2 Z" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FallingLeaves;
