import { settings } from '@utils/config';
import { AckeeProvider } from '@utils/providers/ackee';
import { PrismThemeProvider } from '@utils/providers/prism-theme';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import '../styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => {
  const { locale, defaultLocale } = useRouter();
  const appLocale: string = locale || settings.locales.defaultLocale;

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
            <Component {...pageProps} />
          </PrismThemeProvider>
        </ThemeProvider>
      </IntlProvider>
    </AckeeProvider>
  );
};

export default App;
