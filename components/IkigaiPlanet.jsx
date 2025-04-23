import { useEffect, useState } from 'react';
import styles from '@/styles/ikigaiPlanet.module.css';

const phrases = [
  "Why do I exist?",
  "What’s my true calling?",
  "What would I do forever?",
  "What makes me feel alive?"
];

export default function IkigaiPlanet({ onClick }) {
  const [index] = useState(Math.floor(Math.random() * phrases.length));
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100); // slight delay to trigger zoom-in
  }, []);

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={`${styles.planetWrapper} ${show ? styles.zoomIn : styles.start}`}>
        <div className={styles.spinLayer}>
          <img src="/planet-blue-real.png" className={styles.planetImage} alt="planet" />
        </div>
        <div className={styles.planetText}>{phrases[index]}</div>
      </div>
    </div>
  );
}
