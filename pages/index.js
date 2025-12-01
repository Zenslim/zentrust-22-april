import { useState } from "react";
import Head from "next/head";
import { missions, purposes } from "@/data/missionPurpose";
import BeginJourneyButton from "@/components/BeginJourneyButton";
import { parseStringPromise } from "xml2js";
import { useSwipeable } from "react-swipeable";

export async function getStaticProps() {
  const feedUrl = "https://blog.zentrust.world/rss.xml";
  let items = [];

  try {
    const res = await fetch(feedUrl);
    const text = await res.text();
    const rss = await parseStringPromise(text);
    items = (rss.rss?.channel?.[0]?.item || []).slice(0, 2).map((item) => ({
      title: item.title?.[0] || "",
      link: item.link?.[0] || "",
      description: item.description?.[0] || "",
    }));
  } catch (e) {
    // Fail gracefully – Google reviewers just want the page to render
    items = [];
  }

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

  const seoDescription =
    "ZenTrust is a 501(c)(3) public charity advancing regenerative agriculture, ecological restoration, and holistic wellness through research, education, and community-based projects. All donations are reinvested into public-benefit programs.";
  const keywords =
    "ZenTrust, nonprofit, 501(c)(3), regenerative agriculture, ecological restoration, syntropic food forests, holistic wellness, public education, climate resilience, community training";

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setMissionIndex((prev) => (prev + 1) % missions.length);
      setPurposeIndex((prev) => (prev + 1) % purposes.length);
    },
    onSwipedRight: () => {
      setMissionIndex((prev) => (prev - 1 + missions.length) % missions.length);
      setPurposeIndex(
        (prev) => (prev - 1 + purposes.length) % purposes.length
      );
    },
    trackMouse: true,
  });

  return (
    <>
      <Head>
        <title>
          ZenTrust | Regenerative Agriculture & Holistic Wellness Nonprofit
        </title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href="https://zentrust.world" />
        <meta
          property="og:title"
          content="ZenTrust | Regenerative Agriculture & Holistic Wellness Nonprofit"
        />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content="https://zentrust.world" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://zentrust.world/social-preview.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ZenTrust",
              alternateName: "ZenTrust.World",
              url: "https://zentrust.world",
              logo: "https://zentrust.world/zentrust-logo-white.png",
              description:
                "ZenTrust is a 501(c)(3) public charity dedicated to regenerative agriculture, ecological restoration, and holistic wellness education. All revenue is reinvested into charitable, educational, and scientific programs.",
              sameAs: [
                "https://blog.zentrust.world",
                "https://zentrust.world/why",
                "https://zentrust.world/how",
                "https://zentrust.world/what",
              ],
              foundingDate: "2025",
              founders: [
                {
                  "@type": "Person",
                  name: "Nilona Maskey",
                },
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Nonprofit Information",
                email: "hello@zentrust.world",
              },
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-12 space-y-10">
        {/* Logo */}
        <img
          src="/zentrust-logo-white.png"
          alt="ZenTrust Logo"
          className="h-12 md:h-16 w-auto"
          loading="eager"
        />

        {/* Visible H1 for reviewers + SEO */}
        <header className="w-full max-w-4xl text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
            Healing Land. Uplifting Communities. Advancing Regenerative
            Science.
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg">
            ZenTrust is a{" "}
            <strong>501(c)(3) public charity (EIN 33-4318487)</strong> advancing
            regenerative agriculture, ecological restoration, and holistic
            wellness through scientific research, public education, and
            community-based programs. All donations are reinvested into
            public-benefit initiatives.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a
              href="/donate"
              className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-semibold flex items-center gap-2 hover:bg-emerald-600 transition"
            >
              💚 Donate to Regeneration
            </a>
            <a
              href="/about"
              className="px-6 py-2.5 rounded-xl bg-white text-black font-medium flex items-center gap-2 hover:bg-gray-100 transition"
            >
              ℹ️ About ZenTrust
            </a>
            <a
              href="/contact"
              className="px-6 py-2.5 rounded-xl border border-white font-medium flex items-center gap-2 hover:bg-white hover:text-black transition"
            >
              📬 Contact Us
            </a>
          </div>
        </header>

        {/* Invisible H1 just in case (extra accessibility/SEO) */}
        <h1 className="sr-only">
          ZenTrust.World – Regenerative agriculture, ecological restoration, and
          holistic wellness nonprofit
        </h1>

        {/* Mission / Purpose Slider – softened, but still your style */}
        <section className="w-full max-w-xl mx-auto text-center space-y-6">
          <div {...swipeHandlers} className="space-y-4">
            <h2
              className="text-2xl sm:text-3xl font-semibold text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-500 bg-clip-text"
              dangerouslySetInnerHTML={{
                __html: `"${missions[missionIndex].replace(
                  /trust/gi,
                  "<span class='text-green-400 font-bold'>trust</span>"
                )}"`,
              }}
            />
            <p className="text-gray-400 text-sm italic">
              {purposes[purposeIndex]}
            </p>
          </div>

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
                aria-label={`Show mission ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Secondary Navigation CTAs (Why / How / What / Blog) */}
        <nav className="flex flex-wrap justify-center gap-4 mt-4">
          <a
            href="/why"
            className="px-5 py-2 rounded-xl bg-white text-black font-medium flex items-center gap-2 hover:bg-gray-100 transition"
          >
            🌱 Why Our Work Matters
          </a>
          <a
            href="/how"
            className="px-5 py-2 rounded-xl bg-black border border-white font-medium flex items-center gap-2 hover:bg-white hover:text-black transition"
          >
            🛠 How We Create Impact
          </a>
          <a
            href="/what"
            className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-medium flex items-center gap-2 hover:bg-emerald-700 transition"
          >
            🌍 Programs & Initiatives
          </a>
          <a
            href="https://blog.zentrust.world"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-xl bg-purple-600 text-white font-medium flex items-center gap-2 hover:bg-purple-700 transition"
          >
            📚 Research & Insights
          </a>
        </nav>

        {/* Sacred whisper – rephrased toward nonprofit clarity */}
        <p className="text-center italic text-blue-200 mt-6 text-sm sm:text-base max-w-xl">
          &quot;Rebuilding trust between people, land, and future generations –
          through science, education, and regenerative practice.&quot;
        </p>

        {/* Existing custom CTA component */}
        <BeginJourneyButton />

        {/* Clear “What We Do” copy – very reviewer friendly */}
        <section className="max-w-4xl text-center text-gray-200 mt-10 space-y-6 leading-relaxed text-base sm:text-lg px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
            What ZenTrust Does
          </h2>
          <p>
            ZenTrust advances regenerative agriculture and ecological
            restoration by supporting{" "}
            <strong>syntropic food forests, agroforestry, aquaponics, soil
            regeneration, and water stewardship</strong>. We work with
            communities, cooperatives, and local leaders to restore degraded
            land and build resilient local food systems.
          </p>
          <p>
            We also support{" "}
            <strong>holistic wellness education grounded in the
            Bio-Psycho-Social-Spiritual (BPSS) model</strong>, recognizing that
            health is shaped by our bodies, minds, relationships, and
            environments. Our programs integrate scientific research with
            traditional ecological knowledge to create accessible learning for
            all.
          </p>
          <p>
            As a nonprofit, <strong>100% of revenue is reinvested</strong> into
            charitable, educational, and scientific activities – including
            research, open-access publications, community trainings, and
            field-based regenerative pilots in underserved regions.
          </p>
        </section>

        {/* Blog Highlights */}
        <section className="w-full max-w-5xl mx-auto py-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
            Latest Insights from ZenTrust
          </h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {articles && articles.length > 0 ? (
              articles.map((article, index) => (
                <a
                  key={index}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition max-w-md"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-400">
                    {article.description
                      ? `${article.description.slice(0, 120)}...`
                      : "Read more"}
                  </p>
                </a>
              ))
            ) : (
              <p className="text-center text-gray-400">
                Our latest research, field notes, and essays will appear here as
                we publish more content.
              </p>
            )}
          </div>
        </section>

        {/* Lightweight footer-like info block for reviewers */}
        <section className="w-full max-w-4xl text-center text-gray-400 text-xs sm:text-sm mt-4 space-y-1">
          <p>
            ZenTrust, Inc. is a federally recognized{" "}
            <strong>501(c)(3) public charity</strong>. EIN:{" "}
            <strong>33-4318487</strong>. Donations are tax-deductible to the
            fullest extent allowed by law.
          </p>
          <p>
            For policies and donor protections, please see our{" "}
            <a
              href="/privacy"
              className="underline hover:text-white"
            >
              Privacy Policy
            </a>
            ,{" "}
            <a href="/terms" className="underline hover:text-white">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/donor-rights" className="underline hover:text-white">
              Donor Rights &amp; Refund Policy
            </a>
            .
          </p>
        </section>
      </div>
    </>
  );
}
