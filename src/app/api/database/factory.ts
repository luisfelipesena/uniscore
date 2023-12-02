import { Pool } from 'pg';

export type User = {
  id: number;
  nome: string;
  email: string;
  senha: string;
};

let poolDb: Pool | null = null;

export const getPoolDb = () => {
  if (!poolDb) {
    poolDb = new Pool({
      connectionString: process.env.POSTGRES_URL + '?sslmode=require',
    });
  }
  return poolDb;
};

export const createTables = async () => {
  const createUserTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      senha VARCHAR(255) NOT NULL
    );
  `;

  const pool = getPoolDb();
  await pool.query(createUserTable);
  console.log('Tabelas criadas ou já existentes.');
};
