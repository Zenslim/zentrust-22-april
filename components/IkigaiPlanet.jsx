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
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setShow(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={`${styles.planetWrapper} ${show ? styles.show : styles.hide}`}>
        <div className={styles.planetCore}></div>
        <div className={styles.orbitingStars}></div>
        <div className={styles.planetText}>
          <span>{phrases[index]}</span>
        </div>
      </div>
    </div>
  );
}
