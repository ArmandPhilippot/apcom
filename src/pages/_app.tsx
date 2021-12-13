import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { AppPropsWithLayout } from '@ts/types/app';
import { initTranslation } from '@utils/helpers/i18n';
import '../styles/globals.scss';

initTranslation(i18n);

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const locale: string = router.locale || router.defaultLocale!;
  const firstRender = useRef(true);

  if (pageProps.translation && firstRender.current) {
    i18n.load(locale, pageProps.translation);
    i18n.activate(locale);
    firstRender.current = false;
  }

  useEffect(() => {
    if (pageProps.translation) {
      i18n.load(locale, pageProps.translation);
      i18n.activate(locale);
    }
  }, [locale, pageProps.translation]);

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <I18nProvider i18n={i18n}>
      {getLayout(<Component {...pageProps} />)}
    </I18nProvider>
  );
}

export default MyApp;
