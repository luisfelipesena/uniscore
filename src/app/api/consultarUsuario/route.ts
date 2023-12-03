import { NextResponse } from 'next/server';
import { buscarUsuarioPorId } from '../controllers/users';
import { User } from '../controllers/database/factory';

export async function GET(
  req: Request
): Promise<NextResponse<{ data: User | undefined }>> {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id') ?? '';
    const usuario = await buscarUsuarioPorId(id);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    return NextResponse.json({ data: usuario }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: undefined }, { status: 500 });
  }
}
