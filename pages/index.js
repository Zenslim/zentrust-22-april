import { useState, useEffect } from "react";
import { missions, purposes } from "@/data/missionPurpose";
import BeginJourneyButton from "@/components/BeginJourneyButton";
import styles from "@/styles/rotatingText.module.css"; // assuming you already created it

export default function Home() {
  const [missionIndex, setMissionIndex] = useState(0);
  const [purposeIndex, setPurposeIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);

      setTimeout(() => {
        setMissionIndex((prev) => (prev + 1) % missions.length);
        setPurposeIndex((prev) => (prev + 1) % purposes.length);
        setFade(false);
      }, 1000); // fade out duration
    }, 6000); // total cycle every 6 seconds

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
      <h1
        className={`text-4xl sm:text-6xl font-extrabold text-center leading-tight max-w-5xl tracking-tight bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg transition-all duration-1000 ${styles.fadeText} ${
          fade ? styles.fadeOut : ""
        }`}
        dangerouslySetInnerHTML={{
          __html: `"${missions[missionIndex].replace(
            /trust/g,
            "<span class='text-green-400 font-bold animate-pulse'>trust</span>"
          )}"`,
        }}
      />

      {/* Rotating Core Purpose */}
      <p
        className={`text-center max-w-xl text-gray-300 text-lg transition-all duration-1000 ${styles.fadeText} ${
          fade ? styles.fadeOut : ""
        }`}
      >
        {purposes[purposeIndex]}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <a href="/why" className="px-5 py-2 rounded-xl bg-white text-black font-medium flex items-center gap-2 hover:bg-gray-100 transition">
          🌱 Why We Exist
        </a>
        <a href="/how" className="px-5 py-2 rounded-xl bg-black border border-white font-medium flex items-center gap-2 hover:bg-white hover:text-black transition">
          🛠 How We Work
        </a>
        <a href="/what" className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-medium flex items-center gap-2 hover:bg-emerald-700 transition">
          🌍 What We Offer
        </a>
        <a
          href="https://blog.zentrust.world"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 rounded-xl bg-purple-600 text-white font-medium flex items-center gap-2 hover:bg-purple-700 transition"
        >
          ✍️ Read Blog
        </a>
      </div>

      {/* Sacred Whisper */}
      <p className="text-center italic text-blue-200 mt-10 text-sm sm:text-base">
        "Reclaiming trust in the soil, the soul, and the sacred web of life."
      </p>

      {/* Begin Journey */}
      <BeginJourneyButton />
    </div>
  );
}
