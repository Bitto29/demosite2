import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { usePerformance } from "../hooks/usePerformance";

const MugMesh = ({ isLiteMode }: { isLiteMode: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);

  // Steam particles logic
  const particles = useMemo(() => {
    if (isLiteMode) return [];
    const temp = [];
    for (let i = 0; i < 10; i++) {
      temp.push({
        position: [Math.random() * 0.2 - 0.1, 0, Math.random() * 0.2 - 0.1],
        speed: 0.1 + Math.random() * 0.2,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [isLiteMode]);

  return (
    <group ref={groupRef}>
      {/* Mug Body */}
      <mesh ref={bodyRef} position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.5, 0.45, 0.8, isLiteMode ? 16 : 32]} />
        <meshLambertMaterial color="#3d2b1f" />
      </mesh>

      {/* Mug Handle */}
      <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.25, 0.08, 8, isLiteMode ? 12 : 24, Math.PI]} />
        <meshLambertMaterial color="#3d2b1f" />
      </mesh>

      {/* Coffee Surface */}
      <mesh position={[0, 0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.42, isLiteMode ? 12 : 24]} />
        <meshLambertMaterial color="#211510" />
      </mesh>

      {/* Steam Particles */}
      {!isLiteMode && (
        <group position={[0, 0.3, 0]}>
          {particles.map((p, i) => (
            <SteamParticle key={i} {...p} />
          ))}
        </group>
      )}
    </group>
  );
};

const SteamParticle = ({ position, speed, offset }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const y = ((t * speed + offset) % 1.5);
    meshRef.current.position.set(
      position[0] + Math.sin(t * 2 + offset) * 0.05,
      y,
      position[2] + Math.cos(t * 2 + offset) * 0.05
    );
    meshRef.current.scale.setScalar(Math.max(0, (1 - y) * 0.1));
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = Math.max(0, (1 - y) * 0.3);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
    </mesh>
  );
};

export const CafeMug = () => {
  const { isLiteMode, maxPixelRatio } = usePerformance();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (isLiteMode) {
    return (
      <div ref={containerRef} className="w-64 h-64 md:w-96 md:h-96 flex items-center justify-center animate-float pointer-events-none">
        <div className="relative">
          <div className="w-32 h-40 bg-cafe-espresso rounded-b-3xl rounded-t-lg border-2 border-cafe-amber/20 relative">
            <div className="absolute -right-8 top-8 w-12 h-16 border-4 border-cafe-amber/20 rounded-full" />
            <div className="absolute top-2 left-2 right-2 h-2 bg-cafe-dark rounded-full opacity-50" />
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-4 bg-cafe-amber/10 blur-xl rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full pointer-events-none">
      {isVisible && (
        <Canvas gl={{ alpha: true, antialias: !isLiteMode }} dpr={maxPixelRatio}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
          <ambientLight intensity={1} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#c87941" />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#f5efe6" />
          
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <MugMesh isLiteMode={isLiteMode} />
          </Float>
        </Canvas>
      )}
    </div>
  );
};
