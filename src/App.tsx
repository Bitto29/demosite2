/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { LoadingScreen } from "./components/LoadingScreen";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { usePerformance } from "./hooks/usePerformance";

// Pages
import Home from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import MenuPage from "./pages/MenuPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageTransition = ({ children, reduceMotion }: { children: React.ReactNode, reduceMotion: boolean }) => (
  <motion.div
    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: reduceMotion ? 0.4 : 0.8, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const AppRoutes = ({ reduceMotion }: { reduceMotion: boolean }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition reduceMotion={reduceMotion}><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition reduceMotion={reduceMotion}><AboutPage /></PageTransition>} />
        <Route path="/menu" element={<PageTransition reduceMotion={reduceMotion}><MenuPage /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition reduceMotion={reduceMotion}><GalleryPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition reduceMotion={reduceMotion}><ContactPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { isLiteMode, reduceMotion } = usePerformance();

  return (
    <Router>
      <div className={`relative selection:bg-cafe-amber selection:text-cafe-dark font-sans ${isLiteMode ? 'is-lite' : ''}`}>
        <div className="grain-texture !opacity-[0.03]" />
        {!isLiteMode && <CustomCursor />}
        <ScrollToTop />
        
        {isLoading ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : (
          <>
            <Navbar />
            <AppRoutes reduceMotion={reduceMotion} />
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}


