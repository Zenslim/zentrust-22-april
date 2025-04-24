// pages/api/summary.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { entries } = req.body;
  const combined = entries.map((e, i) => `Entry ${i + 1}: ${e.note}`).join('\n');

  const prompt = `
You are a poetic therapist. Summarize the emotional and thematic journey from these journal entries.
Mention recurring themes, emotional tone, and give an uplifting insight. Avoid repetition. Be deeply human.
  
${combined}

Respond with a JSON object like:
{
  "title": "🌙 A Soul in Transition",
  "body": "You've been reflecting deeply... 🔤 Common themes: love, stillness, clarity"
}
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
          { role: 'system', content: 'You are a spiritual journaling guide.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.9,
      })
    });

    const json = await response.json();
    const content = json.choices?.[0]?.message?.content || '{}';
    const parsed = JSON.parse(content);
    res.status(200).json(parsed);
  } catch (err) {
    console.error('AI Summary Error:', err);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
}
