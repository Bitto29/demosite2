import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cafe-dark pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-2 text-cafe-amber hover:text-cafe-gold transition-colors text-xs uppercase tracking-widest mb-12 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        
        <header className="mb-20">
          <span className="text-cafe-amber tracking-[0.4em] uppercase text-[10px] font-semibold mb-6 block">আমাদের গল্প — THE ORIGIN</span>
          <h1 className="text-5xl md:text-8xl font-serif text-cafe-cream leading-[1.1]">
            Born from a <span className="italic italic-emphasis">monomaniacal obsession</span> for the perfect, soul-stirring cup of specialty coffee.
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-cafe-surface">
            <picture>
              <source srcSet="https://picsum.photos/seed/about-dhaka/400/600" media="(max-width: 640px)" />
              <img 
                src="https://picsum.photos/seed/about-dhaka/800/1200" 
                alt="Founders" 
                loading="lazy"
                width="800"
                height="1200"
                className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-cafe-dark to-transparent opacity-60" />
          </div>

          <div className="flex flex-col gap-12">
            <div className="space-y-8">
              <h2 className="text-3xl font-serif italic text-cafe-amber">আমাদের দর্শন — Our Philosophy</h2>
              <p className="text-2xl text-cafe-cream/80 font-sans leading-relaxed">
                We blend global single-origin excellence with the vibrant heart of Dhaka's community ritual.
              </p>
              <div className="w-20 h-px bg-cafe-amber/30" />
              <p className="text-cafe-cream/50 text-sm uppercase tracking-[0.2em] leading-loose">
                Ethically Sourced. <br />
                Precisely Roasted. <br />
                Served with Intention.
              </p>
            </div>

            <div className="bg-cafe-surface p-10 rounded-2xl border border-white/5 relative overflow-hidden">
              <span className="absolute -top-4 -right-4 text-8xl font-serif text-cafe-amber/5 italic leading-none select-none">Ritual</span>
              <p className="text-cafe-cream/70 italic text-lg leading-relaxed relative z-10">
                "Coffee is not just a drink. It is a ceremony of the senses, a pause in the chaos."
              </p>
            </div>
          </div>
        </div>

        <section className="mt-32 text-center">
          <h2 className="text-4xl font-serif text-cafe-cream mb-8">Join the Ritual</h2>
          <Link to="/contact" className="text-xs uppercase tracking-widest text-cafe-amber border-b border-cafe-amber/30 pb-2 hover:border-cafe-amber transition-all">
            Find our Location
          </Link>
        </section>
      </div>
    </div>
  );
}
