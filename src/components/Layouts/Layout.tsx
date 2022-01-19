import { ReactElement, ReactNode, useEffect, useRef } from 'react';
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import Main from '@components/Main/Main';
import Breadcrumb from '@components/Breadcrumb/Breadcrumb';
import { t } from '@lingui/macro';
import Head from 'next/head';
import { config } from '@config/website';
import { useRouter } from 'next/router';
import { WebSite, WithContext } from 'schema-dts';

const Layout = ({
  children,
  isHome = false,
}: {
  children: ReactNode;
  isHome?: boolean;
}) => {
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
    inLanguage: config.defaultLocale,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${config.url}/recherche?s={query}`,
      query: 'required',
    },
  };

  return (
    <>
      <Head>
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
          title={`${config.name}'s RSS feed`}
        />
        <link
          rel="alternate"
          href="/feed.json"
          type="application/feed+json"
          title={`${config.name}'s RSS feed`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        ></script>
      </Head>
      <span ref={ref} tabIndex={-1} />
      <a href="#main" className="screen-reader-text">{t`Skip to content`}</a>
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
