"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Image as DreiImage, Text } from "@react-three/drei";
import * as THREE from "three";

interface FloatingCardProps {
  position: [number, number, number];
  title: string;
  subtitle: string;
  image?: string;
  onClick?: () => void;
  accentColor?: string;
}

export default function FloatingCard({
  position,
  title,
  subtitle,
  image,
  onClick,
  accentColor = "#10b981",
}: FloatingCardProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Smooth hover effect and gentle floating animation
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Floating animation
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.15;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      hovered ? 0.15 : Math.sin(time * 0.5) * 0.05,
      0.1
    );
    
    // Scale on hover
    const targetScale = hovered ? 1.05 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "default";
      }}
    >
      {/* Outer Glow / Glass Frame */}
      <mesh>
        <planeGeometry args={[3.2, 2.2]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          roughness={0.1}
          metalness={0.1}
          transmission={0.6}
          thickness={0.5}
          ior={1.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Frame Border with accent glow */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(3.2, 2.2)]} />
        <lineBasicMaterial color={hovered ? accentColor : "#333333"} linewidth={2} />
      </lineSegments>

      {/* Renders image or fallback gradient */}
      {image ? (
        <group position={[0, 0, 0.02]}>
          <DreiImage
            url={image}
            scale={[3.0, 2.0]}
            transparent
            opacity={hovered ? 1 : 0.85}
          />
        </group>
      ) : (
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[3.0, 2.0]} />
          <meshBasicMaterial
            color="#111"
            transparent
            opacity={0.9}
          />
        </mesh>
      )}

      {/* Text Info */}
      <group position={[0, -1.3, 0.1]}>
        <Text
          color="#ffffff"
          fontSize={0.2}
          anchorX="center"
          anchorY="middle"
          maxWidth={3}
          font="https://fonts.gstatic.com/s/outfit/v11/05oDF3F1048ZOPp97J6P.ttf"
        >
          {title}
        </Text>
        <Text
          position={[0, -0.25, 0]}
          color="#888888"
          fontSize={0.14}
          anchorX="center"
          anchorY="middle"
          maxWidth={3}
          font="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2bo.ttf"
        >
          {subtitle}
        </Text>
      </group>
    </group>
  );
}
