'use client';

import { useState } from 'react';
import { submitNewsletter } from '@/lib/api';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('loading');
    const result = await submitNewsletter({ email, consent });
    setMessage(result.message);
    setStatus(result.success ? 'success' : 'error');
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel space-y-4 p-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm text-slate-200">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
          placeholder="you@planet.org"
        />
      </div>
      <label className="flex items-start gap-3 text-sm text-slate-300">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1 accent-emerald-400"
          required
        />
        I agree to receive regenerative updates and understand I can opt out anytime.
      </label>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 transition disabled:opacity-60"
      >
        {status === 'loading' ? 'Joining...' : 'Join the newsletter'}
      </button>
      {message && (
        <p className={`text-sm ${status === 'success' ? 'text-emerald-200' : 'text-red-200'}`}>{message}</p>
      )}
    </form>
  );
}
