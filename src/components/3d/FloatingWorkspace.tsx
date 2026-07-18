"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial, Sphere, Box, Torus, Icosahedron, Stars } from "@react-three/drei";
import * as THREE from "three";
import { Code2 } from "lucide-react";
import { usePortfolioStore } from "@/store/portfolio";
import { DISCIPLINES } from "@/lib/data";
import { useRouter } from "next/navigation";

// Individual 3D floating object
function DisciplineObject({
  discipline,
  onClick,
}: {
  discipline: (typeof DISCIPLINES)[0];
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const color = new THREE.Color(discipline.accent);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    meshRef.current.rotation.y += 0.004;
  });

  const renderShape = () => {
    switch (discipline.icon) {
      case "laptop":
        return <Box args={[0.7, 0.45, 0.05]}><meshStandardMaterial color={discipline.accent} metalness={0.8} roughness={0.2} /></Box>;
      case "brain":
        return <Icosahedron args={[0.38, 1]}><MeshDistortMaterial color={discipline.accent} distort={0.3} speed={2} metalness={0.5} /></Icosahedron>;
      case "camera":
        return <Box args={[0.65, 0.45, 0.35]}><meshStandardMaterial color={discipline.accent} metalness={0.6} roughness={0.3} /></Box>;
      case "paintbrush":
        return <Torus args={[0.3, 0.1, 16, 100]}><meshStandardMaterial color={discipline.accent} metalness={0.7} roughness={0.2} /></Torus>;
      case "rocket":
        return <Icosahedron args={[0.35, 0]}><meshStandardMaterial color={discipline.accent} metalness={0.9} roughness={0.1} /></Icosahedron>;
      case "users":
        return <Sphere args={[0.35, 32, 32]}><MeshDistortMaterial color={discipline.accent} distort={0.2} speed={1.5} metalness={0.5} /></Sphere>;
      default:
        return <Sphere args={[0.35, 32, 32]}><meshStandardMaterial color={discipline.accent} metalness={0.7} roughness={0.2} /></Sphere>;
    }
  };

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.8}
      position={discipline.position}
    >
      <group
        ref={groupRef}
        onClick={onClick}
      >
        {renderShape()}
        {/* Glow ring */}
        <Torus args={[0.55, 0.02, 8, 64]}>
          <meshBasicMaterial color={discipline.accent} transparent opacity={0.4} />
        </Torus>
        {/* Point light for each object */}
        <pointLight color={discipline.accent} intensity={2} distance={3} decay={2} />
      </group>
    </Float>
  );
}

// Particle field background
function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const count = 1200; // Increased count since particles cover the whole screen now!

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 24; // Wider range
    positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 16;
  }

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.012;
    points.current.rotation.x = state.clock.elapsedTime * 0.006;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#06b6d4" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

// Central glowing sphere
function CentralOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.003;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <Float speed={1} floatIntensity={0.3}>
      <mesh ref={ref} position={[0, 0, 0]}>
        <Sphere args={[0.6, 64, 64]}>
          <MeshDistortMaterial
            color="#06b6d4"
            distort={0.4}
            speed={1.5}
            metalness={0.9}
            roughness={0.05}
            transparent
            opacity={0.85}
          />
        </Sphere>
        <pointLight color="#06b6d4" intensity={5} distance={6} decay={2} />
      </mesh>
    </Float>
  );
}

// Responsive group that shifts elements to the right on desktop
function ResponsiveInteractiveGroup({ children }: { children: React.ReactNode }) {
  const { width } = useThree((state) => state.viewport);
  const isDesktop = width > 9;
  const positionX = isDesktop ? Math.min(width * 0.22, 2.6) : 0;
  const scale = isDesktop ? Math.min(width * 0.1, 0.9) : 0.65;

  return (
    <group position={[positionX, 0, 0]} scale={scale}>
      {children}
    </group>
  );
}

export function FloatingWorkspace() {
  const router = useRouter();
  const accentColor = usePortfolioStore((s) => s.accentColor);

  return (
    <div className="absolute inset-0 w-full h-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Stars radius={100} depth={60} count={4000} factor={3.5} saturation={0.1} fade speed={0.6} />
          <ambientLight intensity={0.15} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <ParticleField />
          
          <ResponsiveInteractiveGroup>
            <CentralOrb />
            {DISCIPLINES.map((d) => (
              <DisciplineObject
                key={d.id}
                discipline={d}
                onClick={() => router.push(d.href)}
              />
            ))}
          </ResponsiveInteractiveGroup>
          
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Mobile fallback — CSS-based animated version
export function FloatingWorkspaceFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div className="relative w-72 h-72">
        {DISCIPLINES.map((d, i) => {
          const angle = (i / DISCIPLINES.length) * Math.PI * 2;
          const radius = 115;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={d.id}
              className="absolute w-12 h-12 rounded-2xl flex items-center justify-center animate-float"
              style={{
                left: `calc(50% + ${x}px - 24px)`,
                top: `calc(50% + ${y}px - 24px)`,
                backgroundColor: `${d.accent}20`,
                border: `1px solid ${d.accent}50`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${4 + i * 0.5}s`,
              }}
            >
              <Code2 size={18} color={d.accent} />
            </div>
          );
        })}

        {/* Center orb */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full animate-pulse-glow"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.35) 0%, transparent 70%)",
            border: "1px solid rgba(6,182,212,0.4)",
          }}
        />
      </div>
    </div>
  );
}
