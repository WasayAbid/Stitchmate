import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Shield, Palette, Users, Sparkles, Globe } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate stunning designs in under 3 seconds with our optimized AI engine.',
    gradient: 'from-[#c4a574] to-[#e8d4c4]',
  },
  {
    icon: Shield,
    title: 'Feasibility Guaranteed',
    description: 'Our AI ensures every design can be physically created with your fabric.',
    gradient: 'from-[#8fb88f] to-[#b8c4a8]',
  },
  {
    icon: Palette,
    title: 'Unlimited Creativity',
    description: 'From traditional to modern, explore endless design possibilities.',
    gradient: 'from-[#b88fb8] to-[#e4d4e4]',
  },
  {
    icon: Users,
    title: 'Expert Tailors',
    description: 'Connect with verified master tailors who bring your designs to life.',
    gradient: 'from-[#8fb8b8] to-[#d4e4e4]',
  },
  {
    icon: Sparkles,
    title: 'Smart Accessories',
    description: 'AI-powered accessory recommendations that complement your design.',
    gradient: 'from-[#c4a574] to-[#d4b896]',
  },
  {
    icon: Globe,
    title: 'Cultural Heritage',
    description: 'Preserving Pakistani fashion traditions with modern technology.',
    gradient: 'from-[#9a8fb8] to-[#d4d4e4]',
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className="group relative"
    >
      {/* Glassmorphism card */}
      <div className="relative h-full p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
        {/* Gradient background on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        {/* Floating orb decoration */}
        <motion.div
          animate={{
            x: [0, 10, 0],
            y: [0, -10, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-20 blur-xl"
          style={{
            background: `linear-gradient(135deg, ${feature.gradient.includes('c4a574') ? '#c4a574' : '#8fb88f'}, transparent)`,
          }}
        />

        {/* Icon container */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
        >
          <feature.icon className="w-7 h-7 text-white" />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-[#2d2d2d] mb-3 relative z-10">
          {feature.title}
        </h3>
        <p className="text-[#6a6a6a] leading-relaxed relative z-10">
          {feature.description}
        </p>

        {/* Bottom accent line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
        />
      </div>
    </motion.div>
  );
};

const WhyStitchMateSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#fdf8f3] via-[#f8f4ef] to-[#f5ebe0] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#fdf8f3] to-transparent" />
      <div className="absolute top-40 left-10 w-72 h-72 bg-[#c4a574]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-[#b8c4a8]/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e8d4c4]/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full bg-[#c4a574]/10 text-[#c4a574] text-sm font-medium mb-4"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mb-4"
          >
            The StitchMate Advantage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#6a6a6a] text-lg max-w-xl mx-auto"
          >
            Cutting-edge technology meets traditional craftsmanship
          </motion.p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyStitchMateSection;
