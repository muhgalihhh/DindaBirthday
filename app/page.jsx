// BirthdayGreetingPage.js
'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import DindaPhoto from '../public/Dinda.jpg';
import GiftClose from '../public/gift-close.png'; // Gambar kado tertutup
import GiftOpen from '../public/gift-open.png'; // Gambar kado terbuka
import MusicIcon from '../public/vinyl-record.png';
import ClockIcon from '../public/wall-clock.png';
import MusicSlideIn from './MusicSlideIn'; // Import the new MusicSlideIn component
import Countdown from './countdown'; // Import Countdown component

export default function BirthdayGreetingPage() {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeOutConfetti, setFadeOutConfetti] = useState(false);
  const [showMusicOptions, setShowMusicOptions] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [isCountdownAnimating, setIsCountdownAnimating] = useState(false);
  const [showGiftOpen, setShowGiftOpen] = useState(false); // State for showing the open gift
  const audioRef = useRef(null); // Reference to the audio element for gift open sound
  const confettiAudioRef = useRef(null); // Reference to the audio element for confetti sound

  const targetDate = new Date(new Date().getFullYear(), 9, 17); // 17 Oktober
  const { width, height } = useWindowSize();

  const openGift = () => {
    setIsOpening(true);
    // Start shaking the close gift image
    setTimeout(() => {
      setIsOpening(false);
      setShowGiftOpen(true); // Show the open gift after shaking
      // Play the sound effect when the gift opens
      if (audioRef.current) {
        audioRef.current.play();
      }
      // Start shaking the open gift
      setTimeout(() => {
        // Start confetti and play confetti sound
        setShowConfetti(true);
        if (confettiAudioRef.current) {
          confettiAudioRef.current.play();
        }

        setTimeout(() => {
          // Show main content
          setIsOpened(true);

          setTimeout(() => {
            setFadeOutConfetti(true);
            setTimeout(() => {
              setShowConfetti(false);
              setFadeOutConfetti(false);
            }, 1000);
          }, 5000);
        }, 1000); // Show open gift after 1 second
      }, 1000); // Shake close gift for 1 second
    }, 1000); // Shake for 1 second
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

  return (
    <div className="w-full h-screen bg-gradient-to-b from-purple-100 to-red-50 flex items-center justify-center overflow-hidden relative">
      <audio ref={audioRef} src="/gift-open.mp3" preload="auto" /> {/* Suara saat kado dibuka */}
      <audio ref={confettiAudioRef} src="/party-horn.mp3" preload="auto" /> {/* Suara saat confetti muncul */}
      {!isOpened ? (
        <div className={`relative`}>
          {/* Gambar kado tertutup */}
          {!showGiftOpen ? (
            <Image
              src={GiftClose}
              alt="Gift Close"
              width={150}
              height={150}
              className={`transition-transform duration-700 ${isOpening ? 'animate-shake' : ''}`} // Shake effect
              onClick={openGift} // Menangani klik pada gambar
            />
          ) : (
            // Gambar kado terbuka
            <Image
              src={GiftOpen}
              alt="Gift Open"
              width={200}
              height={200}
              className={`transition-transform duration-700 animate-shake`} // Shake effect
            />
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg p-10 mx-4 shadow-md text-center max-w-lg relative animate-fadeIn">
          <h1 className="text-pink-500 text-2xl mb-4 animate-bounce">Selamat Ulang Tahun Adinda Oktaviani!</h1>
          <div className="flex justify-center items-center">
            <Image src={DindaPhoto} alt="Birthday Person" width={200} height={200} className="rounded-full object-cover my-6" />
          </div>
          <p className="text-gray-600 mb-4">Semoga hari specialmu dipenuhi dengan kebahagiaan dan sukacita!</p>
        </div>
      )}
      {showConfetti && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${fadeOutConfetti ? 'opacity-0' : 'opacity-100'}`}>
          <Confetti width={width} height={height} numberOfPieces={500} />
        </div>
      )}
      {isOpened && (
        <div className="fixed bottom-5 right-5 cursor-pointer flex items-center justify-center rounded-full p-2 transition-transform gap-3">
          <Image src={MusicIcon} alt="Music Icon" width={50} height={50} className="hover:scale-110" onClick={toggleMusicOptions} />
          <div className="relative">
            <Image src={ClockIcon} alt="Clock Icon" width={50} height={50} className="hover:scale-110" onClick={() => setShowCountdown(true)} />
          </div>
        </div>
      )}
      {showMusicOptions && <MusicSlideIn onClose={toggleMusicOptions} />}
      {showCountdown && (
        <div className={`fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 transition-opacity duration-300`}>
          <div className={`modal ${isCountdownAnimating ? 'slide-out' : 'slide-in'} transform p-5`}>
            <Countdown targetDate={targetDate} onClose={closeCountdown} />
          </div>
        </div>
      )}
    </div>
  );
}
