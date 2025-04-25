import { useEffect, useState } from 'react';
import { getReflectionSummary } from '@/utils/getReflectionSummary';
import TypingAura from '@/components/TypingAura';
import TextareaAutosize from 'react-textarea-autosize';
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
import ReflectionEntry from '@/components/ReflectionEntry';

export default function JournalDrawer({ open, onClose, onNewEntry, uid }) {
  const user = useUserData();
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editNote, setEditNote] = useState('');
  const [lastDeleted, setLastDeleted] = useState(null);
  const [saving, setSaving] = useState(false);
  const [summary, setSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (open) fetchEntries();
  }, [open]);

  useEffect(() => {
    if (entries.length >= 3) {
      const latest = entries[0]?.note;
      if (latest) {
        setLoadingSummary(true);
        getReflectionSummary(latest).then(res => {
          setSummary(res);
          setLoadingSummary(false);
        });
      }
    }
  }, [entries]);

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
        timestamp: serverTimestamp(),
      });
      setNote('');
      await fetchEntries();
      if (onNewEntry) onNewEntry(entries.length + 1);
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
      <h2 className="text-2xl font-semibold mb-4">🌀 What would lighten your load right now?</h2>

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

      <div className="mt-4">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg animate-float animate-pulse-slow"
        >
          {saving ? 'Saving...' : '🌱 Save & Feel Lighter'}
        </button>
      </div>

      {entries.length >= 3 && (
        <div className="mt-6 bg-indigo-950 text-indigo-100 p-4 rounded-xl shadow-inner border border-indigo-700 whitespace-pre-wrap text-sm leading-relaxed max-h-[180px] overflow-y-auto">
          {loadingSummary ? '✨ Your Glow Summary is forming...' : summary}
        </div>
      )}

      <button
        onClick={() => setShowAll(!showAll)}
        className="text-left text-xs text-purple-400 mt-4 mb-2 hover:underline"
      >
        📜 Your Echoes ({entries.length})
      </button>

      {showAll && entries.length > 0 && (
        <div className="space-y-4 border-t border-zinc-700 pt-4">
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
      )}

      {lastDeleted && (
        <div className="text-center mt-4">
          <button onClick={handleUndo} className="text-yellow-400">Undo Last Delete</button>
        </div>
      )}
    </div>
  );
}
