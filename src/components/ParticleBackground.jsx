// components/ParticleBackground.jsx
import React from 'react';
import Particles from 'react-tsparticles';

const ParticleBackground = () => {
  return (
    <Particles
      className="absolute inset-0"
      options={{
        background: {
          color: '#0d47a1',
        },
        particles: {
          number: {
            value: 50,
          },
          size: {
            value: 3,
          },
          move: {
            speed: 2,
          },
          links: {
            enable: true,
            color: '#ffffff',
          },
        },
      }}
    />
  );
};

export default ParticleBackground;
