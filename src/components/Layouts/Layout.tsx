import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import Main from '@components/Main/Main';
import Breadcrumb from '@components/Breadcrumb/Breadcrumb';
import { config } from '@config/website';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { WebSite, WithContext } from 'schema-dts';

const Layout = ({
  children,
  isHome = false,
}: {
  children: ReactNode;
  isHome?: boolean;
}) => {
  const intl = useIntl();
  const ref = useRef<HTMLSpanElement>(null);
  const { asPath } = useRouter();

  useEffect(() => {
    ref.current?.focus();
  }, [asPath]);

  const schemaJsonLd: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@id': `${config.url}`,
    '@type': 'WebSite',
    name: config.name,
    description: config.baseline,
    url: config.url,
    author: { '@id': `${config.url}/#branding` },
    copyrightYear: Number(config.copyright.startYear),
    creator: { '@id': `${config.url}/#branding` },
    editor: { '@id': `${config.url}/#branding` },
    inLanguage: config.locales.defaultLocale,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${config.url}/recherche?s={query}`,
      query: 'required',
    },
  };

  return (
    <>
      <Head>
        <meta property="og:site_name" content={config.name} />
        <meta
          property="og:locale"
          content={`${config.locales.defaultLocale}_${config.locales.defaultCountry}`}
        />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content={config.twitterId} />
        <meta property="twitter:creator" content={config.twitterId} />
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
          title={`${config.name}'s RSS feed`}
        />
        <link
          rel="alternate"
          href="/atom.xml"
          type="application/atom+xml"
          title={`${config.name}'s Atom feed`}
        />
        <link
          rel="alternate"
          href="/feed.json"
          type="application/feed+json"
          title={`${config.name}'s Json feed`}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        ></script>
      </Head>
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
