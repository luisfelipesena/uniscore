import { ITestTable, database } from './_database';
import type { NextApiRequest, NextApiResponse } from 'next';

export type ResponseData = {
  response: ITestTable[];
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const teste = await database.selectFrom('teste').selectAll().execute();
  return res.status(200).json({ response: teste });
}
