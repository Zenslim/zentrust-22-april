import { useState, useEffect } from "react";
import { missions, purposes } from "@/data/missionPurpose";
import BeginJourneyButton from "@/components/BeginJourneyButton";

export default function Home() {
  const [missionIndex, setMissionIndex] = useState(0);
  const [purposeIndex, setPurposeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMissionIndex((prev) => (prev + 1) % missions.length);
      setPurposeIndex((prev) => (prev + 1) % purposes.length);
    }, 6000); // change every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12 space-y-8">
      <img
        src="/zentrust-logo white.png"
        alt="ZenTrust Logo"
        className="h-12 md:h-16 w-auto"
      />

      {/* Rotating Clear Mission */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center leading-tight max-w-4xl transition-all duration-1000">
        "{missions[missionIndex]
          .split("trust")
          .join("<span class='text-green-500'>trust</span>")}"
      </h1>

      {/* Rotating Core Purpose */}
      <p className="text-center max-w-xl text-gray-300 text-lg transition-all duration-1000">
        {purposes[purposeIndex]}
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <a href="/why" className="px-5 py-2 rounded-xl bg-white text-black font-medium flex items-center gap-2 hover:bg-gray-100 transition">
          🌱 Why We Exist
        </a>
        <a href="/how" className="px-5 py-2 rounded-xl bg-black border border-white font-medium flex items-center gap-2 hover:bg-white hover:text-black transition">
          🛠 How We Work
        </a>
        <a href="/what" className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-medium flex items-center gap-2 hover:bg-emerald-700 transition">
          🌍 What We Offer
        </a>
        <a href="https://blog.zentrust.world" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-xl bg-purple-600 text-white font-medium flex items-center gap-2 hover:bg-purple-700 transition">
          ✍️ Read Blog
        </a>
      </div>

      {/* Sacred Whisper */}
      <p className="text-center italic text-blue-200 mt-10">
        "Reclaiming trust in the soil, the soul, and the sacred web of life."
      </p>

      {/* Begin Journey */}
      <BeginJourneyButton />
    </div>
  );
}
