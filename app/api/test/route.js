import { NextResponse } from 'next/server';

export async function GET(request) {
  return NextResponse.json({ message: 'Message received.' }, { status: 200 });
}
