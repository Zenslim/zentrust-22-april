"use client";

import { useState } from "react";
import { useSwipeable } from "react-swipeable";

import BeginJourneyButton from "@/components/BeginJourneyButton";
import { missions, purposes } from "@/data/missionPurpose";

type Article = {
  title: string;
  link: string;
  description: string;
};

export default function Page({ articles = [] }: { articles?: Article[] }) {
  const [missionIndex, setMissionIndex] = useState(0);
  const [purposeIndex, setPurposeIndex] = useState(0);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setMissionIndex((prev) => (prev + 1) % missions.length);
      setPurposeIndex((prev) => (prev + 1) % purposes.length);
    },
    onSwipedRight: () => {
      setMissionIndex((prev) => (prev - 1 + missions.length) % missions.length);
      setPurposeIndex((prev) => (prev - 1 + purposes.length) % purposes.length);
    },
    trackMouse: true,
  });

  return (
    <>
      {/* ---------------------------- */}
      {/* HERO SECTION — NO HEADER HERE */}
      {/* ---------------------------- */}

      <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-12 space-y-10">
        {/* Logo removed — global header already includes it */}

        {/* Main Title */}
        <div className="w-full max-w-4xl text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
            Healing Land. Uplifting Communities.
            <br />
            Advancing Regenerative Science.
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
            ZenTrust is a{" "}
            <strong>501(c)(3) public charity (EIN 33-4318487)</strong>{" "}
            advancing regenerative agriculture, ecological restoration, and
            holistic wellness through scientific research, public education,
            and community-based programs.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a
              href="/donate"
              className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
            >
              💚 Donate to Regeneration
            </a>

            <a
              href="/about"
              className="px-6 py-2.5 rounded-xl bg-white text-black font-medium hover:bg-gray-100 transition"
            >
              ℹ️ About ZenTrust
            </a>

            <a
              href="/contact"
              className="px-6 py-2.5 rounded-xl border border-white font-medium hover:bg-white hover:text-black transition"
            >
              📬 Contact Us
            </a>
          </div>
        </div>

        {/* Mission Slider */}
        <section className="w-full max-w-xl text-center" {...swipeHandlers}>
          <h2
            className="text-2xl sm:text-3xl font-semibold text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-500 bg-clip-text"
            dangerouslySetInnerHTML={{
              __html: `"${missions[missionIndex].replace(
                /trust/gi,
                "<span class='text-green-400 font-bold'>trust</span>"
              )}"`,
            }}
          />
          <p className="text-gray-400 italic text-sm">{purposes[purposeIndex]}</p>
        </section>

        {/* Why / How / What / Blog */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <a href="/why" className="px-5 py-2 bg-white text-black rounded-xl">
            🌱 Why Our Work Matters
          </a>

          <a
            href="/how"
            className="px-5 py-2 bg-black border border-white rounded-xl hover:bg-white hover:text-black"
          >
            ⚙️ How We Create Impact
          </a>

          <a
            href="/what"
            className="px-5 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700"
          >
            🌍 Programs & Initiatives
          </a>

          <a
            href="https://zentrust.hashnode.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
          >
            📚 Blog & Research
          </a>
        </div>

        <p className="text-blue-200 italic text-center max-w-xl">
          "Rebuilding trust between people, land, and future generations —
          through science, education, and regenerative practice."
        </p>

        <BeginJourneyButton />

        {/* Blog Section */}
        <section className="w-full max-w-5xl py-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
            Latest from the ZenTrust Blog
          </h2>

          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {articles.length ? (
              articles.map((a, i) => (
                <a
                  key={i}
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition max-w-md"
                >
                  <h3 className="text-xl font-semibold">{a.title}</h3>
                  <p className="text-gray-400 mt-2">
                    {a.description?.slice(0, 120)}...
                  </p>
                </a>
              ))
            ) : (
              <p className="text-center text-gray-400">
                Blog updates coming soon. Visit{" "}
                <a
                  href="https://zentrust.hashnode.dev"
                  target="_blank"
                  className="underline hover:text-white"
                >
                  our Hashnode blog
                </a>
                .
              </p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

// TODO: Convert legacy data-fetching logic to App Router format.
