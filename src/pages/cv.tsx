import { getLayout } from '@components/Layouts/Layout';
import ToC from '@components/ToC/ToC';
import { seo } from '@config/seo';
import { NextPageWithLayout } from '@ts/types/app';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import CVContent, { intro, meta } from '@content/pages/cv.mdx';
import PostHeader from '@components/PostHeader/PostHeader';
import { ArticleMeta } from '@ts/types/articles';

const CV: NextPageWithLayout = () => {
  const dates = {
    publication: meta.publishedOn,
    update: meta.updatedOn,
  };

  const pageMeta: ArticleMeta = {
    dates,
  };

  return (
    <>
      <Head>
        <title>{seo.cv.title}</title>
        <meta name="description" content={seo.cv.description} />
      </Head>
      <article>
        <PostHeader intro={intro} meta={pageMeta} title={meta.title} />
        <aside>
          <ToC />
        </aside>
        <div>
          <CVContent />
        </div>
      </article>
    </>
  );
};

CV.getLayout = getLayout;

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

export default CV;
