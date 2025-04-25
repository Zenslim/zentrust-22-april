import { useEffect, useState } from 'react';
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
import TextareaAutosize from 'react-textarea-autosize';
import { useUserData } from '@/hooks/useUserData';
import TypingAura from '@/components/TypingAura';
import VoiceMic from '@/components/VoiceMic';
import ReflectionEntry from '@/components/ReflectionEntry';
import MirrorSummaryDrawer from '@/components/MirrorSummaryDrawer';
import { PROMPTS, CTA_LABELS } from '@/data/journalConstants';
import { getReflectionSummary } from '@/utils/getReflectionSummary';

export default function JournalDrawer({ open, onClose, onNewEntry, uid }) {
  const user = useUserData();
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState([]);
  const [reflectionCount, setReflectionCount] = useState(0);
  const [prompt, setPrompt] = useState(PROMPTS[0]);
  const [saving, setSaving] = useState(false);
  const [saveLabel, setSaveLabel] = useState(CTA_LABELS[0]);
  const [showAll, setShowAll] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editNote, setEditNote] = useState('');
  const [lastDeleted, setLastDeleted] = useState(null);
  const [mirrorSummary, setMirrorSummary] = useState('');
  const [showMirrorModal, setShowMirrorModal] = useState(false);
  const [summaryMode, setSummaryMode] = useState('last');
  const [isSummarizing, setIsSummarizing] = useState(false);

  useEffect(() => {
    if (open) {
      setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
      fetchEntries();
    }
  }, [open]);

  useEffect(() => {
    const labelInterval = setInterval(() => {
      setSaveLabel(CTA_LABELS[Math.floor(Math.random() * CTA_LABELS.length)]);
    }, 6000);
    return () => clearInterval(labelInterval);
  }, []);

  const fetchEntries = async () => {
    if (!user?.uid) return;
    const ref = collection(db, 'users', user.uid, 'journal');
    const q = query(ref, orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setEntries(docs);
    setReflectionCount(docs.length);
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

  const handleSummary = async () => {
    if (entries.length === 0) return;
    setIsSummarizing(true);
    const reflectionText = summaryMode === 'last' ? entries[0]?.note : entries.map(e => e.note).join(' ');
    const result = await getReflectionSummary(reflectionText);
    setMirrorSummary(result);
    setIsSummarizing(false);
    setShowMirrorModal(true);
  };

  return (
    <div className={`fixed top-0 right-0 w-full md:w-[420px] h-full bg-zinc-900 text-white z-40 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto scroll-smooth p-6`}>
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

      <div className="mt-4">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg"
        >
          {saving ? 'Saving...' : saveLabel}
        </button>
      </div>

      {reflectionCount >= 3 && (
        <div className="mt-4 flex justify-between items-center">
          <button
            className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 disabled:opacity-50"
            onClick={handleSummary}
            disabled={isSummarizing}
          >
            {isSummarizing ? '⏳ Creating Summary...' : '🌟 Summarize My Journey'}
          </button>
          <select
            value={summaryMode}
            onChange={(e) => setSummaryMode(e.target.value)}
            className="ml-2 bg-zinc-800 text-white px-2 py-1 rounded"
          >
            <option value="last">🪞 Last Reflection Only</option>
            <option value="all">📚 All Reflections</option>
          </select>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-purple-400 hover:text-purple-200"
        >
          📜 Your Echoes ({entries.length})
        </button>
      </div>

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

      <MirrorSummaryDrawer
        summary={mirrorSummary}
        isOpen={showMirrorModal}
        onClose={() => setShowMirrorModal(false)}
      />
    </div>
  );
}
