import { useEffect, useState } from 'react';

const LeafSVG = ({ color, ...props }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={color} {...props}>
    <path d="M12 2C7.03 2 3 6.03 3 11v8.59c0 .64.48 1.22 1.12 1.36.64.13 1.28-.23 1.5-.83l.72-1.89c.14-.38.51-.62.91-.62h8.5c.4 0 .77.24.91.62l.72 1.89c.22.6.86.96 1.5.83.64-.14 1.12-.72 1.12-1.36V11c0-4.97-4.03-9-9-9zm0 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
  </svg>
);

const Leaf = ({ style }) => {
  const colors = ['#8B4513', '#A0522D', '#CD853F', '#DEB887', '#D2691E'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomRotation = Math.random() * 360;
  const randomScale = 0.5 + Math.random() * 0.5; // Scale between 0.5 and 1

  return (
    <div
      className="absolute"
      style={{
        ...style,
        transform: `rotate(${randomRotation}deg) scale(${randomScale})`,
      }}
    >
      <LeafSVG color={randomColor} />
    </div>
  );
};

const FallingLeaves = ({ isPlaying }) => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setLeaves((prevLeaves) => [
          ...prevLeaves,
          {
            id: Date.now(),
            style: {
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 15}s`,
              animationDelay: `${Math.random() * 5}s`,
            },
          },
        ]);
      }, 300);

      return () => clearInterval(interval);
    } else {
      setLeaves([]);
    }
  }, [isPlaying]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {leaves.map((leaf) => (
        <Leaf key={leaf.id} style={leaf.style} />
      ))}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          25% {
            transform: translateY(25vh) translateX(100px) rotate(90deg);
          }
          50% {
            transform: translateY(50vh) translateX(-100px) rotate(180deg);
          }
          75% {
            transform: translateY(75vh) translateX(50px) rotate(270deg);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(105vh) translateX(-50px) rotate(360deg);
            opacity: 0;
          }
        }
        .absolute {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FallingLeaves;
