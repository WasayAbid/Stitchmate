import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

const FloatingDress = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Simplified dress shape */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.3, 0.15, 0.6, 32]} />
          <meshStandardMaterial color="#e8d4c4" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <coneGeometry args={[0.8, 1.2, 32]} />
          <meshStandardMaterial color="#f5e6d3" roughness={0.3} metalness={0.05} transparent opacity={0.9} />
        </mesh>
        {/* Embroidery details */}
        <mesh position={[0, 0.2, 0.35]}>
          <torusGeometry args={[0.08, 0.02, 16, 32]} />
          <meshStandardMaterial color="#c4a574" metalness={0.7} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

const NeuralNetwork3D = () => {
  const nodes: THREE.Vector3[] = [];
  for (let i = 0; i < 20; i++) {
    nodes.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 2
      )
    );
  }

  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 2, 2]} intensity={1} color="#c4a574" />
      <pointLight position={[-2, -1, 1]} intensity={0.5} color="#8fb88f" />
      <spotLight position={[0, 5, 0]} intensity={0.5} angle={0.5} penumbra={1} color="#f5e6d3" />

      {/* Floating nodes */}
      {nodes.slice(0, 8).map((pos, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.1} floatIntensity={0.3}>
          <mesh position={pos}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial
              color="#c4a574"
              emissive="#c4a574"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}

      <FloatingDress />
    </>
  );
};

const StatCard = ({ value, label, delay }: { value: string; label: string; delay: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="group relative"
    >
      <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#c4a574]/30 transition-all duration-500 hover:-translate-y-2">
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#c4a574] to-[#d4b896] bg-clip-text text-transparent mb-2">
            {value}
          </div>
          <div className="text-[#9a9a9a] text-sm">{label}</div>
        </motion.div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-[#c4a574]/0 group-hover:bg-[#c4a574]/5 transition-all duration-500" />
      </div>
    </motion.div>
  );
};

const AIMagicSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#1a1a1a] overflow-hidden py-20"
    >
      {/* 3D Canvas background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <NeuralNetwork3D />
        </Canvas>
      </div>

      {/* Spotlight effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#c4a574]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#8fb88f]/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full bg-[#c4a574]/10 text-[#c4a574] text-sm font-medium mb-6"
          >
            AI Technology
          </motion.span>

          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ opacity: 0 }}
          >
            AI that understands
            <br />
            <span className="bg-gradient-to-r from-[#c4a574] via-[#d4b896] to-[#c4a574] bg-clip-text text-transparent">
              fabric, fit, and fashion
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#9a9a9a] text-lg max-w-2xl mx-auto"
          >
            Our neural networks analyze fabric properties, body measurements, and design aesthetics
            to create perfectly tailored garments that fit like they were made for you.
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          <StatCard value="500K+" label="Designs Generated" delay={0} />
          <StatCard value="99.2%" label="Fit Accuracy" delay={0.1} />
          <StatCard value="< 3s" label="Generation Time" delay={0.2} />
          <StatCard value="50+" label="Fabric Types" delay={0.3} />
        </div>
      </div>
    </section>
  );
};

export default AIMagicSection;
