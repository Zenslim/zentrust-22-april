import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export default function MirrorSummaryDrawer({ summary, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-zinc-900 text-white w-full max-w-md md:max-w-lg h-[80%] rounded-lg shadow-lg flex flex-col p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-2">🪞 Mirror Summary</h2>

            <div className="flex-1 overflow-y-auto text-sm whitespace-pre-wrap leading-relaxed pr-1">
              {summary ? (
                <ReactMarkdown>{summary}</ReactMarkdown>
              ) : (
                <p className="text-gray-400 italic">No summary available yet.</p>
              )}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
