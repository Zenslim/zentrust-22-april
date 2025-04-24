import { useEffect, useState } from 'react';
import { getReflectionSummary } from '@/utils/getReflectionSummary';

export default function GlowSummaryBox({ reflectionText }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!reflectionText) {
      console.log('[GlowSummaryBox] No reflectionText provided.');
      return;
    }

    console.log('[GlowSummaryBox] Triggering summary for:', reflectionText);

    const fetchSummary = async () => {
      setLoading(true);
      const result = await getReflectionSummary(reflectionText);
      console.log('[GlowSummaryBox] Summary received:', result);
      setSummary(result);
      setLoading(false);
    };

    fetchSummary();
  }, [reflectionText]);

  if (!reflectionText) return null;

  return (
    <div className="mt-6 bg-indigo-950 text-indigo-100 p-4 rounded-xl shadow-inner border border-indigo-700 whitespace-pre-wrap text-sm leading-relaxed max-h-[180px] overflow-y-auto">
      {loading ? '✨ Summarizing your reflection...' : summary}
    </div>
  );
}
