import { ImpactMetrics, NewsletterPayload } from './types';

export async function submitNewsletter(payload: NewsletterPayload): Promise<{ success: boolean; message: string }>
{
  await new Promise((resolve) => setTimeout(resolve, 300));
  if (!payload.email.includes('@')) {
    return { success: false, message: 'Please provide a valid email.' };
  }
  return { success: true, message: 'You are on the list for regenerative news.' };
}

export async function fetchLiveImpact(): Promise<ImpactMetrics> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return {
    treesPlanted: 128430,
    householdsSupported: 8420,
    acresRestored: 1567,
    volunteersEngaged: 3240,
    researchProjects: 48,
  };
}

export async function createDonationIntent(amount: number): Promise<{ clientSecret: string }>
{
  await new Promise((resolve) => setTimeout(resolve, 150));
  return { clientSecret: `stripe_test_secret_${Math.round(amount)}` };
}
