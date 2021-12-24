import type { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '@components/Layouts/Layout';
import { seo } from '@config/seo';
import { NextPageWithLayout } from '@ts/types/app';
import { loadTranslation } from '@utils/helpers/i18n';
import HomePageContent from '@content/pages/homepage.mdx';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{seo.homepage.title}</title>
        <meta name="description" content={seo.homepage.description} />
      </Head>
      <HomePageContent />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout isHome={true}>{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(
    ctx.locale!,
    process.env.NODE_ENV === 'production'
  );

  return {
    props: {
      translation,
    },
  };
};

export default Home;
