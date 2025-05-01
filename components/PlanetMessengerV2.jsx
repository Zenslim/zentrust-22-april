// PlanetMessengerV2.jsx — Celestial prompt stays until user reflects

import { useEffect, useState } from 'react';
import Image from 'next/image';

const planetPrompts = [
  {
    name: "Saturn",
    image: "/planets/saturn.png",
    prompts: [
      "What cycle are you ready to close?",
      "What boundary do you need to honor?"
    ]
  },
  {
    name: "Mars",
    image: "/planets/mars.png",
    prompts: [
      "What fire are you afraid to light?",
      "What would courage do now?"
    ]
  },
  {
    name: "Moon",
    image: "/planets/moon.png",
    prompts: [
      "Who are you beneath it all?",
      "What truth is asking to be felt?"
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
          className="object-contain drop-shadow-xl"
        />
      </div>
      <p className="text-white text-lg sm:text-xl text-center animate-fade-in max-w-md">
        {prompt}
      </p>
    </div>
  );
}
