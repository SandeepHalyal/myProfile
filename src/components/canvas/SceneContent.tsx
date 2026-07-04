"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Text, Float } from "@react-three/drei";
import * as THREE from "three";
import FloatingCard from "./FloatingCard";
import { profileConfig } from "@/config/profile";

interface SceneContentProps {
  currentSection: number;
  onSectionChange: (index: number) => void;
}

export default function SceneContent({ currentSection, onSectionChange }: SceneContentProps) {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Camera targets for each section
  const targets = useMemo(() => [
    {
      pos: new THREE.Vector3(0, 0, 8),
      look: new THREE.Vector3(0, 0, 0)
    },
    {
      pos: new THREE.Vector3(-10, 0, -8),
      look: new THREE.Vector3(-15, 0, -15)
    },
    {
      pos: new THREE.Vector3(10, -5, -20),
      look: new THREE.Vector3(15, -7, -30)
    },
    {
      pos: new THREE.Vector3(0, -12, -35),
      look: new THREE.Vector3(0, -15, -45)
    }
  ], []);

  // Animate camera and lookAt point
  useFrame(() => {
    const target = targets[currentSection] || targets[0];
    
    // Smooth transition for camera position
    camera.position.lerp(target.pos, 0.05);
    
    // Smooth transition for focus point
    currentLookAt.current.lerp(target.look, 0.05);
    camera.lookAt(currentLookAt.current);
  });

  // Setup central swirling mesh for HERO page
  const centralSwirlRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (centralSwirlRef.current) {
      const time = state.clock.getElapsedTime();
      centralSwirlRef.current.rotation.y = time * 0.2;
      centralSwirlRef.current.rotation.x = time * 0.1;
    }
  });

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0ea5e9" />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#10b981" />

      {/* Global Particle Background */}
      <Sparkles count={800} scale={60} size={1.2} speed={0.4} color="#10b981" />
      <Sparkles count={400} scale={40} size={1.5} speed={0.6} color="#0ea5e9" />

      {/* SECTION 0: HERO (Swirling Abstract Tech-Organic Core) */}
      <group position={[0, 0, 0]}>
        <group ref={centralSwirlRef}>
          {/* Outer glowing wireframe sphere */}
          <mesh>
            <sphereGeometry args={[2, 24, 24]} />
            <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.15} />
          </mesh>
          {/* Inner cyber sphere */}
          <mesh>
            <torusGeometry args={[1.2, 0.05, 16, 100]} />
            <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={1} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.4, 0.04, 16, 100]} />
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={1} />
          </mesh>
        </group>
        
        {/* Floating title/info in 3D */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <Text
            position={[0, 3.2, 0]}
            color="#ffffff"
            fontSize={0.45}
            font="https://fonts.gstatic.com/s/outfit/v11/05oDF3F1048ZOPp97J6P.ttf"
          >
            {profileConfig.personal.name}
          </Text>
          <Text
            position={[0, 2.7, 0]}
            color="#10b981"
            fontSize={0.2}
            font="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2bo.ttf"
          >
            {profileConfig.personal.title}
          </Text>
        </Float>
      </group>

      {/* SECTION 1: WORK EXPERIENCE (Samprithi Farms & RoaDo) */}
      {/* Centered at [-15, 0, -15] */}
      <group position={[-15, 0, -15]}>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
          <Text
            position={[0, 3, 0]}
            color="#ffffff"
            fontSize={0.5}
            rotation={[0, 0.5, 0]}
            font="https://fonts.gstatic.com/s/outfit/v11/05oDF3F1048ZOPp97J6P.ttf"
          >
            Work Experience
          </Text>
        </Float>

        {/* Samprithi Farms Card */}
        <FloatingCard
          position={[-3.5, 0, 0]}
          title="Samprithi Farms"
          subtitle="Founder & Care Taker (1500+ Chickens)"
          accentColor="#10b981"
          image={
            profileConfig.experience[0].images && profileConfig.experience[0].images.length > 0
              ? profileConfig.experience[0].images[0]
              : undefined
          }
        />

        {/* RoaDo Card */}
        <FloatingCard
          position={[2.5, 0, -2]}
          title="RoaDo Logistics"
          subtitle="Full stack Developer (Core Dev & Lead)"
          accentColor="#0ea5e9"
          image={
            profileConfig.experience[1].images && profileConfig.experience[1].images.length > 0
              ? profileConfig.experience[1].images[0]
              : undefined
          }
        />
      </group>

      {/* SECTION 2: PROJECTS */}
      {/* Centered at [15, -7, -30] */}
      <group position={[15, -7, -30]}>
        <Float speed={2} rotationIntensity={0.15} floatIntensity={0.3}>
          <Text
            position={[0, 4.5, 0]}
            color="#ffffff"
            fontSize={0.6}
            rotation={[0, -0.4, 0]}
            font="https://fonts.gstatic.com/s/outfit/v11/05oDF3F1048ZOPp97J6P.ttf"
          >
            Personal Projects
          </Text>
        </Float>

        {/* Dynamic creation of projects based on profileConfig */}
        {profileConfig.projects.map((proj, idx) => {
          // Arrange in a curved horizontal layouts in 3D
          const offset = idx - (profileConfig.projects.length - 1) / 2;
          const x = offset * 4.2;
          const z = -Math.abs(offset) * 1.5;
          const y = offset * 0.3; // Slight height steps
          
          return (
            <FloatingCard
              key={proj.name}
              position={[x, y, z]}
              title={proj.name}
              subtitle={proj.period}
              accentColor={idx % 2 === 0 ? "#10b981" : "#0ea5e9"}
              image={proj.images && proj.images.length > 0 ? proj.images[0] : undefined}
            />
          );
        })}
      </group>

      {/* SECTION 3: SKILLS & EDUCATION */}
      {/* Centered at [0, -15, -45] */}
      <group position={[0, -15, -45]}>
        <Float speed={2.5} rotationIntensity={0.1} floatIntensity={0.4}>
          <Text
            position={[0, 4, 0]}
            color="#ffffff"
            fontSize={0.6}
            font="https://fonts.gstatic.com/s/outfit/v11/05oDF3F1048ZOPp97J6P.ttf"
          >
            Skills & Education
          </Text>
        </Float>

        {/* Render Education */}
        <group position={[-5, 0, 0]}>
          <mesh>
            <boxGeometry args={[4, 2.5, 0.2]} />
            <meshPhysicalMaterial
              color="#0f172a"
              roughness={0.2}
              transmission={0.8}
              thickness={0.5}
              transparent
              opacity={0.8}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(4, 2.5, 0.2)]} />
            <lineBasicMaterial color="#0ea5e9" />
          </lineSegments>
          
          <Text
            position={[0, 0.6, 0.15]}
            color="#ffffff"
            fontSize={0.22}
            maxWidth={3.5}
            anchorX="center"
            font="https://fonts.gstatic.com/s/outfit/v11/05oDF3F1048ZOPp97J6P.ttf"
          >
            {profileConfig.education[0].degree}
          </Text>
          <Text
            position={[0, 0, 0.15]}
            color="#0ea5e9"
            fontSize={0.18}
            maxWidth={3.5}
            anchorX="center"
            font="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2bo.ttf"
          >
            {profileConfig.education[0].institution}
          </Text>
          <Text
            position={[0, -0.5, 0.15]}
            color="#888888"
            fontSize={0.14}
            maxWidth={3.5}
            anchorX="center"
            font="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2bo.ttf"
          >
            Minor: {profileConfig.education[0].minor}
          </Text>
        </group>

        {/* Floating Skills Sphere representation */}
        <group position={[4, 0, 0]}>
          {profileConfig.skills.map((skill, index) => {
            // Distribute on sphere surface
            const phi = Math.acos(-1 + (2 * index) / profileConfig.skills.length);
            const theta = Math.sqrt(profileConfig.skills.length * Math.PI) * phi;
            const r = 2.0;

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            return (
              <Float key={skill} speed={1.2} rotationIntensity={0.05} floatIntensity={0.2}>
                <Text
                  position={[x, y, z]}
                  color={index % 2 === 0 ? "#10b981" : "#0ea5e9"}
                  fontSize={0.22}
                  font="https://fonts.gstatic.com/s/outfit/v11/05oDF3F1048ZOPp97J6P.ttf"
                >
                  {skill}
                </Text>
              </Float>
            );
          })}
        </group>
      </group>
    </>
  );
}
