// components/MirrorSummaryModal.jsx
import { useEffect } from 'react';

export default function MirrorSummaryModal({ summary, onClose }) {
  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-zinc-900 border border-indigo-600 text-indigo-100 p-8 max-w-3xl w-full mx-4 rounded-2xl shadow-lg animate-fade-in">
        <h2 className="text-xl font-semibold mb-4 text-center">🔮 Mirror Summary</h2>
        <div className="whitespace-pre-wrap text-sm leading-relaxed max-h-[70vh] overflow-y-auto rounded bg-zinc-800 p-4 border border-zinc-700">
          {summary}
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-indigo-700 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm shadow"
            onClick={onClose}
          >
            ✍️ Back to Reflection
          </button>
          <a
            href="/journal"
            className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-2 rounded-lg text-sm shadow text-center"
          >
            📚 Open Full Journal
          </a>
        </div>
      </div>
    </div>
  );
}
