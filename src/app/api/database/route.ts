import { ITestTable, database } from '@/services/api/factory';

import { NextResponse } from 'next/server';

export type DatabaseResponseData = {
  data: ITestTable[];
};

export async function GET(
  req: Request
): Promise<NextResponse<DatabaseResponseData>> {
  const url = new URL(req.url);
  console.log({ searchParams: url.searchParams });

  const databaseResponse: ITestTable[] = await database
    .selectFrom('teste')
    .selectAll()
    .execute();

  return NextResponse.json(
    { data: databaseResponse },
    {
      status: 200,
    }
  );
}
