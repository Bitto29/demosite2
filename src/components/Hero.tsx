import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import { CoffeeMug } from "./CoffeeMug";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section 
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-cafe-amber/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ opacity }}
        >
          <span className="text-cafe-amber tracking-[0.4em] uppercase text-xs font-medium mb-4 block">
            Specialty Coffee
          </span>
          <h1 className="text-5xl md:text-8xl font-serif leading-tight text-cafe-cream mb-6">
            Pure <br />
            <span className="italic text-cafe-amber">Awakening</span>
          </h1>
          <p className="text-base md:text-lg text-cafe-cream/60 font-sans max-w-xs mb-10 leading-relaxed uppercase tracking-widest text-[10px]">
            Crafted for the curious. <br />
            Sanctuary for the soul.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link 
              to="/menu"
              className="px-8 py-3 bg-cafe-amber text-cafe-dark text-xs font-bold uppercase tracking-widest rounded-full hover:bg-cafe-gold transition-all duration-300 transform hover:scale-105"
            >
              Menu
            </Link>
          </div>
        </motion.div>

        <motion.div
          style={{ y: yParallax }}
          className="relative flex items-center justify-center h-[350px] md:h-[500px]"
        >
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-40 h-10 bg-cafe-amber/20 blur-2xl rounded-full z-0"
          />
          
          <div className="w-full h-full relative z-10">
            <CoffeeMug />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase opacity-30 font-medium font-sans">Discover</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown size={14} className="text-cafe-amber/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

