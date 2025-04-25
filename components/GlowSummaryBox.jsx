import { useEffect, useState } from 'react';
import { getReflectionSummary } from '@/utils/getReflectionSummary';

export default function GlowSummaryBox({ reflectionText, entryCount }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (entryCount < 3 || !reflectionText) return;

    const fetchSummary = async () => {
      setLoading(true);
      const result = await getReflectionSummary(reflectionText);
      setSummary(result);
      setLoading(false);
    };

    fetchSummary();
  }, [reflectionText, entryCount]);

  if (entryCount < 3 || !reflectionText) return null;

  return (
    <div className="mt-6">
      <p className="text-xs text-purple-300 mb-1">🧠 Summary from your journey so far...</p>
      <div className="bg-indigo-950 text-indigo-100 p-4 rounded-xl shadow-inner border border-indigo-700 whitespace-pre-wrap text-sm leading-relaxed max-h-[180px] overflow-y-auto">
        {loading ? '✨ Summarizing your reflection...' : summary}
      </div>
    </div>
  );
}
