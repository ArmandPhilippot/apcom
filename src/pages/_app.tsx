import { config } from '@config/website';
import { AppPropsWithLayout } from '@ts/types/app';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { locale, defaultLocale } = useRouter();
  const appLocale: string = locale || config.locales.defaultLocale;

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
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </IntlProvider>
  );
};

export default MyApp;
