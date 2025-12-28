import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [isBlinking, setIsBlinking] = useState(false);
  const [currentMood, setCurrentMood] = useState<AvatarMood>(mood);

  // Update mood when prop changes
  useEffect(() => {
    setCurrentMood(mood);
  }, [mood]);

  // Blink animation - random intervals
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 2500 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  const sizeConfig = {
    sm: { container: 'w-16 h-16', face: 80, eyeSize: 6, mouthSize: 12 },
    md: { container: 'w-24 h-24', face: 96, eyeSize: 8, mouthSize: 16 },
    lg: { container: 'w-32 h-32', face: 128, eyeSize: 10, mouthSize: 20 },
    xl: { container: 'w-48 h-48', face: 192, eyeSize: 14, mouthSize: 28 },
  };

  const config = sizeConfig[size];

  // Eye expressions based on mood
  const getEyeExpression = () => {
    if (isBlinking) return { scaleY: 0.1, y: 0 };
    switch (currentMood) {
      case 'happy':
      case 'excited':
        return { scaleY: 0.7, y: 2, borderRadius: '50% 50% 50% 50%' };
      case 'thinking':
        return { scaleY: 1, y: -2 };
      case 'greeting':
      case 'farewell':
        return { scaleY: 0.8, y: 0 };
      default:
        return { scaleY: 1, y: 0 };
    }
  };

  // Mouth expressions based on mood
  const getMouthExpression = () => {
    switch (currentMood) {
      case 'happy':
        return 'smile-big';
      case 'excited':
        return 'open-smile';
      case 'thinking':
        return 'hmm';
      case 'greeting':
      case 'farewell':
        return 'smile-wave';
      default:
        return isTyping ? 'talking' : 'smile';
    }
  };

  const mouthType = getMouthExpression();

  return (
    <div className="relative">
      {/* Speech Bubble */}
      <AnimatePresence>
        {showSpeechBubble && speechText && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 bg-primary-foreground text-foreground px-4 py-2 rounded-2xl shadow-lg text-sm font-medium whitespace-nowrap z-10"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.2))',
            }}
          >
            {speechText}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-gradient-to-br from-primary/10 to-secondary/20" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={`relative ${config.container} cursor-pointer`}
        animate={{
          y: currentMood === 'excited' ? [0, -8, 0] : isHovered ? [0, -4, 0] : 0,
          rotate: currentMood === 'greeting' || currentMood === 'farewell' ? [0, -5, 5, -5, 0] : 0,
        }}
        transition={{ 
          duration: currentMood === 'excited' ? 0.4 : 0.6, 
          repeat: currentMood === 'excited' ? Infinity : 0,
          ease: 'easeInOut'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary) / 0.4), hsl(var(--secondary) / 0.3))',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Main Avatar Container */}
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
          {/* Background gradient - 3D effect */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))',
            }}
          />
          
          {/* Face background - skin tone */}
          <motion.div 
            className="absolute inset-[4px] rounded-full"
            style={{
              background: 'linear-gradient(180deg, #FFE4D0 0%, #F5D0B5 50%, #E8C4A8 100%)',
            }}
            animate={{
              background: currentMood === 'excited' 
                ? ['linear-gradient(180deg, #FFE4D0 0%, #F5D0B5 50%, #E8C4A8 100%)', 'linear-gradient(180deg, #FFD4C0 0%, #F5C0A5 50%, #E8B498 100%)', 'linear-gradient(180deg, #FFE4D0 0%, #F5D0B5 50%, #E8C4A8 100%)']
                : 'linear-gradient(180deg, #FFE4D0 0%, #F5D0B5 50%, #E8C4A8 100%)'
            }}
            transition={{ duration: 0.5, repeat: currentMood === 'excited' ? Infinity : 0 }}
          />

          {/* Hair - styled bangs */}
          <div 
            className="absolute rounded-t-full"
            style={{
              background: 'linear-gradient(180deg, #5D3A2E 0%, #3D2420 100%)',
              width: '85%',
              height: '50%',
              left: '7.5%',
              top: '3%',
            }}
          />
          
          {/* Hair bangs - left */}
          <motion.div 
            className="absolute"
            style={{
              background: 'linear-gradient(180deg, #5D3A2E 0%, #4A2C2A 100%)',
              width: '30%',
              height: size === 'xl' ? '28px' : size === 'lg' ? '20px' : '14px',
              left: '15%',
              top: '20%',
              borderRadius: '0 0 60% 40%',
            }}
            animate={{ 
              rotate: isHovered || currentMood === 'greeting' ? [0, 5, -3, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Hair bangs - right */}
          <motion.div 
            className="absolute"
            style={{
              background: 'linear-gradient(180deg, #5D3A2E 0%, #4A2C2A 100%)',
              width: '25%',
              height: size === 'xl' ? '24px' : size === 'lg' ? '18px' : '12px',
              right: '20%',
              top: '22%',
              borderRadius: '0 0 40% 60%',
            }}
            animate={{ 
              rotate: isHovered || currentMood === 'greeting' ? [0, -5, 3, 0] : 0,
            }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />

          {/* Hair sides */}
          <div 
            className="absolute"
            style={{
              background: 'linear-gradient(180deg, #4A2C2A 0%, #3D2420 100%)',
              width: '15%',
              height: '40%',
              left: '5%',
              top: '30%',
              borderRadius: '0 0 50% 50%',
            }}
          />
          <div 
            className="absolute"
            style={{
              background: 'linear-gradient(180deg, #4A2C2A 0%, #3D2420 100%)',
              width: '15%',
              height: '40%',
              right: '5%',
              top: '30%',
              borderRadius: '0 0 50% 50%',
            }}
          />

          {/* Blush - left cheek */}
          <motion.div 
            className="absolute rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.5) 0%, transparent 70%)',
              width: size === 'xl' ? '30px' : size === 'lg' ? '22px' : '16px',
              height: size === 'xl' ? '18px' : size === 'lg' ? '14px' : '10px',
              left: '12%',
              top: '55%',
            }}
            animate={{
              opacity: currentMood === 'happy' || currentMood === 'excited' ? [0.6, 0.9, 0.6] : 0.5,
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          
          {/* Blush - right cheek */}
          <motion.div 
            className="absolute rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.5) 0%, transparent 70%)',
              width: size === 'xl' ? '30px' : size === 'lg' ? '22px' : '16px',
              height: size === 'xl' ? '18px' : size === 'lg' ? '14px' : '10px',
              right: '12%',
              top: '55%',
            }}
            animate={{
              opacity: currentMood === 'happy' || currentMood === 'excited' ? [0.6, 0.9, 0.6] : 0.5,
            }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          />

          {/* Eyes Container */}
          <div className="absolute" style={{ left: '20%', right: '20%', top: '38%' }}>
            {/* Left Eye */}
            <motion.div
              className="absolute bg-[#2C1810] rounded-full"
              style={{
                width: config.eyeSize,
                height: config.eyeSize * 1.3,
                left: '15%',
              }}
              animate={getEyeExpression()}
              transition={{ duration: 0.15 }}
            >
              {/* Eye white highlight */}
              {!isBlinking && (
                <motion.div 
                  className="absolute bg-primary-foreground rounded-full"
                  style={{
                    width: config.eyeSize * 0.35,
                    height: config.eyeSize * 0.35,
                    right: '15%',
                    top: '15%',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* Right Eye */}
            <motion.div
              className="absolute bg-[#2C1810] rounded-full"
              style={{
                width: config.eyeSize,
                height: config.eyeSize * 1.3,
                right: '15%',
              }}
              animate={getEyeExpression()}
              transition={{ duration: 0.15 }}
            >
              {!isBlinking && (
                <motion.div 
                  className="absolute bg-primary-foreground rounded-full"
                  style={{
                    width: config.eyeSize * 0.35,
                    height: config.eyeSize * 0.35,
                    right: '15%',
                    top: '15%',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />
              )}
            </motion.div>

            {/* Eyebrows - only show when thinking */}
            {currentMood === 'thinking' && (
              <>
                <motion.div
                  className="absolute bg-[#4A2C2A] rounded-full"
                  style={{
                    width: config.eyeSize * 1.2,
                    height: 3,
                    left: '10%',
                    top: -8,
                  }}
                  animate={{ rotate: -15, y: [0, -2, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bg-[#4A2C2A] rounded-full"
                  style={{
                    width: config.eyeSize * 1.2,
                    height: 3,
                    right: '10%',
                    top: -8,
                  }}
                  animate={{ rotate: 15, y: [0, -2, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </>
            )}
          </div>

          {/* Nose - subtle */}
          <div 
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              width: size === 'xl' ? 8 : size === 'lg' ? 6 : 4,
              height: size === 'xl' ? 8 : size === 'lg' ? 6 : 4,
              top: '52%',
              background: 'radial-gradient(circle at 30% 30%, #E8B898 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />

          {/* Mouth */}
          <div 
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: '62%', width: config.mouthSize * 1.5, height: config.mouthSize }}
          >
            {/* Simple Smile */}
            {mouthType === 'smile' && (
              <motion.div
                className="absolute w-full border-b-[3px] border-[#C4756E] rounded-b-full"
                style={{ height: '50%' }}
              />
            )}

            {/* Big Smile */}
            {mouthType === 'smile-big' && (
              <motion.div
                className="absolute w-full rounded-b-full overflow-hidden"
                style={{ 
                  height: '80%',
                  background: '#C4756E',
                }}
                animate={{ scaleY: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#E85A6B] rounded-full"
                  style={{ width: '60%', height: '40%' }}
                />
              </motion.div>
            )}

            {/* Open Smile - Excited */}
            {mouthType === 'open-smile' && (
              <motion.div
                className="absolute w-full rounded-full overflow-hidden"
                style={{ 
                  height: '100%',
                  background: '#C4756E',
                }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              >
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#E85A6B] rounded-t-full"
                  style={{ width: '70%', height: '50%' }}
                />
                {/* Teeth */}
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary-foreground"
                  style={{ width: '60%', height: '30%', borderRadius: '0 0 50% 50%' }}
                />
              </motion.div>
            )}

            {/* Thinking - hmm */}
            {mouthType === 'hmm' && (
              <motion.div
                className="absolute rounded-full bg-[#C4756E]"
                style={{ 
                  width: '40%',
                  height: '50%',
                  left: '55%',
                }}
                animate={{ 
                  x: [0, 5, 0, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}

            {/* Wave Smile */}
            {mouthType === 'smile-wave' && (
              <motion.div
                className="absolute w-full rounded-b-full overflow-hidden"
                style={{ 
                  height: '70%',
                  background: '#C4756E',
                }}
                animate={{ scaleX: [1, 1.1, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#E85A6B] rounded-full"
                  style={{ width: '50%', height: '35%' }}
                />
              </motion.div>
            )}

            {/* Talking Animation */}
            {mouthType === 'talking' && (
              <motion.div
                className="absolute w-full rounded-full overflow-hidden"
                style={{ background: '#C4756E' }}
                animate={{ 
                  height: ['40%', '80%', '50%', '70%', '40%'],
                  borderRadius: ['40%', '50%', '45%', '50%', '40%'],
                }}
                transition={{ duration: 0.4, repeat: Infinity }}
              >
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#E85A6B] rounded-full"
                  style={{ width: '50%', height: '40%' }}
                />
              </motion.div>
            )}
          </div>

          {/* Sparkles for excited mood */}
          {currentMood === 'excited' && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-yellow-400"
                  style={{
                    fontSize: size === 'xl' ? '16px' : '12px',
                    left: `${20 + i * 20}%`,
                    top: `${10 + (i % 2) * 15}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  ✦
                </motion.div>
              ))}
            </>
          )}
        </div>

        {/* Waving Hand - appears on greeting/farewell */}
        <AnimatePresence>
          {(currentMood === 'greeting' || currentMood === 'farewell' || isHovered) && (
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                y: 0, 
                scale: 1,
                rotate: [0, 25, -15, 25, -10, 20, 0],
              }}
              exit={{ opacity: 0, x: 20, y: 20, scale: 0.5 }}
              transition={{ 
                duration: 0.3,
                rotate: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="absolute"
              style={{
                right: '-15%',
                bottom: '15%',
                fontSize: size === 'xl' ? '32px' : size === 'lg' ? '24px' : '18px',
              }}
            >
              👋
            </motion.div>
          )}
        </AnimatePresence>

        {/* Thinking Bubble */}
        <AnimatePresence>
          {currentMood === 'thinking' && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-4 -right-2"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    background: 'hsl(var(--muted))',
                    width: 6 + i * 4,
                    height: 6 + i * 4,
                    right: i * 8,
                    top: -i * 6,
                  }}
                  animate={{
                    y: [0, -3, 0],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Typing Glow Ring */}
        {isTyping && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: '3px solid hsl(var(--primary))',
            }}
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.8, 0.4, 0.8],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>
    </div>
  );
};
