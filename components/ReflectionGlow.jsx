import { useEffect, useState } from 'react';
import { analyzeReflections } from '@/utils/analyzeReflections';

export default function ReflectionGlow({ entries }) {
  const [insight, setInsight] = useState(null);

  useEffect(() => {
    if (entries.length >= 3) {
      const result = analyzeReflections(entries);
      setInsight(result);
    }
  }, [entries]);

  if (!insight) return null;

  return (
    <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-indigo-800 to-purple-900 text-white shadow-xl animate-fade-in">
      <h3 className="text-xl font-semibold mb-2">{insight.title}</h3>
      <p className="text-sm text-blue-100 whitespace-pre-line leading-relaxed">{insight.body}</p>
    </div>
  );
}
