import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "motion/react";

export const CoffeeMug = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || !canvasRef.current || !containerRef.current) return;

    // --- Three.js Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    
    const updateSize = () => {
      const width = containerRef.current?.clientWidth || 500;
      const height = containerRef.current?.clientHeight || 500;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // --- Mug Creation ---
    const mugColor = new THREE.Color(0x3d2b1f); // Warm brown
    const material = new THREE.MeshLambertMaterial({ 
      color: mugColor,
      emissive: 0x1a0f0a,
    });

    // Body: Cylinder
    const bodyGeometry = new THREE.CylinderGeometry(1.2, 1, 2.5, 32);
    const body = new THREE.Mesh(bodyGeometry, material);
    
    // Handle: Torus
    const handleGeometry = new THREE.TorusGeometry(0.7, 0.2, 16, 32, Math.PI);
    const handle = new THREE.Mesh(handleGeometry, material);
    handle.position.x = 1.1;
    handle.rotation.z = Math.PI / 2;
    
    const mugGroup = new THREE.Group();
    mugGroup.add(body);
    mugGroup.add(handle);
    scene.add(mugGroup);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xf5a623, 1.5, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const backLight = new THREE.PointLight(0xffffff, 0.5, 100);
    backLight.position.set(-5, -2, -2);
    scene.add(backLight);

    // --- Steam Particles ---
    const steamCount = 15;
    const steamGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    
    const particles: THREE.Mesh[] = [];
    for (let i = 0; i < steamCount; i++) {
        const steamMaterial = new THREE.MeshBasicMaterial({ 
          color: 0xffffff, 
          transparent: true, 
          opacity: 0.15 
        });
      const p = new THREE.Mesh(steamGeometry, steamMaterial);
      p.position.set(
        (Math.random() - 0.5) * 1.2,
        1.2 + Math.random() * 2,
        (Math.random() - 0.5) * 1.2
      );
      // Custom data for animation
      (p as any).speed = 0.008 + Math.random() * 0.015;
      (p as any).offset = Math.random() * Math.PI * 2;
      scene.add(p);
      particles.push(p);
    }

    // --- Animation & Control ---
    let frameId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);

    const animate = (time: number) => {
      frameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = time * 0.001;
      
      // Bobbing
      mugGroup.position.y = Math.sin(t) * 0.2;
      mugGroup.rotation.y = t * 0.5;
      mugGroup.rotation.x = Math.sin(t * 0.5) * 0.1;

      // Steam animation
      particles.forEach((p: any) => {
        p.position.y += p.speed;
        p.position.x += Math.sin(t + p.offset) * 0.005;
        p.material.opacity = Math.max(0, 0.15 - (p.position.y - 1.2) * 0.05);

        if (p.position.y > 4) {
          p.position.y = 1.2;
          p.position.x = (Math.random() - 0.5) * 1.2;
        }
      });

      renderer.render(scene, camera);
    };
    animate(0);

    // --- Cleanup ---
    return () => {
      window.removeEventListener("resize", updateSize);
      cancelAnimationFrame(frameId);
      observer.disconnect();
      
      renderer.dispose();
      bodyGeometry.dispose();
      handleGeometry.dispose();
      steamGeometry.dispose();
      material.dispose();
      particles.forEach(p => (p.material as THREE.Material).dispose());
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div 
        className="w-full h-full flex items-center justify-center pointer-events-none"
      >
        <motion.div
           animate={{ y: [0, -15, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="relative"
        >
          <svg width="180" height="180" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Steam */}
            <motion.path 
              animate={{ opacity: [0, 0.4, 0], y: [0, -10, -20] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0 }}
              d="M35 25 Q40 20 35 15" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" 
            />
            <motion.path 
              animate={{ opacity: [0, 0.4, 0], y: [0, -10, -20] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              d="M50 20 Q55 15 50 10" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" 
            />
            <motion.path 
              animate={{ opacity: [0, 0.4, 0], y: [0, -10, -20] }}
              transition={{ duration: 3, repeat: Infinity, delay: 2 }}
              d="M65 25 Q70 20 65 15" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" 
            />
            
            {/* Body */}
            <path d="M30 40 H70 V75 C70 82 62 85 50 85 C38 85 30 82 30 75 V40Z" fill="#3D2B1F" />
            {/* Handle */}
            <path d="M70 50 C80 50 85 55 85 62.5 C85 70 80 75 70 75" stroke="#3D2B1F" strokeWidth="6" strokeLinecap="round" />
          </svg>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-cafe-amber/20 blur-xl rounded-full" />
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};
