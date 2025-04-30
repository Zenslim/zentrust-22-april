import { useState } from "react";
import Head from "next/head";
import { missions, purposes } from "@/data/missionPurpose";
import BeginJourneyButton from "@/components/BeginJourneyButton";
import { parseStringPromise } from "xml2js";
import { useSwipeable } from "react-swipeable";

export async function getStaticProps() {
  const feedUrl = "https://blog.zentrust.world/rss.xml";
  const res = await fetch(feedUrl);
  const text = await res.text();

  const rss = await parseStringPromise(text);
  const items = (rss.rss?.channel?.[0]?.item || []).slice(0, 2).map(item => ({
    title: item.title?.[0] || "",
    link: item.link?.[0] || "",
    description: item.description?.[0] || "",
  }));

  return {
    props: {
      articles: items,
    },
    revalidate: 3600,
  };
}

export default function Home({ articles }) {
  const [missionIndex, setMissionIndex] = useState(0);
  const [purposeIndex, setPurposeIndex] = useState(0);

  const seoDescription = `
    ZenTrust is the leading network for regenerative ecosystems, decentralized wellbeing, and syntropic agriculture. 
    Join ZenTrust.World to restore the earth and the soul through trust, technology, and tradition.
  `;
  const keywords = `
    ZenTrust, regenerative ecosystems, decentralized wellbeing, Web3 regenerative agriculture, 
    syntropic food forests, sacred technology, ancestral wisdom, DAO stewardship, trust networks
  `;

  const missionSwipeHandlers = useSwipeable({
    onSwipedLeft: () => setMissionIndex((prev) => (prev + 1) % missions.length),
    onSwipedRight: () => setMissionIndex((prev) => (prev - 1 + missions.length) % missions.length),
    trackMouse: true,
  });

  const purposeSwipeHandlers = useSwipeable({
    onSwipedLeft: () => setPurposeIndex((prev) => (prev + 1) % purposes.length),
    onSwipedRight: () => setPurposeIndex((prev) => (prev - 1 + purposes.length) % purposes.length),
    trackMouse: true,
  });

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
        
    <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ZenTrust",
      "alternateName": "ZenTrust.World",
      "url": "https://zentrust.world",
      "logo": "https://zentrust.world/zentrust-logo-white.png",
      "description": "ZenTrust is a regenerative ecosystem network blending Web3, syntropic agriculture, and ancestral wisdom to rebuild trust in soil, soul, and society.",
      "sameAs": [
        "https://blog.zentrust.world",
        "https://zentrust.world/why",
        "https://zentrust.world/how",
        "https://zentrust.world/what"
      ],
      "foundingDate": "2025",
      "founders": [{
        "@type": "Person",
        "name": "Nilona Maskey"
      }],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "email": "hello@zentrust.world"
      }
    }),
  }}
/>
      </Head>

      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12 space-y-8">

        {/* Logo */}
        <img
          src="/zentrust-logo-white.png"
          alt="ZenTrust Logo"
          className="h-12 md:h-16 w-auto"
          loading="eager"
        />

        {/* Invisible H1 */}
        <h1 className="sr-only">Welcome to ZenTrust.World — Regenerative Ecosystems Reimagined</h1>

      {/* Refined Quote Slider */}
<div className="w-full max-w-xl mx-auto text-center space-y-6">
  <div
    {...useSwipeable({
      onSwipedLeft: () => {
        setMissionIndex((prev) => (prev + 1) % missions.length);
        setPurposeIndex((prev) => (prev + 1) % purposes.length);
      },
      onSwipedRight: () => {
        setMissionIndex((prev) => (prev - 1 + missions.length) % missions.length);
        setPurposeIndex((prev) => (prev - 1 + purposes.length) % purposes.length);
      },
      trackMouse: true,
    })}
    className="space-y-4"
  >
    <h2
      className="text-2xl sm:text-3xl font-semibold text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-500 bg-clip-text"
      dangerouslySetInnerHTML={{
        __html: `"${missions[missionIndex].replace(
          /trust/g,
          "<span class='text-green-400 font-bold animate-pulse'>trust</span>"
        )}"`,
      }}
    />
    <p className="text-gray-400 text-sm italic">
      {purposes[purposeIndex]}
    </p>
  </div>

  {/* Dots - Zen style */}
  <div className="flex justify-center gap-1 mt-2">
    {missions.map((_, i) => (
      <button
        key={i}
        onClick={() => {
          setMissionIndex(i);
          setPurposeIndex(i);
        }}
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          i === missionIndex
            ? "bg-white scale-110 shadow-md"
            : "bg-gray-500 opacity-40"
        }`}
      />
    ))}
  </div>
</div>
        {/* CTA Buttons */}
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
          <a href="https://blog.zentrust.world" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2 rounded-xl bg-purple-600 text-white font-medium flex items-center gap-2 hover:bg-purple-700 transition">
            🌿 Our Insights
          </a>
        </div>

        {/* Sacred Whisper */}
        <p className="text-center italic text-blue-200 mt-10 text-sm sm:text-base">
          "Reclaiming trust in the soil, the soul, and the sacred web of life."
        </p>

        <BeginJourneyButton />

        {/* SEO Visible Text */}
        <section className="max-w-3xl text-center text-gray-400 mt-10 space-y-4 leading-relaxed text-lg px-4">
          <p>ZenTrust is a global movement to rebuild trust — in our soil, in our souls, and in the sacred web of life. At ZenTrust.World, we blend Web3 technologies, ancestral wisdom, and regenerative agriculture to create decentralized ecosystems of wellbeing.</p>
          <p>We believe the future of governance, health, and land stewardship is community-driven and rooted in nature's intelligence. Through syntropic food forests, decentralized autonomous organizations (DAOs), and sacred technology, ZenTrust pioneers a new civilization based on cooperation, not extraction.</p>
          <p>Join ZenTrust on a journey beyond survival — toward thriving regeneration, radical trust, and the blossoming of new possibilities. Welcome to <strong>ZenTrust.World</strong>.</p>
        </section>

        {/* Blog Highlights */}
        <section className="max-w-5xl mx-auto py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Latest Insights from ZenTrust</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <a key={index} href={article.link} target="_blank" rel="noopener noreferrer"
                  className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition max-w-md">
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-400">{article.description?.slice(0, 100)}...</p>
                </a>
              ))
            ) : (
              <p className="text-center text-gray-400">Loading latest insights...</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
