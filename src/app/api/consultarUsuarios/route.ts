import { NextResponse } from 'next/server';
import { buscarUsuarios } from '../controllers/users/index';
import e from 'express';

export async function GET(
  req: e.Request
): Promise<NextResponse<{ data: any }>> {
  try {
    const usuarios = await buscarUsuarios();

    if (usuarios) {
      return NextResponse.json(
        { data: usuarios },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { data: { mensagem: 'Erro ao buscar usuários' } },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erro ao processar busca de usuários:', error);
    return NextResponse.json(
      { data: { mensagem: 'Erro interno do servidor' } },
      { status: 500 }
    );
  }
}
