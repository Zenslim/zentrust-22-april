
// FloatingPrompt.jsx — Rotating cosmic prompt

export default function FloatingPrompt({ prompt }) {
  return (
    <div className="text-center">
      <p className="text-xl sm:text-2xl md:text-3xl text-white font-light animate-fade-in transition-all duration-1000">
        ✨ {prompt}
      </p>
    </div>
  );
}
