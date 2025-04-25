import React from 'react';

export default function MirrorSummaryDrawer({ summary, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <div className="bg-zinc-900 text-white w-full max-w-md md:max-w-lg h-[80%] rounded-lg shadow-lg flex flex-col p-6">
        <h2 className="text-xl font-semibold mb-2">🪞 Mirror Summary</h2>
        <div className="flex-1 overflow-y-auto text-sm whitespace-pre-wrap leading-relaxed pr-1">
          {summary}
        </div>
        <div className="mt-4 flex justify-between gap-2">
          <button
            onClick={onClose}
            className="flex-1 bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-4 rounded transition"
          >
            🔙 Back to Reflection
          </button>
          <button
            onClick={() => alert('Full journal feature coming soon!')}
            className="flex-1 bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded transition"
          >
            📖 Open Full Journal
          </button>
        </div>
      </div>
    </div>
  );
}
