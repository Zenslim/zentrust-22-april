export default function Page() {
  return (
    <>
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

        <div className="max-w-2xl space-y-4 text-center">
          <p>Effective Date: April 26, 2025</p>

          <p>Welcome to ZenTrust. By using our platform, you agree to these Terms of Service.</p>

          <p>
            <strong>Use of Services:</strong> You agree to use ZenTrust only for lawful purposes and in a way that does not
            infringe the rights of others.
          </p>

          <p>
            <strong>Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your login
            credentials and for all activities that occur under your account.
          </p>

          <p>
            <strong>Intellectual Property:</strong> All content provided by ZenTrust is protected by copyright and intellectual
            property laws.
          </p>

          <p>
            <strong>Termination:</strong> We reserve the right to suspend or terminate your access to ZenTrust at our
            discretion, without notice, if you violate these terms.
          </p>

          <p>
            <strong>Disclaimer:</strong> ZenTrust is provided "as is" without warranties of any kind. Use at your own risk.
          </p>

          <p>
            <strong>Changes:</strong> We may update these Terms from time to time. Continued use of ZenTrust means you accept
            the updated terms.
          </p>

          <p className="text-gray-500 text-sm mt-6">
            ZenTrust, Inc. is a 501(c)(3) nonprofit (EIN: 33-4318487).
            Donations are tax-deductible as allowed by law.
          </p>

          <p className="pt-4">
            Questions? Contact us at: <a href="mailto:hello@zentrust.world" className="text-blue-600 underline">hello@zentrust.world</a>
          </p>
        </div>
      </div>
    </>
  );
}
