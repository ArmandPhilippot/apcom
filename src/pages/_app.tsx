import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import '../styles/globals.scss';
import type { AppPropsWithLayout } from '../types';
import { CONFIG } from '../utils/config';
import { PRISM_THEME_ATTRIBUTE, STORAGE_KEY } from '../utils/constants';
import {
  AckeeProvider,
  MotionProvider,
  PrismThemeProvider,
  ThemeProvider,
} from '../utils/providers';

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { locale, defaultLocale } = useRouter();
  const appLocale: string = locale ?? CONFIG.locales.defaultLocale;
  const getLayout = Component.getLayout ?? ((page) => page);
  const { translation, ...componentProps } = pageProps;

  return (
    <AckeeProvider
      domainId={CONFIG.ackee.siteId}
      server={CONFIG.ackee.url}
      storageKey={STORAGE_KEY.ACKEE}
      // eslint-disable-next-line react/jsx-no-literals
      tracking="full"
    >
      <MotionProvider
        attribute={STORAGE_KEY.MOTION}
        storageKey={STORAGE_KEY.MOTION}
      >
        <IntlProvider
          locale={appLocale}
          defaultLocale={defaultLocale}
          messages={translation}
        >
          <ThemeProvider
            attribute={STORAGE_KEY.THEME}
            storageKey={STORAGE_KEY.THEME}
          >
            <PrismThemeProvider
              attribute={PRISM_THEME_ATTRIBUTE}
              storageKey={STORAGE_KEY.PRISM}
            >
              {getLayout(<Component {...componentProps} />, {})}
            </PrismThemeProvider>
          </ThemeProvider>
        </IntlProvider>
      </MotionProvider>
    </AckeeProvider>
  );
};

export default App;
