import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import { IntlProvider } from 'react-intl';
import '../styles/globals.scss';
import type { AppPropsWithLayout } from '../types';
import { settings } from '../utils/config';
import { STORAGE_KEY } from '../utils/constants';
import {
  AckeeProvider,
  MotionProvider,
  PrismThemeProvider,
} from '../utils/providers';

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { locale, defaultLocale } = useRouter();
  const appLocale: string = locale ?? settings.locales.defaultLocale;
  const getLayout = Component.getLayout ?? ((page) => page);
  const { translation, ...componentProps } = pageProps;

  return (
    <AckeeProvider
      domainId={settings.ackee.siteId}
      server={settings.ackee.url}
      storageKey={STORAGE_KEY.ACKEE}
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
            defaultTheme="system"
            enableColorScheme={true}
            enableSystem={true}
          >
            <PrismThemeProvider>
              {getLayout(<Component {...componentProps} />, {})}
            </PrismThemeProvider>
          </ThemeProvider>
        </IntlProvider>
      </MotionProvider>
    </AckeeProvider>
  );
};

export default App;
