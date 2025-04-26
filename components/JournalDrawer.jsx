'use client';

import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  limit,
} from 'firebase/firestore';
import { format } from 'date-fns';
import VoiceMic from '@/components/VoiceMic';

const PROMPTS = [
  "🌱 What direction feels right, even if unclear?",
  "🌌 What boundary do you need to honor?",
  "🪐 What dream whispers to you now?",
  "💫 Where are you being invited to trust more?",
  "🌿 What is quietly growing inside you?",
];

const MOODS = [
  { emoji: '🙂', label: 'Calm' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😡', label: 'Angry' },
  { emoji: '😨', label: 'Fear' },
  { emoji: '🥰', label: 'Love' },
];

export default function JournalDrawer({ open, onClose, uid, onNewEntry }) {
  const [reflection, setReflection] = useState('');
  const [prompt, setPrompt] = useState('');
  const [mood, setMood] = useState(null);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  }, []);

  useEffect(() => {
    if (open) {
      fetchEntries();
    }
  }, [open]);

  const fetchEntries = async () => {
    if (!uid) return;
    const entriesRef = collection(db, 'bp', uid, 'entries');
    const q = query(entriesRef, orderBy('timestamp', 'desc'), limit(7));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setEntries(docs);
  };

  const handleSubmit = async () => {
    if (!reflection.trim()) return;

    if (uid && db) {
      try {
        const entriesRef = collection(db, 'bp', uid, 'entries');
        await addDoc(entriesRef, {
          text: reflection,
          mood: mood || '🤔 Undefined',
          timestamp: serverTimestamp(),
        });
        setReflection('');
        setMood(null);
        fetchEntries();
        onNewEntry(entries.length + 1);
      } catch (err) {
        console.error('Error submitting reflection:', err);
      }
    } else {
      console.log('Demo Mode: Reflection not saved.');
      setReflection('');
      setMood(null);
      onNewEntry(entries.length + 1);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-zinc-900 shadow-xl overflow-y-auto z-50 p-6 text-white flex flex-col space-y-4">
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-zinc-400 hover:text-white text-2xl"
      >
        ✖
      </button>

      <h2 className="text-xl font-semibold pt-8">{prompt}</h2>

      {/* Mood Selector */}
      <div className="flex space-x-3 pt-2">
        {MOODS.map(({ emoji, label }) => (
          <button
            key={label}
            onClick={() => setMood(emoji)}
            className={`text-2xl p-1 rounded-full ${
              mood === emoji ? 'bg-indigo-500' : 'hover:bg-zinc-700'
            }`}
            title={label}
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Reflection Textarea */}
      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder="Let your thoughts flow here..."
        rows={6}
        className="w-full p-3 mt-2 bg-zinc-800 rounded-lg focus:outline-none resize-none"
      />

      {/* Voice Mic Button */}
      <VoiceMic onText={(text) => setReflection(prev => prev + ' ' + text)} />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-semibold mt-4"
      >
        📩 Whisper to the Stars
      </button>

      {/* Past Entries */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">🧠 Your Echoes ({entries.length})</h3>
        <div className="space-y-2">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-zinc-800 p-3 rounded-md text-sm opacity-90"
            >
              <div className="flex justify-between items-center mb-1">
                <span>{entry.mood || '🤔'}</span>
                <span className="text-xs text-zinc-400">
                  {entry.timestamp?.seconds
                    ? format(new Date(entry.timestamp.seconds * 1000), 'PPpp')
                    : 'Just now'}
                </span>
              </div>
              <div>{entry.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
