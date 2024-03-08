import {Inter} from 'next/font/google';
import {ReactElement, ReactNode} from 'react';
import {NextPage} from 'next';
import {AppProps} from 'next/app';
import MainContext from '@/providers/MainContext';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {appWithTranslation} from 'next-i18next';
import '../styles/globals.css';

const myFont = Inter({subsets: ['latin']});

import localFont from 'next/font/local';
import {useRouter} from 'next/router';

const FaFont = localFont({src: '../assets/fonts/IRANSans.ttf'});

export type NextPageWithLayout<Props> = NextPage<Props> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<Props> = AppProps & {
  Component: NextPageWithLayout<Props>;
};

function App({Component, pageProps}: AppPropsWithLayout<any>) {
  const {locale} = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <div className={locale === 'en' ? myFont.className : FaFont.className}>
      <MainContext>{getLayout(<Component {...pageProps} />)}</MainContext>{' '}
      <ToastContainer />
    </div>
  );
}

export default appWithTranslation(App);
