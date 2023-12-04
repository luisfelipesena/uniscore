import { Pool } from 'pg';

export type User = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  active: boolean;
};

let poolDb: Pool | null = null;

export const getPoolDb = (): Pool => {
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
      senha VARCHAR(255) NOT NULL,
      active BOOLEAN NOT NULL
    );
  `;

  const createAuthorsTable = `
  CREATE TABLE IF NOT EXISTS authors (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    score NUMBER NOT NULL,
    vinculo VARCHAR(255),
    academia VARCHAR(255),
    url VARCHAR(255) NOT NULL,
  );
`;

  const pool = getPoolDb();
  await pool.query(createUserTable);
  await pool.query(createAuthorsTable);
  console.log('Tabelas criadas ou já existentes.');
};
