import React from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-cafe-dark pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <a href="#home" className="text-4xl font-serif italic text-cafe-cream mb-4">
            Demo Cafe
          </a>
          <p className="text-cafe-amber tracking-[0.2em] uppercase text-[10px] font-semibold mb-12">
            কৌতূহলীদের জন্য তৈরি — Crafted for the Curious
          </p>

          <div className="flex items-center gap-8 mb-12">
            {["Home", "About", "Menu", "Gallery", "Contact"].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                className="text-cafe-cream/60 hover:text-cafe-amber transition-colors text-sm uppercase tracking-widest"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6 mb-16">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-cafe-cream/60 hover:text-cafe-amber hover:border-cafe-amber transition-all"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          <div className="w-full flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
            <p className="text-cafe-cream/40 text-[10px] uppercase tracking-widest">
              © 2025 Demo Cafe. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-cafe-cream/40 text-[10px] uppercase tracking-widest hover:text-cafe-amber">Privacy Policy</a>
              <a href="#" className="text-cafe-cream/40 text-[10px] uppercase tracking-widest hover:text-cafe-amber">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
