import Layout from '@components/Layouts/Layout';
import { seo } from '@config/seo';
import { getPageByUri } from '@services/graphql/queries';
import { NextPageWithLayout } from '@ts/types/app';
import { PageProps } from '@ts/types/pages';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';

const CV: NextPageWithLayout<PageProps> = ({ page }) => {
  return (
    <>
      <Head>
        <title>{seo.cv.title}</title>
        <meta name="description" content={seo.cv.description} />
      </Head>
      <article>
        <header>
          <h1>{page.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: page.intro }}></div>
        </header>
        <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
      </article>
    </>
  );
};

CV.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const translation = await loadTranslation(
    context.locale!,
    process.env.NODE_ENV === 'production'
  );
  const page = await getPageByUri('/cv/');

  return {
    props: {
      page,
      translation,
    },
  };
};

export default CV;
