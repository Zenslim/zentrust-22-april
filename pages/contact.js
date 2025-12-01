import Head from "next/head";

export default function Contact() {
  const seoDescription =
    "Contact ZenTrust to learn more about our regenerative agriculture, ecological restoration, and holistic wellness initiatives, or to explore donations and partnerships.";

  return (
    <>
      <Head>
        <title>Contact ZenTrust</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href="https://www.zentrust.world/contact" />
        <meta property="og:title" content="Contact ZenTrust" />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content="https://www.zentrust.world/contact" />
        <meta property="og:type" content="website" />
      </Head>

      <main className="min-h-screen bg-black text-white px-4 py-12 flex flex-col items-center">
        <div className="w-full max-w-3xl space-y-8">
          <header className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-semibold">
              Contact ZenTrust
            </h1>
            <p className="text-gray-300 text-base sm:text-lg">
              We welcome questions, collaboration ideas, and donor inquiries.
              Whether you are an individual, a community leader, a researcher,
              or an institution, we are glad to connect.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Primary Contact</h2>
            <div className="bg-gray-900 rounded-xl p-5 space-y-2 text-sm sm:text-base text-gray-200">
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:hello@zentrust.world"
                  className="underline hover:text-white"
                >
                  hello@zentrust.world
                </a>
              </p>
              <p>
                <strong>Organization:</strong> ZenTrust, Inc.
              </p>
              <p>
                <strong>Nonprofit Status:</strong> 501(c)(3) public charity
                (EIN 33-4318487)
              </p>
              <p className="text-xs text-gray-400">
                Please do not include sensitive personal information in your
                first email. We will follow up with any further details needed.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Reasons to Reach Out</h2>
            <ul className="list-disc list-inside text-gray-200 space-y-1 text-sm sm:text-base">
              <li>General questions about ZenTrust’s mission and programs</li>
              <li>Donations, sponsorships, or grant support</li>
              <li>Partnerships on regenerative or wellness projects</li>
              <li>Media, research, or speaking inquiries</li>
              <li>Volunteer or collaboration opportunities</li>
            </ul>
          </section>

          {/* Optional simple contact CTA – no real form yet, but reviewers see clear path */}
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Send Us a Message</h2>
            <p className="text-gray-200 text-sm sm:text-base">
              Click below to draft an email to our team. Share who you are, how
              you’d like to engage, and any context that will help us respond.
            </p>
            <a
              href="mailto:hello@zentrust.world?subject=Contact%20-%20ZenTrust"
              className="inline-flex px-6 py-2.5 rounded-xl bg-emerald-500 font-semibold hover:bg-emerald-600 transition"
            >
              📬 Email ZenTrust
            </a>
          </section>

          <footer className="text-xs text-gray-400 border-t border-gray-800 pt-4 mt-6">
            <p>
              ZenTrust, Inc. is a federally recognized 501(c)(3) public charity.
              EIN: 33-4318487. By contacting us, you agree to our{" "}
              <a href="/privacy" className="underline hover:text-white">
                Privacy Policy
              </a>
              .
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
