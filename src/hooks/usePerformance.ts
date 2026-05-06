import { useState, useEffect } from "react";

export interface PerformanceConfig {
  isLiteMode: boolean;
  reduceMotion: boolean;
  maxPixelRatio: number;
  maxParticles: number;
}

export const usePerformance = (): PerformanceConfig => {
  const [config, setConfig] = useState<PerformanceConfig>({
    isLiteMode: false,
    reduceMotion: false,
    maxPixelRatio: 1.5,
    maxParticles: 30,
  });

  useEffect(() => {
    // Check for prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // Check hardware
    // Note: hardwareConcurrency and deviceMemory are hints
    const cores = navigator.hardwareConcurrency || 4;
    // @ts-ignore - deviceMemory is not in all type defs
    const memory = navigator.deviceMemory || 4;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const isLite = cores < 4 || memory < 4 || isMobile;

    setConfig({
      isLiteMode: isLite,
      reduceMotion: motionQuery.matches,
      maxPixelRatio: isLite ? 1 : 1.5,
      maxParticles: isLite ? 0 : isMobile ? 10 : 30,
    });

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setConfig(prev => ({ ...prev, reduceMotion: e.matches }));
    };

    motionQuery.addEventListener("change", handleMotionChange);
    return () => motionQuery.removeEventListener("change", handleMotionChange);
  }, []);

  return config;
};
