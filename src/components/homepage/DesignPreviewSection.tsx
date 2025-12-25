import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const textures = [
  { name: 'Silk Peach', color: '#e8d4c4', roughness: 0.2 },
  { name: 'Sage Linen', color: '#b8c4a8', roughness: 0.5 },
  { name: 'Ivory Satin', color: '#f5e6d3', roughness: 0.15 },
  { name: 'Nude Cotton', color: '#d4c4b0', roughness: 0.6 },
];

const Mannequin = ({ textureIndex }: { textureIndex: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth rotation following mouse
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.3 + state.clock.elapsedTime * 0.1,
        0.05
      );
      // Subtle breathing animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.02;
    }
  });

  const texture = textures[textureIndex];

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Torso */}
      <mesh position={[0, 1.5, 0]}>
        <capsuleGeometry args={[0.35, 0.8, 16, 32]} />
        <meshStandardMaterial color="#f0e6dc" roughness={0.3} metalness={0.05} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 2.1, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.3, 16]} />
        <meshStandardMaterial color="#f0e6dc" roughness={0.3} metalness={0.05} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#f0e6dc" roughness={0.3} metalness={0.05} />
      </mesh>

      {/* Dress - Top */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.4, 0.35, 0.6, 32]} />
        <meshStandardMaterial
          color={texture.color}
          roughness={texture.roughness}
          metalness={0.05}
        />
      </mesh>

      {/* Dress - Skirt */}
      <mesh position={[0, 0.4, 0]}>
        <coneGeometry args={[0.8, 1.8, 32]} />
        <meshStandardMaterial
          color={texture.color}
          roughness={texture.roughness}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Waist belt */}
      <mesh position={[0, 0.95, 0]}>
        <torusGeometry args={[0.38, 0.03, 16, 32]} />
        <meshStandardMaterial color="#c4a574" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Embroidery details */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 2) * 0.6,
            0.2,
            Math.sin((i * Math.PI) / 2) * 0.6,
          ]}
          rotation={[Math.PI / 2, 0, (i * Math.PI) / 2]}
        >
          <torusGeometry args={[0.05, 0.015, 8, 16]} />
          <meshStandardMaterial color="#c4a574" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
};

const Scene3D = ({ textureIndex }: { textureIndex: number }) => {
  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#fff5eb" castShadow />
      <pointLight position={[-3, 2, 2]} intensity={0.4} color="#c4a574" />
      <spotLight
        position={[0, 8, 0]}
        intensity={0.5}
        angle={0.4}
        penumbra={1}
        color="#f5e6d3"
        castShadow
      />

      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <Mannequin textureIndex={textureIndex} />
      </Float>

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={3}
        blur={2.5}
        far={4}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

const DesignPreviewSection = () => {
  const [activeTexture, setActiveTexture] = useState(0);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#f5ebe0] to-[#fdf8f3] py-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-20 w-80 h-80 bg-[#c4a574]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-60 h-60 bg-[#b8c4a8]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full bg-[#c4a574]/10 text-[#c4a574] text-sm font-medium mb-4"
          >
            3D Preview
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mb-4"
          >
            See Your Design Come to Life
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#6a6a6a] text-lg max-w-xl mx-auto"
          >
            Interactive 3D preview with realistic fabric draping and lighting
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Texture selector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-[#2d2d2d] mb-6">Select Fabric</h3>
            {textures.map((texture, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTexture(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all duration-300 ${
                  activeTexture === index
                    ? 'bg-white shadow-lg border-2 border-[#c4a574]'
                    : 'bg-white/50 border border-transparent hover:bg-white hover:shadow-md'
                }`}
              >
                <div
                  className="w-12 h-12 rounded-lg shadow-inner"
                  style={{ backgroundColor: texture.color }}
                />
                <div className="text-left">
                  <div className="font-medium text-[#2d2d2d]">{texture.name}</div>
                  <div className="text-sm text-[#8a8a8a]">
                    {texture.roughness > 0.4 ? 'Matte finish' : 'Smooth finish'}
                  </div>
                </div>
                {activeTexture === index && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-2 h-2 rounded-full bg-[#c4a574]"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 h-[500px] md:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#fdf8f3] to-[#f5ebe0] shadow-2xl border border-white/50"
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-spin w-8 h-8 border-2 border-[#c4a574] border-t-transparent rounded-full" />
                </div>
              }
            >
              <Canvas camera={{ position: [0, 1, 4], fov: 45 }}>
                <Scene3D textureIndex={activeTexture} />
              </Canvas>
            </Suspense>

            {/* Overlay controls hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-sm text-[#6a6a6a]">
              Drag to rotate • Mouse for lighting
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DesignPreviewSection;
