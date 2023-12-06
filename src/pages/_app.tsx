import {ReactElement, ReactNode} from 'react';
import {NextPage} from 'next';
import {AppProps} from 'next/app';
import MainContext from '@/providers/MainContext';

export type NextPageWithLayout<Props> = NextPage<Props> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<Props> = AppProps & {
  Component: NextPageWithLayout<Props>;
};
function App({Component, pageProps}: AppPropsWithLayout<any>) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return <MainContext>{getLayout(<Component {...pageProps} />)}</MainContext>;
}

export default App;
