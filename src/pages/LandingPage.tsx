import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#8B1538] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#8B1538', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#A31D45', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#8B1538', stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          <motion.path
            d="M0,300 Q400,100 800,300 T1600,300 L1600,0 L0,0 Z"
            fill="#6B0F2D"
            initial={{ d: "M0,300 Q400,100 800,300 T1600,300 L1600,0 L0,0 Z" }}
            animate={{
              d: [
                "M0,300 Q400,100 800,300 T1600,300 L1600,0 L0,0 Z",
                "M0,250 Q400,150 800,250 T1600,250 L1600,0 L0,0 Z",
                "M0,300 Q400,100 800,300 T1600,300 L1600,0 L0,0 Z"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.path
            d="M0,500 Q600,300 1200,500 T2400,500 L2400,0 L0,0 Z"
            fill="#A31D45"
            opacity="0.7"
            initial={{ d: "M0,500 Q600,300 1200,500 T2400,500 L2400,0 L0,0 Z" }}
            animate={{
              d: [
                "M0,500 Q600,300 1200,500 T2400,500 L2400,0 L0,0 Z",
                "M0,450 Q600,350 1200,450 T2400,450 L2400,0 L0,0 Z",
                "M0,500 Q600,300 1200,500 T2400,500 L2400,0 L0,0 Z"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <motion.ellipse
            cx="200"
            cy="400"
            rx="300"
            ry="200"
            fill="#D4A017"
            opacity="0.15"
            animate={{
              cx: [200, 250, 200],
              cy: [400, 350, 400],
              rx: [300, 350, 300],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.ellipse
            cx="1400"
            cy="200"
            rx="250"
            ry="180"
            fill="#D4A017"
            opacity="0.12"
            animate={{
              cx: [1400, 1350, 1400],
              cy: [200, 250, 200],
              ry: [180, 220, 180],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </svg>

        <motion.div
          className="absolute bottom-0 left-0 w-full h-1/2"
          style={{
            background: 'radial-gradient(ellipse at bottom left, rgba(212, 160, 23, 0.2) 0%, transparent 60%)',
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <motion.div
          className="absolute top-0 right-0 w-1/2 h-1/2"
          style={{
            background: 'radial-gradient(ellipse at top right, rgba(212, 160, 23, 0.15) 0%, transparent 70%)',
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#5A0A1F] to-transparent opacity-60" />
      </div>

      <nav className="relative z-50 px-12 py-8">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold tracking-wide text-white"
          >
            StitchMate
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex items-center gap-12 text-white"
          >
            <a href="#" className="text-[15px] font-medium hover:text-[#D4A017] transition-colors tracking-wide">
              Home
            </a>
            <a href="#" className="text-[15px] font-medium hover:text-[#D4A017] transition-colors tracking-wide">
              Designs
            </a>
            <a href="#" className="text-[15px] font-medium hover:text-[#D4A017] transition-colors tracking-wide">
              Tailors
            </a>
            <a href="#" className="text-[15px] font-medium hover:text-[#D4A017] transition-colors tracking-wide">
              Virtual Try-On
            </a>
            <a href="#" className="text-[15px] font-medium hover:text-[#D4A017] transition-colors tracking-wide">
              About
            </a>
            <a href="#" className="text-[15px] font-medium hover:text-[#D4A017] transition-colors tracking-wide">
              Location
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Button
              onClick={() => navigate('/signin')}
              variant="ghost"
              className="text-white hover:bg-white/10 font-medium"
            >
              Sign In
            </Button>
          </motion.div>
        </div>
      </nav>

      <div className="relative z-10 max-w-[1800px] mx-auto px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-120px)]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              <motion.div
                className="absolute -left-12 -top-12 w-96 h-96 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(212, 160, 23, 0.3) 0%, transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Tailoring Excellence"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#8B1538]/40 to-transparent" />
              </div>

              <motion.div
                className="absolute -bottom-8 -right-8 bg-[#D4A017] rounded-2xl p-6 shadow-xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="text-white">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm opacity-90">Expert Tailors</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-white space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h1 className="text-7xl lg:text-8xl font-bold leading-tight mb-8 tracking-tight">
                Tailoring,
                <br />
                Reimagined.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-[#D4A017] text-xl lg:text-2xl font-medium leading-relaxed max-w-xl"
            >
              AI-powered custom stitching, virtual try-on, and expert tailors — all in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="pt-4"
            >
              <Button
                onClick={() => navigate('/signup')}
                className="bg-white text-[#8B1538] hover:bg-[#D4A017] hover:text-white px-12 py-8 text-lg font-semibold rounded-full shadow-2xl transition-all duration-300 group"
              >
                <span>Explore Designs</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="pt-8 flex items-center gap-6"
            >
              <div className="h-[1px] w-16 bg-[#D4A017]/50" />
              <p className="text-white/70 text-sm tracking-wider uppercase">Crafted with precision</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <section className="relative z-10 max-w-[1800px] mx-auto px-12 py-32">
        <div className="grid lg:grid-cols-3 gap-12">
          {[
            {
              title: 'Custom Design',
              description: 'Create unique patterns with AI assistance and expert guidance',
            },
            {
              title: 'Master Craftsmanship',
              description: 'Connect with verified tailors who bring your vision to life',
            },
            {
              title: 'Virtual Try-On',
              description: 'See your design before stitching with advanced 3D visualization',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#D4A017]/50 transition-all duration-300 h-full">
                <div className="w-12 h-1 bg-[#D4A017] mb-6" />
                <h3 className="text-white text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 max-w-[1800px] mx-auto px-12 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl font-bold text-white mb-6">The Process</h2>
          <p className="text-[#D4A017] text-xl">Four simple steps to perfection</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { number: '01', title: 'Upload Fabric', desc: 'Share your materials and measurements' },
            { number: '02', title: 'AI Design', desc: 'Get intelligent design recommendations' },
            { number: '03', title: 'Match Tailor', desc: 'Connect with skilled craftspeople' },
            { number: '04', title: 'Receive & Enjoy', desc: 'Track delivery and showcase your style' },
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="relative"
            >
              <div className="text-[#D4A017]/20 text-8xl font-bold mb-4">{step.number}</div>
              <h3 className="text-white text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-white/70">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 max-w-[1400px] mx-auto px-12 py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-[#D4A017] to-[#B8860B] rounded-[3rem] p-16 text-center relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />

          <div className="relative z-10">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Transform Your Style?
            </h2>
            <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied customers creating their dream outfits
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                onClick={() => navigate('/signup')}
                className="bg-white text-[#8B1538] hover:bg-[#8B1538] hover:text-white border-2 border-white px-12 py-8 text-lg font-semibold rounded-full shadow-xl transition-all duration-300"
              >
                Get Started Now
              </Button>
              <Button
                onClick={() => navigate('/tailor/apply')}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#8B1538] px-12 py-8 text-lg font-semibold rounded-full transition-all duration-300"
              >
                Join as Tailor
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="relative z-10 bg-[#5A0A1F] py-16 px-12 mt-32">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-2xl font-bold text-white mb-4">StitchMate</div>
              <p className="text-white/60">Crafting excellence, one stitch at a time</p>
            </div>

            {[
              { title: 'Platform', links: ['How it Works', 'For Customers', 'For Tailors', 'Pricing'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies', 'Refunds'] },
            ].map((section, i) => (
              <div key={i}>
                <h4 className="font-bold text-[#D4A017] mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-white/60 hover:text-[#D4A017] transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-white/60">
            <p>© 2024 StitchMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
