import { useEffect, useRef, useState } from 'react';

const BirthdayGreeting = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      if (!isHovered) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = (y - centerY) / 10;
      const tiltY = (centerX - x) / 10;

      setTilt({ x: tiltX, y: tiltY });

      // Update glare position
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      setGlarePosition({ x: glareX, y: glareY });
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => card.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      className="relative max-w-lg p-8 mx-4 mx-auto my-6 text-center transition-all duration-300 shadow-lg bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl hover:shadow-2xl sm:max-w-md md:max-w-lg lg:max-w-xl sm:mx-6 md:mx-8"
      style={{
        perspective: '1000px',
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.05 : 1})`,
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 transition-opacity duration-300 rounded-3xl"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`,
          opacity: isHovered ? 1 : 0,
          pointerEvents: 'none',
        }}
      />
      <h1
        className="mb-4 text-xl font-extrabold text-white transition-all duration-300 drop-shadow-lg sm:text-2xl md:text-3xl lg:text-4xl"
        style={{
          transform: isHovered ? 'translateZ(50px)' : 'translateZ(0)',
          textShadow: isHovered ? '0 0 15px rgba(255,255,255,0.5)' : 'none',
        }}
      >
        Selamat Ulang Tahun Adinda Oktaviani!
      </h1>
      <div
        className="relative z-10 flex items-center justify-center transition-all duration-300"
        style={{
          transform: isHovered ? 'translateZ(75px)' : 'translateZ(0)',
          filter: isHovered ? 'drop-shadow(0 0 15px rgba(255,255,255,0.5))' : 'none',
        }}
      >
        <img
          src="/Dinda.jpg"
          alt="Birthday Person"
          className="object-cover w-40 h-40 my-4 transition-transform duration-300 border-4 border-white rounded-full shadow-md hover:scale-110 sm:my-6 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64"
        />
      </div>
      <p
        className="mb-4 text-base text-white transition-all duration-300 drop-shadow-md sm:text-lg md:text-xl lg:text-2xl"
        style={{
          transform: isHovered ? 'translateZ(25px)' : 'translateZ(0)',
          textShadow: isHovered ? '0 0 10px rgba(255,255,255,0.3)' : 'none',
        }}
      >
        Semoga hari spesialmu dipenuhi dengan kebahagiaan, cinta, dan sukacita!
      </p>

      <div className="absolute inset-0 bg-pink-300 rounded-3xl opacity-20" style={{ transform: 'translateZ(-50px)' }} />
    </div>
  );
};

export default BirthdayGreeting;
