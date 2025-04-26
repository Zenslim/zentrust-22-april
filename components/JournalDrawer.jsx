'use client';

import { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { collection, addDoc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { format } from 'date-fns';
import VoiceMic from '@/components/VoiceMic';
import GlowSummaryBox from '@/components/GlowSummaryBox';
import TypingAura from '@/components/TypingAura';
import ReflectionGlow from '@/components/ReflectionGlow';

const PROMPTS = [
  "🌿 What’s alive in you right now?",
  "🧘 What truth are you avoiding?",
  "🔥 What’s burning inside today?",
  "🌊 What are you ready to release?",
  "✨ What made you feel alive lately?",
  "🌙 What are you holding in silence?",
  "💡 What insight is asking to be heard?",
  "🌸 Where does your soul feel most rooted?",
  "🦋 What boundary do you need to honor?",
  "🌌 What story keeps repeating inside you?",
];

const MOODS = [
  { emoji: '😡', label: 'Angry' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😊', label: 'Happy' },
  { emoji: '🤩', label: 'Excited' },
];

export default function JournalDrawer({ open, onClose, uid, onNewEntry, demoMode = false }) {
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState(null);
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    if (!uid || demoMode) return;

    const fetchEntries = async () => {
      const q = query(collection(db, 'bp', uid, 'entries'), orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEntries(docs);
      setLoading(false);
    };

    fetchEntries();
  }, [uid, demoMode]);

  useEffect(() => {
    const randomPrompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
    setPrompt(randomPrompt);
  }, []);

  const handleSubmit = async () => {
    if (!entry.trim()) return;

    if (demoMode) {
      const fakeEntry = {
        text: entry,
        timestamp: new Date(),
        mood: selectedMood,
      };
      setEntries([fakeEntry, ...entries]);
      setEntry('');
      setSelectedMood(null);
      if (onNewEntry) onNewEntry(entries.length + 1);
      return;
    }

    try {
      const entryRef = collection(db, 'bp', uid, 'entries');
      await addDoc(entryRef, {
        text: entry,
        timestamp: serverTimestamp(),
        mood: selectedMood,
      });
      setEntry('');
      setSelectedMood(null);
      if (onNewEntry) onNewEntry(entries.length + 1);
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed top-0 right-0 w-full sm:w-96 h-full bg-zinc-900 text-white shadow-lg transform transition-transform duration-300 z-50 overflow-y-auto">
      <button onClick={onClose} className="absolute top-4 right-6 text-2xl">✖️</button>

      <div className="p-6 space-y-4 mt-10">
        <div className="text-lg font-semibold mb-2">
          {prompt || "🌠 What truth are you circling around?"}
        </div>

        <textarea
          rows={3}
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Type or speak freely..."
          className="w-full p-3 rounded-lg bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <VoiceMic setText={setEntry} />

        {entry.length > 3 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {MOODS.map((mood) => (
              <button
                key={mood.emoji}
                onClick={() => setSelectedMood(mood.emoji)}
                className={`p-2 text-2xl rounded-full ${selectedMood === mood.emoji ? 'bg-indigo-600' : 'bg-zinc-700'}`}
              >
                {mood.emoji}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full py-3 mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 rounded-full font-semibold"
        >
          {demoMode ? "✨ Whisper to the Stars" : "🚀 Carry This Forward"}
        </button>

        <div className="mt-6 space-y-2">
          <div className="font-semibold text-pink-400">🧠 Your Echoes ({entries.length})</div>

          {loading ? (
            <div className="text-gray-400">Loading reflections...</div>
          ) : (
            entries.map((e, idx) => (
              <div key={idx} className="bg-zinc-800 rounded-lg p-3 space-y-1">
                <div className="text-sm text-gray-400">{format(e.timestamp?.toDate?.() || new Date(), 'PPP p')}</div>
                <div>{e.text}</div>
                {e.mood && <div className="text-2xl">{e.mood}</div>}
              </div>
            ))
          )}
        </div>

        <ReflectionGlow />
      </div>
    </div>
  );
}
