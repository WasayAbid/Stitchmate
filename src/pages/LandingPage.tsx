import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Scissors, Sparkles, Users, Shield, Wand2, Palette, Heart, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import InteractiveBackground from '@/components/animations/InteractiveBackground';

const LandingPage = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const GlassmorphicCard = ({ children, className = "", delay = 0, hover = true }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      className={`relative backdrop-blur-xl bg-white/40 border border-white/60 rounded-3xl shadow-2xl ${className}`}
      style={{
        boxShadow: '0 8px 32px 0 rgba(188, 143, 143, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
      }}
    >
      {children}
    </motion.div>
  );

  const CurvedDivider = ({ flip = false }) => (
    <div className={`absolute left-0 right-0 ${flip ? 'bottom-0' : 'top-0'} overflow-hidden`} style={{ height: '120px', transform: flip ? 'rotate(180deg)' : 'none' }}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
        <path
          d="M0,0 C300,80 600,80 900,40 C1050,20 1150,0 1200,0 L1200,120 L0,120 Z"
          fill="rgba(245, 240, 235, 1)"
        />
      </svg>
    </div>
  );

  return (
    <div ref={containerRef} className="min-h-screen relative" style={{ background: 'linear-gradient(135deg, #F5F0EB 0%, #E8DED5 50%, #F5F0EB 100%)' }}>
      <InteractiveBackground particleCount={80} connectionDistance={150} cursorRadius={200} />

      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/30 border-b border-white/40" style={{ boxShadow: '0 4px 16px rgba(188, 143, 143, 0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <motion.div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #D2B48C 0%, #BC8F8F 100%)' }}
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Scissors className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #8B7355 0%, #A0826D 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              StitchMate
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/signin')}
              className="text-stone-700 hover:text-stone-900 hover:bg-stone-200/50 transition-all font-medium"
            >
              Sign In
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => navigate('/signup')}
                className="text-white shadow-xl hover:shadow-2xl transition-all font-medium relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #D2B48C 0%, #BC8F8F 100%)' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #D2B48C 0%, transparent 70%)', left: '10%', top: '20%' }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-80 h-80 rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #BC8F8F 0%, transparent 70%)', right: '10%', bottom: '20%' }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, -40, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              style={{ y: heroY, opacity: heroOpacity }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full backdrop-blur-xl bg-white/50 border border-white/60 shadow-lg"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-stone-600" />
                </motion.div>
                <span className="text-sm font-medium text-stone-700">
                  Where Craft Meets Innovation
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
              >
                <span style={{ background: 'linear-gradient(135deg, #8B7355 0%, #A0826D 50%, #D2B48C 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Tailored
                </span>
                <br />
                <span className="text-stone-800">To Your</span>
                <br />
                <span style={{ background: 'linear-gradient(135deg, #BC8F8F 0%, #D2B48C 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Vision
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-stone-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Experience the art of bespoke tailoring powered by intelligent design and master craftsmanship
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    onClick={() => navigate('/signup')}
                    className="text-white px-10 py-7 text-lg font-semibold shadow-2xl relative overflow-hidden group"
                    style={{ background: 'linear-gradient(135deg, #D2B48C 0%, #BC8F8F 100%)' }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Begin Your Journey
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/tailor/apply')}
                    className="border-2 border-stone-400 text-stone-700 hover:bg-stone-100/50 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/30 shadow-xl"
                  >
                    Join as Artisan
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 flex items-center justify-center lg:justify-start gap-8"
              >
                <div className="flex -space-x-3">
                  {[
                    { icon: Scissors, color: '#D2B48C' },
                    { icon: Sparkles, color: '#BC8F8F' },
                    { icon: Heart, color: '#A0826D' },
                    { icon: Star, color: '#8B7355' }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="w-12 h-12 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}CC 100%)` }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
                      whileHover={{ scale: 1.2, y: -5 }}
                    >
                      <item.icon className="w-5 h-5 text-white" />
                    </motion.div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 1 + i * 0.05, type: 'spring' }}
                      >
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-stone-600 font-medium">5000+ Satisfied Clients</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ scale: heroScale }}
              className="relative"
            >
              <GlassmorphicCard className="p-12" delay={0.4} hover={false}>
                <motion.div
                  className="grid grid-cols-2 gap-6"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {[
                    { icon: Palette, label: 'Design', gradient: 'from-amber-400 to-orange-500' },
                    { icon: Wand2, label: 'AI Studio', gradient: 'from-rose-400 to-pink-500' },
                    { icon: Scissors, label: 'Craft', gradient: 'from-emerald-400 to-teal-500' },
                    { icon: Heart, label: 'Perfect Fit', gradient: 'from-violet-400 to-purple-500' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1, type: 'spring', bounce: 0.4 }}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className={`relative rounded-2xl bg-gradient-to-br ${item.gradient} p-8 text-center shadow-xl cursor-pointer backdrop-blur-sm`}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-white/20"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      />
                      <item.icon className="w-12 h-12 text-white mx-auto mb-3 relative z-10" />
                      <p className="text-white font-bold text-lg relative z-10">{item.label}</p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl"
                  style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' }}
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  <Sparkles className="w-12 h-12 text-white" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full flex items-center justify-center shadow-2xl"
                  style={{ background: 'linear-gradient(135deg, #BC8F8F 0%, #D2B48C 100%)' }}
                  animate={{
                    rotate: -360,
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2.5, repeat: Infinity }
                  }}
                >
                  <Heart className="w-10 h-10 text-white" />
                </motion.div>
              </GlassmorphicCard>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6">
        <CurvedDivider />

        <div className="max-w-7xl mx-auto relative z-10 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span style={{ background: 'linear-gradient(135deg, #8B7355 0%, #BC8F8F 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Exceptional Features
              </span>
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Cutting-edge technology meets timeless craftsmanship
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: "Master Artisans", desc: "Verified expert tailors with years of experience", gradient: 'from-amber-400 to-orange-500' },
              { icon: Wand2, title: "AI Design", desc: "Intelligent design suggestions tailored to you", gradient: 'from-rose-400 to-pink-500' },
              { icon: Shield, title: "Quality Promise", desc: "100% satisfaction guaranteed on every piece", gradient: 'from-emerald-400 to-teal-500' },
              { icon: Zap, title: "Swift Delivery", desc: "Real-time tracking from studio to doorstep", gradient: 'from-violet-400 to-purple-500' }
            ].map((feature, i) => (
              <GlassmorphicCard key={i} className="p-8 group cursor-pointer" delay={i * 0.1}>
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-stone-800 mb-3">{feature.title}</h3>
                <p className="text-stone-600 leading-relaxed">{feature.desc}</p>
              </GlassmorphicCard>
            ))}
          </div>
        </div>

        <CurvedDivider flip />
      </section>

      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(245, 240, 235, 0) 0%, rgba(210, 180, 140, 0.1) 50%, rgba(245, 240, 235, 0) 100%)' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span style={{ background: 'linear-gradient(135deg, #BC8F8F 0%, #8B7355 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Your Journey
              </span>
            </h2>
            <p className="text-xl text-stone-600">
              Four seamless steps to your perfect garment
            </p>
          </motion.div>

          <div className="relative">
            <svg className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 hidden lg:block" style={{ zIndex: 0 }}>
              <motion.line
                x1="10%"
                y1="50%"
                x2="90%"
                y2="50%"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="8 8"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D2B48C" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#BC8F8F" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#D2B48C" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                { icon: Palette, step: "01", title: "Share Vision", desc: "Upload fabric and measurements", gradient: 'from-amber-400 to-orange-500' },
                { icon: Sparkles, step: "02", title: "AI Design", desc: "Get personalized suggestions", gradient: 'from-rose-400 to-pink-500' },
                { icon: Scissors, step: "03", title: "Expert Craft", desc: "Master tailors bring it to life", gradient: 'from-emerald-400 to-teal-500' },
                { icon: Heart, step: "04", title: "Receive Joy", desc: "Your perfect garment arrives", gradient: 'from-violet-400 to-purple-500' }
              ].map((step, i) => (
                <GlassmorphicCard key={i} className="p-8 text-center relative overflow-visible" delay={i * 0.15}>
                  <motion.div
                    className={`absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-black text-lg shadow-xl border-4 border-white`}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  >
                    {step.step}
                  </motion.div>

                  <motion.div
                    className={`w-20 h-20 mx-auto mt-6 mb-6 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <step.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-stone-800 mb-3">{step.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{step.desc}</p>
                </GlassmorphicCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span style={{ background: 'linear-gradient(135deg, #8B7355 0%, #BC8F8F 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Client Stories
              </span>
            </h2>
            <p className="text-xl text-stone-600">
              Experiences from our community of fashion enthusiasts
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Ayesha Rahman", role: "Fashion Designer", text: "StitchMate transformed how I collaborate with artisans. The platform is intuitive and the results are stunning.", gradient: 'from-amber-400 to-orange-500' },
              { name: "Ahmed Hassan", role: "Master Tailor", text: "Connecting with clients has never been easier. My craftsmanship now reaches a global audience with dignity.", gradient: 'from-rose-400 to-pink-500' },
              { name: "Sara Malik", role: "Bride", text: "My wedding ensemble was perfect. The virtual try-on and expert guidance made all the difference.", gradient: 'from-emerald-400 to-teal-500' }
            ].map((testimonial, i) => (
              <GlassmorphicCard key={i} className="p-8 group cursor-pointer" delay={i * 0.2}>
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center shadow-lg text-2xl font-bold text-white`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {testimonial.name.charAt(0)}
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-stone-800 text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-stone-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-stone-700 leading-relaxed italic mb-4">"{testimonial.text}"</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
              </GlassmorphicCard>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto relative z-10">
          <GlassmorphicCard className="p-16 text-center overflow-hidden" delay={0.2} hover={false}>
            <div className="absolute inset-0 opacity-20" style={{ background: 'linear-gradient(135deg, #D2B48C 0%, #BC8F8F 100%)' }} />

            <motion.div
              className="absolute w-40 h-40 rounded-full blur-2xl opacity-30"
              style={{ background: 'radial-gradient(circle, #D2B48C 0%, transparent 70%)', top: '-20%', right: '10%' }}
              animate={{ scale: [1, 1.5, 1], rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity }}
            />

            <motion.h2
              className="text-5xl md:text-7xl font-black mb-6 relative z-10"
              style={{ background: 'linear-gradient(135deg, #8B7355 0%, #BC8F8F 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              Begin Your Story
            </motion.h2>
            <p className="text-xl md:text-2xl text-stone-600 mb-12 relative z-10 max-w-2xl mx-auto">
              Join thousands creating bespoke garments with StitchMate
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <motion.div whileHover={{ scale: 1.05, rotate: 1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={() => navigate('/signup')}
                  className="text-white px-12 py-8 text-xl font-bold shadow-2xl"
                  style={{ background: 'linear-gradient(135deg, #D2B48C 0%, #BC8F8F 100%)' }}
                >
                  Start Creating
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05, rotate: -1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/tailor/apply')}
                  className="border-2 border-stone-400 text-stone-700 hover:bg-stone-100/50 px-12 py-8 text-xl font-bold backdrop-blur-sm bg-white/30"
                >
                  Join as Artisan
                </Button>
              </motion.div>
            </div>
          </GlassmorphicCard>
        </div>
      </section>

      <footer className="relative text-stone-800 py-20 px-6" style={{ background: 'rgba(245, 240, 235, 0.8)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #D2B48C 0%, #BC8F8F 100%)' }}
                >
                  <Scissors className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #8B7355 0%, #A0826D 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  StitchMate
                </span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Crafting elegance, one stitch at a time
              </p>
            </div>

            {[
              { title: "Platform", links: ["How it Works", "For Clients", "For Artisans", "Pricing"] },
              { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
              { title: "Legal", links: ["Privacy", "Terms", "Cookies", "Returns"] }
            ].map((section, i) => (
              <div key={i}>
                <h4 className="font-bold mb-4 text-stone-800">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, j) => (
                    <motion.li
                      key={j}
                      whileHover={{ x: 5 }}
                      className="text-stone-600 hover:text-stone-800 transition-colors cursor-pointer"
                    >
                      {link}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-stone-300 pt-8 text-center">
            <p className="text-stone-600">
              © 2024 StitchMate. Crafted with{' '}
              <Heart className="inline w-4 h-4 text-rose-500 fill-rose-500" />
              {' '}and precision
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
