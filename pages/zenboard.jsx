import AmbientAudio from '@/components/AmbientAudio';
import { useState, useEffect } from 'react';
import CelestialBackground from '@/components/CelestialBackground';
import MoonSync from '@/components/MoonSync';
import JournalPrompt from '@/components/JournalPrompt';
import JournalDrawer from '@/components/JournalDrawer';
import TimelineDrawer from '@/components/TimelineDrawer';
import TimelineButton from '@/components/TimelineButton';
import GlowAudio from '@/components/GlowAudio';

const MESSAGES = [
  {
    icon: "🌿",
    line: "You bring peace like a breeze.",
    sub: "Even noticing is enough.",
  },
  {
    icon: "❤️",
    line: "What does the world need from you?",
    sub: "Trust what arises in stillness.",
  },
  {
    icon: "🌌",
    line: "You belong — exactly as you are.",
    sub: "Your presence is the practice.",
  },
  {
    icon: "🌀",
    line: "You’re not here by accident.",
    sub: "Everything is unfolding.",
  },
];

export default function Zenboard({ uid }) {
  const [index, setIndex] = useState(0);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [entryCount, setEntryCount] = useState(0);
  const [timelineUnlocked, setTimelineUnlocked] = useState(false);
  const [triggerWhisper, setTriggerWhisper] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleNewEntry = (newTotal) => {
    setEntryCount(newTotal);
    setTriggerWhisper(true);
    setTimeout(() => setTriggerWhisper(false), 500);

    if (newTotal === 3 && !timelineUnlocked) {
      setTimelineUnlocked(true);
      setTimeout(() => {
        setIsTimelineOpen(true);
      }, 1000);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      <CelestialBackground />

      <div className="absolute top-1/3 w-full text-center z-30 px-4">
        <div className="text-3xl md:text-4xl font-semibold drop-shadow-lg transition-all duration-500">
          {MESSAGES[index].icon} {MESSAGES[index].line}
        </div>
        <div className="text-sm md:text-base text-gray-300 mt-2">
          {MESSAGES[index].sub}
        </div>
      </div>

      <div className="absolute bottom-48 w-full flex justify-center px-4 z-40 animate-float">
        <button
          onClick={() => setIsJournalOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-full text-base sm:text-lg shadow-xl animate-pulse transition-all duration-500"
        >
          <JournalPrompt />
        </button>
      </div>

      <div className="absolute top-3 right-4 text-right z-20">
        <div className="text-xs opacity-70">Everything about you is welcome here.</div>
        <MoonSync />
      </div>

      <JournalDrawer
        open={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        uid={uid}
        onNewEntry={handleNewEntry}
      />

      <TimelineDrawer open={isTimelineOpen} onClose={() => setIsTimelineOpen(false)} uid={uid} />
      <TimelineButton visible={entryCount >= 3} onClick={() => setIsTimelineOpen(true)} />

      <GlowAudio triggerWhisper={triggerWhisper} />
      <AmbientAudio enabled />
    </div>
  );
}
