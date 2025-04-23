import { useEffect, useState } from 'react';
import styles from '@/styles/ikigaiPlanet.module.css';

const phrases = [
  "💓 Why do I exist?",
  "🌌 What’s my true calling?",
  "🧭 What would I do forever?",
  "🔥 What makes me feel alive?"
];

export default function IkigaiPlanet({ onClick }) {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setShow(true);
      }, 500); // fade out duration
    }, 3500); // 3s show + 0.5s fade

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={`${styles.planet} ${show ? styles.show : styles.hide}`}>
        {phrases[index]}
      </div>
    </div>
  );
}
