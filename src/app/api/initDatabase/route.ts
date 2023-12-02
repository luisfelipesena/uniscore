import { NextResponse } from 'next/server';
import { createTables } from '../database/factory';

export async function POST(): Promise<NextResponse> {
  await createTables();
  return NextResponse.json(
    { data: true },
    {
      status: 200,
    }
  );
}
