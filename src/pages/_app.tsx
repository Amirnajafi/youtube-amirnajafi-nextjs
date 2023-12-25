import {ReactElement, ReactNode} from 'react';
import {NextPage} from 'next';
import {AppProps} from 'next/app';
import MainContext from '@/providers/MainContext';
import '../styles/globals.css';
import localFont from 'next/font/local';

const myFont = localFont({src: '../assets/fonts/IRANSans.ttf'});

export type NextPageWithLayout<Props> = NextPage<Props> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<Props> = AppProps & {
  Component: NextPageWithLayout<Props>;
};

function App({Component, pageProps}: AppPropsWithLayout<any>) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <div className={myFont.className}>
      <MainContext>{getLayout(<Component {...pageProps} />)}</MainContext>
    </div>
  );
}

export default App;
