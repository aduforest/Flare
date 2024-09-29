// components/RedeemAnimation.jsx
import { motion } from 'framer-motion';

const RedeemAnimation = ({ onAnimationComplete }) => {
  // Generate an array of spark particles
  const sparks = [...Array(50)].map((_, i) => {
    // Random angle and speed for each spark
    const angle = Math.random() * Math.PI * 2; // Random angle in radians
    const speed = 150 + Math.random() * 250; // Random speed between 150 and 400
    const delay = Math.random() * 0.2; // Random delay up to 0.2 seconds

    // Random colors for sparks
    const colors = ['#FF4500', '#FFA500', '#FFFF00', '#FFD700']; // Fire-like colors
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Random rotation for the spark
    const rotation = Math.random() * 360; // Random rotation in degrees

    return (
      <motion.div
        key={i}
        className="absolute"
        style={{
          width: '2px',
          height: '12px',
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}`,
          borderRadius: '2px',
          transform: `rotate(${rotation}deg)`,
        }}
        initial={{
          x: 0,
          y: 0,
          opacity: 1,
          scaleY: 1,
        }}
        animate={{
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed + 50, // Adds upward motion
          opacity: 0,
          scaleY: 0.5,
        }}
        transition={{
          duration: 1.2,
          delay,
          ease: 'easeOut',
        }}
      />
    );
  });

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      onAnimationComplete={onAnimationComplete}
    >
      {/* Central Spark Burst */}
      <motion.div className="relative flex items-center justify-center">
        {/* Central Flare */}
        <motion.div
          className="absolute w-32 h-32"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,0,1) 0%, rgba(255,69,0,0) 70%)',
            filter: 'blur(20px)',
            borderRadius: '50%',
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {/* Spark Particles */}
        {sparks}
      </motion.div>
    </motion.div>
  );
};

export default RedeemAnimation;
