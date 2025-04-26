import { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection, addDoc, getDocs, orderBy, query, serverTimestamp,
  updateDoc, deleteDoc, doc, getDoc, setDoc
} from 'firebase/firestore';
import TextareaAutosize from 'react-textarea-autosize';
import { useUserData } from '@/hooks/useUserData';
import TypingAura from '@/components/TypingAura';
import VoiceMic from '@/components/VoiceMic';
import ReflectionEntry from '@/components/ReflectionEntry';
import MirrorSummaryDrawer from '@/components/MirrorSummaryDrawer';
import DateRangePicker from '@/components/DateRangePicker';
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
  const [customRange, setCustomRange] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const handleSummary = async () => {
    if (entries.length === 0) return;
    if (summaryMode === 'custom' && !customRange) {
      setShowDatePicker(true);
      return;
    }

    setIsSummarizing(true);
    let reflectionText = '';
    const now = new Date();

    if (summaryMode === 'last') {
      reflectionText = entries[0]?.note || '';
    } else if (summaryMode === 'all') {
      reflectionText = entries.map(e => e.note).join(' ');
    } else if (summaryMode === 'random3') {
      const randomEntries = [...entries].sort(() => 0.5 - Math.random()).slice(0, 3);
      reflectionText = randomEntries.map(e => e.note).join(' ');
    } else if (summaryMode === 'morning') {
      reflectionText = entries.filter(e => {
        const hour = e.timestamp?.toDate?.().getHours?.() || 0;
        return hour >= 5 && hour < 12;
      }).map(e => e.note).join(' ');
    } else if (summaryMode === 'evening') {
      reflectionText = entries.filter(e => {
        const hour = e.timestamp?.toDate?.().getHours?.() || 0;
        return hour >= 18 || hour < 5;
      }).map(e => e.note).join(' ');
    } else if (summaryMode === 'longest') {
      const longestEntry = entries.reduce((a, b) => (a.note.length > b.note.length ? a : b), entries[0]);
      reflectionText = longestEntry?.note || '';
    } else if (summaryMode === 'oneday') {
      reflectionText = entries.filter(e => {
        const timestamp = e.timestamp?.toDate?.();
        return timestamp && (now - timestamp) <= 24 * 60 * 60 * 1000;
      }).map(e => e.note).join(' ');
    } else if (summaryMode === 'oneweek') {
      reflectionText = entries.filter(e => {
        const timestamp = e.timestamp?.toDate?.();
        return timestamp && (now - timestamp) <= 7 * 24 * 60 * 60 * 1000;
      }).map(e => e.note).join(' ');
    } else if (summaryMode === 'custom' && customRange) {
      reflectionText = entries.filter(e => {
        const timestamp = e.timestamp?.toDate?.();
        return timestamp && new Date(customRange.start) <= timestamp && timestamp <= new Date(customRange.end);
      }).map(e => e.note).join(' ');
    }

    const result = await getReflectionSummary(reflectionText || 'No suitable reflections found.');
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
            <option value="random3">🎲 Random 3 Reflections</option>
            <option value="morning">🌅 Morning Reflections</option>
            <option value="evening">🌙 Evening Reflections</option>
            <option value="longest">🧠 Longest Reflection</option>
            <option value="oneday">🕰️ Past 24 Hours</option>
            <option value="oneweek">🗓️ Past 7 Days</option>
            <option value="custom">📅 Custom Range</option>
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
    {entries.map((entry) => {
      try {
        if (
          !entry ||
          typeof entry !== 'object' ||
          typeof entry.note !== 'string' ||
          !entry.timestamp ||
          (typeof entry.timestamp.toDate !== 'function' && !entry.timestamp.seconds) ||
          !entry.id
        ) {
          console.warn('⛔ Skipping invalid entry (missing id or bad structure):', entry);
          return null;
        }

        return (
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
        );
      } catch (error) {
        console.error('⚠️ Error rendering entry:', entry, error);
        return null;
      }
    })}
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

      {showDatePicker && (
        <DateRangePicker
          onSelect={(range) => {
            setCustomRange(range);
            setShowDatePicker(false);
            handleSummary();
          }}
          onClose={() => setShowDatePicker(false)}
        />
      )}
    </div>
  );
}
