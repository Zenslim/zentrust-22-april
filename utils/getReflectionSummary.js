export async function getReflectionSummary(reflectionText) {
  const headers = {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  };

  const body = {
    model: 'deepseek-ai/deepseek-v3-0324',
    max_tokens: 300,
    messages: [
      {
        role: 'system',
        content: 'You summarize journal reflections with poetic warmth and deep clarity.',
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
    console.log('[🧠 OpenRouter RAW]', JSON.stringify(json, null, 2)); // 👈 Log full response

    return json.choices?.[0]?.message?.content || 'Summary unavailable.';
  } catch (error) {
    console.error('DeepSeek summary error:', error);
    return 'Summary failed. Please try again.';
  }
}
