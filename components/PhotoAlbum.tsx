'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera, Sparkles, Heart } from 'lucide-react';

interface PhotoAlbumProps {
  onNext: () => void;
}

interface PhotoSlide {
  id: number;
  imageSrc?: string;
  caption: string;
  type: 'photo' | 'blank';
  subtitle?: string;
}

const BASE_PATH = "";

const SLIDES: PhotoSlide[] = [
  {
    id: 1,
    imageSrc: `${BASE_PATH}/photos/flores-amarillas.png`,
    caption: "Las flores amarillas... el inicio de nuestra magia.",
    type: 'photo',
    subtitle: "Nuestra Magia",
  },
  {
    id: 2,
    imageSrc: `${BASE_PATH}/photos/regalo-delivery.png`,
    caption: "Tú cuidando de mí a la distancia. Tienes un corazón precioso.",
    type: 'photo',
    subtitle: "Tu Lindo Corazón",
  },
  {
    id: 3,
    imageSrc: `${BASE_PATH}/photos/primera-foto.png`,
    caption: "Nuestra primera foto juntos... mi foto favorita de la chica más hermosa.",
    type: 'photo',
    subtitle: "Primera Foto Juntos",
  },
  {
    id: 4,
    imageSrc: `${BASE_PATH}/photos/beso-cachete.png`,
    caption: "Llenándote de besitos, porque me haces inmensamente feliz.",
    type: 'photo',
    subtitle: "Inmensamente Feliz",
  },
  {
    id: 5,
    imageSrc: `${BASE_PATH}/photos/abrazados-sonriendo.png`,
    caption: "Mi lugar seguro eres tú. La tranquilidad que siento a tu lado es única.",
    type: 'photo',
    subtitle: "Mi Lugar Seguro",
  },
  {
    id: 6,
    imageSrc: `${BASE_PATH}/photos/abrazados-juntos.png`,
    caption: "No hay momento en que no admire lo perfecta que eres.",
    type: 'photo',
    subtitle: "Admirable & Perfecta",
  },
  {
    id: 7,
    imageSrc: `${BASE_PATH}/photos/selfie-cuarto.png`,
    caption: "Construyendo nuestra historia oficial, siendo el hombre más afortunado.",
    type: 'photo',
    subtitle: "El Hombre Más Afortunado",
  },
  {
    id: 8,
    caption: "Y el álbum aún está vacío porque tenemos muchísimas cosas por vivir y rezo por vivirlas junto a ti, amándonos, y siendo muy atentos el uno con el otro todo el tiempo. Pero antes, hay algo que quiero decirte...",
    type: 'blank',
    subtitle: "Nuestro Futuro Juntos",
  },
];

export const PhotoAlbum: React.FC<PhotoAlbumProps> = ({ onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slide = SLIDES[currentIndex];

  const handleNextSlide = () => {
    if (currentIndex < SLIDES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onNext();
    }
  };

  const handlePrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-between w-full max-w-md mx-auto min-h-[88dvh] pt-[env(safe-area-inset-top,20px)] pb-[env(safe-area-inset-bottom,20px)] px-4 select-none"
    >
      {/* Top Header */}
      <div className="w-full text-center space-y-1 pt-2">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#4A3B32]">
          <Camera className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs font-sans-ui font-semibold tracking-wider uppercase">
            NUESTROS RECUERDOS ({currentIndex + 1}/{SLIDES.length})
          </span>
        </div>
        <h2 className="font-serif-title text-[#4A3B32] text-2xl font-bold">
          Álbum Fotográfico
        </h2>
      </div>

      {/* Polaroid Book Card Area */}
      <div className="w-full my-auto flex flex-col items-center justify-center relative py-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 0.9, rotate: currentIndex % 2 === 0 ? -2 : 2 }}
            animate={{ opacity: 1, scale: 1, rotate: currentIndex % 2 === 0 ? -1 : 1 }}
            exit={{ opacity: 0, scale: 0.9, rotate: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full max-w-[325px] bg-white rounded-xl shadow-2xl p-4 border border-[#D4AF37]/35 flex flex-col items-center space-y-3 relative"
          >
            {/* Washi tape sticker at top */}
            <div className="absolute -top-3 w-20 h-6 bg-[#D4AF37]/25 backdrop-blur-xs rounded-xs transform -rotate-1 border border-white/70 shadow-xs" />

            {/* Photo Viewport Frame */}
            {slide.type === 'photo' ? (
              <div className="w-full aspect-[4/3] rounded-lg bg-[#FDFBF7] border border-[#4A3B32]/10 overflow-hidden relative shadow-inner flex items-center justify-center">
                {slide.imageSrc ? (
                  <img
                    src={slide.imageSrc}
                    alt={slide.caption}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.endsWith('.png')) {
                        target.src = target.src.replace('.png', '.jpg');
                      }
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Camera className="w-10 h-10 text-[#D4AF37]/40 mb-1" />
                    <span className="text-xs font-serif-title font-bold text-[#4A3B32]/60">
                      {slide.subtitle}
                    </span>
                  </div>
                )}
                <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37] absolute bottom-2.5 right-2.5 drop-shadow" />
              </div>
            ) : (
              /* Blank Page (Slide 8) with golden message */
              <div className="w-full min-h-[200px] rounded-lg bg-gradient-to-br from-[#FFFDF9] to-[#FDFBF7] border-2 border-dashed border-[#D4AF37]/50 flex flex-col items-center justify-center p-5 text-center shadow-inner">
                <Sparkles className="w-8 h-8 text-[#D4AF37] mb-2" />
                <p className="text-sm sm:text-base font-serif-title italic text-[#4A3B32] leading-relaxed font-semibold">
                  {slide.caption}
                </p>
              </div>
            )}

            {/* Polaroid Bottom Caption */}
            {slide.type === 'photo' && (
              <p className="font-serif-title text-center text-sm sm:text-base font-semibold text-[#4A3B32] italic leading-snug px-1">
                &ldquo;{slide.caption}&rdquo;
              </p>
            )}

            {/* Slide Index Progress Dots */}
            <div className="flex space-x-1.5 pt-1">
              {SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? 'bg-[#D4AF37] w-5' : 'bg-[#4A3B32]/20'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="w-full flex items-center justify-between space-x-3 pt-2">
        <button
          onClick={handlePrevSlide}
          disabled={currentIndex === 0}
          className={`py-3.5 px-5 rounded-xl border flex items-center justify-center font-sans-ui font-semibold text-sm transition-all ${
            currentIndex === 0
              ? 'opacity-40 border-gray-300 text-gray-400 cursor-not-allowed'
              : 'border-[#4A3B32]/20 text-[#4A3B32] bg-white/80 active:scale-95 cursor-pointer shadow-xs'
          }`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Anterior
        </button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleNextSlide}
          className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#4A3B32] to-[#634E43] text-white font-serif-title font-semibold text-base shadow-xl flex items-center justify-center space-x-2 border border-[#D4AF37]/40 cursor-pointer"
        >
          <span>{currentIndex === SLIDES.length - 1 ? "Continuar" : "Siguiente"}</span>
          <ChevronRight className="w-5 h-5 text-[#D4AF37]" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PhotoAlbum;
