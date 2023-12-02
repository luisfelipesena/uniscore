import { NextResponse } from 'next/server';
import { consultarDadosDBLP } from '../controllers/dblp/index';

export async function GETConsultarDadosDBLP(
  req: Request
): Promise<NextResponse<{ data: any }>> {
    const url = new URL(req.url);
    const autor = url.searchParams.get('autor') || '';

  try {
    const dadosDBLP = await consultarDadosDBLP(autor);

    if (dadosDBLP) {
      return NextResponse.json(
        { data: dadosDBLP },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { data: { mensagem: 'Erro ao consultar dados da DBLP' } },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erro ao processar consulta à DBLP:', error);
    return NextResponse.json(
      { data: { mensagem: 'Erro interno do servidor' } },
      { status: 500 }
    );
  }
}
