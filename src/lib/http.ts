import { NextResponse } from 'next/server';

export async function withJson<T>(fn: () => Promise<T>) {
  try {
    return NextResponse.json(await fn());
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
