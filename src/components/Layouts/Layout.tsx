import { ReactElement, ReactNode } from 'react';
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import Main from '@components/Main/Main';
import Breadcrumb from '@components/Breadcrumb/Breadcrumb';
import { t } from '@lingui/macro';
import Head from 'next/head';
import { config } from '@config/website';

const Layout = ({
  children,
  isHome = false,
}: {
  children: ReactNode;
  isHome?: boolean;
}) => {
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
      </Head>
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
