import { NextResponse } from 'next/server';
import axios from 'axios';

export type DumbApiResponseData = {
  data: DumbExternalApi[];
};

type DumbExternalApi = {
  ticker: string;
  name: string;
  is_etf: string | null;
  exchange: string;
};

export async function GET(
  req: Request
): Promise<NextResponse<DumbApiResponseData>> {
  const url = new URL(req.url);
  console.log({ searchParams: url.searchParams });

  const apiResponse = await axios.get(
    'https://dumbstockapi.com/stock?countries=CA,US&ticker_search=AA'
  );
  const data = apiResponse.data;

  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}

export async function POST(
  req: Request
): Promise<NextResponse<DumbApiResponseData>> {
  const body = await req.json();
  console.log({ body });

  const apiResponse = await axios.get(
    'https://dumbstockapi.com/stock?countries=CA,US&ticker_search=AA'
  );
  const data = apiResponse.data;

  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}
