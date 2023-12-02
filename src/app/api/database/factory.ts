import { Pool } from 'pg';

export type User = {
  id: number;
  nome: string;
  email: string;
  senha: string;
};

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});
