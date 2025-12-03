import { NextResponse } from 'next/server';
import { submitNewsletter } from '@/lib/api';

export async function POST(request: Request) {
  const body = await request.json();
  const result = await submitNewsletter(body);
  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}
