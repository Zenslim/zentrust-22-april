import { useEffect, useState } from 'react';

export default function ReflectionGlow({ entries }) {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      if (!entries || entries.length < 3) return;

      try {
        const res = await fetch('/api/summary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ entries }),
        });

        const data = await res.json();
        setSummary(data);
      } catch (err) {
        console.error('[ReflectionGlow fetch error]', err);
      }
    };

    fetchSummary();
  }, [entries]);

  if (!summary) {
    return (
      <div className="mt-8 p-4 rounded-xl bg-zinc-800 text-white shadow-inner text-sm text-center">
        🔮 Your Reflection Begins to Glow<br />
        <span className="text-indigo-300">Your AI summary is awakening... Keep journaling.</span>
      </div>
    );
  }

  return (
    <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-indigo-800 to-purple-900 text-white shadow-xl animate-fade-in">
      <h3 className="text-xl font-semibold mb-2">🔮 Your Reflection Begins to Glow</h3>
      <p className="text-sm text-blue-100 mb-1">{summary.summary}</p>
      {summary.timeHint && <p className="text-sm text-blue-200 mb-1">{summary.timeHint}</p>}
      {summary.toneHint && <p className="text-sm text-blue-200 mb-1">{summary.toneHint}</p>}
      {summary.insight && <p className="text-sm text-emerald-200 mb-1">{summary.insight}</p>}
      {summary.encouragement && <p className="text-sm text-yellow-300 italic">{summary.encouragement}</p>}
    </div>
  );
}
