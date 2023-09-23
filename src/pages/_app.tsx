import '../styles/globals.scss';

import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Produção científica</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
