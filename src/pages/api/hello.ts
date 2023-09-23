import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

export type ResponseData = {
  data: DumbExternalApi[];
};

type DumbExternalApi = {
  ticker: string;
  name: string;
  is_etf: string | null;
  exchange: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const apiResponse = await axios.get(
    'https://dumbstockapi.com/stock?countries=CA,US&ticker_search=AA'
  );
  const data = apiResponse.data;
  res.status(200).json({ data });
}
