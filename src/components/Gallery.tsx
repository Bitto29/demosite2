import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { id: "cafe", src: "https://picsum.photos/seed/cafe/800/1000", title: "Morning Calm" },
  { id: "coffee", src: "https://picsum.photos/seed/coffee/800/600", title: "Hand Poured" },
  { id: "interior", src: "https://picsum.photos/seed/interior/800/800", title: "Minimalist Space" },
  { id: "wood", src: "https://picsum.photos/seed/wood/800/1000", title: "Wabi Sabi" },
  { id: "warm", src: "https://picsum.photos/seed/warm/800/600", title: "Golden Hour" },
  { id: "candle", src: "https://picsum.photos/seed/candle/800/800", title: "Evening Ritual" },
  { id: "beans", src: "https://picsum.photos/seed/beans/800/1000", title: "The Source" },
  { id: "morning", src: "https://picsum.photos/seed/morning/800/800", title: "First Light" },
];

export const Gallery = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.fromTo(".gallery-item", 
      { opacity: 0, scale: 0.95 },
      { 
        opacity: 1, scale: 1, duration: 1, stagger: 0.2, ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
        }
      }
    );
  }, []);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className="min-h-screen bg-cafe-dark py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-cafe-amber tracking-[0.3em] uppercase text-sm font-semibold mb-4 block">
              Atmosphere
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-cafe-cream">
              Feel the <span className="italic">Vibe</span>
            </h2>
          </div>
          <p className="text-cafe-cream/30 uppercase tracking-[0.2em] text-[10px] max-w-xs mb-2 leading-loose">
            A sanctuary designed for focus and the appreciation of fine craftsmanship.
          </p>
        </div>

        <div ref={containerRef} className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {images.map((img, idx) => (
            <motion.div
              key={img.id}
              onClick={() => setSelectedIdx(idx)}
              className="gallery-item relative rounded-lg overflow-hidden cursor-pointer group break-inside-avoid"
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-cafe-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-2">
                <Maximize2 className="text-cafe-amber" size={24} />
                <span className="text-cafe-cream font-serif italic text-lg">{img.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[12000] bg-cafe-dark/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12"
            onClick={() => setSelectedIdx(null)}
          >
            <button 
              className="absolute top-8 right-8 text-cafe-cream/60 hover:text-cafe-cream z-[12001]"
              onClick={() => setSelectedIdx(null)}
            >
              <X size={40} />
            </button>

            <button 
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-cafe-cream/40 hover:text-cafe-amber transition-colors z-[12001]"
              onClick={prevImage}
            >
              <ChevronLeft size={60} />
            </button>

            <button 
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-cafe-cream/40 hover:text-cafe-amber transition-colors z-[12001]"
              onClick={nextImage}
            >
              <ChevronRight size={60} />
            </button>

            <motion.div
              key={selectedIdx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[80%] flex items-center justify-center">
                <img 
                  src={images[selectedIdx].src} 
                  alt={images[selectedIdx].title}
                  className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                />
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-3xl font-serif italic text-cafe-cream mb-2">
                  {images[selectedIdx].title}
                </h3>
                <p className="text-cafe-amber tracking-widest text-sm uppercase">
                  {selectedIdx + 1} / {images.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
