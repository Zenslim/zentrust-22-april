import { NextResponse } from 'next/server';

export async function POST() {
  // Stub webhook receiver for auto-deploy after CMS edits
  return NextResponse.json({ received: true, action: 'redeploy_queued' });
}
