'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { fetchLiveImpact } from '@/lib/api';
import { ImpactMetrics } from '@/lib/types';

const labels: { key: keyof ImpactMetrics; label: string }[] = [
  { key: 'treesPlanted', label: 'Trees planted' },
  { key: 'householdsSupported', label: 'Households supported' },
  { key: 'acresRestored', label: 'Acres restored' },
  { key: 'volunteersEngaged', label: 'Volunteers engaged' },
  { key: 'researchProjects', label: 'Research projects funded' },
];

function CounterCard({ label, value }: { label: string; value: number }) {
  const motionValue = useSpring(0, { damping: 20, stiffness: 120 });
  const rounded = useTransform(motionValue, (val) => Math.floor(val).toLocaleString());

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6"
    >
      <p className="text-sm text-slate-300">{label}</p>
      <motion.p className="text-3xl font-semibold text-white">{rounded}</motion.p>
    </motion.div>
  );
}

export function ImpactCounters() {
  const [metrics, setMetrics] = useState<ImpactMetrics | null>(null);

  useEffect(() => {
    fetchLiveImpact().then(setMetrics);
  }, []);

  return (
    <div className="card-grid">
      {labels.map((item) => (
        <CounterCard key={item.key} label={item.label} value={metrics ? metrics[item.key] : 0} />
      ))}
    </div>
  );
}
