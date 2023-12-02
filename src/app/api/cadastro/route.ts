import { NextResponse } from 'next/server';
import { User } from '../database/factory';
import { registrarUsuario } from '../controllers/user.controller';

export async function POST(
  req: Request
): Promise<NextResponse<{ data: User | unknown }>> {
  try {
    const data = (await req.json()) as User;
    const { email, senha, nome } = data as User;
    const usuarioRegistrado = await registrarUsuario({
      nome,
      email,
      senha,
    });

    return NextResponse.json(
      { data: usuarioRegistrado },
      {
        status: 200,
      }
    );
  } catch (err: any) {
    console.error(err?.message);
    return NextResponse.json(
      { data: undefined },
      {
        status: 500,
        statusText: err?.message ?? 'Erro interno do servidor',
      }
    );
  }
}
