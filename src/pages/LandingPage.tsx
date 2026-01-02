import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Scissors, Sparkles, Users, Shield, Zap, Clock, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F5F2ED] to-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E8E1D8]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4B5A0] via-[#C9A88F] to-[#B89978] flex items-center justify-center shadow-lg">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-semibold text-[#5A4A3A]">StitchMate</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/signin')}
              className="text-[#5A4A3A] hover:text-[#D4B5A0] hover:bg-[#FAF8F5] transition-all"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-[#D4B5A0] to-[#C9A88F] hover:from-[#C9A88F] hover:to-[#B89978] text-white shadow-lg hover:shadow-xl transition-all"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </nav>

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            style={{ opacity, scale }}
            className="absolute top-20 right-10 w-96 h-96 bg-[#D4B5A0]/20 rounded-full blur-3xl"
          />
          <motion.div
            style={{ opacity, scale }}
            className="absolute bottom-20 left-10 w-80 h-80 bg-[#A8B5A0]/20 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
        </div>

        <motion.div
          style={{ y }}
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#E8E1D8] shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#D4B5A0]" />
            <span className="text-sm text-[#6B5B4A]">Crafting Excellence Since 2024</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-[#3A3028] mb-6 leading-tight"
          >
            From Fabric to Fashion
            <br />
            <span className="bg-gradient-to-r from-[#D4B5A0] via-[#C9A88F] to-[#B89978] bg-clip-text text-transparent">
              Your Way
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#6B5B4A] mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the art of bespoke tailoring meets modern technology. Connect with master tailors,
            design your perfect outfit, and watch your vision come to life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              size="lg"
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-[#D4B5A0] to-[#C9A88F] hover:from-[#C9A88F] hover:to-[#B89978] text-white px-8 py-6 text-lg shadow-2xl hover:shadow-[#D4B5A0]/30 transition-all hover:scale-105"
            >
              Start Designing
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/tailor/apply')}
              className="border-2 border-[#D4B5A0] text-[#5A4A3A] hover:bg-[#FAF8F5] px-8 py-6 text-lg transition-all hover:scale-105"
            >
              Join as Tailor
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white/50 backdrop-blur-sm">
              <div className="aspect-video bg-gradient-to-br from-[#FAF8F5] via-[#F5F2ED] to-[#E8E1D8] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-around p-12">
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="text-center"
                  >
                    <div className="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#D4B5A0]/20 to-transparent" />
                      <div className="relative text-6xl">🧵</div>
                    </div>
                    <p className="text-sm font-medium text-[#6B5B4A]">Choose Fabric</p>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 1.3 }}
                    className="text-[#D4B5A0]"
                  >
                    <ArrowRight className="w-12 h-12" />
                  </motion.div>

                  <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1.6 }}
                    className="text-center"
                  >
                    <div className="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#C9A88F]/20 to-transparent" />
                      <div className="relative text-6xl">✂️</div>
                    </div>
                    <p className="text-sm font-medium text-[#6B5B4A]">Custom Design</p>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 1.9 }}
                    className="text-[#D4B5A0]"
                  >
                    <ArrowRight className="w-12 h-12" />
                  </motion.div>

                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 2.2 }}
                    className="text-center"
                  >
                    <div className="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#B89978]/20 to-transparent" />
                      <div className="relative text-6xl">👗</div>
                    </div>
                    <p className="text-sm font-medium text-[#6B5B4A]">Perfect Fit</p>
                  </motion.div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{
                rotate: [0, 5, 0],
                y: [0, -10, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-8 -right-8 w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center"
            >
              <Scissors className="w-12 h-12 text-[#D4B5A0]" />
            </motion.div>

            <motion.div
              animate={{
                rotate: [0, -5, 0],
                y: [0, 10, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-[#D4B5A0] to-[#C9A88F] rounded-full shadow-2xl flex items-center justify-center"
            >
              <span className="text-3xl">📏</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-32 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImRvdHMiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNkb3RzKSIvPjwvc3ZnPg==')] opacity-40" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#3A3028] mb-6">
              Why Choose <span className="text-[#D4B5A0]">StitchMate</span>
            </h2>
            <p className="text-xl text-[#6B5B4A] max-w-2xl mx-auto">
              Traditional craftsmanship meets digital convenience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Expert Tailors",
                description: "Connect with verified master tailors in your area",
                color: "from-[#D4B5A0] to-[#C9A88F]"
              },
              {
                icon: Sparkles,
                title: "Custom Designs",
                description: "AI-powered design tools for your unique vision",
                color: "from-[#C9A88F] to-[#B89978]"
              },
              {
                icon: Shield,
                title: "Quality Assured",
                description: "Every piece inspected for perfection",
                color: "from-[#A8B5A0] to-[#98A590]"
              },
              {
                icon: Clock,
                title: "Fast Delivery",
                description: "Track your order from cutting to completion",
                color: "from-[#B89978] to-[#A88868]"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-[#E8E1D8] h-full">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#3A3028] mb-3">{feature.title}</h3>
                  <p className="text-[#6B5B4A] leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-gradient-to-b from-[#FAF8F5] to-white relative overflow-hidden">
        <div className="absolute top-20 left-0 w-96 h-96 bg-[#A8B5A0]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-[#D4B5A0]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#3A3028] mb-6">
              How It Works
            </h2>
            <p className="text-xl text-[#6B5B4A] max-w-2xl mx-auto">
              Your perfect outfit in three simple steps
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Design Your Vision",
                description: "Upload fabric, choose styles, or let AI help you create the perfect design",
                icon: "🎨"
              },
              {
                step: "02",
                title: "Match with Tailors",
                description: "Receive bids from verified tailors, compare profiles, and select your artisan",
                icon: "🤝"
              },
              {
                step: "03",
                title: "Receive Perfection",
                description: "Track progress, communicate directly, and receive your custom masterpiece",
                icon: "✨"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="mb-6 relative inline-block">
                    <div className="text-8xl mb-4">{step.icon}</div>
                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-[#D4B5A0] to-[#C9A88F] flex items-center justify-center text-white font-bold text-lg shadow-xl">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#3A3028] mb-4">{step.title}</h3>
                  <p className="text-[#6B5B4A] leading-relaxed text-lg">{step.description}</p>
                </div>
                {index < 2 && (
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="hidden lg:block absolute top-1/3 -right-6 text-[#D4B5A0]"
                  >
                    <ArrowRight className="w-8 h-8" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#3A3028] mb-6">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-[#6B5B4A]">
              Real stories from our community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Fashion Enthusiast",
                content: "StitchMate transformed my wedding outfit dreams into reality. The attention to detail and quality exceeded all expectations.",
                avatar: "👰"
              },
              {
                name: "Rajesh Kumar",
                role: "Master Tailor",
                content: "As a tailor, this platform has connected me with clients who truly appreciate craftsmanship. My business has grown 3x.",
                avatar: "🧵"
              },
              {
                name: "Anita Desai",
                role: "Designer",
                content: "The AI design tools combined with skilled tailors make it so easy to bring my creative visions to life. Absolutely love it!",
                avatar: "✨"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-[#FAF8F5] to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-[#E8E1D8]"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4B5A0] to-[#C9A88F] flex items-center justify-center text-3xl shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#3A3028]">{testimonial.name}</h4>
                    <p className="text-sm text-[#6B5B4A]">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-[#6B5B4A] leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="w-4 h-4 text-[#D4B5A0] fill-[#D4B5A0]" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-gradient-to-br from-[#D4B5A0] via-[#C9A88F] to-[#B89978] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImN0YSIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2N0YSkiLz48L3N2Zz4=')] opacity-50" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <Scissors className="w-20 h-20 text-white/80 mx-auto mb-8" />
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Create Something Beautiful?
          </h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Join thousands who've discovered the perfect blend of tradition and technology
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate('/signup')}
              className="bg-white text-[#5A4A3A] hover:bg-[#FAF8F5] px-10 py-6 text-lg shadow-2xl hover:shadow-white/30 transition-all hover:scale-105 font-semibold"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/tailor/apply')}
              className="border-2 border-white text-white hover:bg-white/10 px-10 py-6 text-lg transition-all hover:scale-105 font-semibold backdrop-blur-sm"
            >
              Become a Tailor
            </Button>
          </div>
        </motion.div>
      </section>

      <footer className="bg-[#3A3028] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4B5A0] to-[#C9A88F] flex items-center justify-center shadow-lg">
                  <Scissors className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-semibold">StitchMate</span>
              </div>
              <p className="text-white/70 leading-relaxed">
                Where craftsmanship meets innovation. Creating perfect fits, one stitch at a time.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[#D4B5A0]">Platform</h4>
              <ul className="space-y-2 text-white/70">
                <li className="hover:text-white transition-colors cursor-pointer">How it Works</li>
                <li className="hover:text-white transition-colors cursor-pointer">For Customers</li>
                <li className="hover:text-white transition-colors cursor-pointer">For Tailors</li>
                <li className="hover:text-white transition-colors cursor-pointer">Pricing</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[#D4B5A0]">Company</h4>
              <ul className="space-y-2 text-white/70">
                <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
                <li className="hover:text-white transition-colors cursor-pointer">Blog</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[#D4B5A0]">Legal</h4>
              <ul className="space-y-2 text-white/70">
                <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
                <li className="hover:text-white transition-colors cursor-pointer">Cookie Policy</li>
                <li className="hover:text-white transition-colors cursor-pointer">Refund Policy</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-white/50">
            <p>© 2024 StitchMate. All rights reserved. Crafted with care.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
