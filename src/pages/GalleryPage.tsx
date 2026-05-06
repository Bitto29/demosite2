import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const images = [
  { id: 1, src: "https://picsum.photos/seed/cafe-1/800/1000", thumb: "https://picsum.photos/seed/cafe-1/400/500", title: "Morning Calm" },
  { id: 2, src: "https://picsum.photos/seed/cafe-2/800/600", thumb: "https://picsum.photos/seed/cafe-2/400/300", title: "Hand Poured" },
  { id: 3, src: "https://picsum.photos/seed/cafe-3/800/800", thumb: "https://picsum.photos/seed/cafe-3/400/400", title: "Minimalist Space" },
  { id: 4, src: "https://picsum.photos/seed/cafe-4/800/1000", thumb: "https://picsum.photos/seed/cafe-4/400/500", title: "Wabi Sabi" },
  { id: 5, src: "https://picsum.photos/seed/cafe-5/800/600", thumb: "https://picsum.photos/seed/cafe-5/400/300", title: "Golden Hour" },
  { id: 6, src: "https://picsum.photos/seed/cafe-6/800/800", thumb: "https://picsum.photos/seed/cafe-6/400/400", title: "Evening Ritual" },
  { id: 7, src: "https://picsum.photos/seed/cafe-7/800/1000", thumb: "https://picsum.photos/seed/cafe-7/400/500", title: "The Source" },
  { id: 8, src: "https://picsum.photos/seed/cafe-8/800/800", thumb: "https://picsum.photos/seed/cafe-8/400/400", title: "First Light" },
  { id: 9, src: "https://picsum.photos/seed/cafe-9/800/1200", thumb: "https://picsum.photos/seed/cafe-9/400/600", title: "Artisanal Brew" },
  { id: 10, src: "https://picsum.photos/seed/cafe-10/800/800", thumb: "https://picsum.photos/seed/cafe-10/400/400", title: "Coffee Soul" },
];

export default function GalleryPage() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

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
    <div className="min-h-screen bg-cafe-dark pt-32 pb-24 px-6">
      <div className="container mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-cafe-amber hover:text-cafe-gold transition-colors text-xs uppercase tracking-widest mb-12 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        <header className="mb-20">
          <span className="text-cafe-amber tracking-[0.4em] uppercase text-[10px] font-semibold mb-6 block underline decoration-cafe-amber/30 underline-offset-8">গ্যালারি — ATMOSPHERE</span>
          <h1 className="text-5xl md:text-8xl font-serif text-cafe-cream leading-[1.1]">
            Feel the <span className="italic">Vibe</span>
          </h1>
        </header>

        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {images.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              onClick={() => setSelectedIdx(idx)}
              className="relative rounded-xl overflow-hidden cursor-pointer group break-inside-avoid shadow-2xl"
            >
              <picture>
                <source srcSet={img.thumb} media="(max-width: 640px)" />
                <img 
                  src={img.src} 
                  alt={img.title}
                  loading="lazy"
                  width="400"
                  height="500"
                  className="w-full h-auto object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                />
              </picture>
              <div className="absolute inset-0 bg-cafe-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-2">
                <Maximize2 className="text-cafe-amber" size={24} />
                <span className="text-cafe-cream font-serif italic text-lg">{img.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence mode="wait">
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[12000] bg-cafe-dark/95 backdrop-blur-3xl flex items-center justify-center p-6 md:p-12"
            onClick={() => setSelectedIdx(null)}
          >
            <button 
              className="absolute top-8 right-8 text-cafe-cream/60 hover:text-cafe-cream z-[12001]"
              onClick={() => setSelectedIdx(null)}
            >
              <X size={40} />
            </button>

            <button className="absolute left-10 top-1/2 -translate-y-1/2 text-cafe-cream/40 hover:text-cafe-amber transition-colors hidden md:block" onClick={prevImage}><ChevronLeft size={60} /></button>
            <button className="absolute right-10 top-1/2 -translate-y-1/2 text-cafe-cream/40 hover:text-cafe-amber transition-colors hidden md:block" onClick={nextImage}><ChevronRight size={60} /></button>

            <motion.div
              layoutId={images[selectedIdx].id.toString()}
              className="relative max-w-5xl w-full h-[80vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={images[selectedIdx].src} alt={images[selectedIdx].title} className="max-w-full max-h-full object-contain rounded-lg" />
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-serif italic text-cafe-cream">{images[selectedIdx].title}</h3>
                <p className="text-cafe-amber text-[10px] uppercase tracking-widest mt-2">{selectedIdx + 1} / {images.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
