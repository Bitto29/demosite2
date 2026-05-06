import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section 
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-cafe-amber/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3.2, duration: 1, ease: "easeOut" }}
          style={{ opacity }}
        >
          <span className="text-cafe-amber tracking-[0.4em] uppercase text-sm font-medium mb-4 block">
            Specialty Coffee
          </span>
          <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] text-cafe-cream mb-6">
            Where Every Sip <br />
            <span className="italic text-cafe-amber">Tells a Story</span>
          </h1>
          <p className="text-lg md:text-xl text-cafe-cream/70 font-sans max-w-md mb-10 leading-relaxed">
            Demo Cafe — Crafted for the Curious. A sanctuary for the soul, 
            brewing excellence in every cup since 2025.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a 
              href="#menu"
              className="px-10 py-4 bg-cafe-amber text-cafe-dark font-sans font-semibold rounded-full hover:bg-cafe-gold transition-all duration-300 transform hover:scale-105 shadow-[0_10px_20px_-10px_rgba(200,121,65,0.4)]"
            >
              Explore the Menu
            </a>
            <a 
              href="#about"
              className="text-cafe-cream/80 hover:text-cafe-amber transition-colors flex items-center gap-2 group"
            >
              Our Story 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </motion.div>

        {/* 3D Model Container */}
        <motion.div
          style={{ y: yParallax }}
          className="relative flex items-center justify-center h-[400px] md:h-[600px]"
        >
          {/* Steam Particles */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 z-10 pointer-events-none w-40 h-60 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cafe-cream/20 blur-sm animate-steam"
                style={{ 
                  animationDelay: `${i * 0.5}s`,
                  left: `${40 + Math.random() * 20}%`
                }}
              />
            ))}
          </div>

          {/* Shadow & Glow beneath mug */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-48 h-12 bg-cafe-amber/20 blur-2xl rounded-[100%] z-0"
          />
          <motion.div 
            animate={{ 
              scale: [0.8, 1, 0.8],
              opacity: [0.4, 0.2, 0.4]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-32 h-6 bg-black/60 blur-xl rounded-[100%] z-0"
          />

          {/* Sketchfab Iframe */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full relative z-10"
          >
            <iframe
              title="3D Coffee Mug"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen; xr-spatial-tracking"
              src="https://sketchfab.com/models/8ef6106a071845368d94bb7bd827bfdb/embed?ui_theme=dark&autostart=1&autospin=0.3&transparent=1"
              className="w-full h-full pointer-events-auto"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={20} className="text-cafe-amber/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};
