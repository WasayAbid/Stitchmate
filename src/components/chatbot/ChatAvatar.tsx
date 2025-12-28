import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sanaAvatar from '@/assets/sana-avatar.png';

type AvatarMood = 'idle' | 'happy' | 'thinking' | 'greeting' | 'farewell' | 'excited';

interface ChatAvatarProps {
  isTyping?: boolean;
  isHovered?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: AvatarMood;
  showSpeechBubble?: boolean;
  speechText?: string;
}

export const ChatAvatar: React.FC<ChatAvatarProps> = ({
  isTyping = false,
  isHovered = false,
  size = 'lg',
  mood = 'idle',
  showSpeechBubble = false,
  speechText = '',
}) => {
  const sizeConfig = {
    sm: { container: 64, image: 56 },
    md: { container: 96, image: 84 },
    lg: { container: 140, image: 120 },
    xl: { container: 200, image: 180 },
  };

  const config = sizeConfig[size];

  const getMoodAnimation = () => {
    switch (mood) {
      case 'happy':
        return {
          scale: [1, 1.05, 1],
          rotate: [-2, 2, -2],
          transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
        };
      case 'thinking':
        return {
          rotate: [-3, 3, -3],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        };
      case 'greeting':
        return {
          y: [0, -10, 0],
          scale: [1, 1.08, 1],
          transition: { duration: 0.6, repeat: 2, ease: "easeOut" }
        };
      case 'farewell':
        return {
          rotate: [-8, 8, -8, 8, 0],
          transition: { duration: 1.5, ease: "easeInOut" }
        };
      case 'excited':
        return {
          y: [0, -8, 0, -5, 0],
          scale: [1, 1.08, 1, 1.04, 1],
          transition: { duration: 0.8, repeat: Infinity, ease: "easeOut" }
        };
      default:
        return {
          y: [0, -4, 0],
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        };
    }
  };

  return (
    <div className="relative" style={{ width: config.container, height: config.container }}>
      {/* Speech Bubble */}
      <AnimatePresence>
        {showSpeechBubble && speechText && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute -top-14 left-1/2 -translate-x-1/2 bg-primary-foreground px-4 py-2 rounded-2xl shadow-lg text-sm font-medium whitespace-nowrap z-10 border border-primary/20"
          >
            {speechText}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-primary-foreground border-r border-b border-primary/20" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Outer Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl"
        style={{ background: 'linear-gradient(135deg, #FFB6C1, #DDA0DD, #FFD700)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />

      {/* Sparkle Ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(135deg, transparent 30%, rgba(255,182,193,0.4) 50%, transparent 70%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Main Avatar Container */}
      <motion.div
        className="relative mx-auto rounded-full overflow-hidden cursor-pointer"
        style={{
          width: config.image,
          height: config.image,
          top: '50%',
          transform: 'translateY(-50%)',
          boxShadow: '0 8px 32px rgba(255, 182, 193, 0.5), 0 4px 16px rgba(221, 160, 221, 0.4), inset 0 0 20px rgba(255,255,255,0.3)',
        }}
        animate={getMoodAnimation()}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Gradient Border */}
        <div
          className="absolute inset-0 rounded-full p-[3px]"
          style={{ background: 'linear-gradient(135deg, #FF69B4, #FFB6C1, #DDA0DD, #E6E6FA)' }}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-pink-50 to-rose-100">
            <img
              src={sanaAvatar}
              alt="Sana - Your Fashion Assistant"
              className="w-full h-full object-cover object-top scale-110"
              style={{ marginTop: '-5%' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Floating Hearts for Happy/Excited */}
      {(mood === 'happy' || mood === 'excited') && (
        <>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0.5],
                x: [0, (i - 1.5) * 25],
                y: [0, -40 - i * 12]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut"
              }}
              style={{
                left: '50%',
                top: '15%',
                fontSize: size === 'xl' ? '1.2rem' : size === 'lg' ? '1rem' : '0.8rem'
              }}
            >
              {i % 2 === 0 ? '💕' : '💖'}
            </motion.div>
          ))}
        </>
      )}

      {/* Thinking Bubbles */}
      {(mood === 'thinking' || isTyping) && (
        <div className="absolute -top-2 -right-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full shadow-md"
              style={{
                width: 8 + i * 4,
                height: 8 + i * 4,
                right: i * 10,
                top: -i * 8,
                background: 'linear-gradient(135deg, #FFB6C1, #DDA0DD)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.25
              }}
            />
          ))}
        </div>
      )}

      {/* Greeting Wave Hand */}
      {mood === 'greeting' && (
        <motion.div
          className="absolute -right-3 top-1/3 pointer-events-none"
          animate={{
            rotate: [0, 25, -15, 25, 0],
            x: [0, 5, 0, 5, 0]
          }}
          transition={{
            duration: 1,
            repeat: 2,
            ease: "easeInOut"
          }}
          style={{ fontSize: size === 'xl' ? '2rem' : size === 'lg' ? '1.5rem' : '1.2rem' }}
        >
          👋
        </motion.div>
      )}

      {/* Farewell Sparkles */}
      {mood === 'farewell' && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.25
              }}
              style={{
                left: `${15 + i * 18}%`,
                top: `${15 + (i % 2) * 55}%`,
                fontSize: size === 'xl' ? '1rem' : '0.8rem'
              }}
            >
              ✨
            </motion.div>
          ))}
        </>
      )}

      {/* Decorative Sparkles */}
      <motion.div
        className="absolute -top-1 -right-1 pointer-events-none"
        animate={{
          scale: [0.8, 1.3, 0.8],
          opacity: [0.6, 1, 0.6],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ fontSize: size === 'xl' ? '1.2rem' : '0.9rem' }}
      >
        ✨
      </motion.div>

      <motion.div
        className="absolute -bottom-1 -left-1 pointer-events-none"
        animate={{
          scale: [1, 0.7, 1],
          opacity: [1, 0.5, 1]
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        style={{ fontSize: size === 'xl' ? '1rem' : '0.75rem' }}
      >
        💖
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 pointer-events-none"
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [0.5, 0.9, 0.5]
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        style={{ fontSize: size === 'xl' ? '0.9rem' : '0.7rem' }}
      >
        🌸
      </motion.div>
    </div>
  );
};

export default ChatAvatar;
