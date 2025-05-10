{/* Previous CursorEffect.tsx content with enhanced particle effects */}
const particles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  angle: (i / 15) * Math.PI * 2,
  size: Math.random() * 4 + 2,
  color: `hsla(var(--primary), ${0.3 + Math.random() * 0.4})`,
  speed: 0.5 + Math.random() * 1.5,
  offset: Math.random() * 10,
  fadeSpeed: 0.5 + Math.random() * 0.5
}));

// Update particle animation
{particles.map((particle) => (
  <motion.div
    key={particle.id}
    style={{
      position: 'fixed',
      left: mousePosition.x,
      top: mousePosition.y,
      width: particle.size,
      height: particle.size,
      backgroundColor: particle.color,
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: 9997,
    }}
    animate={{
      x: [
        Math.cos(particle.angle) * (baseRadius + particle.offset),
        Math.cos(particle.angle + Math.PI) * (baseRadius + particle.offset)
      ],
      y: [
        Math.sin(particle.angle) * (baseRadius + particle.offset),
        Math.sin(particle.angle + Math.PI) * (baseRadius + particle.offset)
      ],
      opacity: [1, 0],
      scale: [1, 0]
    }}
    transition={{
      duration: 0.5 / particle.fadeSpeed,
      ease: "easeOut",
      repeat: Infinity,
      repeatDelay: 0.1
    }}
  />
))}