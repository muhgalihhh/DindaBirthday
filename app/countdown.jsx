import { useEffect, useState } from 'react';

export default function Countdown({ targetDate, onClose }) {
  const calculateTimeLeft = (date) => {
    const difference = +new Date(date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
  const [isBirthdayOver, setIsBirthdayOver] = useState(false); // Track if initial countdown is over
  const [nextBirthdayDate] = useState(new Date('2025-10-17T00:00:00')); // Next year's date
  const [isAnimating, setIsAnimating] = useState(false); // State for animation

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft.seconds === 0 && timeLeft.minutes === 0 && timeLeft.hours === 0 && timeLeft.days === 0) {
        setIsBirthdayOver(true); // Trigger when countdown is over
      } else {
        setTimeLeft(calculateTimeLeft(isBirthdayOver ? nextBirthdayDate : targetDate)); // Update countdown
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, targetDate, isBirthdayOver, nextBirthdayDate]);

  const countdownElements = [];

  Object.keys(timeLeft).forEach((interval) => {
    countdownElements.push(
      <div key={interval} className="flex flex-col items-center">
        <span className="text-4xl">{timeLeft[interval]}</span>
        <span className="text-xs">{interval.charAt(0).toUpperCase() + interval.slice(1)}</span>
      </div>
    );
  });

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onClose();
    }, 500); // Delay closing to match animation duration
  };

  return (
    <div className="fixed z-50 transform -translate-x-1/2 top-10 left-1/2">
      <div className={`h-auto px-5 py-6 text-sm font-semibold text-white bg-green-500 rounded-lg shadow-lg modal w-80 ${isAnimating ? 'slide-out' : 'slide-in'}`}>
        <button onClick={handleClose} className="absolute text-xl text-white transition-colors duration-200 top-2 right-2 hover:text-red-500">
          &times;
        </button>
        <div className="flex justify-center space-x-4">
          {isBirthdayOver ? (
            <div className="text-center">
              <p>Dimulai dari sekarang (17 Oktober 2024)</p>
              <p>Anda umur 20, selamat memikirkan kehidupan!</p>
              <div className="mt-4">
                <h2 className="text-lg">Countdown ke 17 Oktober 2025:</h2>
                <div className="flex justify-center space-x-4">{countdownElements}</div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center space-x-4">{countdownElements}</div>
          )}
        </div>
      </div>
    </div>
  );
}
