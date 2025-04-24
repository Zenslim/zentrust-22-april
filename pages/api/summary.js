// pages/api/summary.js

const stopwords = new Set([
  'the', 'and', 'but', 'with', 'you', 'your', 'this', 'that', 'for', 'from',
  'are', 'have', 'has', 'was', 'had', 'not', 'too', 'very', 'all', 'any',
  'due', 'now', 'get', 'got', 'just', 'like', 'more', 'much', 'when', 'where',
  'then', 'still', 'yet', 'into', 'out', 'about', 'because', 'also', 'really'
]);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { entries } = req.body;
  if (!entries || !Array.isArray(entries)) return res.status(400).json({ error: 'Invalid input' });

  const cleanedText = entries
    .map(e => e.note.toLowerCase())
    .join(' ')
    .split(/\W+/)
    .filter(w => w.length > 2 && !stopwords.has(w))
    .join(' ');

  const prompt = `
You're a poetic reflection analyst. Return JSON only:
{
  "summary": "One poetic line",
  "toneHint": "Emoji + emotional mood trend",
  "timeHint": "Time pattern like 'late night journaling'",
  "insight": "Deeper metaphor about user's reflection pattern",
  "encouragement": "Final uplifting line"
}

Entries (cleansed, stopwords removed):
"${cleanedText}"
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a poetic spiritual guide.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.9,
      }),
    });

    const json = await response.json();
    console.log('[GPT raw content]', json.choices?.[0]?.message?.content); // 🧪 Debug line

    const raw = json.choices?.[0]?.message?.content || '{}';
    const parsed = JSON.parse(raw); // may throw

    return res.status(200).json(parsed);
  } catch (err) {
    console.error('[GPT ERROR]', err);
    return res.status(500).json({ error: 'OpenAI summary failed', details: err.message });
  }
}
