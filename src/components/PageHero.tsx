import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  italicTitle?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, italicTitle }) => {
  return (
    <section className="relative pt-40 pb-20 bg-cafe-dark overflow-hidden border-b border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-cafe-amber/60 hover:text-cafe-amber transition-colors text-xs uppercase tracking-[0.2em] mb-12 group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <div className="max-w-4xl">
          <span className="text-cafe-amber tracking-[0.3em] uppercase text-sm font-semibold mb-6 block">
            {subtitle}
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-cafe-cream leading-tight">
            {title} <br />
            {italicTitle && <span className="italic">{italicTitle}</span>}
          </h1>
        </div>
      </div>
      
      {/* Decorative texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grain-hero" width="5" height="5" patternUnits="userSpaceOnUse">
             <circle cx="1" cy="1" r="0.2" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grain-hero)" />
        </svg>
      </div>
    </section>
  );
};
