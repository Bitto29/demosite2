import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

const navLinks = [
  { name: "Home", bn: "হোম", href: "/" },
  { name: "Menu", bn: "মেনু", href: "/menu" },
  { name: "Gallery", bn: "গ্যালারি", href: "/gallery" },
  { name: "Contact", bn: "যোগাযোগ", href: "/contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-6 md:px-12",
        (isScrolled || mobileMenuOpen) 
          ? "bg-cafe-dark/95 backdrop-blur-2xl border-b border-white/5 py-4" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="group flex flex-col">
          <span className="text-xl md:text-2xl font-serif italic text-cafe-cream group-hover:text-cafe-amber transition-colors leading-none">
            Demo Cafe
          </span>
          <span className="text-[10px] md:text-xs font-serif text-cafe-amber/60 group-hover:text-cafe-amber transition-colors mt-1">
            ডেমো ক্যাফে
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) => cn(
                "group relative flex flex-col items-center transition-colors",
                isActive ? "text-cafe-amber" : "text-cafe-cream/80 hover:text-cafe-cream"
              )}
            >
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold mb-1">
                {link.name}
              </span>
              <span className="text-[10px] font-medium text-cafe-amber/40 group-hover:text-cafe-amber transition-colors italic">
                {link.bn}
              </span>
              <span className={cn(
                "absolute -bottom-2 left-0 h-px bg-cafe-amber transition-all duration-300 group-hover:w-full",
                location.pathname === link.href ? "w-full" : "w-0"
              )} />
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-cafe-cream p-2 flex flex-col items-end gap-1.5 group"
          onClick={() => setMobileMenuOpen(true)}
        >
          <div className="w-6 h-px bg-cafe-cream group-hover:bg-cafe-amber transition-colors" />
          <div className="w-4 h-px bg-cafe-cream group-hover:bg-cafe-amber transition-colors" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-cafe-dark/95 backdrop-blur-2xl flex flex-col"
          >
            <div className="flex justify-between items-center p-8">
              <div className="flex flex-col">
                <span className="text-xl font-serif italic text-cafe-cream">Demo Cafe</span>
                <span className="text-xs font-serif text-cafe-amber/60">ডেমো ক্যাফে</span>
              </div>
              <button 
                className="text-cafe-cream p-2 hover:text-cafe-amber transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={32} />
              </button>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center gap-10 px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="w-full text-center"
                >
                  <NavLink
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => cn(
                      "group flex flex-col items-center gap-1 transition-all duration-500",
                      isActive ? "scale-110" : "hover:scale-105"
                    )}
                  >
                    <span className={cn(
                      "text-4xl font-serif italic",
                      location.pathname === link.href ? "text-cafe-amber" : "text-cafe-cream hover:text-cafe-amber"
                    )}>
                      {link.name}
                    </span>
                    <span className="text-xs tracking-[0.4em] uppercase text-cafe-amber/50 font-bold">
                      {link.bn}
                    </span>
                  </NavLink>
                </motion.div>
              ))}
            </div>

            <div className="p-12 text-center border-t border-white/5">
              <p className="text-[10px] tracking-[0.4em] uppercase text-cafe-cream/30">
                Crafted for the curious
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
