import { useEffect, useState } from 'react';

const AnimatedText = ({ texts, onComplete }) => {
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = texts[textIndex];
      const updatedText = isDeleting ? currentFullText.substring(0, charIndex - 1) : currentFullText.substring(0, charIndex + 1);

      setCurrentText(updatedText);
      setCharIndex((prev) => (isDeleting ? prev - 1 : prev + 1));

      if (!isDeleting && updatedText === currentFullText) {
        setTimeout(() => setIsDeleting(true), 1000); // Wait before deleting
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
        if (textIndex === texts.length - 1) {
          onComplete(); // Call onComplete when all texts are finished
        }
      }
    };

    const typingTimeout = setTimeout(handleTyping, isDeleting ? 50 : 100);

    return () => clearTimeout(typingTimeout);
  }, [charIndex, isDeleting, textIndex, texts, onComplete]);

  return <h1 className="p-6 text-animated__heading">{currentText}</h1>;
};

export default AnimatedText;
