import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FutureVisionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  useEffect(() => {
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll('.char');
      gsap.fromTo(
        chars,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  const title = 'The future of tailoring is intelligent.';
  const words = title.split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2d2520] to-[#1a1a1a]">
        {/* Animated mesh gradient */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(196, 165, 116, 0.3) 0%, transparent 40%),
              radial-gradient(circle at 80% 20%, rgba(184, 196, 168, 0.2) 0%, transparent 40%),
              radial-gradient(circle at 40% 40%, rgba(232, 212, 196, 0.15) 0%, transparent 30%)
            `,
            backgroundSize: '200% 200%',
          }}
        />

        {/* Fabric texture overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c4a574' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating light particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#c4a574]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [-20, 20],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#c4a574] to-transparent mx-auto mb-12"
        />

        {/* Main title */}
        <div ref={textRef} className="mb-8">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4">
                {word.split('').map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className={`char inline-block ${
                      word === 'intelligent.'
                        ? 'bg-gradient-to-r from-[#c4a574] via-[#d4b896] to-[#c4a574] bg-clip-text text-transparent'
                        : 'text-white'
                    }`}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[#a0a0a0] text-lg md:text-xl max-w-2xl mx-auto mb-12"
        >
          Where artificial intelligence meets centuries of tailoring wisdom.
          A new era of personalized fashion awaits.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Link to="/auth">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#c4a574] to-[#d4b896] hover:from-[#b89564] hover:to-[#c4a886] text-white px-10 py-7 text-lg rounded-full shadow-xl shadow-[#c4a574]/20 transition-all duration-300 hover:shadow-2xl hover:shadow-[#c4a574]/30 hover:-translate-y-1"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 flex justify-center gap-4"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
              className="w-2 h-2 rounded-full bg-[#c4a574]"
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FutureVisionSection;
