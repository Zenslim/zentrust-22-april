import { NextResponse } from 'next/server';
import { createDonationIntent } from '@/lib/api';

export async function POST(request: Request) {
  const { amount } = await request.json();
  const intent = await createDonationIntent(Number(amount));
  return NextResponse.json(intent);
}
