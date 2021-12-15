import { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { t } from '@lingui/macro';
import Layout from '@components/Layouts/Layout';
import { seo } from '@config/seo';
import { config } from '@config/website';
import { getPublishedPosts } from '@services/graphql/blog';
import { NextPageWithLayout } from '@ts/types/app';
import { BlogPageProps } from '@ts/types/blog';
import { loadTranslation } from '@utils/helpers/i18n';
import PostsList from '@components/PostsList/PostsList';
import { SWRConfig } from 'swr';

const Blog: NextPageWithLayout<BlogPageProps> = ({ fallback }) => {
  return (
    <>
      <Head>
        <title>{seo.blog.title}</title>
        <meta name="description" content={seo.blog.description} />
      </Head>
      <h1>{t`Blog`}</h1>
      <SWRConfig value={{ fallback }}>
        <PostsList titleLevel={2} />
      </SWRConfig>
    </>
  );
};

Blog.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const translation = await loadTranslation(
    context.locale!,
    process.env.NODE_ENV === 'production'
  );
  const data = await getPublishedPosts({ first: config.postsPerPage });

  return {
    props: {
      fallback: {
        '/api/posts': data,
      },
      translation,
    },
  };
};

export default Blog;
