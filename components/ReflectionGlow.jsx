import { useEffect, useState } from 'react';

export default function ReflectionGlow({ entries }) {
  const [insight, setInsight] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch('/api/summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ entries }),
        });
        const data = await res.json();
        if (data && data.summary) {
          setInsight(data);
        } else {
          console.warn('No summary returned from API.');
          setError(true);
        }
      } catch (err) {
        console.error('Summary API error:', err);
        setError(true);
      }
    };

    if (entries.length >= 3) fetchSummary();
  }, [entries]);

  if (!insight || error) return (
    <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-indigo-800 to-purple-900 text-white shadow-xl animate-fade-in">
      <h3 className="text-xl font-semibold mb-2">🔮 Your Reflection Begins to Glow</h3>
      <p className="text-sm text-blue-300 italic">
        Your AI summary is awakening... Keep journaling.
      </p>
    </div>
  );

  return (
    <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-indigo-800 to-purple-900 text-white shadow-xl animate-fade-in">
      <h3 className="text-xl font-semibold mb-2">🔮 Your Reflection Begins to Glow</h3>
      <p className="text-sm text-blue-100 mb-2 whitespace-pre-line">{insight.summary}</p>
    </div>
  );
}
