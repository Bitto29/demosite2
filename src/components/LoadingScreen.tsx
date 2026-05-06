import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePerformance } from "../hooks/usePerformance";

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);
  const { reduceMotion } = usePerformance();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // Wait for fade out
    }, reduceMotion ? 1000 : 2500);

    return () => clearTimeout(timer);
  }, [onComplete, reduceMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[11000] bg-cafe-dark flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="relative">
            <motion.h1
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-8xl font-serif italic text-cafe-cream"
            >
              Demo Cafe
            </motion.h1>
            {!reduceMotion && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 1.2, ease: "easeInOut" }}
                className="h-px bg-cafe-amber mt-4 origin-left"
              />
            )}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.8, duration: 0.8 }}
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
