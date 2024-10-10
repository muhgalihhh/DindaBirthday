import { useEffect, useState } from 'react';

export default function Countdown({ targetDate, onClose }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [targetDate]);

  const countdownElements = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    countdownElements.push(
      <span key={interval} className="mr-2">
        {timeLeft[interval]} {interval}{' '}
      </span>
    );
  });

  return (
    <div className="modal slide-in w-80 h-auto text-sm text-white font-semibold bg-green-500 py-4 px-5 rounded-lg shadow-lg">
      <button onClick={onClose} className="absolute top-2 right-2 text-white">
        &times;
      </button>
      {countdownElements.length ? countdownElements : <span>Waktu habis!</span>}
    </div>
  );
}
