'use client';

import { useEffect, useState } from 'react';
import { calculateImpact, clampDonation } from '@/lib/calculator';
import { motion } from 'framer-motion';

export function DonationCalculator() {
  const [amount, setAmount] = useState(50);
  const [inputValue, setInputValue] = useState('50');
  const [impact, setImpact] = useState(() => calculateImpact(50));

  useEffect(() => {
    setImpact(calculateImpact(amount));
  }, [amount]);

  const handleAmountChange = (value: number) => {
    const safe = clampDonation(value);
    setAmount(safe);
    setInputValue(String(safe));
  };

  return (
    <div className="glass-panel p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-300">Donation amount</p>
          <p className="text-3xl font-semibold text-white">${amount}</p>
        </div>
        <input
          type="number"
          min={10}
          max={1000}
          value={inputValue}
          onChange={(event) => handleAmountChange(Number(event.target.value))}
          className="w-28 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-right text-white"
        />
      </div>
      <input
        type="range"
        min={10}
        max={1000}
        step={5}
        value={amount}
        onChange={(event) => handleAmountChange(Number(event.target.value))}
        className="w-full accent-emerald-400"
      />
      <div className="grid gap-3 sm:grid-cols-3">
        {impact.map((item) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200"
          >
            <p className="text-lg font-semibold text-white">{item.value.toLocaleString()}</p>
            <p>{item.label}</p>
            <p className="text-xs text-slate-400">{item.description}</p>
          </motion.div>
        ))}
      </div>
      <p className="text-xs text-slate-400">
        Transparent use of funds: 70% on-field implementation, 20% community research, 10% resilient operations.
      </p>
    </div>
  );
}
