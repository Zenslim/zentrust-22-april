const stopwords = new Set([
  'the', 'and', 'but', 'with', 'you', 'your', 'this', 'that', 'for', 'from',
  'are', 'have', 'has', 'was', 'had', 'not', 'too', 'very', 'all', 'any',
  'due', 'now', 'get', 'got', 'just', 'like', 'more', 'much', 'when', 'where',
  'then', 'still', 'yet', 'into', 'out', 'about', 'because', 'also', 'really'
]);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { entries } = req.body;
  if (!entries || !Array.isArray(entries)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const cleaned = entries
    .map(e => e.note.toLowerCase())
    .join(' ')
    .split(/\W+/)
    .filter(word => word.length > 2 && !stopwords.has(word))
    .join(' ');

  const prompt = `
You're a poetic BPSS insight engine. Give JSON only, no explanation, no preamble. Format:

{
  "summary": "...",
  "toneHint": "...",
  "timeHint": "...",
  "insight": "...",
  "encouragement": "..."
}

Analyze:
"${cleaned}"
`;

  try {
    const raw = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a reflective mood analyst.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8
      })
    });

    const data = await raw.json();
    const message = data?.choices?.[0]?.message?.content?.trim() || '';

    let parsed;
    try {
      parsed = JSON.parse(message);
    } catch (e) {
      console.warn('[Fallback triggered]', message);
      parsed = {
        summary: "🌀 Your AI summary is awakening...",
        toneHint: "",
        timeHint: "",
        insight: "",
        encouragement: ""
      };
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error('[GPT Failure]', err);
    return res.status(500).json({ error: 'OpenAI call failed', details: err.message });
  }
}
