import { Button } from '@components/Buttons';
import { getLayout } from '@components/Layouts/Layout';
import PostHeader from '@components/PostHeader/PostHeader';
import PostsList from '@components/PostsList/PostsList';
import { config } from '@config/website';
import { t } from '@lingui/macro';
import { getPublishedPosts } from '@services/graphql/queries';
import { NextPageWithLayout } from '@ts/types/app';
import { PostsList as PostsListData } from '@ts/types/blog';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import Sidebar from '@components/Sidebar/Sidebar';
import { ThematicsList, TopicsList } from '@components/Widgets';
import styles from '@styles/pages/Page.module.scss';
import Spinner from '@components/Spinner/Spinner';

const Search: NextPageWithLayout = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const lastPostRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!router.isReady) return;

    if (router.query?.s && typeof router.query.s === 'string') {
      setQuery(router.query.s);
    }
  }, [router.isReady, router.query.s]);

  const getKey = (pageIndex: number, previousData: PostsListData) => {
    if (previousData && !previousData.posts) return null;

    return pageIndex === 0
      ? { first: config.postsPerPage, searchQuery: query }
      : {
          first: config.postsPerPage,
          after: previousData.pageInfo.endCursor,
          searchQuery: query,
        };
  };

  const { data, error, size, setSize } = useSWRInfinite(
    getKey,
    getPublishedPosts
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore: boolean =
    isLoadingInitialData ||
    (size > 0 && data !== undefined && typeof data[size - 1] === 'undefined');

  const hasNextPage = data && data[data.length - 1].pageInfo.hasNextPage;

  const title = query
    ? t`Search results for: ${query}`
    : t({
        id: 'msg.search',
        comment: 'Search page title',
        message: 'Search',
      });

  const description = query
    ? t`Discover search results for: ${query}`
    : t`Search for a post on ${config.name}.`;

  const head = {
    title: `${title} | ${config.name}`,
    description,
  };

  const loadMorePosts = () => {
    if (lastPostRef.current) {
      lastPostRef.current.focus();
    }
    setSize(size + 1);
  };

  const getPostsList = () => {
    if (error) return t`Failed to load.`;
    if (!data) return <Spinner />;

    return <PostsList ref={lastPostRef} data={data} showYears={false} />;
  };

  return (
    <>
      <Head>
        <title>{head.title}</title>
        <meta name="description" content={head.description} />
      </Head>
      <article
        className={`${styles.article} ${styles['article--no-comments']}`}
      >
        <PostHeader title={title} />
        <div className={styles.body}>
          {getPostsList()}
          {hasNextPage && (
            <Button
              isDisabled={isLoadingMore}
              clickHandler={loadMorePosts}
              position="center"
            >{t`Load more?`}</Button>
          )}
        </div>
        <Sidebar position="right">
          <ThematicsList title={t`Thematics`} />
          <TopicsList title={t`Topics`} />
        </Sidebar>
      </article>
    </>
  );
};

Search.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async (context) => {
  const translation = await loadTranslation(
    context.locale!,
    process.env.NODE_ENV === 'production'
  );

  const breadcrumbTitle = t`Search`;

  return {
    props: {
      breadcrumbTitle,
      translation,
    },
  };
};

export default Search;
