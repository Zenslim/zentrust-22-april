
export async function generateMirrorSummary({ text, imageMeta, timestamp, userId, celestialPrompt }) {
  const headers = {
    'Authorization': \`Bearer \${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}\`,
    'Content-Type': 'application/json',
  };

  const body = {
    model: 'deepseek/deepseek-chat-v3-0324:free',
    max_tokens: 500,
    messages: [
      {
        role: 'system',
        content: 'You summarize personal reflections with poetic warmth and deep clarity.',
      },
      {
        role: 'user',
        content: \`Reflection: "\${text}"\`,
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
    console.log('[🧠 OpenRouter RAW]', JSON.stringify(json, null, 2));

    return {
      mirrorReply: json.choices?.[0]?.message?.content || 'Summary unavailable.',
      mythicWhisper: 'The path forms with your presence.',
      userTitle: 'You are already arriving.',
    };
  } catch (error) {
    console.error('OpenRouter summary error:', error);
    return {
      mirrorReply: 'Summary failed. Please try again.',
      mythicWhisper: null,
      userTitle: null,
    };
  }
}
