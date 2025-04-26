import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();

  const signInWithEmail = () => {
    router.push("/signin/email");
  };

  const signInWithGoogle = () => {
    // trigger Google auth flow
  };

  const signInWithFacebook = () => {
    // trigger Facebook auth flow
  };

  const signInWithApple = () => {
    // trigger Apple auth flow
  };

  const connectWallet = () => {
    // trigger WalletConnect flow
  };

  const enterDemoMode = () => {
    router.push("/demo");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        🌟 Welcome to ZenTrust
      </h1>

      <div className="flex flex-col gap-4 w-full max-w-sm">

        {/* Primary Email Button */}
        <button
          onClick={signInWithEmail}
          className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-md transition"
        >
          📧 Sign in with Email
        </button>

        {/* Social Buttons */}
        <button
          onClick={signInWithGoogle}
          className="bg-white hover:bg-gray-100 text-gray-800 py-3 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-md transition"
        >
          🔑 Continue with Google
        </button>

        <button
          onClick={signInWithFacebook}
          className="bg-white hover:bg-gray-100 text-gray-800 py-3 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-md transition"
        >
          👥 Continue with Facebook
        </button>

        <button
          onClick={signInWithApple}
          className="bg-white hover:bg-gray-100 text-gray-800 py-3 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-md transition"
        >
          🍎 Continue with Apple
        </button>

        {/* Wallet Connect */}
        <button
          onClick={connectWallet}
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 text-white py-3 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-md transition"
        >
          🦋 Connect Wallet (Web3)
        </button>

      </div>

      {/* Explore Demo Mode */}
      <div className="mt-8">
        <button
          onClick={enterDemoMode}
          className="bg-yellow-200 hover:bg-yellow-300 text-black py-2 px-6 rounded-full font-medium text-md flex items-center justify-center gap-2 shadow-sm transition"
        >
          🌱 Explore Demo Mode
        </button>
      </div>

    </div>
  );
}
