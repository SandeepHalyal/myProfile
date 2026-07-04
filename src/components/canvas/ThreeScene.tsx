"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import SceneContent from "./SceneContent";
import { Loader } from "@react-three/drei";

interface ThreeSceneProps {
  currentSection: number;
  onSectionChange: (index: number) => void;
}

export default function ThreeScene({ currentSection, onSectionChange }: ThreeSceneProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="absolute inset-0 bg-[#030303]" />;

  return (
    <div className="absolute inset-0 w-full h-full z-0 bg-[#030303]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#030303"]} />
        <Suspense fallback={null}>
          <SceneContent currentSection={currentSection} onSectionChange={onSectionChange} />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}
