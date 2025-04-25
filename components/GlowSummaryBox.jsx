// GlowSummaryBox.jsx
import { useEffect, useState } from 'react';
import { getReflectionSummary } from '@/utils/getReflectionSummary';

export default function GlowSummaryBox({ reflectionText, onLoading }) {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    if (!reflectionText) return;

    const fetchSummary = async () => {
      onLoading(true);
      const result = await getReflectionSummary(reflectionText);
      setSummary(result);
      onLoading(false);
    };

    fetchSummary();
  }, [reflectionText]);

  if (!reflectionText) return null;

  return (
    <div className="mt-4 bg-indigo-950 text-indigo-100 p-4 rounded-xl shadow-inner border border-indigo-700 whitespace-pre-wrap text-sm leading-relaxed max-h-[180px] overflow-y-auto">
      {summary}
    </div>
  );
}
