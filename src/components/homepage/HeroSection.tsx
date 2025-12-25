import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, PerspectiveCamera, useTexture } from '@react-three/drei';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Upload, Sparkles } from 'lucide-react';
import * as THREE from 'three';

const FabricRoll = ({ position, rotation, color }: { position: [number, number, number]; rotation: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1 + rotation[0];
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <cylinderGeometry args={[0.3, 0.3, 1.5, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>
    </Float>
  );
};

const Scissors = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef} position={position}>
        <mesh position={[0, 0.3, 0]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.08, 0.6, 0.02]} />
          <meshStandardMaterial color="#c4a574" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.1, 0.3, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.08, 0.6, 0.02]} />
          <meshStandardMaterial color="#c4a574" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.05, 0, 0]}>
          <torusGeometry args={[0.15, 0.03, 16, 32]} />
          <meshStandardMaterial color="#c4a574" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

const MeasuringTape = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.4, 0.08, 16, 100]} />
        <meshStandardMaterial color="#f5e6d3" roughness={0.4} metalness={0.1} />
      </mesh>
    </Float>
  );
};

const Scene3D = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
      <Environment preset="studio" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#fff5eb" />
      <pointLight position={[-3, 2, 2]} intensity={0.5} color="#ffd4a3" />
      <spotLight position={[0, 5, 0]} intensity={0.3} angle={0.5} penumbra={1} color="#f0e6d3" />
      
      {/* Fabric Rolls */}
      <FabricRoll position={[-3, 1, -2]} rotation={[0.5, 0.3, 0]} color="#e8d4c4" />
      <FabricRoll position={[3.5, -0.5, -1]} rotation={[0.2, -0.5, 0.3]} color="#d4c4b0" />
      <FabricRoll position={[-2.5, -1.5, 0]} rotation={[-0.3, 0.2, 0.1]} color="#b8c4a8" />
      <FabricRoll position={[2.8, 1.8, -1.5]} rotation={[0.4, 0.1, -0.2]} color="#f5e6d3" />
      
      {/* Scissors */}
      <Scissors position={[2, 0.5, 1]} />
      
      {/* Measuring Tape */}
      <MeasuringTape position={[-2, 0, 1]} />
      
      {/* Floating spheres for ambient decoration */}
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1}>
        <mesh position={[4, 2, -3]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="#c4a574" metalness={0.9} roughness={0.1} emissive="#c4a574" emissiveIntensity={0.2} />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={0.2} floatIntensity={1.2}>
        <mesh position={[-4, -1, -2]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="#c4a574" metalness={0.9} roughness={0.1} emissive="#c4a574" emissiveIntensity={0.2} />
        </mesh>
      </Float>
    </>
  );
};

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (titleRef.current && subtitleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 }
      );
    }
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#fdf8f3] via-[#f5ebe0] to-[#e8ddd0]">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Scene3D />
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#fdf8f3]/80 via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#fdf8f3]/60 via-transparent to-[#fdf8f3]/40 z-10" />

      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c4a574]/10 rounded-full blur-3xl z-5" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#b8c4a8]/15 rounded-full blur-3xl z-5" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2d2d2d]/5 backdrop-blur-sm border border-[#c4a574]/20 text-sm text-[#5a5a5a]">
            <Sparkles className="w-4 h-4 text-[#c4a574]" />
            AI-Powered Fashion Design
          </span>
        </motion.div>

        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight max-w-5xl mb-6"
          style={{ opacity: 0 }}
        >
          <span className="text-[#2d2d2d]">Design Smarter.</span>
          <br />
          <span className="bg-gradient-to-r from-[#c4a574] via-[#d4b896] to-[#c4a574] bg-clip-text text-transparent">
            Stitch Better.
          </span>
          <br />
          <span className="text-[#4a4a4a]">Powered by AI.</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-[#6a6a6a] max-w-2xl mb-10"
          style={{ opacity: 0 }}
        >
          From fabric to flawless fashion — instantly. Transform your creative vision into
          stunning designs with our intelligent tailoring platform.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link to="/user/fabric-to-design">
            <Button
              size="lg"
              className="bg-[#2d2d2d] hover:bg-[#3d3d3d] text-white px-8 py-6 text-lg rounded-full shadow-xl shadow-[#2d2d2d]/20 transition-all duration-300 hover:shadow-2xl hover:shadow-[#2d2d2d]/30 hover:-translate-y-1"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Fabric
            </Button>
          </Link>
          <Link to="/user/fabric-to-design">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#c4a574] text-[#5a4a3a] hover:bg-[#c4a574]/10 px-8 py-6 text-lg rounded-full transition-all duration-300 hover:-translate-y-1"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Explore Designs
            </Button>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-[#c4a574]/40 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-3 bg-[#c4a574] rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
