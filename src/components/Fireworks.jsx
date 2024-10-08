// components/Fireworks.jsx

import { useRef, useEffect } from 'react';

const Fireworks = () => {
  const canvasRef = useRef(null);
  let animationFrameId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const colors = ['#ff0044', '#44ff00', '#0044ff', '#ff7700', '#7700ff', '#00ff77'];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Adjust canvas size on window resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);

    // Particle constructor
    function Particle(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.radius = Math.random() * 4 + 2; // Increased size
      this.speedX = Math.random() * 12 - 6; // Increased horizontal speed
      this.speedY = Math.random() * -12 - 6; // Increased upward speed
      this.alpha = 1;
      this.decay = Math.random() * 0.007 + 0.003; // Slower decay for longer visibility

      this.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;
      };

      this.draw = function () {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };
    }

    // Create fireworks
    const createFireworks = (x, y) => {
      const numParticles = 200; // Increased number of particles
      for (let i = 0; i < numParticles; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color));
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.alpha <= 0) {
          particles.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Create fireworks periodically
    const fireworksInterval = setInterval(() => {
      createFireworks(
        Math.random() * canvas.width,
        canvas.height * 0.9 // Fireworks start closer to the bottom (90% of canvas height)
      );
    }, 1000);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(fireworksInterval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default Fireworks;
