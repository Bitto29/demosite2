import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { cn } from "@/src/lib/utils";

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {
      name: !formData.name,
      email: !formData.email,
      message: !formData.message,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).every(v => !v)) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-cafe-surface py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info Side */}
          <div className="flex flex-col gap-12">
            <div>
              <span className="text-cafe-amber tracking-[0.3em] uppercase text-sm font-semibold mb-4 block">
                Find Us
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-cafe-cream mb-6">
                Come Say <span className="italic">Hello</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-cafe-amber/10 flex items-center justify-center text-cafe-amber shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-cafe-cream font-medium mb-1">Address</h4>
                  <p className="text-cafe-cream/60 text-sm leading-relaxed">
                    12 Roast Lane, <br />
                    Brewtown, BC 4200
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-cafe-amber/10 flex items-center justify-center text-cafe-amber shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-cafe-cream font-medium mb-1">Hours</h4>
                  <p className="text-cafe-cream/60 text-sm leading-relaxed">
                    Mon–Fri: 7am – 9pm <br />
                    Sat–Sun: 8am – 10pm
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-cafe-amber/10 flex items-center justify-center text-cafe-amber shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-cafe-cream font-medium mb-1">Phone</h4>
                  <p className="text-cafe-cream/60 text-sm leading-relaxed">
                    +1 (555) 820-4200
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-cafe-amber/10 flex items-center justify-center text-cafe-amber shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-cafe-cream font-medium mb-1">Email</h4>
                  <p className="text-cafe-cream/60 text-sm leading-relaxed">
                    hello@democafe.com
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-[300px] rounded-2xl overflow-hidden grayscale contrast-[1.2] invert brightness-[0.8] relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14608.03694485061!2d90.3671072355523!3d23.74705004128522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbddd59041!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1714972800000!5m2!1sen!2sbd" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute inset-0 bg-cafe-amber/5 pointer-events-none group-hover:bg-transparent transition-colors" />
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-cafe-dark p-8 md:p-12 rounded-3xl border border-white/5 relative shadow-2xl">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-20 h-20 rounded-full bg-cafe-amber/20 flex items-center justify-center text-cafe-amber mb-6">
                  <Send size={40} className="animate-bounce" />
                </div>
                <h3 className="text-3xl font-serif text-cafe-cream mb-4">Message Sent!</h3>
                <p className="text-cafe-cream/60">Thanks! We'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="relative group">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={cn(
                      "w-full bg-transparent border-b border-white/10 py-4 outline-none transition-all focus:border-cafe-amber font-sans text-cafe-cream placeholder:text-cafe-cream/20",
                      errors.name && "border-red-500/50"
                    )}
                    placeholder="Your Name"
                  />
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={cn(
                      "w-full bg-transparent border-b border-white/10 py-4 outline-none transition-all focus:border-cafe-amber font-sans text-cafe-cream placeholder:text-cafe-cream/20",
                      errors.email && "border-red-500/50"
                    )}
                    placeholder="Email Address"
                  />
                </div>

                <div className="relative group">
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={cn(
                      "w-full bg-transparent border-b border-white/10 py-4 outline-none transition-all focus:border-cafe-amber font-sans text-cafe-cream resize-none placeholder:text-cafe-cream/20",
                      errors.message && "border-red-500/50"
                    )}
                    placeholder="Your Message"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-cafe-amber text-cafe-dark py-5 rounded-xl font-sans font-bold uppercase tracking-widest hover:bg-cafe-gold transition-all flex items-center justify-center gap-3 active:scale-95 shadow-[0_10px_30px_-10px_rgba(200,121,65,0.3)]"
                >
                  Send Message
                  <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
