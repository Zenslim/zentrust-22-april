import Head from "next/head";

export default function About() {
  const seoDescription =
    "Learn about ZenTrust, a 501(c)(3) public charity dedicated to regenerative agriculture, ecological restoration, and holistic wellness through research, education, and community-based initiatives.";

  return (
    <>
      <Head>
        <title>About ZenTrust | Our Mission & Story</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href="https://www.zentrust.world/about" />
        <meta
          property="og:title"
          content="About ZenTrust | Regenerative Agriculture & Holistic Wellness Nonprofit"
        />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content="https://www.zentrust.world/about" />
        <meta property="og:type" content="website" />
      </Head>

      <main className="min-h-screen bg-black text-white px-4 py-12 flex flex-col items-center">
        <article className="w-full max-w-3xl space-y-8">
          <header className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-semibold">
              About ZenTrust
            </h1>
            <p className="text-gray-300 text-base sm:text-lg">
              ZenTrust, Inc. is a{" "}
              <strong>501(c)(3) public charity (EIN 33-4318487)</strong>{" "}
              dedicated to advancing regenerative agriculture, ecological
              restoration, and holistic wellness through research, education,
              and community-based programs.
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Our Purpose</h2>
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              We exist to help communities heal land, restore ecosystems, and
              cultivate wellbeing. ZenTrust integrates regenerative agriculture,
              climate resilience, and holistic health frameworks to support a
              future where people and nature can thrive together.
            </p>
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              Our work is grounded in the Bio-Psycho-Social-Spiritual (BPSS)
              perspective: recognizing that true wellbeing is shaped by our
              bodies, minds, relationships, and environments.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">What We Do</h2>
            <ul className="list-disc list-inside text-gray-200 space-y-2 text-sm sm:text-base">
              <li>
                <strong>Regenerative Agriculture & Ecosystem Restoration</strong>{" "}
                – supporting syntropic food forests, agroforestry, aquaponics,
                soil regeneration, and water-wise design.
              </li>
              <li>
                <strong>Scientific Research & Public Education</strong> – funding
                and sharing open-access research on climate resilience, land
                restoration, and integrative health.
              </li>
              <li>
                <strong>Community Training & Vocational Programs</strong> –
                equipping communities, especially in underserved regions, with
                practical skills for regenerative livelihoods.
              </li>
              <li>
                <strong>Holistic Wellness & Healing Ecosystems</strong> –
                supporting evidence-based, community-centered wellness models.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">How We Use Resources</h2>
            <p className="text-gray-200 text-sm sm:text-base">
              ZenTrust reinvests <strong>100% of revenue</strong> into
              charitable, educational, and scientific programs. There are no
              profits distributed to private individuals. Our Board of Directors
              oversees financial stewardship, conflict-of-interest safeguards,
              and alignment with our nonprofit mission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Who We Work With</h2>
            <p className="text-gray-200 text-sm sm:text-base">
              We collaborate with communities, cooperatives, nonprofits,
              researchers, and institutions who share a commitment to
              regeneration and public benefit. Our partnerships emphasize
              transparency, local leadership, and long-term ecological and
              social resilience.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Get Involved</h2>
            <p className="text-gray-200 text-sm sm:text-base">
              If you resonate with our mission, there are many ways to
              participate:
            </p>
            <ul className="list-disc list-inside text-gray-200 space-y-1 text-sm sm:text-base">
              <li>Support our work through a tax-deductible donation.</li>
              <li>Partner on regenerative projects or research.</li>
              <li>Share knowledge, tools, or skills that advance regeneration.</li>
            </ul>
            <p className="text-gray-200 text-sm sm:text-base">
              To explore collaboration or learn more, visit our{" "}
              <a href="/contact" className="underline hover:text-white">
                Contact
              </a>{" "}
              page or email{" "}
              <a
                href="mailto:hello@zentrust.world"
                className="underline hover:text-white"
              >
                hello@zentrust.world
              </a>
              .
            </p>
          </section>

          <footer className="text-xs text-gray-400 border-t border-gray-800 pt-4 mt-6">
            <p>
              ZenTrust, Inc. is a federally recognized 501(c)(3) public charity.
              EIN: 33-4318487. For more details on our governance and donor
              protections, please see our{" "}
              <a href="/donor-rights" className="underline hover:text-white">
                Donor Rights &amp; Refund Policy
              </a>
              ,{" "}
              <a href="/privacy" className="underline hover:text-white">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/terms" className="underline hover:text-white">
                Terms of Service
              </a>
              .
            </p>
          </footer>
        </article>
      </main>
    </>
  );
}
