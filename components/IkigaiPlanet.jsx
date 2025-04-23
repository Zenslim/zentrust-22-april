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
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const loop = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setVisible(true);
      }, 2000); // fade-out time
    }, 7000); // 5s visible + 2s transition

    return () => clearInterval(loop);
  }, []);

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={`${styles.planetWrapper} ${visible ? styles.fadeIn : styles.fadeOut}`}>
        <img src="/planet-blue-real.png" className={styles.planetImage} alt="planet" />
        <div className={styles.planetText}>{phrases[index]}</div>
      </div>
    </div>
  );
}
