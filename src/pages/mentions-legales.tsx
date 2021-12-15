import Layout from '@components/Layouts/Layout';
import { seo } from '@config/seo';
import { getLegalNoticePage } from '@services/graphql/pages';
import { NextPageWithLayout } from '@ts/types/app';
import { PageProps } from '@ts/types/pages';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';

const LegalNotice: NextPageWithLayout<PageProps> = ({ page }) => {
  return (
    <>
      <Head>
        <title>{seo.legalNotice.title}</title>
        <meta name="description" content={seo.legalNotice.description} />
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

LegalNotice.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const translation = await loadTranslation(
    context.locale!,
    process.env.NODE_ENV === 'production'
  );
  const page = await getLegalNoticePage();

  return {
    props: {
      page,
      translation,
    },
  };
};

export default LegalNotice;
