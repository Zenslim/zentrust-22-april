import { NextResponse } from 'next/server';
import { fetchLiveImpact } from '@/lib/api';

export const runtime = 'edge';

export async function GET() {
  const metrics = await fetchLiveImpact();
  return NextResponse.json(metrics, { headers: { 'cache-control': 's-maxage=60' } });
}
