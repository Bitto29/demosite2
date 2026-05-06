import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Menu", href: "/menu" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
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

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-6 md:px-12",
        isScrolled 
          ? "bg-cafe-dark/80 backdrop-blur-lg border-b border-cafe-amber/20 py-4" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif italic text-cafe-cream hover:text-cafe-amber transition-colors flex flex-col scale-90 md:scale-100 origin-left">
          <span>Demo Cafe</span>
          <span className="text-[10px] font-bengali text-cafe-amber tracking-wider -mt-1">ডেমো ক্যাফে</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "group relative text-xs tracking-widest uppercase transition-colors",
                isActive(link.href) ? "text-cafe-amber" : "text-cafe-cream/80 hover:text-cafe-cream"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 h-px bg-cafe-amber transition-all duration-300",
                isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-cafe-cream p-2"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-cafe-dark flex flex-col items-center justify-center gap-8"
          >
            <button 
              className="absolute top-8 right-8 text-cafe-cream p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex flex-col items-center"
              >
                <span className={cn(
                  "text-4xl font-serif italic transition-colors",
                  isActive(link.href) ? "text-cafe-amber" : "text-cafe-cream hover:text-cafe-amber"
                )}>
                  {link.name}
                </span>
                <span className="text-xs font-bengali text-cafe-amber/50 tracking-[0.2em] mt-1 uppercase">
                  {link.name === "Home" ? "হোম" : 
                   link.name === "About" ? "আমাদের সম্পর্কে" : 
                   link.name === "Menu" ? "মেনু" : 
                   link.name === "Gallery" ? "গ্যালারি" : "যোগাযোগ"}
                </span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

