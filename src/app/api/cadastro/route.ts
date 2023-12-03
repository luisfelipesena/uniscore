import { NextResponse } from 'next/server';
import { User } from '../controllers/database/factory';
import { registrarUsuario } from '../controllers/users';

export async function POST(
  req: Request
): Promise<NextResponse<{ data: User | undefined }>> {
  try {
    const data = (await req.json()) as User;
    const { email, senha, nome } = data as User;
    const usuarioRegistrado = await registrarUsuario({
      nome,
      email,
      senha,
      active: false,
    });

    return NextResponse.json(
      { data: usuarioRegistrado },
      {
        status: 200,
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { data: undefined },
      {
        status: 500,
        statusText: err?.message ?? 'Erro interno do servidor',
      }
    );
  }
}
