import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../database/db';

interface AuthRequest extends Request {
  user?: { id: number; nome: string; email: string };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensagem: 'Token de autenticação não fornecido.' });
  }

  jwt.verify(token, process.env.JWT_SECRET || '4queijos', async (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
    }

    const usuarioId = (decoded as any).id;
    try {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [usuarioId]);
      const usuario = result.rows[0];

      if (!usuario) {
        return res.status(401).json({ mensagem: 'Usuário não encontrado.' });
      }

      req.user = { id: usuario.id, nome: usuario.nome, email: usuario.email };
      next();
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
      return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
  });
}
