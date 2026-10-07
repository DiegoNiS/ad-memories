'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface LeafParticle {
  id: number;
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

export const FallingLeaves: React.FC = () => {
  const leaves: LeafParticle[] = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      startX: (i * 5.5 + Math.random() * 5) % 100, // Spread across viewport width (0-100%)
      swayX: Math.random() * 40 - 20, // Wind sway (-20px to 20px)
      size: 18 + Math.random() * 16, // Leaf size (18px to 34px)
      duration: 10 + Math.random() * 10, // Fall duration (10s to 20s)
      delay: Math.random() * 10, // Staggered delays
      rotateEnd: 180 + Math.random() * 360,
      color: AUTUMN_COLORS[i % AUTUMN_COLORS.length],
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          initial={{
            top: '-8vh',
            left: `${leaf.startX}%`,
            opacity: 0,
            rotate: 0,
            x: 0,
          }}
          animate={{
            top: '108vh',
            opacity: [0, 0.8, 0.8, 0],
            rotate: leaf.rotateEnd,
            x: [0, leaf.swayX, -leaf.swayX, 0],
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            delay: leaf.delay,
            ease: 'linear',
            x: {
              duration: leaf.duration * 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
          }}
          style={{ position: 'absolute', width: leaf.size, height: leaf.size }}
        >
          {/* Maple Leaf SVG */}
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full"
            style={{ fill: leaf.color }}
          >
            <path d="M 12 2 C 11.5 5 9 6.5 7 6 C 8.5 8 7 11 4.5 10 C 6 12.5 5 15 2 16 C 5.5 17 8 16 10.5 17.5 C 11 19.5 11.5 22 12 24 C 12.5 22 13 19.5 13.5 17.5 C 16 16 18.5 17 22 16 C 19 15 18 12.5 19.5 10 C 17 11 15.5 8 17 6 C 15 6.5 12.5 5 12 2 Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FallingLeaves;
