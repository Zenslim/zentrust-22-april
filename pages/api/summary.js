// pages/api/summary.js

import { db } from '../../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

const stopwords = new Set([
  'the', 'and', 'but', 'with', 'you', 'your', 'this', 'that', 'for', 'from',
  'are', 'have', 'has', 'was', 'had', 'not', 'too', 'very', 'all', 'any',
  'due', 'now', 'get', 'got', 'just', 'like', 'more', 'much', 'when', 'where',
  'then', 'still', 'yet', 'into', 'out', 'about', 'because', 'also', 'really'
]);

function extractJson(text) {
  console.log('[🧠 RAW RESPONSE]', text);
  try {
    const match = text.match(/```json\s*({[\s\S]*?})\s*```/i);
    if (!match) throw new Error('No JSON code block found');
    const parsed = JSON.parse(match[1]);
    console.log('[✅ Parsed JSON]', parsed);
    return parsed;
  } catch (err) {
    console.error('[❌ JSON Parse Failed]', err.message);
    return {
      summary: "🌀 Your AI summary is awakening...",
      toneHint: "",
      timeHint: "",
      insight: "",
      encouragement: "",
      raw: text
    };
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { uid } = req.query;
  if (!uid) return res.status(400).json({ error: 'Missing UID' });

  try {
    const ref = collection(db, 'users', uid, 'journal');
    const q = query(ref, orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    const entries = snapshot.docs.map(doc => doc.data()).filter(e => e.note);

    const cleaned = entries
      .map(e => e.note.toLowerCase())
      .join(' ')
      .split(/\W+/)
      .filter(word => word.length > 2 && !stopwords.has(word))
      .join(' ');

    const prompt = `
Return the following JSON inside one single \"\"\"json code block\"\"\".

No other text. Only the code block.

\"\"\"json
{
  "summary": "A poetic one-line essence",
  "toneHint": "Emoji + emotional mood",
  "timeHint": "When this person reflects most",
  "insight": "Deeper observation of the reflection pattern",
  "encouragement": "Closing affirmation"
}
\"\"\"

Use the text below as reflection data:
"${cleaned}"
`;

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
console.log('[📥 FULL GPT API RESPONSE]', JSON.stringify(data, null, 2));

if (!data.choices || !data.choices[0]) {
  return res.status(200).json({
    summary: "❌ GPT returned nothing",
    error: data.error || 'Empty response',
    raw: JSON.stringify(data)
  });
}
    const content = data.choices?.[0]?.message?.content || '';
    return res.status(200).json({ raw: content });
  } catch (err) {
    console.error('[GPT ERROR]', err);
    return res.status(500).json({ error: 'OpenAI summary failed', details: err.message });
  }
}
