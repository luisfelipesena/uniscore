import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, getPoolDb } from '../database/factory';
import { LocalStorageUser } from '@/services/user-storage';

const jwtSecret = process.env.JWT_SECRET || '4queijos';

const pool = getPoolDb();

export async function registrarUsuario(
  bodyParams: Omit<User, 'id'>
): Promise<User> {
  const { nome, email, senha, active } = bodyParams;
  const userQuery = 'SELECT * FROM users WHERE email = $1';
  const userAlreadyExists = await pool.query(userQuery, [email]);
  if (userAlreadyExists.rows[0]) {
    throw new Error('Usuário já existe');
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);
  const query =
    'INSERT INTO users (nome, email, active, senha) VALUES ($1, $2, $3, $4) RETURNING id, nome, email, active';
  const values = [nome, email, active, senhaCriptografada];
  const result = await pool.query<User>(query, values);

  const usuarioRegistrado = result.rows[0];
  return usuarioRegistrado;
}

export async function loginUsuario(
  bodyParams: Omit<User, 'id' | 'nome' | 'active'>
): Promise<LocalStorageUser> {
  const { email, senha } = bodyParams;
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];
  const result = await pool.query(query, values);

  const usuario = result.rows[0];
  if (usuario?.active === false) {
    throw new Error('Usuário não está ativo');
  }

  if (usuario && (await bcrypt.compare(senha, usuario.senha))) {
    const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, jwtSecret);
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      token,
    };
  } else {
    throw new Error('Usuário ou senha incorretos');
  }
}

export async function buscarUsuarioPorId(
  id: string
): Promise<User | undefined> {
  const query = 'SELECT * FROM users WHERE id = $1';
  const result = await pool.query(query, [id]);

  return result.rows[0];
}
