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
You are a poetic therapeutic AI reflecting back user journal entries.
Create a vivid, emotionally intelligent summary in JSON format only like:

{
  "summary": "One-line poetic essence",
  "toneHint": "Emoji + emotional trend (e.g. 🌧️ Heavy with inner rain)",
  "timeHint": "Their journaling tendency (e.g. Mostly late at night)",
  "insight": "Deeper metaphor about their inner patterns",
  "encouragement": "A poetic closing line of hope"
}

Base it only on this text (cleansed, lowercase, stopwords removed):

"${cleanedText}"
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a sacred reflection guide.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.9,
      }),
    });

    const json = await response.json();
    const raw = json.choices?.[0]?.message?.content || '{}';

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      console.warn('OpenAI returned malformed JSON:', raw);
      return res.status(502).json({ error: 'OpenAI summary invalid format', raw });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error('AI Summary Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
