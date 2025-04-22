
import { useState, useEffect } from 'react';

const phrases = [
  "🌱 What lights you up?",
  "🧩 What are you great at?",
  "💖 What does the world need from you?",
  "💰 What can you be paid for?"
];

export default function PlanetMessenger() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % phrases.length);
        setVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    const theme = phrases[current].split(' ')[1].toLowerCase();
    window.open(`/theme/${theme}`, '_blank');
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
         onClick={handleClick}>
      <div className={\`
        transition-all duration-500 ease-in-out
        \" + (visible ? "opacity-100 scale-125" : "opacity-0 scale-75") + "
        w-40 h-40 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600
        flex items-center justify-center text-center text-white text-lg font-semibold shadow-lg
      \"}>
        {phrases[current]}
      </div>
    </div>
  );
}
