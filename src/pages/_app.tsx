import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import '../styles/globals.scss';
import { type AppPropsWithLayout } from '../types';
import { settings } from '../utils/config';
import { AckeeProvider, PrismThemeProvider } from '../utils/providers';

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { locale, defaultLocale } = useRouter();
  const appLocale: string = locale || settings.locales.defaultLocale;
  const getLayout = Component.getLayout ?? ((page) => page);
  const { translation, ...componentProps } = pageProps;

  return (
    <AckeeProvider domain={settings.ackee.url} siteId={settings.ackee.siteId}>
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
    </AckeeProvider>
  );
};

export default App;
