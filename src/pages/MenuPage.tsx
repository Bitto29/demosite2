import React, { useState } from "react";
import { PageTransition } from "../components/PageTransition";
import { PageHero } from "../components/PageHero";
import { Coffee, Croissant, IceCream, Zap, Wind, Utensils } from "lucide-react";

const menuItems = [
  { id: 1, category: "Coffee", name: "Espresso", desc: "Pure, bold, unapologetic.", price: "$3.50", icon: <Zap size={20} /> },
  { id: 2, category: "Coffee", name: "Latte", desc: "Silky milk meets house espresso.", price: "$5.00", icon: <Coffee size={20} /> },
  { id: 3, category: "Coffee", name: "Cappuccino", desc: "The classic ratio.", price: "$4.50", icon: <Wind size={20} /> },
  { id: 4, category: "Coffee", name: "Cold Brew", desc: "12-hour steeped perfection.", price: "$5.50", icon: <IceCream size={20} /> },
  { id: 5, category: "Coffee", name: "Matcha Latte", desc: "Ceremonial grade green tea.", price: "$6.00", icon: <Coffee size={20} /> },
  { id: 6, category: "Food", name: "Croissant", desc: "Buttery, flaky, fresh.", price: "$4.00", icon: <Croissant size={20} /> },
  { id: 7, category: "Food", name: "Affogato", desc: "Espresso over vanilla bean.", price: "$6.50", icon: <IceCream size={20} /> },
  { id: 8, category: "Coffee", name: "Pour Over", desc: "Precision brewed origin story.", price: "$7.00", icon: <Coffee size={20} /> },
  { id: 9, category: "Food", name: "Avocado Toast", desc: "Sourdough, chili, egg.", price: "$12.00", icon: <Utensils size={20} /> },
  { id: 10, category: "Food", name: "Acai Bowl", desc: "Seasonal fruits and granola.", price: "$11.00", icon: <Utensils size={20} /> },
];

const MenuPage = () => {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Coffee", "Food"];

  const filteredItems = filter === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === filter);

  return (
    <PageTransition>
      <PageHero 
        title="Crafted With" 
        italicTitle="Intention" 
        subtitle="Our Menu"
      />
      
      <section className="bg-cafe-dark py-24 min-h-screen">
        <div className="container mx-auto px-6">
          {/* Filters */}
          <div className="flex items-center justify-center gap-4 mb-20">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-full text-xs uppercase tracking-widest transition-all duration-300 border ${
                  filter === cat 
                    ? "bg-cafe-amber border-cafe-amber text-cafe-dark font-bold" 
                    : "border-white/10 text-cafe-cream/60 hover:border-cafe-amber/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative p-8 bg-cafe-surface border border-white/5 rounded-2xl transition-all duration-500 hover:border-cafe-amber/40 hover:-translate-y-2"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-cafe-dark flex items-center justify-center text-cafe-amber">
                    {item.icon}
                  </div>
                  <span className="text-xl font-sans font-medium text-cafe-amber">
                    {item.price}
                  </span>
                </div>
                
                <h3 className="text-2xl font-serif text-cafe-cream mb-3 group-hover:text-cafe-amber transition-colors">
                  {item.name}
                </h3>
                <p className="text-cafe-cream/50 text-sm leading-relaxed">
                  {item.desc}
                </p>

                <div className="absolute inset-0 bg-cafe-amber/5 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl rounded-2xl pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default MenuPage;
