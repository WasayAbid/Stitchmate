import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Scissors, Sparkles, Users, Shield, Clock, Wand2, Palette, Heart, Star, Zap, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', mouseMove);
    return () => window.removeEventListener('mousemove', mouseMove);
  }, []);

  const cursorX = useSpring(mousePosition.x, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(mousePosition.y, { stiffness: 500, damping: 28 });

  const FloatingOrb = ({ delay = 0, duration = 20, className = "" }) => (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{
        x: [0, 100, -50, 0],
        y: [0, -100, 50, 0],
        scale: [1, 1.2, 0.8, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
    />
  );

  const ParticleField = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-pink-400 to-purple-400"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden relative">
      <motion.div
        className="fixed w-8 h-8 rounded-full border-2 border-purple-400 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: cursorX,
          top: cursorY,
          x: -16,
          y: -16,
        }}
        animate={{
          scale: cursorVariant === 'hover' ? 1.5 : 1,
        }}
      />

      <FloatingOrb delay={0} duration={20} className="top-20 left-20 w-96 h-96 bg-pink-300/30" />
      <FloatingOrb delay={2} duration={25} className="top-40 right-20 w-80 h-80 bg-purple-300/30" />
      <FloatingOrb delay={4} duration={22} className="bottom-20 left-1/3 w-72 h-72 bg-blue-300/30" />
      <FloatingOrb delay={6} duration={18} className="bottom-40 right-1/4 w-64 h-64 bg-pink-400/20" />

      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/40 border-b border-white/30 shadow-lg shadow-purple-100/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <motion.div
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center shadow-lg relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(244, 114, 182, 0.5)',
                  '0 0 40px rgba(167, 139, 250, 0.5)',
                  '0 0 20px rgba(244, 114, 182, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Scissors className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
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
              className="text-purple-700 hover:text-purple-900 hover:bg-purple-100/50 transition-all font-medium"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              Sign In
            </Button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all font-medium relative overflow-hidden group"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </nav>

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <ParticleField />

        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              style={{ y, opacity }}
              className="text-center lg:text-left z-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 border border-white/50 backdrop-blur-sm shadow-lg"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </motion.div>
                <span className="text-sm font-medium bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Magic Meets Fashion
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-6xl md:text-8xl font-black mb-6 leading-tight"
              >
                <motion.span
                  className="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ backgroundSize: '200% auto' }}
                >
                  Create
                </motion.span>
                <br />
                <span className="text-gray-800">Your Dream</span>
                <br />
                <motion.span
                  className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                  style={{ backgroundSize: '200% auto' }}
                >
                  Outfit
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Transform fabric into fashion with AI-powered design, expert tailors, and virtual try-on
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    onClick={() => navigate('/signup')}
                    className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white px-10 py-7 text-lg font-semibold shadow-2xl relative overflow-hidden group"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: [
                          'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                          'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                          'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Start Designing
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/tailor/apply')}
                    className="border-2 border-purple-400 text-purple-700 hover:bg-purple-50 px-10 py-7 text-lg font-semibold backdrop-blur-sm bg-white/50 shadow-xl"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    Join as Tailor
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-12 flex items-center justify-center lg:justify-start gap-8"
              >
                <div className="flex -space-x-3">
                  {['💃', '👔', '👗', '🧵'].map((emoji, i) => (
                    <motion.div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 border-2 border-white shadow-lg flex items-center justify-center text-xl"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1 + i * 0.1, type: 'spring' }}
                      whileHover={{ scale: 1.2, y: -5 }}
                    >
                      {emoji}
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
                        transition={{ delay: 1.2 + i * 0.05, type: 'spring' }}
                      >
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 font-medium">5000+ Happy Customers</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ scale }}
              className="relative z-10"
            >
              <motion.div
                className="relative"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/50 backdrop-blur-xl bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-12">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: '🧵', label: 'Fabric', color: 'from-pink-400 to-rose-400', delay: 0 },
                      { icon: '✨', label: 'AI Design', color: 'from-purple-400 to-indigo-400', delay: 0.2 },
                      { icon: '✂️', label: 'Tailoring', color: 'from-blue-400 to-cyan-400', delay: 0.4 },
                      { icon: '👗', label: 'Delivery', color: 'from-pink-400 to-purple-400', delay: 0.6 },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + item.delay, type: 'spring' }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`relative rounded-2xl bg-gradient-to-br ${item.color} p-8 text-center shadow-xl cursor-pointer group`}
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                      >
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-white/20"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        />
                        <div className="text-5xl mb-3 relative z-10">{item.icon}</div>
                        <p className="text-white font-bold text-lg relative z-10">{item.label}</p>
                        <motion.div
                          className="absolute inset-0 rounded-2xl"
                          animate={{
                            boxShadow: [
                              '0 0 20px rgba(255,255,255,0.5)',
                              '0 0 40px rgba(255,255,255,0.8)',
                              '0 0 20px rgba(255,255,255,0.5)',
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        />
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center shadow-2xl"
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
                    className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center shadow-2xl"
                    animate={{
                      rotate: -360,
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2.5, repeat: Infinity }
                    }}
                  >
                    <Heart className="w-10 h-10 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-purple-400" />
        </motion.div>
      </section>

      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-100/30 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.h2
              className="text-5xl md:text-6xl font-black mb-6"
              whileInView={{ scale: [0.9, 1] }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Why Choose Us
              </span>
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of custom tailoring
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: "Expert Tailors", desc: "Verified master craftspeople", gradient: "from-pink-400 to-rose-500" },
              { icon: Wand2, title: "AI Magic", desc: "Smart design suggestions", gradient: "from-purple-400 to-indigo-500" },
              { icon: Shield, title: "Quality First", desc: "100% satisfaction guaranteed", gradient: "from-blue-400 to-cyan-500" },
              { icon: Zap, title: "Fast Delivery", desc: "Track in real-time", gradient: "from-green-400 to-emerald-500" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring' }}
                whileHover={{ y: -10, scale: 1.05 }}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="relative group cursor-pointer"
              >
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br blur-xl opacity-50 group-hover:opacity-100 transition-opacity"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    background: `linear-gradient(135deg, ${feature.gradient})`,
                  }}
                />
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 h-full">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6 overflow-hidden">
        <ParticleField />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Four simple steps to your perfect outfit
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Palette, step: "01", title: "Upload Fabric", desc: "Share your fabric and measurements", color: "from-pink-500 to-rose-500" },
              { icon: Sparkles, step: "02", title: "AI Design", desc: "Get AI-powered design ideas", color: "from-purple-500 to-indigo-500" },
              { icon: Scissors, step: "03", title: "Match Tailor", desc: "Connect with expert tailors", color: "from-blue-500 to-cyan-500" },
              { icon: Heart, step: "04", title: "Receive Love", desc: "Get your custom masterpiece", color: "from-pink-500 to-purple-500" }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, type: 'spring', bounce: 0.5 }}
                className="relative"
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 text-center relative overflow-hidden">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10`}
                      whileHover={{ opacity: 0.1 }}
                    />

                    <motion.div
                      className={`absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-black text-xl shadow-xl`}
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    >
                      {step.step}
                    </motion.div>

                    <motion.div
                      className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-xl`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <step.icon className="w-12 h-12 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>

                  {i < 3 && (
                    <motion.div
                      className="hidden lg:block absolute top-1/2 -right-4 z-20"
                      animate={{
                        x: [0, 10, 0],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="w-8 h-8 text-purple-400" />
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                What They Say
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Stories from our amazing community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Ayesha Khan", role: "Fashion Designer", text: "StitchMate revolutionized how I work with clients. The AI suggestions are incredible!", avatar: "👩‍🎨", color: "from-pink-400 to-rose-400" },
              { name: "Ahmed Ali", role: "Master Tailor", text: "Best platform for connecting with customers. My business has tripled!", avatar: "🧵", color: "from-purple-400 to-indigo-400" },
              { name: "Sara Ahmed", role: "Happy Customer", text: "My wedding outfit was perfect! The virtual try-on feature is magical.", avatar: "💫", color: "from-blue-400 to-cyan-400" }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, type: 'spring' }}
                whileHover={{ y: -10, rotate: 2, scale: 1.05 }}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="relative group cursor-pointer"
              >
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${testimonial.color} blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}
                />
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-3xl shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      {testimonial.avatar}
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic mb-4">"{testimonial.text}"</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 + j * 0.05, type: 'spring' }}
                      >
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6 overflow-hidden">
        <FloatingOrb delay={0} duration={15} className="top-0 left-0 w-[500px] h-[500px] bg-pink-400/40" />
        <FloatingOrb delay={1} duration={18} className="bottom-0 right-0 w-[400px] h-[400px] bg-purple-400/40" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <motion.div
            className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-[4rem] p-16 shadow-2xl relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.2) 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.2) 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 100%, rgba(255,255,255,0.2) 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 0%, rgba(255,255,255,0.2) 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.2) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 right-10"
            >
              <Sparkles className="w-16 h-16 text-white/50" />
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-10 left-10"
            >
              <Scissors className="w-20 h-20 text-white/50" />
            </motion.div>

            <motion.h2
              className="text-5xl md:text-7xl font-black text-white mb-6 relative z-10"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Ready to Create Magic?
            </motion.h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 relative z-10 max-w-2xl mx-auto">
              Join thousands creating their dream outfits with StitchMate
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  size="lg"
                  onClick={() => navigate('/signup')}
                  className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-8 text-xl font-bold shadow-2xl"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  Start Your Journey
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1, rotate: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/tailor/apply')}
                  className="border-4 border-white text-white hover:bg-white/20 px-12 py-8 text-xl font-bold backdrop-blur-xl"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  Join as Tailor
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <footer className="relative bg-gray-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center shadow-lg"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(244, 114, 182, 0.5)',
                      '0 0 40px rgba(167, 139, 250, 0.5)',
                      '0 0 20px rgba(244, 114, 182, 0.5)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Scissors className="w-6 h-6 text-white" />
                </motion.div>
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  StitchMate
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Creating magic, one stitch at a time
              </p>
            </div>

            {[
              { title: "Platform", links: ["How it Works", "For Customers", "For Tailors", "Pricing"] },
              { title: "Company", links: ["About Us", "Careers", "Blog", "Contact"] },
              { title: "Legal", links: ["Privacy", "Terms", "Cookies", "Refunds"] }
            ].map((section, i) => (
              <div key={i}>
                <h4 className="font-bold mb-4 text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, j) => (
                    <motion.li
                      key={j}
                      whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                      onMouseEnter={() => setCursorVariant('hover')}
                      onMouseLeave={() => setCursorVariant('default')}
                    >
                      {link}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">
              © 2024 StitchMate. Crafted with{' '}
              <motion.span
                className="inline-block"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                💜
              </motion.span>
              {' '}and magic
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
