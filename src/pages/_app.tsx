import '../styles/globals.scss';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import axios from 'axios';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useEffect(() => {
    async function initializeDatabase() {
      try {
        await axios.post('/api/initDatabase');
        console.log('Tabelas criadas ou já existentes.');
      } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
      }
    }

    initializeDatabase();
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#62a0ff',
      },
      secondary: {
        main: '#DC3545',
      },
    },
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
    components: {
      MuiDialog: {
        styleOverrides: {
          container: {
            width: '100%',
          },
        },
      },
      MuiModal: {
        styleOverrides: {
          root: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
      },
    },
  });

  return (
    <>
      <Head>
        <title>Produção científica</title>
      </Head>
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
