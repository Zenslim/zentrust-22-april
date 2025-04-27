'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import all sub-components (client-only)
const AmbientAudio = dynamic(() => import('@/components/AmbientAudio'), { ssr: false });
const CelestialBackground = dynamic(() => import('@/components/CelestialBackground'), { ssr: false });
const IkigaiPlanet = dynamic(() => import('@/components/IkigaiPlanet'), { ssr: false });
const PlanetMessenger = dynamic(() => import('@/components/PlanetMessenger'), { ssr: false });
const CosmicWhisper = dynamic(() => import('@/components/CosmicWhisper'), { ssr: false });
const MoonSync = dynamic(() => import('@/components/MoonSync'), { ssr: false });
const JournalPrompt = dynamic(() => import('@/components/JournalPrompt'), { ssr: false });
const JournalDrawer = dynamic(() => import('@/components/JournalDrawer'), { ssr: false });
const TimelineDrawer = dynamic(() => import('@/components/TimelineDrawer'), { ssr: false });
const TimelineButton = dynamic(() => import('@/components/TimelineButton'), { ssr: false });
const GlowAudio = dynamic(() => import('@/components/GlowAudio'), { ssr: false });

export default function ZenboardClient({ demoMode = false }) {
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [entryCount, setEntryCount] = useState(0);
  const [timelineUnlocked, setTimelineUnlocked] = useState(false);
  const [triggerWhisper, setTriggerWhisper] = useState(false);

  const handleNewEntry = (newTotal) => {
    if (demoMode) {
      console.log("Demo Mode: Reflection not saved.");
      setEntryCount(newTotal);
      setTriggerWhisper(true);
      setTimeout(() => setTriggerWhisper(false), 500);

      if (newTotal === 3 && !timelineUnlocked) {
        setTimelineUnlocked(true);
        setTimeout(() => {
          setIsTimelineOpen(true);
        }, 1000);
      }
      return;
    }

    // Normal mode
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
    <div className="relative w-full h-screen overflow-hidden bg-transparent">
      <CelestialBackground />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <IkigaiPlanet onClick={() => window.open('/ikigai-theme', '_blank')} />
        <PlanetMessenger />
      </div>

      <div className="absolute bottom-56 sm:bottom-48 w-full flex justify-center px-4 z-40 animate-float">
        <button
          onClick={() => setIsJournalOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 hover:bg-purple-700 text-white py-3 px-6 rounded-full text-lg sm:text-xl shadow-xl animate-pulse transition-all duration-500"
        >
          <JournalPrompt />
        </button>
      </div>

      <div className="absolute top-3 left-4 text-left z-20">
        <MoonSync />
      </div>

      <JournalDrawer
        open={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        uid=""
        onNewEntry={handleNewEntry}
      />
      <TimelineDrawer open={isTimelineOpen} onClose={() => setIsTimelineOpen(false)} uid="" />
      <TimelineButton visible={entryCount >= 3} onClick={() => setIsTimelineOpen(true)} />

      <GlowAudio triggerWhisper={triggerWhisper} />
      <AmbientAudio enabled />
    </div>
  );
}
