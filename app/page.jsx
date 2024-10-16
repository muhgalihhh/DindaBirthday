'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import GiftClose from '../public/gift-close.png';
import GiftOpen from '../public/gift-open.png';
import MusicIcon from '../public/vinyl-record.png';
import ClockIcon from '../public/wall-clock.png';
import AnimatedText from './AnimatedText'; // Import AnimatedText component
import BirthdayGreeting from './BirthdayGreeting'; // Import the new greeting component
import ButtonPlayMusic from './ButtonPlayMusic';
import MusicSlideIn from './MusicSlideIn';
import Countdown from './countdown';

export default function BirthdayGreetingPage() {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeOutConfetti, setFadeOutConfetti] = useState(false);
  const [showMusicOptions, setShowMusicOptions] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [isCountdownAnimating, setIsCountdownAnimating] = useState(false);
  const [showGiftOpen, setShowGiftOpen] = useState(false);
  const [showTextAnimation, setShowTextAnimation] = useState(true); // New state for controlling text animation
  const audioRef = useRef(null);
  const confettiAudioRef = useRef(null);

  const targetDate = new Date(new Date().getFullYear(), 9, 17);
  const { width, height } = useWindowSize();

  const openGift = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpening(false);
      setShowGiftOpen(true);
      if (audioRef.current) {
        audioRef.current.play();
      }
      setTimeout(() => {
        setShowConfetti(true);
        if (confettiAudioRef.current) {
          confettiAudioRef.current.play();
        }

        setTimeout(() => {
          setIsOpened(true);
          setShowGiftOpen(false); // Hide gift immediately after it's opened

          setTimeout(() => {
            setFadeOutConfetti(true);
            setTimeout(() => {
              setShowConfetti(false);
              setFadeOutConfetti(false);
            }, 1000);
          }, 5000);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const toggleMusicOptions = () => {
    setShowMusicOptions(!showMusicOptions);
  };

  const closeCountdown = () => {
    setIsCountdownAnimating(true);
    setTimeout(() => {
      setShowCountdown(false);
      setIsCountdownAnimating(false);
    }, 500);
  };

  // Callback when text animation completes
  const handleTextAnimationComplete = () => {
    setShowTextAnimation(false); // Hide text animation after it completes
  };

  return (
    <div className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-gradient-to-b from-purple-100 to-red-50">
      <audio ref={audioRef} src="/gift-open.mp3" preload="auto" />
      <audio ref={confettiAudioRef} src="/party-horn.mp3" preload="auto" />
      {!isOpened && showTextAnimation ? (
        // Display animated text before showing the gift
        <AnimatedText
          texts={['Sekarang sudah 17 Oktober ya...', 'Selamat ulang tahun ke-20!']}
          onComplete={handleTextAnimationComplete} // Callback when animation completes
        />
      ) : (
        <div className="relative">
          {!isOpened && !showGiftOpen ? ( // Only show closed gift if not opened
            <Image src={GiftClose} alt="Gift Close" width={150} height={150} className={`transition-transform duration-700 ${isOpening ? 'animate-shake' : ''}`} onClick={openGift} />
          ) : null}
        </div>
      )}
      {showGiftOpen &&
        !isOpened && ( // Only show open gift if not yet opened
          <Image src={GiftOpen} alt="Gift Open" width={200} height={200} className="transition-transform duration-700 animate-shake" />
        )}
      {showConfetti && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${fadeOutConfetti ? 'opacity-0' : 'opacity-100'}`}>
          <Confetti width={width} height={height} numberOfPieces={500} />
        </div>
      )}
      {isOpened && <BirthdayGreeting />} {/* Use the separated greeting component */}
      {isOpened && <ButtonPlayMusic />}
      {isOpened && (
        <div className="fixed flex items-center justify-center gap-3 p-2 transition-transform rounded-full cursor-pointer bottom-5 right-5">
          <Image src={MusicIcon} alt="Music Icon" width={50} height={50} className="hover:scale-110" onClick={toggleMusicOptions} />
          <Image src={ClockIcon} alt="Clock Icon" width={50} height={50} className="hover:scale-110" onClick={() => setShowCountdown(true)} />
        </div>
      )}
      {showMusicOptions && <MusicSlideIn onClose={toggleMusicOptions} />}
      {showCountdown && <Countdown targetDate={targetDate} onClose={closeCountdown} />}
    </div>
  );
}
