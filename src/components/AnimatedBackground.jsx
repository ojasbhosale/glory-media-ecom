import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const AnimatedBackground = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform mouse position to rotation and scale values
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);
  const scale = useTransform(mouseX, [-300, 300], [0.9, 1.1]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient mesh background */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
            linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(6, 182, 212, 0.03) 100%)
          `,
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.12) 0%, transparent 50%),
             radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.18) 0%, transparent 50%),
             radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
             radial-gradient(circle at 60% 60%, rgba(139, 92, 246, 0.10) 0%, transparent 50%)`,
            `radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.12) 0%, transparent 50%),
             radial-gradient(circle at 60% 40%, rgba(6, 182, 212, 0.09) 0%, transparent 50%),
             radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)`,
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Floating orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-xl"
          style={{
            width: `${Math.random() * 300 + 100}px`,
            height: `${Math.random() * 300 + 100}px`,
            background: `radial-gradient(circle, ${
              i % 3 === 0 
                ? 'rgba(16, 185, 129, 0.1)' 
                : i % 3 === 1 
                ? 'rgba(6, 182, 212, 0.08)' 
                : 'rgba(139, 92, 246, 0.06)'
            } 0%, transparent 70%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 200 - 100, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Interactive particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Neural network lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="url(#emeraldGradient)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0], 
              opacity: [0, 0.6, 0],
              x1: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y1: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              x2: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y2: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
        <defs>
          <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.8)" />
            <stop offset="50%" stopColor="rgba(6, 182, 212, 0.6)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.4)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Mouse-following spotlight */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)`,
          x: mouseX,
          y: mouseY,
          rotateX,
          rotateY,
          scale,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 border border-emerald-500/20 rotate-45"
        animate={{
          rotate: [45, 405],
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 w-24 h-24 border border-cyan-500/20 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Prismatic light rays */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, 
            transparent 0deg, 
            rgba(16, 185, 129, 0.03) 60deg, 
            transparent 120deg, 
            rgba(6, 182, 212, 0.02) 180deg, 
            transparent 240deg, 
            rgba(139, 92, 246, 0.02) 300deg, 
            transparent 360deg)`,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;