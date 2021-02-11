import { memo } from 'react';
import { AppProps } from 'next/app';

import '../styles/tailwind.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex-1">
        <Component {...pageProps} />
      </div>

      <Footer />
    </div>
  );
};

export default memo(MyApp);
