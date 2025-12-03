export type DonationImpact = {
  label: string;
  description: string;
  value: number;
};

const impactPresets: DonationImpact[] = [
  { label: 'Watershed restored', description: 'm² of watershed brought back to life', value: 5 },
  { label: 'Farmers trained', description: 'farmers equipped with regenerative tools', value: 2 },
  { label: 'Research plots', description: 'community-led research plots funded', value: 1 },
];

export function calculateImpact(amount: number): DonationImpact[] {
  const normalized = Math.max(amount, 0);
  const scale = normalized / 25;

  return impactPresets.map((preset, index) => {
    const multiplier = 1 + index * 0.35;
    return {
      ...preset,
      value: Math.round(preset.value * scale * multiplier),
    };
  });
}

export function clampDonation(amount: number, min = 10, max = 1000): number {
  if (Number.isNaN(amount)) return min;
  return Math.min(Math.max(amount, min), max);
}
