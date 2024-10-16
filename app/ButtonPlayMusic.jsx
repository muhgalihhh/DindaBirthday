import { useEffect, useRef, useState } from 'react';
import { FaMusic, FaPause } from 'react-icons/fa';
import FallingLeaves from './FallingLeaves';

const ButtonPlayMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/backsound.mp3');
    audioRef.current.loop = true; // Make the audio loop

    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div className="fixed z-50 top-5 left-5">
        <button onClick={toggleMusic} className="w-10 p-2 transition-transform duration-300 ease-in-out bg-purple-600 rounded-full shadow-lg hover:scale-110">
          {isPlaying ? <FaPause className="text-white" size={20} /> : <FaMusic className="text-white" size={20} />}
        </button>
      </div>
      <FallingLeaves isPlaying={isPlaying} />
    </>
  );
};

export default ButtonPlayMusic;
