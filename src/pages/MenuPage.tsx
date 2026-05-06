import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, Coffee, Croissant, IceCream, Zap, Wind } from "lucide-react";
import { cn } from "@/src/lib/utils";

const menuItems = [
  { id: 1, category: "Coffee", name: "Espresso", desc: "Pure, bold ritual.", price: "$3.50", icon: <Zap size={18} /> },
  { id: 2, category: "Coffee", name: "Latte", desc: "Silky oat milk comfort.", price: "$5.00", icon: <Coffee size={18} /> },
  { id: 3, category: "Coffee", name: "Cappuccino", desc: "The classic, done right.", price: "$4.50", icon: <Wind size={18} /> },
  { id: 4, category: "Coffee", name: "Cold Brew", desc: "12-hour steeped soul.", price: "$5.50", icon: <IceCream size={18} /> },
  { id: 5, category: "Coffee", name: "Matcha Latte", desc: "Ceremonial grade calm.", price: "$6.00", icon: <Coffee size={18} /> },
  { id: 6, category: "Food", name: "Croissant", desc: "Buttery, flaky, artisanal.", price: "$4.00", icon: <Croissant size={18} /> },
  { id: 7, category: "Food", name: "Affogato", desc: "Espresso meets vanilla sugar.", price: "$6.50", icon: <IceCream size={18} /> },
  { id: 8, category: "Coffee", name: "Pour Over", desc: "Single origin clarity.", price: "$7.00", icon: <Coffee size={18} /> },
];

export default function MenuPage() {
  const [filter, setFilter] = useState("All");

  const filteredItems = filter === "All" ? menuItems : menuItems.filter(i => i.category === filter);

  return (
    <div className="min-h-screen bg-cafe-dark pt-32 pb-24 px-6">
      <div className="container mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-cafe-amber hover:text-cafe-gold transition-colors text-xs uppercase tracking-widest mb-12 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        <header className="mb-20 text-center">
          <span className="text-cafe-amber tracking-[0.4em] uppercase text-[10px] font-semibold mb-6 block underline decoration-cafe-amber/30 underline-offset-8">আমাদের মেনু — THE MENU</span>
          <h1 className="text-5xl md:text-8xl font-serif text-cafe-cream mb-8">
            Crafted with <span className="italic">Intention</span>
          </h1>
          
          <div className="flex items-center justify-center gap-8 mt-12">
            {["All", "Coffee", "Food"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "text-[10px] uppercase tracking-[0.3em] transition-all relative pb-2",
                  filter === f ? "text-cafe-amber" : "text-cafe-cream/40 px-2"
                )}
              >
                {f === "All" ? "সবগুলো" : f === "Coffee" ? "কফি" : "খাবার"}
                <span className="block text-[8px] opacity-60 text-center mt-1">{f}</span>
                {filter === f && (
                  <motion.div layoutId="filter-underline" className="absolute bottom-0 left-0 w-full h-px bg-cafe-amber" />
                )}
              </button>
            ))}
          </div>
        </header>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative p-8 bg-cafe-surface border border-white/5 rounded-2xl transition-all duration-500 hover:border-cafe-amber/40 hover:-translate-y-2"
              >
                <div className="absolute top-6 right-6 text-cafe-amber/10 group-hover:text-cafe-amber transition-colors">
                  {item.icon}
                </div>
                
                <h3 className="text-2xl font-serif text-cafe-cream mb-3 group-hover:text-cafe-amber transition-colors">
                  {item.name}
                </h3>
                <p className="text-cafe-cream/40 text-[10px] uppercase tracking-widest leading-relaxed mb-6">
                  {item.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-sans font-medium text-cafe-amber">
                    {item.price}
                  </span>
                </div>

                <div className="absolute inset-0 bg-cafe-amber/5 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl rounded-2xl pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
