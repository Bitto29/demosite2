import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(leftRef.current, 
      { x: -100, opacity: 0 },
      { 
        x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(rightRef.current, 
      { x: 100, opacity: 0 },
      { 
        x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-cafe-espresso py-24 overflow-hidden"
    >
      {/* Decorative BG texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grain" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.5" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grain)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* Left Side: Visual */}
        <div ref={leftRef} className="relative">
          <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-2xl relative group">
            <img 
              src="https://picsum.photos/seed/cozy-cafe/800/800" 
              alt="Atmosphere" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div ref={rightRef} className="flex flex-col gap-6">
          <div>
            <span className="text-cafe-amber tracking-[0.4em] uppercase text-[10px] font-bold mb-4 block">
              Philosophy
            </span>
            <h2 className="text-4xl md:text-7xl font-serif text-cafe-cream mb-6 leading-tight">
              The <span className="italic">Art</span> of <br /> 
              Stillness
            </h2>
          </div>

          <p className="text-cafe-cream/40 text-lg md:text-xl font-serif italic leading-relaxed max-w-md">
            We craft moments of stillness in a bustling world through the art of exceptional coffee.
          </p>

          <div className="pt-8">
            <Link to="/gallery" className="inline-flex items-center gap-3 text-cafe-amber font-sans font-bold uppercase tracking-[0.3em] text-[10px] hover:text-cafe-gold transition-colors">
              The Vibe
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
