const seoDescription =
  "Support ZenTrust, a 501(c)(3) public charity advancing regenerative agriculture, ecological restoration, and holistic wellness through research, education, and community-based programs.";

// TODO: Convert /donate metadata to App Router metadata API.

export default function Page() {
  return (
    <>
      <main className="min-h-screen bg-black text-white px-4 py-12 flex flex-col items-center">
        <div className="w-full max-w-3xl space-y-8">
          <header className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-semibold">Donate to ZenTrust</h1>
            <p className="text-gray-300 text-base sm:text-lg">
              ZenTrust, Inc. is a {" "}
              <strong>501(c)(3) public charity (EIN 33-4318487)</strong>.
              Your donation helps advance regenerative agriculture, ecological
              restoration, and holistic wellness education. All contributions
              are tax-deductible as allowed by law and are reinvested into
              public-benefit programs.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">How Your Gift Helps</h2>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>Support regenerative agriculture pilots and ecosystem restoration.</li>
              <li>Fund open-access research and educational resources.</li>
              <li>Provide training and tools to communities in need.</li>
              <li>Strengthen holistic wellness initiatives grounded in science and traditional knowledge.</li>
            </ul>
          </section>

          {/* Simple “Choose a method” section – replace placeholders with real systems when ready */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Ways to Donate</h2>

            <div className="space-y-3 bg-gray-900 rounded-xl p-5">
              <h3 className="text-xl font-semibold">1. Online Donation</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                We are in the process of integrating a secure online donation
                system. In the meantime, please contact us and we will share
                simple, secure options for giving (credit card / bank transfer).
              </p>
              <a
                href="mailto:hello@zentrust.world?subject=Donation%20Inquiry%20-%20ZenTrust"
                className="inline-flex px-5 py-2.5 rounded-xl bg-emerald-500 font-semibold hover:bg-emerald-600 transition"
              >
                Email Us About Donating
              </a>
            </div>

            <div className="space-y-3 bg-gray-900 rounded-xl p-5">
              <h3 className="text-xl font-semibold">2. Bank Transfer / Check (By Request)</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                If you prefer to donate via direct bank transfer or check, please
                email {" "}
                <a href="mailto:hello@zentrust.world" className="underline hover:text-white">
                  hello@zentrust.world
                </a>{" "}
                and we will provide the official donation details and
                acknowledgment instructions.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Donor Rights &amp; Transparency</h2>
            <p className="text-gray-300 text-sm sm:text-base">
              ZenTrust is committed to transparency, accountability, and
              stewarding every gift in alignment with our charitable mission.
              To learn more, please review our {" "}
              <a href="/donor-rights" className="underline hover:text-white">
                Donor Rights &amp; Refund Policy
              </a>{" "}
              as well as our {" "}
              <a href="/privacy" className="underline hover:text-white">
                Privacy Policy
              </a>{" "}
              and {" "}
              <a href="/terms" className="underline hover:text-white">
                Terms of Service
              </a>
              .
            </p>
          </section>

          <footer className="text-xs text-gray-400 border-t border-gray-800 pt-4 mt-6">
            <p>
              ZenTrust, Inc. is a federally recognized 501(c)(3) public charity.
              EIN: 33-4318487. Contributions are tax-deductible to the fullest extent allowed by law.
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
