// PlanetMessengerV2.jsx — Celestial prompt stays until user reflects

import { useEffect, useState } from 'react';
import Image from 'next/image';

const planetPrompts = [
  {
    name: "Earth",
    image: "/planet/earth.png",
    prompts: [
      "What dream have you abandoned?",
      "Where does your soul feel most rooted?",
      "What legacy are you planting?",
      "What part of you longs to grow slowly?"
    ]
  },
  {
    name: "Mars",
    image: "/planet/mars.png",
    prompts: [
      "What fire are you afraid to light?",
      "What would courage do now?",
      "Where are you holding back your power?",
      "What battle are you tired of avoiding?"
    ]
  },
  {
    name: "Moon",
    image: "/planet/moon.png",
    prompts: [
      "Who are you beneath it all?",
      "What emotions do you hide from others?",
      "What truth is asking to be felt?",
      "What if your softness is your strength?"
    ]
  },
  {
    name: "Jupiter",
    image: "/planet/jupiter.png",
    prompts: [
      "What truth are you expanding into?",
      "Where are you being invited to grow?",
      "What belief could change your life?",
      "What possibility feels too big to believe?"
    ]
  },
  {
    name: "Pluto",
    image: "/planet/pluto.png",
    prompts: [
      "What’s dying to be expressed?",
      "What part of you needs to dissolve?",
      "What transformation are you resisting?",
      "What fear is guarding your rebirth?"
    ]
  },
  {
    name: "Saturn",
    image: "/planet/saturn.png",
    prompts: [
      "What cycle are you ready to close?",
      "What boundary do you need to honor?",
      "Where is structure holding you back?",
      "What lesson keeps returning?"
    ]
  },
  {
    name: "Populated",
    image: "/planet/populated.png",
    prompts: [
      "What part of you is quietly thriving?",
      "What are you already doing right?",
      "Where are you more alive than you admit?",
      "What if you're more ready than you think?"
    ]
  }
];

export default function PlanetMessengerV2({ onPromptChange, reflectionSubmitted }) {
  const [planetIndex, setPlanetIndex] = useState(0);
  const [promptIndex, setPromptIndex] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (!locked) {
      const newPlanet = Math.floor(Math.random() * planetPrompts.length);
      const newPrompt = Math.floor(Math.random() * planetPrompts[newPlanet].prompts.length);
      setPlanetIndex(newPlanet);
      setPromptIndex(newPrompt);
      onPromptChange(planetPrompts[newPlanet].prompts[newPrompt]);
      setLocked(true);
    }
  }, [locked]);

  useEffect(() => {
    if (reflectionSubmitted) setLocked(false);
  }, [reflectionSubmitted]);

  const planet = planetPrompts[planetIndex];
  const prompt = planet.prompts[promptIndex];

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-40 h-40 sm:w-56 sm:h-56 relative animate-zoom-in">
        <Image
          src={planet.image}
          alt={planet.name}
          fill
          priority
          className="object-contain drop-shadow-xl"
        />
      </div>
      <p className="text-white text-lg sm:text-xl text-center animate-fade-in max-w-md">
        {prompt}
      </p>
    </div>
  );
}
