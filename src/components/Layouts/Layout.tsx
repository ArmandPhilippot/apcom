import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import Main from '@components/Main/Main';
import Breadcrumb from '@components/Breadcrumb/Breadcrumb';
import { settings } from '@utils/config';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { SearchAction, WebSite, WithContext } from 'schema-dts';
import styles from './Layout.module.scss';

const Layout = ({
  children,
  isHome = false,
}: {
  children: ReactNode;
  isHome?: boolean;
}) => {
  const intl = useIntl();
  const { locale } = useRouter();
  const ref = useRef<HTMLSpanElement>(null);
  const { asPath } = useRouter();

  useEffect(() => {
    ref.current?.focus();
  }, [asPath]);

  const schemaJsonLd: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@id': `${settings.url}`,
    '@type': 'WebSite',
    name: settings.name,
    description: locale?.startsWith('en')
      ? settings.baseline.en
      : settings.baseline.fr,
    url: settings.url,
    author: { '@id': `${settings.url}/#branding` },
    copyrightYear: Number(settings.copyright.startYear),
    creator: { '@id': `${settings.url}/#branding` },
    editor: { '@id': `${settings.url}/#branding` },
    inLanguage: settings.locales.defaultLocale,
    potentialAction: { '@id': `${settings.url}/#search` },
  };

  type QueryAction = SearchAction & {
    'query-input': string;
  };

  const searchActionSchema: QueryAction = {
    '@type': 'SearchAction',
    '@id': `${settings.url}/#search`,
    target: `${settings.url}/recherche?s={query}`,
    query: 'required',
    'query-input': 'required name=query',
  };

  return (
    <>
      <Head>
        <meta property="og:site_name" content={settings.name} />
        <meta
          property="og:locale"
          content={`${settings.locales.defaultLocale}_${settings.locales.defaultCountry}`}
        />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content={settings.twitterId} />
        <meta property="twitter:creator" content={settings.twitterId} />
        <meta
          name="theme-color"
          content="#14578a"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#85bbd6"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="alternate"
          href="/feed.xml"
          type="application/rss+xml"
          title={`${settings.name}'s RSS feed`}
        />
        <link
          rel="alternate"
          href="/atom.xml"
          type="application/atom+xml"
          title={`${settings.name}'s Atom feed`}
        />
        <link
          rel="alternate"
          href="/feed.json"
          type="application/feed+json"
          title={`${settings.name}'s Json feed`}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(searchActionSchema),
          }}
        ></script>
      </Head>
      <noscript>
        <div className={styles['noscript-spacing']}></div>
      </noscript>
      <span ref={ref} tabIndex={-1} />
      <a href="#main" className="screen-reader-text">
        {intl.formatMessage({
          defaultMessage: 'Skip to content',
          description: 'Layout: Skip to content button',
        })}
      </a>
      <Header isHome={isHome} />
      <Main>{children}</Main>
      <Footer />
      <noscript>
        <div className={styles.noscript}>
          {intl.formatMessage({
            defaultMessage:
              'Without Javascript, some features may not work like loading more posts or use search. If you want to benefit from these features, please activate Javascript.',
            description: 'Layout: noscript banner',
          })}
        </div>
      </noscript>
    </>
  );
};

export const getLayout = (page: ReactElement) => {
  const pageTitle: string = page.props.breadcrumbTitle;

  return (
    <Layout>
      <Breadcrumb pageTitle={pageTitle} />
      {page}
    </Layout>
  );
};

export default Layout;
