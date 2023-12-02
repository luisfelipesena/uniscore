import { NextResponse } from 'next/server';
import { User } from '../controllers/database/factory';
import { loginUsuario } from '../controllers/users';

export async function POST(
  req: Request
): Promise<NextResponse<{ data: User | unknown }>> {
  try {
    const data = (await req.json()) as User;
    const { email, senha } = data as User;
    const usuarioAutenticado = await loginUsuario({
      email,
      senha,
    });

    return NextResponse.json(
      { data: usuarioAutenticado },
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
