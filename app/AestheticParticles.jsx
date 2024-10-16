import { useEffect, useState } from 'react';

const colors = [
  'rgba(255, 99, 132,', // Pink
  'rgba(54, 162, 235,', // Blue
  'rgba(255, 206, 86,', // Yellow
  'rgba(75, 192, 192,', // Teal
  'rgba(153, 102, 255,', // Purple
];

const Particle = ({ style }) => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return (
    <div
      className="absolute z-40 rounded-full"
      style={{
        ...style,
        background: `${randomColor} ${style.opacity}) 0%, rgba(255, 255, 255, 0) 70%)`,
      }}
    />
  );
};

const AestheticParticles = ({ isPlaying }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        // Generate more particles at once
        const newParticles = Array.from({ length: 10 }).map(() => ({
          // Increase to 10
          id: Date.now() + Math.random(), // Unique ID
          style: {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 20 + 10}px`, // Increase size range
            height: `${Math.random() * 20 + 10}px`, // Increase size range
            opacity: Math.random() * 0.6 + 0.4, // Increase minimum opacity
            animationDuration: `${Math.random() * 10 + 5}s`, // Faster float duration
            animationDelay: `${Math.random() * 5}s`, // Delay for better staggered effect
          },
        }));

        setParticles((prevParticles) => [...prevParticles, ...newParticles]);
      }, 100); // Faster particle generation

      return () => clearInterval(interval);
    } else {
      setParticles([]);
    }
  }, [isPlaying]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <Particle key={particle.id} style={particle.style} />
      ))}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(50px, -50px) rotate(120deg);
          }
          66% {
            transform: translate(-30px, 30px) rotate(240deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
        .absolute {
          animation: float linear infinite;
          filter: blur(1px);
          opacity: 0.8; /* Set a default opacity for all particles */
        }
      `}</style>
    </div>
  );
};

export default AestheticParticles;
