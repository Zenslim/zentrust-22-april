'use client';

import { useState, useEffect } from 'react';
import { db } from '@/firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  orderBy,
  query,
  serverTimestamp,
  doc
} from 'firebase/firestore';
import { format } from 'date-fns';
import TextareaAutosize from 'react-textarea-autosize';
import VoiceMic from '@/components/VoiceMic';
import TypingAura from '@/components/TypingAura';
import ReflectionGlow from '@/components/ReflectionGlow';
import GlowSummaryBox from '@/components/GlowSummaryBox';
import TimelineDrawer from '@/components/TimelineDrawer';
import TimelineButton from '@/components/TimelineButton';
import MirrorSummaryDrawer from '@/components/MirrorSummaryDrawer';

export default function JournalDrawer({ open, onClose, uid, onNewEntry }) {
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState([]);
  const [mood, setMood] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showSummaryDrawer, setShowSummaryDrawer] = useState(false);

  useEffect(() => {
    if (open) {
      fetchEntries();
    }
  }, [open]);

  const fetchEntries = async () => {
    if (!uid) return;
    const entriesRef = collection(db, 'bp', uid, 'entries');
    const q = query(entriesRef, orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setEntries(docs);
  };

  const handleSubmit = async () => {
    if (!note.trim()) return;

    if (uid && db) {
      try {
        const ref = collection(db, 'bp', uid, 'entries');
        await addDoc(ref, {
          note,
          mood: mood || '🤔',
          timestamp: serverTimestamp(),
        });
        setNote('');
        setMood(null);
        fetchEntries();
        onNewEntry(entries.length + 1);
      } catch (err) {
        console.error('Error saving reflection:', err);
      }
    } else {
      console.log('Demo Mode: Reflection not saved.');
      setNote('');
      setMood(null);
      onNewEntry(entries.length + 1);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'bp', uid, 'entries', id));
      fetchEntries();
    } catch (err) {
      console.error('Error deleting reflection:', err);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-zinc-900 shadow-xl overflow-y-auto z-50 p-6 text-white flex flex-col space-y-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-zinc-400 hover:text-white text-2xl"
      >
        ✖
      </button>

      {/* Typing Prompt */}
      <h2 className="text-lg font-semibold pt-8 mb-2 flex justify-center">
        <TypingAura />
      </h2>

      {/* Textarea */}
      <TextareaAutosize
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Type or speak freely..."
        minRows={3}
        className="w-full p-3 mt-1 bg-zinc-800 rounded-lg focus:outline-none resize-none text-white"
      />

      {/* Mood Selection */}
      {note.trim().length > 5 && (
        <>
          <p className="text-sm text-gray-400 mt-3 text-center">Would you like to tag a mood?</p>
          <div className="flex justify-center gap-4 text-3xl py-2">
            {['😡', '😔', '😐', '😊', '🤩'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => setMood(emoji)}
                className={`transition-all duration-300 ${
                  mood === emoji ? 'scale-125' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Voice Mic */}
      <VoiceMic onText={(text) => setNote(prev => prev + ' ' + text)} />

      {/* Save Button */}
      <button
        onClick={handleSubmit}
        disabled={!note.trim()}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-semibold mt-4 disabled:opacity-40"
      >
        🚀 Carry This Forward
      </button>

      {/* Reflections List */}
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
              <div className="whitespace-pre-wrap">{entry.note}</div>
              <div className="flex justify-end space-x-3 mt-2 text-xs text-indigo-300">
                <button onClick={() => setNote(entry.note)}>Edit</button>
                <button onClick={() => handleDelete(entry.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cosmic Backgrounds */}
      <ReflectionGlow />

      {/* Timeline and Mirror Drawers */}
      <TimelineDrawer open={showTimeline} onClose={() => setShowTimeline(false)} uid={uid} />
      <MirrorSummaryDrawer open={showSummaryDrawer} onClose={() => setShowSummaryDrawer(false)} entries={entries} />
    </div>
  );
}
