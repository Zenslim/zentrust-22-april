import { useEffect, useState } from 'react';
import { getReflectionSummary } from '@/utils/getReflectionSummary';

export default function GlowSummaryBox({ reflectionText, reflectionCount }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reflectionCount < 3 || !reflectionText) return;

    const fetchSummary = async () => {
      setLoading(true);
      const result = await getReflectionSummary(reflectionText);
      setSummary(result);
      setLoading(false);
    };

    fetchSummary();
  }, [reflectionText, reflectionCount]);

  if (reflectionCount < 3) return null;

  return (
    <div className="mt-4 bg-indigo-950 text-indigo-100 p-4 rounded-xl shadow-inner border border-indigo-700 whitespace-pre-wrap text-sm leading-relaxed max-h-[180px] overflow-y-auto transition-all duration-500">
      {loading ? '✨ Summarizing your reflection...' : summary}
    </div>
  );
}
