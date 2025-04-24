// components/ReflectionGlow.jsx
import { useEffect, useState } from 'react';

export default function ReflectionGlow({ entries }) {
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      if (entries.length < 3) return;
      setLoading(true);
      try {
        const res = await fetch('/api/summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ entries }),
        });
        const data = await res.json();
        if (res.ok) setInsight(data);
        else console.error('Summary error:', data.error || data);
      } catch (e) {
        console.error('AI fetch failed:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [entries]);

  if (!insight && !loading) return null;

  return (
    <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-indigo-800 to-purple-900 text-white shadow-xl animate-fade-in">
      <h3 className="text-xl font-semibold mb-2">🔮 Your Reflection Begins to Glow</h3>
      {loading ? (
        <p className="text-sm italic text-blue-200">Analyzing your reflections...</p>
      ) : (
        <>
          <p className="text-sm text-blue-100 mb-1">{insight.summary}</p>
          {insight.timeHint && <p className="text-sm text-blue-200 mb-1">{insight.timeHint}</p>}
          <p className="text-sm text-blue-200 mb-1">{insight.toneHint}</p>
          <p className="text-sm text-emerald-200 mb-1">{insight.insight}</p>
          <p className="text-sm text-yellow-300 italic">{insight.encouragement}</p>
        </>
      )}
    </div>
  );
}
