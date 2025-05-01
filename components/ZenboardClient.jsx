'use client';

import { useEffect, useState, useRef } from 'react';
import PlanetMessenger from '@/components/PlanetMessengerV3';
import CelestialBackground from '@/components/CelestialBackground';
import VoiceToText from '@/components/VoiceToText';
import ImageUpload from '@/components/ImageUpload';
import MirrorSummaryDrawer from '@/components/MirrorSummaryDrawer';
import { generateMirrorSummary } from '@/lib/mirrorEngine';

export default function ZenboardClient() {
  const [reflection, setReflection] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    setDrawerOpen(true);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden text-white">
      <CelestialBackground />

      <div className="absolute top-1/4 w-full flex justify-center px-4 animate-fade-in">
        <PlanetMessenger
          onPromptChange={setCurrentPrompt}
          reflectionSubmitted={!!response}
        />
      </div>

      <div className="absolute bottom-32 w-full flex flex-col items-center px-4 space-y-2">
        {response && (
          <div className="text-center space-y-2">
            <p className="text-purple-300 italic text-lg">{response.mirrorReply}</p>
            {response.mythicWhisper && (
              <p className="text-sm text-gray-400">{response.mythicWhisper}</p>
            )}
            {response.userTitle && (
              <p className="text-xs text-gray-500 mt-2">{response.userTitle}</p>
            )}
          </div>
        )}

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
            className={`px-6 py-2 rounded-lg shadow text-white text-lg transition-all duration-300 ${
              loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-purple-700 hover:bg-purple-800'
            }`}
          >
            {loading ? '✨ Generating your mirror…' : 'Send'}
          </button>
        </div>
      </div>

      <MirrorSummaryDrawer
        summary={response?.mirrorSummary || ''}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
