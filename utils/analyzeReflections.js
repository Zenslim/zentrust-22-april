// analyzeReflections.js

export function analyzeReflections(entries) {
  if (!entries || entries.length === 0) return null;

  const moods = entries.map(e => e.mood || '🤔 undefined');
  const notes = entries.map(e => e.note.toLowerCase());
  const times = entries.map(e => e.timestamp?.toDate?.().getHours?.() || 0);

  const flatText = notes.join(' ');
  const wordFreq = {};
  flatText.split(/\W+/).forEach(word => {
    if (word.length > 2) wordFreq[word] = (wordFreq[word] || 0) + 1;
  });

  const topWords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);

  const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
  const dominantTime = avgTime >= 18 || avgTime < 6 ? 'evening' : 'day';
  const moodMap = moods.reduce((acc, mood) => {
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {});
  const topMood = Object.entries(moodMap).sort((a, b) => b[1] - a[1])[0][0];

  // Patterns
  const titleSuggestions = {
    evening: '🌙 A Soul in Transition',
    day: '🌅 Momentum Rising',
  };

  const bodySuggestions = {
    evening: `You've been reflecting most deeply when the world is quiet. Your themes suggest a journey through uncertainty — but also a search for clarity. You're asking the questions that matter.`,
    day: `You're journaling more frequently in the daylight, with bursts of insight and direction. You're not just thinking — you're becoming.`,
  };

  const emotionalNote =
    topMood === '😊' || topMood === '🤩'
      ? '✨ Your reflections glow with optimism.'
      : topMood === '😡'
      ? '🔥 There’s fire in your voice — something wants to change.'
      : topMood === '😔'
      ? '🌧️ Your reflections carry a tone of heaviness and release.'
      : '🔍 You’re seeking clarity through your words.';

  return {
    title: titleSuggestions[dominantTime],
    body: `${bodySuggestions[dominantTime]}\n\n${emotionalNote}\n\n🔤 Common themes: ${topWords.join(', ')}`,
  };
}
