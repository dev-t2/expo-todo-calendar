import { memo } from 'react';
import { AppProps } from 'next/app';

import '../styles/tailwind.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default memo(MyApp);
