import { useEffect, useState } from 'react';
import styles from '@/styles/ikigaiPlanet.module.css';

const phrases = [
  "Why do I exist?",
  "What’s my true calling?",
  "What would I do forever?",
  "What makes me feel alive?"
];

export default function IkigaiPlanet({ onClick }) {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % phrases.length);
        setActive(true);
      }, 600); // match fade duration
    }, 4000); // 3.4s visible + 0.6s transition

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={`${styles.planetWrapper} ${active ? styles.fadeIn : styles.fadeOut}`}>
        <img src="/planet-blue-real.png" className={styles.planetImage} alt="planet" />
        <div className={styles.planetText}>{phrases[index]}</div>
      </div>
    </div>
  );
}
