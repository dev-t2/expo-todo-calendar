import { memo } from 'react';
import { AppProps } from 'next/app';

import '../styles/tailwind.css';
import Header from '../components/Header';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default memo(MyApp);
