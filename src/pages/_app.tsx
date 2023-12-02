import '../styles/globals.scss';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ToastProvider from '@/app/components/ToastProvider';
import { AuthProvider } from '@/contexts/auth';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    async function initializeDatabase() {
      try {
        await axios.post('/api/initDatabase');
      } catch (error: any) {
        toast.error(`Erro ao criar tabelas: ${error?.message}`);
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
        <ToastProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </>
  );
}
