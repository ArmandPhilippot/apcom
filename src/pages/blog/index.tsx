import { GetStaticProps } from 'next';
import Head from 'next/head';
import { t } from '@lingui/macro';
import { getLayout } from '@components/Layouts/Layout';
import { seo } from '@config/seo';
import { config } from '@config/website';
import { NextPageWithLayout } from '@ts/types/app';
import { BlogPageProps, PostsList as PostsListData } from '@ts/types/blog';
import { loadTranslation } from '@utils/helpers/i18n';
import PostsList from '@components/PostsList/PostsList';
import useSWRInfinite from 'swr/infinite';
import { Button } from '@components/Buttons';
import { getPublishedPosts } from '@services/graphql/queries';

const Blog: NextPageWithLayout<BlogPageProps> = ({ fallback }) => {
  const getKey = (pageIndex: number, previousData: PostsListData) => {
    if (previousData && !previousData.posts) return null;

    return pageIndex === 0
      ? { first: config.postsPerPage }
      : {
          first: config.postsPerPage,
          after: previousData.pageInfo.endCursor,
        };
  };

  const { data, error, size, setSize } = useSWRInfinite(
    getKey,
    getPublishedPosts,
    { fallback }
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore: boolean =
    isLoadingInitialData ||
    (size > 0 && data !== undefined && typeof data[size - 1] === 'undefined');

  if (error) return <div>{t`Failed to load.`}</div>;
  if (!data) return <div>{t`Loading...`}</div>;

  const hasNextPage = data && data[data.length - 1].pageInfo.hasNextPage;

  return (
    <>
      <Head>
        <title>{seo.blog.title}</title>
        <meta name="description" content={seo.blog.description} />
      </Head>
      <h1>{t`Blog`}</h1>
      <PostsList data={data} showYears={true} />
      {hasNextPage && (
        <Button
          isDisabled={isLoadingMore}
          clickHandler={() => setSize(size + 1)}
          position="center"
        >{t`Load more?`}</Button>
      )}
    </>
  );
};

Blog.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async (context) => {
  const translation = await loadTranslation(
    context.locale!,
    process.env.NODE_ENV === 'production'
  );
  const data = await getPublishedPosts({ first: config.postsPerPage });
  const breadcrumbTitle = t`Blog`;

  return {
    props: {
      breadcrumbTitle,
      fallback: {
        '/api/posts': data,
      },
      translation,
    },
  };
};

export default Blog;
