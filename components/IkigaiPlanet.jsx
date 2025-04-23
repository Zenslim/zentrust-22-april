import { useEffect, useState } from 'react';
import styles from '@/styles/ikigaiPlanet.module.css';
import { planetPrompts } from '@/data/planetPrompts';

export default function IkigaiPlanet({ onClick }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        const nextIndex = (index + 1) % planetPrompts.length;
        const planet = planetPrompts[nextIndex];
        const prompt = planet.prompts[Math.floor(Math.random() * planet.prompts.length)];
        setIndex(nextIndex);
        setCurrentPrompt(prompt);
        setVisible(true);
      }, 2000);
    }, 7000);

    // Initialize first prompt
    const initialPlanet = planetPrompts[index];
    const initialPrompt = initialPlanet.prompts[Math.floor(Math.random() * initialPlanet.prompts.length)];
    setCurrentPrompt(initialPrompt);

    return () => clearInterval(cycle);
  }, [index]);

  const currentPlanet = planetPrompts[index];

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={`${styles.planetWrapper} ${visible ? styles.zoomIn : styles.zoomOut}`}>
        <div className={styles.spinLayer}>
          <img src={`/planet/${currentPlanet.image}`} className={styles.planetImage} alt={currentPlanet.name} />
        </div>
        <div className={styles.planetText}>{currentPrompt}</div>
      </div>
    </div>
  );
}
