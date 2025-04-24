import GlowSummaryBox from '@/components/GlowSummaryBox';
import TypingAura from '@/components/TypingAura';
import TextareaAutosize from 'react-textarea-autosize';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { useUserData } from '@/hooks/useUserData';
import VoiceMic from '@/components/VoiceMic';
import ReflectionGlow from '@/components/ReflectionGlow';
import ReflectionEntry from '@/components/ReflectionEntry';
import { PROMPTS, CTA_LABELS, MIRROR_HINTS } from '@/data/journalConstants';

export default function JournalDrawer({ open, onClose, onNewEntry, uid }) {
  const user = useUserData();
  const [note, setNote] = useState('');
  const [mood, setMood] = useState(null);
  const [saving, setSaving] = useState(false);
  const [prompt, setPrompt] = useState(PROMPTS[0]);
  const [showMood, setShowMood] = useState(false);
  const [saveLabel, setSaveLabel] = useState(CTA_LABELS[0]);
  const [mirrorHint, setMirrorHint] = useState(MIRROR_HINTS[0]);
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editNote, setEditNote] = useState('');
  const [lastDeleted, setLastDeleted] = useState(null);

  useEffect(() => {
    if (open) {
      setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
      fetchEntries();
    }
  }, [open]);

  useEffect(() => {
    if (note.trim().length > 5 && !showMood) setShowMood(true);
  }, [note]);

  useEffect(() => {
    const labelInterval = setInterval(() => {
      setSaveLabel(CTA_LABELS[Math.floor(Math.random() * CTA_LABELS.length)]);
    }, 6000);
    const mirrorInterval = setInterval(() => {
      setMirrorHint(MIRROR_HINTS[Math.floor(Math.random() * MIRROR_HINTS.length)]);
    }, 8000);
    return () => {
      clearInterval(labelInterval);
      clearInterval(mirrorInterval);
    };
  }, []);

  const fetchEntries = async () => {
    if (!user?.uid) return;
    const ref = collection(db, 'users', user.uid, 'journal');
    const q = query(ref, orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setEntries(docs);
  };

  const handleSubmit = async () => {
    if (!user?.uid || !note.trim()) return;
    setSaving(true);
    try {
      const ref = collection(db, 'users', user.uid, 'journal');
      await addDoc(ref, {
        note,
        mood: mood || '🤔 undefined',
        timestamp: serverTimestamp(),
      });
      setNote('');
      setMood(null);
      setShowMood(false);
      await fetchEntries();
      if (onNewEntry) onNewEntry(entries.length + 1);
      setTimeout(() => {
        const el = document.querySelector('.journal-scroll');
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      }, 500);
    } catch (e) {
      console.error('Error saving journal:', e);
    } finally {
      setSaving(false);
    }
  };

  const handleEditSave = async (id) => {
    if (!editNote.trim()) return;
    const ref = doc(db, 'users', user.uid, 'journal', id);
    await updateDoc(ref, { note: editNote });
    setEditingId(null);
    setEditNote('');
    await fetchEntries();
  };

  const handleDelete = async (id) => {
    const ref = doc(db, 'users', user.uid, 'journal', id);
    const snap = await getDoc(ref);
    setLastDeleted({ id, data: snap.data() });
    await deleteDoc(ref);
    await fetchEntries();
  };

  const handleUndo = async () => {
    if (!lastDeleted) return;
    const { id, data } = lastDeleted;
    await setDoc(doc(db, 'users', user.uid, 'journal', id), data);
    setLastDeleted(null);
    await fetchEntries();
  };

  return (
    <div className={`journal-scroll fixed top-0 right-0 w-full md:w-[420px] h-full bg-zinc-900 text-white z-40 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto scroll-smooth p-6`}>
      <h2 className="text-2xl font-semibold mb-4">{prompt}</h2>

      <TypingAura>
        <TextareaAutosize
          minRows={2}
          maxRows={6}
          className="w-full p-3 rounded bg-white text-black resize-none focus:outline-none text-base"
          placeholder="Type or speak freely…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </TypingAura>

      <div className="flex justify-end my-2">
        <VoiceMic onTranscript={(text) => setNote((prev) => prev + ' ' + text)} />
      </div>

      {showMood && (
        <>
          <p className="text-sm mt-4 text-gray-400">Would you like to tag a mood?</p>
          <div className="mb-4 mt-2 flex justify-center gap-4 text-3xl">
            {['😡', '😔', '😐', '😊', '🤩'].map((emoji) => (
              <button
                key={emoji}
                className={`transition-all ${mood === emoji ? 'scale-125' : 'opacity-50'}`}
                onClick={() => setMood(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="text-xs text-center text-gray-400 italic mt-2">{mirrorHint}</div>

      <div className="mt-4">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg animate-float animate-pulse-slow"
        >
          {saving ? 'Saving...' : saveLabel}
        </button>
      </div>

      <div className="mt-6">
        <ReflectionGlow entries={entries} />
      </div>

      {entries.length > 0 && (
        <>
          <div className="mt-4 space-y-4 border-t border-zinc-700 pt-4">
            {entries.map((entry) => (
              <ReflectionEntry
                key={entry.id}
                entry={entry}
                editingId={editingId}
                editNote={editNote}
                setEditNote={setEditNote}
                setEditingId={setEditingId}
                handleEditSave={handleEditSave}
                handleDelete={handleDelete}
              />
            ))}
          </div>
          <GlowSummaryBox entries={entries} />
        </>
      )}

      {lastDeleted && (
        <div className="text-center mt-4">
          <button onClick={handleUndo} className="text-yellow-400">Undo Last Delete</button>
        </div>
      )}
    </div>
  );
}
