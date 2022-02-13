import * as matomo from '@socialgouv/matomo-next';
import { AppPropsWithLayout } from '@ts/types/app';
import { settings } from '@utils/config';
import { PrismThemeProvider } from '@utils/providers/prism';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { locale, defaultLocale } = useRouter();
  const appLocale: string = locale || settings.locales.defaultLocale;

  useEffect(() => {
    matomo.init({
      url: settings.matomo.urlBase,
      siteId: settings.matomo.siteId,
    });
  }, []);

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <IntlProvider
      locale={appLocale}
      defaultLocale={defaultLocale}
      messages={pageProps.translation}
    >
      <ThemeProvider
        defaultTheme="system"
        enableColorScheme={true}
        enableSystem={true}
      >
        <PrismThemeProvider>
          {getLayout(<Component {...pageProps} />)}
        </PrismThemeProvider>
      </ThemeProvider>
    </IntlProvider>
  );
};

export default MyApp;
