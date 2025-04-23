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
        setIndex((i) => (i + 1) % phrases.length);
        setVisible(true);
      }, 2000); // fade-out duration
    }, 7000); // total: 5s visible + 2s fade

    return () => clearInterval(loop);
  }, []);

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={`${styles.planetWrapper} ${visible ? styles.zoomIn : styles.zoomOut}`}>
        <div className={styles.spinLayer}>
          <img src="/planet-blue-real.png" className={styles.planetImage} alt="planet" />
        </div>
        <div className={styles.planetText}>{phrases[index]}</div>
      </div>
    </div>
  );
}
