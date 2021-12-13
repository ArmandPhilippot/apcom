import { AppPropsWithLayout } from '@ts/types/app';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
