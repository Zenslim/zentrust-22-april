export async function getReflectionSummary(reflectionText) {
  const headers = {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  };

  const body = {
    model: 'google/gemini-pro-1.5',
    messages: [
      {
        role: 'system',
        content: 'You summarize personal journal reflections with poetic clarity, insight, and compassion.',
      },
      {
        role: 'user',
        content: `Reflection: "${reflectionText}"`,
      },
    ],
  };

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    return json.choices?.[0]?.message?.content || 'Summary unavailable.';
  } catch (error) {
    console.error('Gemini summary error:', error);
    return 'Summary failed. Please try again.';
  }
}
