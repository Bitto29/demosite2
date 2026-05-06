import React, { useEffect, useRef, memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CafeMug } from "../components/CafeMug";
import { ChevronRight } from "lucide-react";
import { usePerformance } from "../hooks/usePerformance";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const mugContainerRef = useRef<HTMLDivElement>(null);
  const { isLiteMode, reduceMotion } = usePerformance();

  useEffect(() => {
    if (!mugContainerRef.current || reduceMotion) return;

    const sections = gsap.utils.toArray('section');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        invalidateOnRefresh: true,
      }
    });

    tl.to(mugContainerRef.current, {
      x: "30vw",
      y: "-25vh",
      scale: 0.8,
      ease: "power1.inOut"
    })
    .to(mugContainerRef.current, {
      x: "-25vw",
      y: "15vh",
      scale: 0.6,
      opacity: isLiteMode ? 0.3 : 0.6,
      ease: "power1.inOut"
    })
    .to(mugContainerRef.current, {
      y: "40vh",
      scale: 0.3,
      opacity: 0,
      ease: "power1.inOut"
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLiteMode, reduceMotion]);

  return (
    <div className="relative">
      <div 
        ref={mugContainerRef}
        className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center"
      >
        <div className="w-[300px] h-[300px] md:w-[600px] md:h-[600px]">
          <CafeMug />
        </div>
      </div>

      <HeroHome />
      <AboutTeaser />
      <MenuTeaser />
      <GalleryTeaser />
      <ContactTeaser />
    </div>
  );
};

export default memo(Home);

const HeroHome = memo(() => (
  <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
    <div className="container mx-auto text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-cafe-amber tracking-[0.4em] uppercase text-[10px] font-semibold mb-4 block">
          আমাদের গল্প — <span className="text-cafe-cream/40">Since 2025</span>
        </span>
        <h1 className="text-5xl md:text-8xl font-serif leading-[1.1] text-cafe-cream mb-8">
          প্রতিটি চুমুকে একটি গল্প <br />
          <span className="italic text-cafe-amber">Where Every Sip Tells a Story</span>
        </h1>
        <p className="text-cafe-cream/60 font-sans max-w-lg mx-auto mb-10 text-sm md:text-base">
          Crafted for the Curious. A sanctuary for the soul, 
          brewing excellence in every cup.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/menu" className="px-10 py-4 bg-cafe-amber text-cafe-dark font-sans font-bold uppercase tracking-widest text-xs rounded-full hover:bg-cafe-gold transition-all duration-300 transform hover:scale-105 shadow-xl">
            Explore Menu
          </Link>
          <Link to="/about" className="text-cafe-cream/80 hover:text-cafe-amber transition-colors flex items-center gap-2 group text-xs uppercase tracking-widest">
            Our Story <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
));

const AboutTeaser = memo(() => (
  <section className="min-h-[70vh] flex items-center bg-cafe-espresso py-24 px-6 border-y border-white/5">
    <div className="container mx-auto max-w-4xl">
      <span className="text-cafe-amber tracking-[0.4em] uppercase text-[10px] font-semibold mb-4 block">আমাদের গল্প — SPECIALTY COFFEE</span>
      <h2 className="text-3xl md:text-5xl font-serif text-cafe-cream mb-8 leading-tight">
        Born from a passion for the perfect cup, we curate moments of stillness in Dhaka's heart.
      </h2>
      <Link to="/about" className="inline-flex items-center gap-3 text-cafe-cream/60 hover:text-cafe-amber transition-all text-xs uppercase tracking-[0.2em] group">
        Read Our Story 
        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  </section>
));

const MenuTeaser = memo(() => (
  <section className="min-h-[80vh] flex flex-col justify-center bg-cafe-dark py-24 px-6">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-cafe-amber tracking-[0.3em] uppercase text-[10px] font-semibold mb-4 block underline decoration-cafe-amber/20 underline-offset-8">আমাদের মেনু — CRAFTED WITH INTENTION</span>
          <h2 className="text-4xl md:text-6xl font-serif text-cafe-cream">
            The Essentials
          </h2>
        </div>
        <Link to="/menu" className="text-xs uppercase tracking-widest text-cafe-amber hover:text-cafe-gold transition-colors flex items-center gap-2">
          Full Menu <ChevronRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: "Espresso", price: "$3.50", desc: "Pure, bold ritual." },
          { name: "Latte", price: "$5.00", desc: "Silky oat milk comfort." },
          { name: "Cold Brew", price: "$5.50", desc: "12-hour steeped soul." },
          { name: "Matcha", price: "$6.00", desc: "Ceremonial grade calm." }
        ].map((item, i) => (
          <div key={i} className="p-8 bg-cafe-surface rounded-2xl border border-white/5 hover:border-cafe-amber/20 transition-all group">
            <h3 className="text-xl font-serif text-cafe-cream mb-2 group-hover:text-cafe-amber transition-colors">{item.name}</h3>
            <p className="text-xs text-cafe-cream/40 mb-4">{item.desc}</p>
            <span className="text-cafe-amber font-sans text-sm">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
));

const GalleryTeaser = memo(() => (
  <section className="min-h-[80vh] flex flex-col justify-center bg-cafe-espresso py-24 px-6 overflow-hidden">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-cafe-amber tracking-[0.3em] uppercase text-[10px] font-semibold mb-4 block">বায়ুমণ্ডল — FEEL THE VIBE</span>
          <h2 className="text-4xl md:text-6xl font-serif text-cafe-cream">
            Atmosphere
          </h2>
        </div>
        <Link to="/gallery" className="text-xs uppercase tracking-widest text-cafe-amber hover:text-cafe-gold transition-colors flex items-center gap-2">
          Explore Gallery <ChevronRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 aspect-square md:aspect-video">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="overflow-hidden rounded-xl group relative bg-cafe-dark">
            <picture>
              <source srcSet={`https://picsum.photos/seed/cafe-${i}/400/600`} media="(max-width: 640px)" />
              <img 
                src={`https://picsum.photos/seed/cafe-${i}/600/800`}
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                alt="Teaser"
                loading="lazy"
                width="600"
                height="800"
              />
            </picture>
          </div>
        ))}
      </div>
    </div>
  </section>
));

const ContactTeaser = memo(() => (
  <section className="min-h-[40vh] bg-cafe-surface py-24 px-6 border-t border-white/10">
    <div className="container mx-auto text-center">
      <span className="text-cafe-amber tracking-[0.4em] uppercase text-[10px] font-semibold mb-4 block">খুঁজে নিন — VISIT US</span>
      <h2 className="text-3xl md:text-5xl font-serif text-cafe-cream mb-10 max-w-2xl mx-auto italic italic-emphasis">
        Come say hello in the heart of Dhaka.
      </h2>
      <Link to="/contact" className="px-10 py-4 border border-cafe-amber text-cafe-amber font-sans font-bold uppercase tracking-widest text-xs rounded-full hover:bg-cafe-amber hover:text-cafe-dark transition-all duration-300">
        Get in Touch
      </Link>
    </div>
  </section>
));
