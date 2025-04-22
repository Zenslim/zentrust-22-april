
import { useState, useEffect } from 'react';

const phrases = [
  "🌱 What lights you up?",
  "🧩 What are you great at?",
  "💖 What does the world need from you?",
  "💰 What can you be paid for?"
];

export default function Ikigai() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(Math.floor(Math.random() * phrases.length));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center text-white text-xl font-semibold drop-shadow-lg">
      {phrases[current]}
    </div>
  );
}
