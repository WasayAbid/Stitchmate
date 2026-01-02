import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
  baseX: number;
  baseY: number;
}

interface InteractiveBackgroundProps {
  particleCount?: number;
  connectionDistance?: number;
  cursorRadius?: number;
}

const InteractiveBackground = ({
  particleCount = 80,
  connectionDistance = 150,
  cursorRadius = 200,
}: InteractiveBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.2,
          targetAlpha: Math.random() * 0.5 + 0.2,
          baseX: x,
          baseY: y,
        });
      }
    };

    const drawParticle = (particle: Particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);

      const distance = Math.sqrt(
        Math.pow(particle.x - mouseRef.current.x, 2) +
        Math.pow(particle.y - mouseRef.current.y, 2)
      );

      const glowIntensity = Math.max(0, 1 - distance / cursorRadius);

      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.radius * 4
      );

      gradient.addColorStop(0, `rgba(210, 180, 140, ${particle.alpha + glowIntensity * 0.6})`);
      gradient.addColorStop(0.5, `rgba(188, 143, 143, ${particle.alpha * 0.5 + glowIntensity * 0.4})`);
      gradient.addColorStop(1, `rgba(210, 180, 140, 0)`);

      ctx.fillStyle = gradient;
      ctx.fill();

      if (glowIntensity > 0.3) {
        ctx.shadowBlur = 20 * glowIntensity;
        ctx.shadowColor = 'rgba(210, 180, 140, 0.8)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 180, 140, ${particle.alpha + glowIntensity * 0.5})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const drawConnection = (p1: Particle, p2: Particle) => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < connectionDistance) {
        const mouseDistanceP1 = Math.sqrt(
          Math.pow(p1.x - mouseRef.current.x, 2) +
          Math.pow(p1.y - mouseRef.current.y, 2)
        );
        const mouseDistanceP2 = Math.sqrt(
          Math.pow(p2.x - mouseRef.current.x, 2) +
          Math.pow(p2.y - mouseRef.current.y, 2)
        );

        const glowBoost = Math.max(
          Math.max(0, 1 - mouseDistanceP1 / cursorRadius),
          Math.max(0, 1 - mouseDistanceP2 / cursorRadius)
        );

        const opacity = (1 - distance / connectionDistance) * 0.15 + glowBoost * 0.3;

        const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        gradient.addColorStop(0, `rgba(188, 143, 143, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(210, 180, 140, ${opacity * 1.5})`);
        gradient.addColorStop(1, `rgba(188, 143, 143, ${opacity})`);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1 + glowBoost * 2;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    };

    const updateParticle = (particle: Particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      const dx = particle.x - mouseRef.current.x;
      const dy = particle.y - mouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < cursorRadius) {
        const force = (cursorRadius - distance) / cursorRadius;
        const angle = Math.atan2(dy, dx);
        particle.vx += Math.cos(angle) * force * 0.1;
        particle.vy += Math.sin(angle) * force * 0.1;
        particle.targetAlpha = Math.min(1, particle.alpha + force * 0.5);
      } else {
        const returnForceX = (particle.baseX - particle.x) * 0.001;
        const returnForceY = (particle.baseY - particle.y) * 0.001;
        particle.vx += returnForceX;
        particle.vy += returnForceY;
        particle.targetAlpha = Math.random() * 0.5 + 0.2;
      }

      particle.vx *= 0.98;
      particle.vy *= 0.98;

      particle.alpha += (particle.targetAlpha - particle.alpha) * 0.1;

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(canvas.height, particle.y));
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(245, 240, 235, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          drawConnection(particles[i], particles[j]);
        }
      }

      particles.forEach((particle) => {
        updateParticle(particle);
        drawParticle(particle);
      });

      const cursorGlow = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, cursorRadius
      );
      cursorGlow.addColorStop(0, 'rgba(210, 180, 140, 0.03)');
      cursorGlow.addColorStop(0.5, 'rgba(188, 143, 143, 0.02)');
      cursorGlow.addColorStop(1, 'rgba(210, 180, 140, 0)');

      ctx.fillStyle = cursorGlow;
      ctx.fillRect(
        mouseRef.current.x - cursorRadius,
        mouseRef.current.y - cursorRadius,
        cursorRadius * 2,
        cursorRadius * 2
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particleCount, connectionDistance, cursorRadius]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default InteractiveBackground;
