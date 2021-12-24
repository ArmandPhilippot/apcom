import { getLayout } from '@components/Layouts/Layout';
import ToC from '@components/ToC/ToC';
import { seo } from '@config/seo';
import { NextPageWithLayout } from '@ts/types/app';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import LegalNoticeContent, { meta } from '@content/pages/legal-notice.mdx';

const LegalNotice: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{seo.legalNotice.title}</title>
        <meta name="description" content={seo.legalNotice.description} />
      </Head>
      <article>
        <header>
          <h1>{meta.title}</h1>
        </header>
        <ToC />
        <LegalNoticeContent />
      </article>
    </>
  );
};

LegalNotice.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const translation = await loadTranslation(
    context.locale!,
    process.env.NODE_ENV === 'production'
  );
  const breadcrumbTitle = meta.title;

  return {
    props: {
      breadcrumbTitle,
      translation,
    },
  };
};

export default LegalNotice;
