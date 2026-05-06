import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Hero } from "../components/Hero";
import { PageTransition } from "../components/PageTransition";
import { Coffee, Zap, Wind, IceCream, MapPin } from "lucide-react";

// Teaser Menu Items (Top 4)
const menuTeaserItems = [
  { id: 1, name: "Espresso", desc: "Pure, bold, unapologetic.", price: "$3.50", icon: <Zap size={20} /> },
  { id: 2, name: "Latte", desc: "Silky milk meets espresso.", price: "$5.00", icon: <Coffee size={20} /> },
  { id: 3, name: "Cappuccino", desc: "The classic ratio.", price: "$4.50", icon: <Wind size={20} /> },
  { id: 4, name: "Cold Brew", desc: "12-hour steeped.", price: "$5.50", icon: <IceCream size={20} /> },
];

// Teaser Gallery Images (First 4)
const galleryTeaserImages = [
  { id: "cafe", src: "https://picsum.photos/seed/cafe/800/1000", title: "Morning Calm" },
  { id: "coffee", src: "https://picsum.photos/seed/coffee/800/600", title: "Hand Poured" },
  { id: "interior", src: "https://picsum.photos/seed/interior/800/800", title: "Minimalist Space" },
  { id: "wood", src: "https://picsum.photos/seed/wood/800/1000", title: "Wabi Sabi" },
];

const Home = () => {
  return (
    <PageTransition>
      <Hero />
      
      {/* Menu Preview */}
      <section className="bg-cafe-dark py-24">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-cafe-cream mb-4">
            House <span className="italic">Favorites</span>
          </h2>
        </div>
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {menuTeaserItems.map((item) => (
            <div
              key={item.id}
              className="group p-8 bg-cafe-surface border border-white/5 rounded-2xl transition-all duration-500 hover:border-cafe-amber/40 hover:-translate-y-2"
            >
              <div className="text-cafe-amber/20 group-hover:text-cafe-amber transition-colors mb-6">
                {item.icon}
              </div>
              <h3 className="text-2xl font-serif text-cafe-cream mb-3">
                {item.name}
              </h3>
              <p className="text-cafe-cream/50 text-sm mb-6">{item.desc}</p>
              <span className="text-xl font-sans font-medium text-cafe-amber">
                {item.price}
              </span>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link 
            to="/menu" 
            className="px-10 py-4 border border-cafe-amber text-cafe-amber hover:bg-cafe-amber hover:text-cafe-dark transition-all duration-500 rounded-full font-sans font-bold uppercase tracking-widest text-sm"
          >
            See Full Menu
          </Link>
        </div>
      </section>

      {/* Gallery Teaser */}
      <section className="bg-cafe-espresso py-24 overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <h2 className="text-4xl md:text-5xl font-serif text-cafe-cream">
            Feel the <span className="italic">Vibe</span>
          </h2>
          <Link 
            to="/gallery" 
            className="text-cafe-amber font-sans font-medium uppercase tracking-widest text-sm hover:text-cafe-gold transition-colors flex items-center gap-3"
          >
            Visit the Atmosphere <span className="text-xl">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {galleryTeaserImages.map((img) => (
            <div key={img.id} className="relative aspect-[4/5] overflow-hidden group">
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-cafe-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-cafe-cream font-serif italic text-xl">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Strip */}
      <section className="bg-cafe-amber py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 text-cafe-dark">
            <MapPin size={24} />
            <div>
              <p className="font-bold uppercase tracking-widest text-xs mb-1">Our Location</p>
              <p className="text-lg font-serif italic">12 Roast Lane, Brewtown, BC 4200</p>
            </div>
          </div>
          <Link 
            to="/contact" 
            className="bg-cafe-dark text-cafe-cream px-8 py-4 rounded-xl font-sans font-bold uppercase tracking-widest text-sm hover:bg-cafe-espresso transition-colors shadow-2xl"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
