export default function Page() {
  return (
    <>
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-6">Donor Rights & Refund Policy</h1>

        <div className="max-w-2xl space-y-4 text-center">
          <p>Effective Date: April 26, 2025</p>

          <h2 className="text-xl font-semibold mt-6">Your Rights as a Donor</h2>
          <ul className="list-disc text-left ml-6 space-y-2">
            <li>To know that ZenTrust, Inc. is a 501(c)(3) nonprofit (EIN: 33-4318487).</li>
            <li>To receive a written acknowledgment / IRS-compliant tax receipt for your donation.</li>
            <li>To be assured that donations are used exclusively for charitable, educational, and scientific purposes in line with our mission.</li>
            <li>To request privacy regarding your contribution; we do not sell, rent, or trade donor data.</li>
            <li>To ask questions about how your donation is managed and receive timely, transparent answers.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6">Refund Policy</h2>
          <p>
            Donations to ZenTrust, Inc. are considered final. However, if you made a donation in error,
            please contact us within <strong>48 hours</strong> of the transaction. Refunds may be granted
            at the sole discretion of ZenTrust if the funds have not yet been allocated.
          </p>

          <h2 className="text-xl font-semibold mt-6">How to Request a Refund</h2>
          <p>
            Email us at{" "}
            <a
              href="mailto:hello@zentrust.world"
              className="text-blue-600 underline"
            >
              hello@zentrust.world
            </a>{" "}
            with your full name, donation date, amount, and method of payment. We will confirm receipt
            of your request and respond within 7 business days.
          </p>

          <h2 className="text-xl font-semibold mt-6">Transparency & Trust</h2>
          <p>
            ZenTrust, Inc. is committed to transparency, accountability, and stewardship of every dollar.
            All donations are reinvested into mission-driven programs in regenerative agriculture,
            ecological restoration, and holistic wellness.
          </p>

          <p className="pt-6 text-gray-500 text-sm">
            ZenTrust, Inc. is a 501(c)(3) nonprofit (EIN: 33-4318487).
            Donations are tax-deductible to the fullest extent allowed by law.
          </p>
        </div>
      </div>
    </>
  );
}
