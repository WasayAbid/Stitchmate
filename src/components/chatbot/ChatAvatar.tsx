import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatAvatarProps {
  isTyping?: boolean;
  isHovered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showWave?: boolean;
}

export const ChatAvatar: React.FC<ChatAvatarProps> = ({
  isTyping = false,
  isHovered = false,
  size = 'md',
  showWave = false,
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isNodding, setIsNodding] = useState(false);

  // Blink animation - random intervals
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Nod when typing
  useEffect(() => {
    if (isTyping) {
      const nodInterval = setInterval(() => {
        setIsNodding(true);
        setTimeout(() => setIsNodding(false), 300);
      }, 1500);
      return () => clearInterval(nodInterval);
    }
  }, [isTyping]);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const eyeSize = {
    sm: { width: 4, height: 6 },
    md: { width: 5, height: 8 },
    lg: { width: 8, height: 12 },
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} rounded-full overflow-hidden`}
      animate={{
        y: isNodding ? [0, 2, 0] : 0,
        rotate: isHovered && showWave ? [0, -5, 5, 0] : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Background gradient - 3D effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose via-primary to-lavender rounded-full" />
      
      {/* Face background */}
      <div className="absolute inset-[3px] bg-gradient-to-b from-[#FFE4C4] to-[#F5CBA7] rounded-full" />
      
      {/* Cheeks */}
      <div 
        className="absolute rounded-full bg-rose/40"
        style={{
          width: size === 'lg' ? 12 : size === 'md' ? 8 : 6,
          height: size === 'lg' ? 8 : size === 'md' ? 5 : 4,
          left: size === 'lg' ? '15%' : '18%',
          top: '55%',
        }}
      />
      <div 
        className="absolute rounded-full bg-rose/40"
        style={{
          width: size === 'lg' ? 12 : size === 'md' ? 8 : 6,
          height: size === 'lg' ? 8 : size === 'md' ? 5 : 4,
          right: size === 'lg' ? '15%' : '18%',
          top: '55%',
        }}
      />

      {/* Hair */}
      <div 
        className="absolute bg-gradient-to-b from-[#4A2C2A] to-[#2C1810] rounded-t-full"
        style={{
          width: '80%',
          height: '45%',
          left: '10%',
          top: '5%',
        }}
      />
      {/* Hair bangs */}
      <motion.div 
        className="absolute bg-gradient-to-b from-[#4A2C2A] to-[#3D2420]"
        style={{
          width: '35%',
          height: size === 'lg' ? 16 : size === 'md' ? 10 : 8,
          left: '20%',
          top: '18%',
          borderRadius: '0 0 50% 50%',
        }}
        animate={{ rotate: isHovered ? [0, 3, -3, 0] : 0 }}
        transition={{ duration: 0.5 }}
      />
      <motion.div 
        className="absolute bg-gradient-to-b from-[#4A2C2A] to-[#3D2420]"
        style={{
          width: '30%',
          height: size === 'lg' ? 14 : size === 'md' ? 9 : 7,
          right: '22%',
          top: '20%',
          borderRadius: '0 0 50% 50%',
        }}
        animate={{ rotate: isHovered ? [0, -3, 3, 0] : 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />

      {/* Eyes */}
      <motion.div
        className="absolute bg-foreground rounded-full"
        style={{
          width: eyeSize[size].width,
          height: isBlinking ? 2 : eyeSize[size].height,
          left: '30%',
          top: '42%',
        }}
        animate={{ scaleY: isBlinking ? 0.2 : 1 }}
        transition={{ duration: 0.1 }}
      >
        {/* Eye sparkle */}
        {!isBlinking && (
          <div 
            className="absolute bg-primary-foreground rounded-full"
            style={{
              width: size === 'lg' ? 3 : 2,
              height: size === 'lg' ? 3 : 2,
              right: 0,
              top: 1,
            }}
          />
        )}
      </motion.div>
      <motion.div
        className="absolute bg-foreground rounded-full"
        style={{
          width: eyeSize[size].width,
          height: isBlinking ? 2 : eyeSize[size].height,
          right: '30%',
          top: '42%',
        }}
        animate={{ scaleY: isBlinking ? 0.2 : 1 }}
        transition={{ duration: 0.1 }}
      >
        {!isBlinking && (
          <div 
            className="absolute bg-primary-foreground rounded-full"
            style={{
              width: size === 'lg' ? 3 : 2,
              height: size === 'lg' ? 3 : 2,
              right: 0,
              top: 1,
            }}
          />
        )}
      </motion.div>

      {/* Smile */}
      <motion.div
        className="absolute border-b-2 border-foreground rounded-b-full"
        style={{
          width: size === 'lg' ? 16 : size === 'md' ? 10 : 8,
          height: size === 'lg' ? 8 : size === 'md' ? 5 : 4,
          left: '50%',
          transform: 'translateX(-50%)',
          top: '62%',
        }}
        animate={{ 
          scaleX: isTyping ? [1, 1.1, 1] : 1,
          scaleY: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.3, repeat: isTyping ? Infinity : 0 }}
      />

      {/* Wave hand - appears on hover */}
      <AnimatePresence>
        {isHovered && showWave && (
          <motion.div
            initial={{ opacity: 0, x: 10, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: [0, 20, -10, 20, 0] }}
            exit={{ opacity: 0, x: 10, y: 10 }}
            transition={{ 
              duration: 0.8,
              rotate: { repeat: Infinity, duration: 0.8 }
            }}
            className="absolute text-lg"
            style={{
              right: '-20%',
              bottom: '10%',
            }}
          >
            👋
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow effect when typing */}
      {isTyping && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};
