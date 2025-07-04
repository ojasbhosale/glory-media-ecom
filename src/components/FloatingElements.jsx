import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements = () => {
  const elements = [
    { type: 'circle', size: 'w-4 h-4', color: 'bg-emerald-400/20', delay: 0 },
    { type: 'square', size: 'w-3 h-3', color: 'bg-cyan-400/15', delay: 1 },
    { type: 'triangle', size: 'w-5 h-5', color: 'bg-purple-400/10', delay: 2 },
    { type: 'circle', size: 'w-6 h-6', color: 'bg-emerald-300/25', delay: 3 },
    { type: 'square', size: 'w-2 h-2', color: 'bg-cyan-300/20', delay: 4 },
    { type: 'circle', size: 'w-3 h-3', color: 'bg-purple-300/15', delay: 5 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.size} ${element.color} ${
            element.type === 'circle' ? 'rounded-full' : 
            element.type === 'square' ? 'rounded-sm' : 
            'clip-triangle'
          } blur-sm`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: element.delay,
          }}
        />
      ))}
      
      {/* Floating code symbols */}
      {['<', '>', '{', '}', '/', '*'].map((symbol, index) => (
        <motion.div
          key={`symbol-${index}`}
          className="absolute text-emerald-400/20 font-mono text-2xl font-bold select-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -200, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 25,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;