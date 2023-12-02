import { NextResponse } from 'next/server';
import { User } from '../database/factory';
import { registrarUsuario } from '../controllers/user.controller';
import e from 'express';

export async function POST(
  req: e.Request
): Promise<NextResponse<{ data: User | undefined }>> {
  const { email, senha, nome } = req.body as User;
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
}
