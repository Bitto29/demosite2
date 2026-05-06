import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Coffee, Croissant, IceCream, Zap, Wind } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  { id: 1, name: "Espresso", desc: "Pure, bold, unapologetic.", price: "$3.50", icon: <Zap size={20} /> },
  { id: 2, name: "Latte", desc: "Silky steamed milk meets our house espresso.", price: "$5.00", icon: <Coffee size={20} /> },
  { id: 3, name: "Cappuccino", desc: "The classic, done right.", price: "$4.50", icon: <Wind size={20} /> },
  { id: 4, name: "Cold Brew", desc: "12-hour steeped, served over ice.", price: "$5.50", icon: <IceCream size={20} /> },
  { id: 5, name: "Matcha Latte", desc: "Ceremonial grade, oat milk, a hint of honey.", price: "$6.00", icon: <Coffee size={20} /> },
  { id: 6, name: "Croissant", desc: "Buttery, flaky, baked fresh each morning.", price: "$4.00", icon: <Croissant size={20} /> },
  { id: 7, name: "Affogato", desc: "Espresso poured over vanilla gelato.", price: "$6.50", icon: <IceCream size={20} /> },
  { id: 8, name: "Pour Over", desc: "Single origin, brewed to order.", price: "$7.00", icon: <Coffee size={20} /> },
];

export const Menu = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.fromTo(cardsRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section id="menu" className="min-h-screen bg-cafe-dark py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-cafe-amber tracking-[0.3em] uppercase text-sm font-semibold mb-4 block">
            Our Menu
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-cafe-cream mb-6">
            Crafted With <span className="italic">Intention</span>
          </h2>
          <p className="text-cafe-cream/60 max-w-2xl mx-auto font-sans">
            Every item on our menu is made with ethically sourced ingredients 
            and obsessive attention to detail. Experience the science of flavor.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="group relative p-8 bg-cafe-surface border border-white/5 rounded-2xl transition-all duration-500 hover:border-cafe-amber/40 hover:-translate-y-2"
            >
              <div className="absolute top-6 right-6 text-cafe-amber/20 group-hover:text-cafe-amber transition-colors">
                {item.icon}
              </div>
              
              <h3 className="text-2xl font-serif text-cafe-cream mb-3 group-hover:text-cafe-amber transition-colors">
                {item.name}
              </h3>
              <p className="text-cafe-cream/50 text-sm leading-relaxed mb-6">
                {item.desc}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-sans font-medium text-cafe-amber">
                  {item.price}
                </span>
                <button className="text-[10px] uppercase tracking-widest text-cafe-cream/40 group-hover:text-cafe-cream transition-colors border-b border-transparent group-hover:border-cafe-amber">
                  Order Now
                </button>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-cafe-amber/5 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl rounded-2xl pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
