import { useEffect } from 'react';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { AppPropsWithLayout } from '@ts/types/app';
import { activateLocale, defaultLocale, initLingui } from '@utils/helpers/i18n';
import '../styles/globals.scss';
import { ThemeProvider } from 'next-themes';

initLingui(defaultLocale);

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const locale: string = pageProps.locale || defaultLocale;

  useEffect(() => {
    activateLocale(locale, pageProps.translation);
  });

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <I18nProvider i18n={i18n}>
      <ThemeProvider
        defaultTheme="system"
        enableColorScheme={true}
        enableSystem={true}
      >
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </I18nProvider>
  );
};

export default MyApp;
