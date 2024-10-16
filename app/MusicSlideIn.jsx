import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa'; // Import the icons
import MusicIcon from '../public/vinyl-record.png';

export default function MusicSlideIn({ onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0); // Track the total duration of the song
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1); // Default to -1 before audio starts
  const audioRef = useRef(null);
  const lyricsRef = useRef(null); // Reference for the lyrics container

  // Define lyrics with corresponding timings (in seconds)
  const lyrics = [
    { text: 'Happy birthday to you', time: 0 },
    { text: "Although you're with someone new", time: 6 },
    { text: 'I guess I just touch base', time: 12 },
    { text: 'To wish you all the best', time: 16 },
    { text: "Hope you're all rested and okay", time: 20 },
    { text: 'On your big day', time: 24 },
    { text: 'Happiest year, I pray', time: 28 },
    { text: 'Good memories may stay', time: 35 },
    { text: 'I guess I just touch base', time: 41 },
    { text: 'To wish you the success', time: 44 },
    { text: 'Fuck my ego; I want you be nothing but happy', time: 48 },
    { text: 'God knows', time: 55 },
    { text: "How I've always keep tabs on you", time: 57.5 },
    { text: 'Selfishly want you to live the life I know you once dreamed', time: 62 },
    { text: 'And tiredly night and day working so hard for it to come true', time: 71 },
    { text: 'To come through', time: 83 },
    { text: "I hope you'll get that dream for me", time: 86 },
    { text: 'Even for a day', time: 93.5 },
    { text: "So at least I know you're proud of yourself", time: 96.8 },
    { text: "Cheer up, it's your day", time: 101 },
    { text: 'Happy birthday to you', time: 104.8 },
  ];

  useEffect(() => {
    audioRef.current = new Audio('/birthday-song.mp3');
    const audio = audioRef.current;

    audio.addEventListener('canplaythrough', () => {
      setDuration(audio.duration); // Set total song duration
    });

    setIsVisible(true);

    const handleClose = (e) => {
      if (e.key === 'Escape') {
        closeSlideIn();
      }
    };

    window.addEventListener('keydown', handleClose);

    return () => {
      window.removeEventListener('keydown', handleClose);
      audio.pause();
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(audioRef.current.currentTime);

      // Find the current lyric to highlight based on current time
      const index = lyrics.findIndex((lyric, i) => {
        const nextLyricTime = lyrics[i + 1] ? lyrics[i + 1].time : Infinity;
        return audioRef.current.currentTime >= lyric.time && audioRef.current.currentTime < nextLyricTime;
      });

      if (index !== -1 && index !== currentLyricIndex) {
        setCurrentLyricIndex(index);

        // Scroll to the highlighted lyric
        if (lyricsRef.current) {
          const lyricElement = lyricsRef.current.children[index];
          if (lyricElement) {
            lyricElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        }
      }
    };

    if (isPlaying) {
      const interval = setInterval(updateTime, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentLyricIndex]);

  const closeSlideIn = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const togglePlay = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => console.error('Error playing audio:', error));
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime; // Set audio to the new time
    setCurrentTime(newTime); // Update the current time state
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <div className={`fixed inset-0 flex justify-center items-end bg-black bg-opacity-50 transition-opacity duration-300`}>
        <div className={`bg-white w-72 sm:w-80 md:w-96 p-4 rounded-t-lg shadow-lg transform transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="flex flex-col items-center">
            {/* Vinyl Image Positioned Above Modal */}
            <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 mb-4">
              <Image src={MusicIcon} width={80} className="animate-spin" alt="Vinyl Record" /> {/* Classname for spinning effect */}
            </div>
            <h2 className="mt-10 mb-2 text-lg font-semibold">Happy Birthday!</h2>
            <p className="mb-4 text-gray-600">Artist: Pamungkas</p>

            {/* Scrollable Lyrics Section */}
            <div className="w-full px-4 mb-4 overflow-y-auto text-center max-h-48" ref={lyricsRef} style={{ scrollBehavior: 'smooth' }}>
              {lyrics.map((lyric, index) => (
                <p key={index} className={`text-gray-800 ${currentLyricIndex === index ? 'font-bold text-green-500' : ''}`}>
                  {lyric.text}
                </p>
              ))}
            </div>

            {/* Audio Player */}
            <div className="flex flex-col items-center justify-center w-full mb-4">
              <span className="mb-2 text-gray-800">{formatTime(currentTime)}</span>

              {/* Song Progress Slider */}
              <input type="range" min="0" max={duration} step="0.1" value={currentTime} onChange={handleSliderChange} className="w-full mb-2" />

              <button onClick={togglePlay} className={`p-2 text-white transition-transform rounded-full hover:scale-110 ${isPlaying ? 'bg-red-500' : 'bg-green-500'}`}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
            </div>

            <button onClick={closeSlideIn} className="px-4 py-2 mt-4 text-white bg-red-500 rounded">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
