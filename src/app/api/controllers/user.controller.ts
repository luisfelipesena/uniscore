import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../database/db'
const jwtSecret = process.env.JWT_SECRET || '4queijos';

export async function registrarUsuario(req: Request, res: Response) {
  const { nome, email, senha } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const query = 'INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email';
    const values = [nome, email, senhaCriptografada];
    const result = await pool.query(query, values);

    const usuarioRegistrado = result.rows[0];
    res.status(201).json(usuarioRegistrado);
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

export async function loginUsuario(req: Request, res: Response) {
  const { email, senha } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);

    const usuario = result.rows[0];
    if (usuario && await bcrypt.compare(senha, usuario.senha)) {
      const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, jwtSecret, { expiresIn: '8h' });
      res.json({ usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }, token });
    } else {
      res.status(401).json({ mensagem: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}
