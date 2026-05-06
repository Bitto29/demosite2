import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // Wait for fade out
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[11000] bg-cafe-dark flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-serif italic text-cafe-cream"
            >
              Demo Cafe
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
              className="h-px bg-cafe-amber mt-4 shadow-[0_0_8px_rgba(200,121,65,0.5)]"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="text-cafe-cream/60 text-sm tracking-[0.2em] mt-2 text-center uppercase"
            >
              Crafted for the Curious
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
