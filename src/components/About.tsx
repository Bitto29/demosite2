import React, { useEffect, useRef } from "react";
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
        {/* Left Side: Quote */}
        <div ref={leftRef} className="relative">
          <span className="absolute -top-16 -left-8 text-[12rem] font-serif text-cafe-amber/10 leading-none pointer-events-none">
            &ldquo;
          </span>
          <blockquote className="text-3xl md:text-5xl font-serif italic text-cafe-cream leading-tight relative z-10">
            Coffee is not just a drink. It is a ritual, a pause, a conversation.
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-12 h-px bg-cafe-amber" />
            <span className="text-cafe-amber font-serif italic text-xl">Demo Cafe</span>
          </div>
          
          <div className="mt-20 w-full aspect-square md:aspect-video rounded-2xl overflow-hidden shadow-2xl relative group">
            <img 
              src="https://picsum.photos/seed/cozy-cafe/800/600" 
              alt="Atmosphere" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cafe-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>

        {/* Right Side: Content */}
        <div ref={rightRef} className="flex flex-col gap-8">
          <div>
            <span className="text-cafe-amber tracking-[0.3em] uppercase text-sm font-semibold mb-4 block underline decoration-cafe-amber/30 underline-offset-8">
              Our Story
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-cafe-cream mb-8 leading-tight">
              Born From a Passion for the <br /> 
              <span className="italic">Perfect Cup</span>
            </h2>
          </div>

          <div className="space-y-6 text-cafe-cream/70 text-lg leading-relaxed">
            <p>
              In the heart of the city, Demo Cafe began as a simple dream: to 
              elevate the coffee experience into an art form. We don't just brew; 
              we curate moments of stillness in a bustling world.
            </p>
            <p>
              Our founders spent years traversing the globe, from the volcanic 
              highlands of Ethiopia to the mist-covered hills of Colombia, 
              sourcing single-origin beans that tell the story of their terroir.
            </p>
            <p>
              Every roast is small-batch, every pour is measured, and every space 
              we build is designed for community. We believe that the best 
              conversations happen over exceptional coffee.
            </p>
          </div>

          <motion.div 
            whileHover={{ x: 10 }}
            className="pt-6"
          >
            <a href="#gallery" className="inline-flex items-center gap-3 text-cafe-amber font-sans font-medium uppercase tracking-widest text-sm hover:text-cafe-gold transition-colors">
              Experience the Vibe
              <span className="text-xl">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
