import axios from 'axios';
import '../styles/globals.scss';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    async function initializeDatabase() {
      try {
        console.log('Creating tables...');
        await axios.post('/api/initDatabase');
        console.log('Tabelas criadas ou já existentes.');
      } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
      }
    }

    initializeDatabase();
  }, []);

  return (
    <>
      <Head>
        <title>Produção científica</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
