type ReflectionInput = {
  text: string;
  imageMeta?: { name: string; data: string };
  timestamp: number;
  userId: string;
  celestialPrompt: string;
};

type MirrorOutput = {
  mirrorReply: string;
  bpss: 'bio' | 'psycho' | 'social' | 'spiritual';
  archetype: string;
  showReciprocity: boolean;
  userTitle?: string;
  mythicWhisper?: string;
  threadId?: string;
};

const archetypes = ['moon', 'mars', 'pluto', 'saturn', 'jupiter', 'earth', 'populated'];

const whispers = [
  'Even silence carries your becoming.',
  'The stars heard you. And they remember.',
  'What you release returns as light.',
  'The universe is always listening.',
  'You are already arriving.',
  'The path forms with your presence.',
  'All truths begin in stillness.'
];

// Simple keyword-based BPSS tone detection
function detectBPSS(text: string): MirrorOutput['bpss'] {
  const lower = text.toLowerCase();
  if (/body|sleep|eat|energy/.test(lower)) return 'bio';
  if (/feel|mind|anxiety|thought|inner/.test(lower)) return 'psycho';
  if (/family|community|others|trust/.test(lower)) return 'social';
  if (/soul|meaning|spirit|god|universe/.test(lower)) return 'spiritual';
  return 'psycho';
}

// Assign a planet archetype by hashing reflection + time
function mapArchetype(text: string, timestamp: number): string {
  const hash = [...text].reduce((acc, c) => acc + c.charCodeAt(0), timestamp);
  return archetypes[hash % archetypes.length];
}

// Threading: use timestamp + userId for continuity
function generateThreadId(userId: string, timestamp: number): string {
  return `thread-${userId}-${Math.floor(timestamp / 86400000)}`; // 1-day threads
}

// Whisper: occasional mythic echo
function getRandomWhisper(): string {
  return whispers[Math.floor(Math.random() * whispers.length)];
}

// Summarize the reflection — placeholder for AI model integration
function generateSummary(text: string, bpss: string, archetype: string): string {
  const summaryTemplates = {
    bio: 'Your body carries wisdom it wants you to trust.',
    psycho: 'Your mind is reflecting deeply — clarity will follow.',
    social: 'This desire for connection is sacred.',
    spiritual: 'You are opening to a truth that transcends language.'
  };
  const base = summaryTemplates[bpss] || 'Something inside you is awakening.';
  return `${base} The ${archetype} archetype walks with you.`;
}

// Main function
export async function generateMirrorSummary(input: ReflectionInput): Promise<MirrorOutput> {
  const bpss = detectBPSS(input.text);
  const archetype = mapArchetype(input.text, input.timestamp);
  const threadId = generateThreadId(input.userId, input.timestamp);

  const mirrorReply = generateSummary(input.text, bpss, archetype);
  const showReciprocity = input.text.length > 100;

  return {
    mirrorReply,
    bpss,
    archetype,
    showReciprocity,
    userTitle: input.userId === 'anonymous' ? undefined : 'Seeker of Resonance',
    mythicWhisper: Math.random() < 0.5 ? getRandomWhisper() : undefined,
    threadId
  };
}
