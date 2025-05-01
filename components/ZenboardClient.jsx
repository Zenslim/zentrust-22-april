
'use client';

import { useEffect, useState, useRef } from 'react';
import FloatingPrompt from '@/components/FloatingPrompt';
import CelestialBackground from '@/components/CelestialBackground';
import MirrorSummary from '@/components/MirrorSummary';
import VoiceToText from '@/components/VoiceToText';
import ImageUpload from '@/components/ImageUpload';
import { generateMirrorSummary } from '@/lib/mirrorEngine';

export default function ZenboardClient() {
  const [reflection, setReflection] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const inputRef = useRef();

  const handleSubmit = async () => {
    if (!reflection.trim() && !image) return;
    setLoading(true);

    const result = await generateMirrorSummary({
      text: reflection,
      imageMeta: image,
      timestamp: Date.now(),
      userId: 'anonymous',
      celestialPrompt: currentPrompt
    });

    setResponse(result);
    setReflection('');
    setImage(null);
    setLoading(false);
  };

  const [currentPrompt, setCurrentPrompt] = useState('');
  const promptBank = [
    "What dream have you abandoned?",
    "Where does your soul feel most rooted?",
    "What would courage do now?",
    "Who are you beneath it all?",
    "What boundary do you need to honor?",
    "What fear is guarding your rebirth?"
  ];

  useEffect(() => {
    setCurrentPrompt(promptBank[Math.floor(Math.random() * promptBank.length)]);
    const interval = setInterval(() => {
      setCurrentPrompt(promptBank[Math.floor(Math.random() * promptBank.length)]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden text-white">
      <CelestialBackground />

      <div className="absolute top-1/4 w-full text-center px-4 animate-fade-in">
        <FloatingPrompt prompt={currentPrompt} />
      </div>

      <div className="absolute bottom-32 w-full flex flex-col items-center px-4 space-y-2">
        {response && <MirrorSummary summary={response.mirrorReply} />}
        <textarea
          ref={inputRef}
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Type your reflection..."
          className="w-full max-w-xl p-4 text-lg text-white bg-black bg-opacity-50 rounded-lg border border-white/10 backdrop-blur placeholder-white/50"
          rows={3}
        />
        <div className="flex items-center gap-4">
          <VoiceToText onResult={setReflection} />
          <ImageUpload onUpload={setImage} />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-purple-700 hover:bg-purple-800 px-6 py-2 rounded-lg shadow text-white text-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
