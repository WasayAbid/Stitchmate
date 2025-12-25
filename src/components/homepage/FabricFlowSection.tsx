import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Upload, Ruler, Sparkles, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Upload,
    title: 'Upload Fabric',
    description: 'Simply drag & drop your fabric image or take a photo',
    color: '#e8d4c4',
    accentColor: '#c4a574',
  },
  {
    icon: Ruler,
    title: 'Add Measurements',
    description: 'Enter your precise measurements for a perfect fit',
    color: '#d4e4d4',
    accentColor: '#8fb88f',
  },
  {
    icon: Sparkles,
    title: 'Generate Design',
    description: 'AI creates stunning designs tailored to your fabric',
    color: '#e4d4e4',
    accentColor: '#b88fb8',
  },
  {
    icon: CheckCircle,
    title: 'Feasibility Check',
    description: 'Instant analysis ensures your design is achievable',
    color: '#d4e4e4',
    accentColor: '#8fb8b8',
  },
];

const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      className="group relative flex-shrink-0 w-72 md:w-80"
    >
      {/* Connection line */}
      {index < steps.length - 1 && (
        <div className="hidden md:block absolute top-1/2 -right-8 w-16 h-0.5 bg-gradient-to-r from-[#c4a574]/50 to-transparent z-0" />
      )}

      <div
        className="relative p-8 rounded-3xl backdrop-blur-sm border border-white/50 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 overflow-hidden"
        style={{ backgroundColor: `${step.color}40` }}
      >
        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
          style={{
            background: `radial-gradient(circle at center, ${step.accentColor}20 0%, transparent 70%)`,
          }}
        />

        {/* Ripple effect background */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <motion.div
            className="absolute w-40 h-40 rounded-full opacity-0 group-hover:opacity-30"
            style={{ backgroundColor: step.accentColor }}
            initial={{ scale: 0 }}
            whileHover={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Step number */}
        <div
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg"
          style={{ backgroundColor: step.accentColor }}
        >
          {index + 1}
        </div>

        {/* Icon */}
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ backgroundColor: `${step.accentColor}20` }}
        >
          <step.icon
            className="w-8 h-8"
            style={{ color: step.accentColor }}
          />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-[#2d2d2d] mb-3 relative z-10">
          {step.title}
        </h3>
        <p className="text-[#6a6a6a] text-sm leading-relaxed relative z-10">
          {step.description}
        </p>

        {/* Decorative elements */}
        <div
          className="absolute bottom-4 right-4 w-20 h-20 rounded-full opacity-10"
          style={{ backgroundColor: step.accentColor }}
        />
      </div>
    </motion.div>
  );
};

const FabricFlowSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    const scrollWidth = container.scrollWidth - section.clientWidth;

    gsap.to(container, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-[#fdf8f3] to-[#f5ebe0] overflow-hidden"
    >
      {/* Section header */}
      <div className="absolute top-20 left-0 right-0 text-center z-10 px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-4 py-2 rounded-full bg-[#c4a574]/10 text-[#c4a574] text-sm font-medium mb-4"
        >
          How It Works
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mb-4"
        >
          Your Design Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#6a6a6a] text-lg max-w-xl mx-auto"
        >
          From fabric to finished design in four simple steps
        </motion.p>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center gap-8 px-20 md:px-40"
        style={{ paddingTop: '60px' }}
      >
        {steps.map((step, index) => (
          <StepCard key={index} step={step} index={index} />
        ))}

        {/* End decoration */}
        <div className="flex-shrink-0 w-40 h-40 rounded-full bg-gradient-to-br from-[#c4a574]/20 to-[#c4a574]/5 flex items-center justify-center">
          <Sparkles className="w-12 h-12 text-[#c4a574]" />
        </div>
      </div>

      {/* Ambient decorations */}
      <div className="absolute bottom-20 left-20 w-60 h-60 bg-[#b8c4a8]/10 rounded-full blur-3xl" />
      <div className="absolute top-40 right-20 w-40 h-40 bg-[#c4a574]/10 rounded-full blur-2xl" />
    </section>
  );
};

export default FabricFlowSection;
