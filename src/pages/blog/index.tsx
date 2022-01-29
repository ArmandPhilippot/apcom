import { Button } from '@components/Buttons';
import { getLayout } from '@components/Layouts/Layout';
import PaginationCursor from '@components/PaginationCursor/PaginationCursor';
import PostHeader from '@components/PostHeader/PostHeader';
import PostsList from '@components/PostsList/PostsList';
import Sidebar from '@components/Sidebar/Sidebar';
import Spinner from '@components/Spinner/Spinner';
import { ThematicsList, TopicsList } from '@components/Widgets';
import { config } from '@config/website';
import { getPublishedPosts } from '@services/graphql/queries';
import styles from '@styles/pages/Page.module.scss';
import { NextPageWithLayout } from '@ts/types/app';
import { BlogPageProps, PostsList as PostsListData } from '@ts/types/blog';
import { getIntlInstance, loadTranslation } from '@utils/helpers/i18n';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Blog as BlogSchema, Graph, WebPage } from 'schema-dts';
import useSWRInfinite from 'swr/infinite';

const Blog: NextPageWithLayout<BlogPageProps> = ({ fallback }) => {
  const intl = useIntl();
  const lastPostRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();

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
  const [totalPostsCount, setTotalPostsCount] = useState<number>(0);

  useEffect(() => {
    if (data) setTotalPostsCount(data[0].pageInfo.total);
  }, [data]);

  const [loadedPostsCount, setLoadedPostsCount] = useState<number>(
    config.postsPerPage
  );

  useEffect(() => {
    if (data && data.length > 0) {
      const newCount =
        config.postsPerPage +
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
        description: 'BlogPage: failed to load text',
      });
    if (!data) return <Spinner />;

    return <PostsList ref={lastPostRef} data={data} showYears={true} />;
  };

  const pageTitle = intl.formatMessage(
    {
      defaultMessage: 'Blog: development, open source - {websiteName}',
      description: 'BlogPage: SEO - Page title',
    },
    { websiteName: config.name }
  );
  const pageDescription = intl.formatMessage(
    {
      defaultMessage:
        "Discover {websiteName}'s writings. He talks about web development, Linux and open source mostly.",
      description: 'BlogPage: SEO - Meta description',
    },
    { websiteName: config.name }
  );
  const pageUrl = `${config.url}${router.asPath}`;

  const webpageSchema: WebPage = {
    '@id': `${pageUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${config.url}/#breadcrumb` },
    name: pageTitle,
    description: pageDescription,
    inLanguage: config.locales.defaultLocale,
    reviewedBy: { '@id': `${config.url}/#branding` },
    url: `${config.url}`,
    isPartOf: {
      '@id': `${config.url}`,
    },
  };

  const blogSchema: BlogSchema = {
    '@id': `${config.url}/#blog`,
    '@type': 'Blog',
    author: { '@id': `${config.url}/#branding` },
    creator: { '@id': `${config.url}/#branding` },
    editor: { '@id': `${config.url}/#branding` },
    inLanguage: config.locales.defaultLocale,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: { '@id': `${pageUrl}` },
  };

  const schemaJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageSchema, blogSchema],
  };

  const title = intl.formatMessage({
    defaultMessage: 'Blog',
    description: 'BlogPage: page title',
  });

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:url" content={`${pageUrl}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={pageDescription} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        ></script>
      </Head>
      <article
        id="blog"
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
              >
                {intl.formatMessage({
                  defaultMessage: 'Load more?',
                  description: 'BlogPage: load more text',
                })}
              </Button>
            </>
          )}
        </div>
        <Sidebar
          position="right"
          title={intl.formatMessage({
            defaultMessage: 'Filter by:',
            description: 'BlogPage: sidebar title',
          })}
        >
          <ThematicsList
            title={intl.formatMessage({
              defaultMessage: 'Thematics',
              description: 'BlogPage: thematics list widget title',
            })}
          />
          <TopicsList
            title={intl.formatMessage({
              defaultMessage: 'Topics',
              description: 'BlogPage: topics list widget title',
            })}
          />
        </Sidebar>
      </article>
    </>
  );
};

Blog.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const intl = await getIntlInstance();
  const breadcrumbTitle = intl.formatMessage({
    defaultMessage: 'Blog',
    description: 'BlogPage: breadcrumb item',
  });
  const data = await getPublishedPosts({ first: config.postsPerPage });
  const { locale } = context;
  const translation = await loadTranslation(locale);

  return {
    props: {
      breadcrumbTitle,
      fallback: {
        '/api/posts': data,
      },
      locale,
      translation,
    },
  };
};

export default Blog;
