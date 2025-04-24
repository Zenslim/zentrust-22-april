// pages/api/summary.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { entries } = req.body;

  if (!entries || !Array.isArray(entries)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const messages = [
    {
      role: 'system',
      content: `You're a gentle and poetic reflection guide. Given a user's journal entries, return an inspiring and emotionally intelligent summary in this JSON format:

{
  "summary": "...",
  "toneHint": "...",
  "timeHint": "...",
  "insight": "...",
  "encouragement": "..."
}

Use beautiful, surprising, and motivational language. Use emojis sparingly but meaningfully. The summary should feel personalized, not robotic.`,
    },
    {
      role: 'user',
      content: `Here are my reflections:\n\n${entries.map(e => `• ${e.note}`).join('\n')}`,
    },
  ];

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
      }),
    });

    const json = await response.json();

    const result = json.choices?.[0]?.message?.content;

    let parsed;
    try {
      parsed = JSON.parse(result);
    } catch (e) {
      return res.status(502).json({ error: 'Invalid JSON from OpenAI', raw: result });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error('AI Summary Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
