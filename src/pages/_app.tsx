import '../styles/globals.scss';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ToastProvider from '@/app/components/ToastProvider';
import { AuthProvider } from '@/contexts/auth';
import { Layout } from '@/layouts/PageLayout';
import { DefaultHeader } from '@/layouts/DefaultHeader';
import { DefaultFooter } from '@/layouts/DefaultFooter';

import backgroundImage from '../../public/home-background.svg';

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
        main: '#394867',
      },
      secondary: {
        main: '#DC3545',
      },
    },
    typography: {
      fontFamily: 'Montserrat, sans-serif',
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
    <React.Fragment>
      <Head>
        <title>UniScore</title>
      </Head>

      <ThemeProvider theme={theme}>
        <ToastProvider>
          <AuthProvider>
            <Layout
              style={{
                backgroundImage: `url(${backgroundImage.src})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <DefaultHeader />

              <Component {...pageProps} />

              <DefaultFooter />
            </Layout>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
