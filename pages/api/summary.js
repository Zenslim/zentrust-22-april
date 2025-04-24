const stopwords = new Set([
  'the', 'and', 'but', 'with', 'you', 'your', 'this', 'that', 'for', 'from',
  'are', 'have', 'has', 'was', 'had', 'not', 'too', 'very', 'all', 'any',
  'due', 'now', 'get', 'got', 'just', 'like', 'more', 'much', 'when', 'where',
  'then', 'still', 'yet', 'into', 'out', 'about', 'because', 'also', 'really'
]);

function extractJson(text) {
  console.log('[🧠 RAW RESPONSE]', text); // <== Force-log the actual GPT text

  try {
    const match = text.match(/\{[\s\S]*?\}/);
    if (!match) throw new Error('No JSON object found in response');
    const parsed = JSON.parse(match[0]);
    console.log('[✅ Parsed JSON]', parsed); // <== Confirm what got parsed
    return parsed;
  } catch (err) {
    console.error('[❌ JSON Parse Failed]', err.message);
    return {
      summary: "🌀 Your AI summary is awakening...",
      toneHint: "",
      timeHint: "",
      insight: "",
      encouragement: ""
    };
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { entries } = req.body;
  if (!entries || !Array.isArray(entries)) return res.status(400).json({ error: 'Invalid input' });

  const cleaned = entries
    .map(e => e.note.toLowerCase())
    .join(' ')
    .split(/\W+/)
    .filter(word => word.length > 2 && !stopwords.has(word))
    .join(' ');

  const prompt = `
Return only the following JSON object. Do not include any text before or after:
{
  "summary": "A poetic one-line essence",
  "toneHint": "Emoji + emotional mood",
  "timeHint": "When this person reflects most",
  "insight": "Deeper observation of the reflection pattern",
  "encouragement": "Closing affirmation"
}

Use only JSON. No commentary.

Reflections:
"${cleaned}"
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: [
          { role: 'system', content: 'You are a poetic BPSS analyst.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.85
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    console.log('[🧠 RAW GPT OUTPUT]', content);
    const parsed = extractJson(content);

    if (!parsed) {
      return res.status(200).json({
        summary: "🌀 Your AI summary is awakening...",
        toneHint: "",
        timeHint: "",
        insight: "",
        encouragement: ""
      });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error('[AI Error]', err);
    return res.status(500).json({ error: 'OpenAI error', details: err.message });
  }
}
