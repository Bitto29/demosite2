import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: !formData.name,
      email: !formData.email,
      message: !formData.message,
    };
    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-cafe-dark pt-32 pb-24 px-6">
      <div className="container mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-cafe-amber hover:text-cafe-gold transition-colors text-xs uppercase tracking-widest mb-12 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        <header className="mb-20">
          <span className="text-cafe-amber tracking-[0.4em] uppercase text-[10px] font-semibold mb-6 block underline decoration-cafe-amber/30 underline-offset-8">যোগাযোগ — CONTACT</span>
          <h1 className="text-5xl md:text-8xl font-serif text-cafe-cream leading-[1.1]">
            Come Say <span className="italic">Hello</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-cafe-amber mb-2">
                  <MapPin size={18} /> <span className="text-[10px] uppercase tracking-widest">Location</span>
                </div>
                <p className="text-cafe-cream/80 text-xl font-serif">12 Roast Lane, Dhaka, Bangladesh</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-cafe-amber mb-2">
                  <Clock size={18} /> <span className="text-[10px] uppercase tracking-widest">Hours</span>
                </div>
                <p className="text-cafe-cream/80 text-xl font-serif">Daily: 8:00 AM — 10:00 PM</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-cafe-amber mb-2">
                  <Mail size={18} /> <span className="text-[10px] uppercase tracking-widest">Email</span>
                </div>
                <p className="text-cafe-cream/80 text-xl font-serif underline decoration-cafe-amber/30">hello@democafe.com</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-cafe-amber mb-2">
                  <Phone size={18} /> <span className="text-[10px] uppercase tracking-widest">Phone</span>
                </div>
                <p className="text-cafe-cream/80 text-xl font-serif">+880 1234-567890</p>
              </div>
            </div>

            <div className="w-full h-[400px] rounded-3xl overflow-hidden grayscale contrast-[1.2] invert brightness-[0.8] relative border border-white/5">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9!2d90.4125!3d23.8103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzM3LjEiTiA5MMKwMjQnNDUuMCJF!5e0!3m2!1sen!2sbd!4v1234567890!5m2!1sen!2sbd" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="bg-cafe-surface p-10 md:p-16 rounded-[2.5rem] border border-white/5 relative shadow-2xl">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in">
                <div className="w-20 h-20 rounded-full bg-cafe-amber/20 flex items-center justify-center text-cafe-amber mb-6">
                  <Send size={40} className="animate-bounce" />
                </div>
                <h3 className="text-3xl font-serif text-cafe-cream mb-4">Message Sent!</h3>
                <p className="text-cafe-cream/60">কৌতূহলী হওয়ার জন্য ধন্যবাদ।<br />আমরা শিগগিরই যোগাযোগ করব।</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-cafe-amber ml-1">Your Name / নাম</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={cn(
                      "w-full bg-transparent border-b border-white/10 py-3 outline-none transition-all focus:border-cafe-amber font-sans text-cafe-cream",
                      errors.name && "border-red-500/50"
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-cafe-amber ml-1">Email / ইমেইল</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={cn(
                      "w-full bg-transparent border-b border-white/10 py-3 outline-none transition-all focus:border-cafe-amber font-sans text-cafe-cream",
                      errors.email && "border-red-500/50"
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-cafe-amber ml-1">Message / বার্তা</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={cn(
                      "w-full bg-transparent border-b border-white/10 py-3 outline-none transition-all focus:border-cafe-amber font-sans text-cafe-cream resize-none",
                      errors.message && "border-red-500/50"
                    )}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-cafe-amber text-cafe-dark py-5 rounded-2xl font-sans font-bold uppercase tracking-widest text-xs hover:bg-cafe-gold transition-all flex items-center justify-center gap-3 active:scale-95 translate-y-4"
                >
                  Send Message
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
