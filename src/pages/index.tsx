import type { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '@components/Layouts/Layout';
import { seo } from '@config/seo';
import { getHomePage } from '@services/graphql/homepage';
import { NextPageWithLayout } from '@ts/types/app';
import { HomePage, HomePageProps } from '@ts/types/homepage';
import { loadTranslation } from '@utils/helpers/i18n';

const Home: NextPageWithLayout<HomePageProps> = ({ data }) => {
  return (
    <>
      <Head>
        <title>{seo.homepage.title}</title>
        <meta name="description" content={seo.homepage.description} />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
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

  const data: HomePage = await getHomePage();

  return {
    props: {
      data,
      translation,
    },
  };
};

export default Home;
