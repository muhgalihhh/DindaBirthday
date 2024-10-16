import { useEffect, useState } from 'react';

const Leaf = ({ style }) => (
  <div
    className="absolute w-4 h-4 bg-yellow-100 rounded-full opacity-70"
    style={{
      ...style,
      boxShadow: '0 0 5px rgba(255, 255, 0, 0.3)',
      animation: `fall ${Math.random() * 5 + 5}s linear infinite`,
    }}
  />
);

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
    <div className="fixed inset-0 pointer-events-none">
      {leaves.map((leaf) => (
        <Leaf key={leaf.id} style={leaf.style} />
      ))}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 0.7;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FallingLeaves;
