/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { LoadingScreen } from "./components/LoadingScreen";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      <div className="relative selection:bg-cafe-amber selection:text-cafe-dark">
        <ScrollToTop />
        <div className="grain-texture" />
        <CustomCursor />
        
        {isLoading ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : (
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        )}

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}} />
      </div>
    </BrowserRouter>
  );
}

