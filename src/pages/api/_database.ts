import { createKysely } from '@vercel/postgres-kysely';

export interface ITestTable {
  id: number;
  name: string;
}

export interface IDatabase {
  teste: ITestTable;
}

export const database = createKysely<IDatabase>();
