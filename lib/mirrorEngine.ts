export async function generateMirrorSummary({
  text,
  imageMeta,
  timestamp,
  userId,
  celestialPrompt
}: {
  text: string;
  imageMeta?: { name: string; data: string };
  timestamp: number;
  userId: string;
  celestialPrompt: string;
}): Promise<{
  mirrorReply: string;
  bpss: string;
  archetype: string;
  showReciprocity: boolean;
  userTitle?: string;
  mythicWhisper?: string;
  threadId?: string;
}> {
  const headers = {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json'
  };

  const prompt = `Reflect on this user's thought: "${text}"\nPrompt context: "${celestialPrompt}"\nGive a short, poetic, emotional mirror-style response.`;

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: 'deepseek/deepseek-chat-v3-0324:free',
      messages: [
        { role: 'system', content: 'You are a soulful journaling mirror.' },
        { role: 'user', content: prompt }
      ]
    })
  });

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content ?? 'Something inside you is awakening.';

  return {
    mirrorReply: content.trim(),
    bpss: 'psycho',
    archetype: 'moon',
    showReciprocity: text.length > 100,
    threadId: `thread-${userId}-${Math.floor(timestamp / 86400000)}`
  };
}
