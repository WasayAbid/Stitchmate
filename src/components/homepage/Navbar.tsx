import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Gallery', href: '#gallery' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-white/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c4a574] to-[#d4b896] flex items-center justify-center shadow-lg shadow-[#c4a574]/20"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <span
                className={`font-bold text-xl transition-colors duration-300 ${
                  isScrolled ? 'text-[#2d2d2d]' : 'text-[#2d2d2d]'
                }`}
              >
                StitchMate
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ y: -2 }}
                  className={`text-sm font-medium transition-colors duration-300 relative group ${
                    isScrolled
                      ? 'text-[#5a5a5a] hover:text-[#2d2d2d]'
                      : 'text-[#5a5a5a] hover:text-[#2d2d2d]'
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c4a574] transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/auth">
                <Button
                  variant="ghost"
                  className={`transition-colors duration-300 ${
                    isScrolled
                      ? 'text-[#5a5a5a] hover:text-[#2d2d2d] hover:bg-[#f5f5f5]'
                      : 'text-[#5a5a5a] hover:text-[#2d2d2d] hover:bg-white/50'
                  }`}
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-[#2d2d2d] hover:bg-[#3d3d3d] text-white px-6 rounded-full shadow-lg shadow-[#2d2d2d]/10 transition-all duration-300 hover:-translate-y-0.5">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center hover:bg-black/5 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#2d2d2d]" />
              ) : (
                <Menu className="w-5 h-5 text-[#2d2d2d]" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white md:hidden pt-24"
          >
            <div className="px-6 py-8 space-y-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg font-medium text-[#2d2d2d] py-3 border-b border-gray-100"
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="pt-6 space-y-4">
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full py-6 text-lg rounded-xl">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full py-6 text-lg rounded-xl bg-[#2d2d2d] hover:bg-[#3d3d3d]">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
