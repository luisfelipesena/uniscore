import { NextResponse } from 'next/server';
import { User } from '../controllers/database/factory';
import { loginUsuario } from '../controllers/users';
import { LocalStorageUser } from '@/services/user-storage';

export async function POST(
  req: Request
): Promise<NextResponse<LocalStorageUser | undefined>> {
  try {
    const data = (await req.json()) as User;
    const { email, senha } = data as User;
    const dadosUsuario = await loginUsuario({
      email,
      senha,
    });

    return NextResponse.json(dadosUsuario, {
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json(undefined, {
      status: 500,
      statusText: err?.message ?? 'Erro interno do servidor',
    });
  }
}
