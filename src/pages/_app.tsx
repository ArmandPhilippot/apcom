import { AppPropsWithLayout } from '@ts/types/app';
import { settings } from '@utils/config';
import { AckeeProvider } from '@utils/providers/ackee';
import { PrismThemeProvider } from '@utils/providers/prism';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { locale, defaultLocale } = useRouter();
  const appLocale: string = locale || settings.locales.defaultLocale;

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <AckeeProvider domain={settings.ackee.url} siteId={settings.ackee.siteId}>
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
    </AckeeProvider>
  );
};

export default MyApp;
