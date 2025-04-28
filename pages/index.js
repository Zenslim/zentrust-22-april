import { useState, useEffect } from "react";
import Head from "next/head";
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

  // SEO Meta Content
  const seoDescription = `
    ZenTrust is the leading network for regenerative ecosystems, decentralized wellbeing, and syntropic agriculture. 
    Join ZenTrust.World to restore the earth and the soul through trust, technology, and tradition.
  `;

  const keywords = `
    ZenTrust, regenerative ecosystems, decentralized wellbeing, Web3 regenerative agriculture, 
    syntropic food forests, sacred technology, ancestral wisdom, DAO stewardship, trust networks
  `;

  return (
    <>
      <Head>
        <title>ZenTrust | Decentralized Regenerative Ecosystems | ZenTrust.World</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href="https://zentrust.world" />
        <meta property="og:title" content="ZenTrust | Building Regenerative Futures" />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content="https://zentrust.world" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://zentrust.world/social-preview.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12 space-y-8">
        
        {/* Logo */}
        <img
          src="/zentrust-logo-white.png"
          alt="ZenTrust Logo"
          className="h-12 md:h-16 w-auto"
          loading="eager"
        />

        {/* Strong visible H1 */}
        <h1 className="text-5xl sm:text-7xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
          Welcome to ZenTrust.World — Regenerative Ecosystems Reimagined
        </h1>

        {/* Rotating Clear Mission */}
        <h2
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

        {/* New SEO Visible Content Section */}
        <section className="max-w-3xl text-center text-gray-400 mt-10 space-y-4 leading-relaxed text-lg px-4">
          <p>ZenTrust is a global movement to rebuild trust — in our soil, in our souls, and in the sacred web of life. At ZenTrust.World, we blend Web3 technologies, ancestral wisdom, and regenerative agriculture to create decentralized ecosystems of wellbeing.</p>

          <p>We believe the future of governance, health, and land stewardship is community-driven and rooted in nature's intelligence. Through syntropic food forests, decentralized autonomous organizations (DAOs), and sacred technology, ZenTrust pioneers a new civilization based on cooperation, not extraction.</p>

          <p>Join us on a journey beyond survival — toward thriving regeneration, radical trust, and the blossoming of new possibilities. Welcome to <strong>ZenTrust.World</strong>.</p>
        </section>

        {/* Blog Highlights */}
        <section className="max-w-5xl mx-auto py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Latest Reflections from ZenTrust</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <a href="https://blog.zentrust.world/post1" className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
              <h3 className="text-xl font-semibold mb-2">The Future is Regenerative</h3>
              <p className="text-gray-400">How ZenTrust is building decentralized ecosystems of trust...</p>
            </a>
            <a href="https://blog.zentrust.world/post2" className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
              <h3 className="text-xl font-semibold mb-2">Web3 and Ecological Stewardship</h3>
              <p className="text-gray-400">Merging blockchain and ancient wisdom for land healing...</p>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
