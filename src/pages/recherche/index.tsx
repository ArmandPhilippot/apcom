import { Button } from '@components/Buttons';
import { getLayout } from '@components/Layouts/Layout';
import PaginationCursor from '@components/PaginationCursor/PaginationCursor';
import PostHeader from '@components/PostHeader/PostHeader';
import PostsList from '@components/PostsList/PostsList';
import Sidebar from '@components/Sidebar/Sidebar';
import Spinner from '@components/Spinner/Spinner';
import { ThematicsList, TopicsList } from '@components/Widgets';
import { getPublishedPosts } from '@services/graphql/queries';
import styles from '@styles/pages/Page.module.scss';
import { NextPageWithLayout } from '@ts/types/app';
import { PostsList as PostsListData } from '@ts/types/blog';
import { settings } from '@utils/config';
import { getIntlInstance, loadTranslation } from '@utils/helpers/i18n';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import useSWRInfinite from 'swr/infinite';

const Search: NextPageWithLayout = () => {
  const intl = useIntl();
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
      ? { first: settings.postsPerPage, searchQuery: query }
      : {
          first: settings.postsPerPage,
          after: previousData.pageInfo.endCursor,
          searchQuery: query,
        };
  };

  const { data, error, size, setSize } = useSWRInfinite(
    getKey,
    getPublishedPosts
  );
  const [totalPostsCount, setTotalPostsCount] = useState<number>(0);

  useEffect(() => {
    if (data) setTotalPostsCount(data[0].pageInfo.total);
  }, [data]);

  const [loadedPostsCount, setLoadedPostsCount] = useState<number>(
    settings.postsPerPage
  );

  useEffect(() => {
    if (data && data.length > 0) {
      const newCount =
        settings.postsPerPage +
        data[0].pageInfo.total -
        data[data.length - 1].pageInfo.total;
      setLoadedPostsCount(newCount);
    }
  }, [data]);

  const isLoadingInitialData = !data && !error;
  const isLoadingMore: boolean =
    isLoadingInitialData ||
    (size > 0 && data !== undefined && typeof data[size - 1] === 'undefined');

  const hasNextPage = data && data[data.length - 1].pageInfo.hasNextPage;

  const title = query
    ? intl.formatMessage(
        {
          defaultMessage: 'Search results for {query}',
          description: 'SearchPage: search results text',
          id: 'VSGuGE',
        },
        { query }
      )
    : intl.formatMessage({
        defaultMessage: 'Search',
        description: 'SearchPage: page title',
        id: 'U+35YD',
      });

  const description = query
    ? intl.formatMessage(
        {
          defaultMessage: 'Discover search results for {query}',
          description: 'SearchPage: meta description with query',
          id: 'A4LTGq',
        },
        { query }
      )
    : intl.formatMessage(
        {
          defaultMessage: 'Search for a post on {websiteName}',
          description: 'SearchPage: meta description without query',
          id: 'PrIz5o',
        },
        { websiteName: settings.name }
      );

  const head = {
    title: `${title} | ${settings.name}`,
    description,
  };

  const loadMorePosts = () => {
    if (lastPostRef.current) {
      lastPostRef.current.focus();
    }
    setSize(size + 1);
  };

  const getPostsList = () => {
    if (error)
      return intl.formatMessage({
        defaultMessage: 'Failed to load.',
        description: 'SearchPage: failed to load text',
        id: 'fOe8rH',
      });
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
        <PostHeader title={title} meta={{ results: totalPostsCount }} />
        <div className={styles.body}>
          {getPostsList()}
          {hasNextPage && (
            <>
              <PaginationCursor
                current={loadedPostsCount}
                total={totalPostsCount}
              />
              <Button
                isDisabled={isLoadingMore}
                clickHandler={loadMorePosts}
                position="center"
                spacing={true}
              >
                {intl.formatMessage({
                  defaultMessage: 'Load more?',
                  description: 'SearchPage: load more text',
                  id: 'pEtJik',
                })}
              </Button>
            </>
          )}
        </div>
        <Sidebar position="right">
          <ThematicsList
            title={intl.formatMessage({
              defaultMessage: 'Thematics',
              description: 'SearchPage: thematics list widget title',
              id: 'Dq6+WH',
            })}
          />
          <TopicsList
            title={intl.formatMessage({
              defaultMessage: 'Topics',
              description: 'SearchPage: topics list widget title',
              id: 'N804XO',
            })}
          />
        </Sidebar>
      </article>
    </>
  );
};

Search.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const intl = await getIntlInstance();
  const breadcrumbTitle = intl.formatMessage({
    defaultMessage: 'Search',
    description: 'SearchPage: breadcrumb item',
    id: 'TfU6Qm',
  });
  const { locale } = context;
  const translation = await loadTranslation(locale);

  return {
    props: {
      breadcrumbTitle,
      locale,
      translation,
    },
  };
};

export default Search;
