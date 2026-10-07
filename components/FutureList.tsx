'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Sparkles, ChevronRight, Heart } from 'lucide-react';

interface FutureListProps {
  onNext: () => void;
}

interface BucketItem {
  id: number;
  text: string;
  badge: string;
}

const BUCKET_ITEMS: BucketItem[] = [
  {
    id: 1,
    text: "Una pijamada real con mascarillas, karaoke y maratón de nuestras películas favoritas.",
    badge: "Fácil & Acogedor"
  },
  {
    id: 2,
    text: "Un duelo en la cocina: tu asado y pollo a la olla contra mi lomo saltado, acompañados de un buen vino.",
    badge: "Delicioso"
  },
  {
    id: 3,
    text: "Ser tu fotógrafo personal, capturando lo preciosa y perfecta que eres en cada atardecer.",
    badge: "Mágico"
  },
  {
    id: 4,
    text: "Volar cometas juntos, correr en cuatrimoto y acampar bajo las estrellas.",
    badge: "Aventura"
  },
  {
    id: 5,
    text: "Construir nuestro hogar seguro y eterno, con jardín, perritos, gatitos y patos que no nos comeremos, donde siempre te elegiré todos los días de mi vida.",
    badge: "Épico & Para Siempre"
  }
];

export const FutureList: React.FC<FutureListProps> = ({ onNext }) => {
  const [checkedIds, setCheckedIds] = useState<number[]>([1, 2, 3, 4, 5]);

  const toggleCheck = (id: number) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-between w-full max-w-md mx-auto min-h-[88dvh] pt-[env(safe-area-inset-top,20px)] pb-[env(safe-area-inset-bottom,20px)] px-4 select-none"
    >
      {/* Header */}
      <div className="w-full text-center space-y-2 pt-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#4A3B32]">
          <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
          <span className="text-xs font-serif-title font-semibold tracking-wider uppercase">
            Nuestros Sueños
          </span>
        </div>

        <h2 className="font-serif-title text-[#4A3B32] text-2xl font-bold">
          La Lista de Nuestro Futuro
        </h2>
        <p className="text-xs text-[#4A3B32]/70 font-sans italic">
          Promesas de todo lo que vamos a vivir juntos...
        </p>
      </div>

      {/* List container */}
      <div className="w-full my-3 space-y-3 flex-1 overflow-y-auto pr-1">
        {BUCKET_ITEMS.map((item, idx) => {
          const isChecked = checkedIds.includes(item.id);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              onClick={() => toggleCheck(item.id)}
              className={`p-3.5 rounded-2xl ios-glass border transition-all cursor-pointer flex items-start space-x-3 shadow-md ${
                isChecked
                  ? 'border-[#D4AF37] bg-white/80'
                  : 'border-[#4A3B32]/15 opacity-75'
              }`}
            >
              <button className="mt-0.5 shrink-0 text-[#D4AF37]">
                {isChecked ? (
                  <CheckCircle2 className="w-5 h-5 fill-[#D4AF37] text-white" />
                ) : (
                  <Circle className="w-5 h-5 text-[#4A3B32]/40" />
                )}
              </button>

              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-sans font-bold text-[#D4AF37] uppercase tracking-wider">
                    {item.badge}
                  </span>
                  <span className="text-[10px] font-serif-title text-[#4A3B32]/50 font-bold">
                    #{item.id}
                  </span>
                </div>
                <p className="text-xs font-sans text-[#4A3B32] leading-relaxed font-medium">
                  {item.text}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Button */}
      <div className="w-full pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={onNext}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#4A3B32] to-[#634E43] text-white font-serif-title font-semibold text-base shadow-xl flex items-center justify-center space-x-2 border border-[#D4AF37]/40 cursor-pointer"
        >
          <span>Ver Nuestro Álbum</span>
          <ChevronRight className="w-5 h-5 text-[#D4AF37]" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FutureList;
