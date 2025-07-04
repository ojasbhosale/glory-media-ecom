import React from 'react';
import { motion } from 'framer-motion';

const GlowingGrid = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Glowing grid intersections */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-emerald-400/40 rounded-full blur-sm"
          style={{
            left: `${(i % 4) * 25 + 12.5}%`,
            top: `${Math.floor(i / 4) * 33 + 16.5}%`,
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Scanning lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%, 
            rgba(16, 185, 129, 0.1) 50%, 
            transparent 100%)`,
          width: '200px',
          height: '100%',
        }}
        animate={{
          x: ['-200px', 'calc(100vw + 200px)'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(0deg, 
            transparent 0%, 
            rgba(6, 182, 212, 0.08) 50%, 
            transparent 100%)`,
          width: '100%',
          height: '150px',
        }}
        animate={{
          y: ['-150px', 'calc(100vh + 150px)'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
      />
    </div>
  );
};

export default GlowingGrid;