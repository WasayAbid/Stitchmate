import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', href: '#' },
      { label: 'Design Studio', href: '/user/fabric-to-design' },
      { label: 'Virtual Try-On', href: '/user/virtual-try-on' },
      { label: 'Pricing', href: '#' },
    ],
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Blog', href: '#' },
    ],
    support: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="relative bg-[#1a1a1a] overflow-hidden">
      {/* Animated divider */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-[#c4a574]/30 to-transparent">
        <motion.div
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-[#c4a574] to-transparent"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c4a574] to-[#d4b896] flex items-center justify-center shadow-lg shadow-[#c4a574]/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">StitchMate</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#8a8a8a] leading-relaxed mb-8 max-w-sm"
            >
              Revolutionizing Pakistani fashion with AI-powered design technology.
              From fabric to flawless fashion — instantly.
            </motion.p>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#c4a574]/20 border border-white/10 hover:border-[#c4a574]/30 flex items-center justify-center transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-[#8a8a8a] hover:text-[#c4a574]" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([title, links], sectionIndex) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (sectionIndex + 1) }}
            >
              <h3 className="text-white font-semibold mb-6 capitalize">{title}</h3>
              <ul className="space-y-4">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-[#8a8a8a] hover:text-[#c4a574] transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-[#6a6a6a] text-sm"
            >
              © {currentYear} StitchMate. All rights reserved.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#6a6a6a] text-sm flex items-center gap-2"
            >
              Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ❤️
              </motion.span>
              for Pakistani Fashion
            </motion.p>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#c4a574]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#b8c4a8]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
    </footer>
  );
};

export default FooterSection;
