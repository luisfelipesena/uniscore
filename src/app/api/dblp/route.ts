import { NextResponse } from 'next/server';
import { DBLPData, consultarDadosDBLP } from '../controllers/dblp/index';

export async function GET(
  req: Request
): Promise<NextResponse<{ data: DBLPData | undefined }>> {
  const url = new URL(req.url);
  const autor = url.searchParams.get('autor') || '';

  try {
    const dadosDBLP = await consultarDadosDBLP(autor);
    if (!dadosDBLP) {
      throw new Error('Autor não encontrado');
    }

    return NextResponse.json({ data: dadosDBLP }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: undefined }, { status: 500 });
  }
}
