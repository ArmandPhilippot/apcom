/* eslint-disable max-statements */
import type { ParsedUrlQuery } from 'querystring';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { type FC, useCallback } from 'react';
import { useIntl } from 'react-intl';
import {
  getLayout,
  Heading,
  LinksWidget,
  PostsList,
  Pagination,
  type RenderPaginationLink,
  type RenderPaginationItemAriaLabel,
  Page,
  PageHeader,
  PageBody,
  PageSidebar,
  Spinner,
  Notice,
  LoadingPage,
} from '../../../components';
import {
  convertWPThematicPreviewToPageLink,
  convertWPTopicPreviewToPageLink,
  fetchLastPostCursor,
  fetchPostsCount,
  fetchPostsList,
  fetchThematicsCount,
  fetchThematicsList,
  fetchTopicsCount,
  fetchTopicsList,
} from '../../../services/graphql';
import styles from '../../../styles/pages/blog.module.scss';
import type {
  GraphQLConnection,
  Maybe,
  NextPageWithLayout,
  Nullable,
  WPPostPreview,
  WPThematicPreview,
  WPTopicPreview,
} from '../../../types';
import { CONFIG } from '../../../utils/config';
import {
  ARTICLE_ID,
  PAGINATED_ROUTE_PREFIX,
  ROUTES,
} from '../../../utils/constants';
import {
  getBlogGraph,
  getLinksItemData,
  getPostsWithUrl,
  getSchemaFrom,
  getWebPageGraph,
} from '../../../utils/helpers';
import { loadTranslation, type Messages } from '../../../utils/helpers/server';
import {
  useArticlesList,
  useBreadcrumbs,
  useRedirection,
  useThematicsList,
  useTopicsList,
} from '../../../utils/hooks';

const renderPaginationLink: RenderPaginationLink = (pageNum) => {
  if (pageNum === 1) return ROUTES.BLOG;

  return `${ROUTES.BLOG}${PAGINATED_ROUTE_PREFIX}/${pageNum}`;
};

type BlogPageProps = {
  data: {
    posts: GraphQLConnection<WPPostPreview>;
    thematics: GraphQLConnection<WPThematicPreview>;
    topics: GraphQLConnection<WPTopicPreview>;
    totalPosts: number;
  };
  lastCursor: Maybe<Nullable<string>>;
  pageNumber: number;
  translation: Messages;
};

const Blog: FC<Pick<BlogPageProps, 'data' | 'lastCursor' | 'pageNumber'>> = ({
  data,
  lastCursor,
  pageNumber,
}) => {
  const intl = useIntl();
  const {
    articles,
    error,
    firstNewResultIndex,
    isLoading,
    isLoadingMore,
    isRefreshing,
    hasNextPage,
    loadMore,
  } = useArticlesList({
    after: lastCursor,
    fallback: [data.posts],
    perPage: CONFIG.postsPerPage,
  });
  const { isLoading: areThematicsLoading, thematics } = useThematicsList({
    fallback: data.thematics,
    input: { first: data.thematics.pageInfo.total },
  });
  const { isLoading: areTopicsLoading, topics } = useTopicsList({
    fallback: data.topics,
    input: { first: data.topics.pageInfo.total },
  });

  const messages = {
    loading: {
      thematicsList: intl.formatMessage({
        defaultMessage: 'Thematics are loading...',
        description: 'BlogPage: loading thematics message',
        id: 'y37FuH',
      }),
      topicsList: intl.formatMessage({
        defaultMessage: 'Topics are loading...',
        description: 'BlogPage: loading topics message',
        id: 'OsclKU',
      }),
    },
    pageTitle: intl.formatMessage(
      {
        defaultMessage: 'Blog - Page {number}',
        description: 'BlogPage: page title with number',
        id: '8xVO3Y',
      },
      {
        number: pageNumber,
      }
    ),
    pagination: {
      title: intl.formatMessage({
        defaultMessage: 'Pagination',
        description: 'BlogPage: pagination accessible name',
        id: 'AXe1Iz',
      }),
    },
    seo: {
      metaDesc: intl.formatMessage(
        {
          defaultMessage:
            "Discover {websiteName}'s writings. He talks about web development, Linux and open source mostly.",
          description: 'BlogPage: SEO - Meta description',
          id: '18h/t0',
        },
        { websiteName: CONFIG.name }
      ),
      title: intl.formatMessage(
        {
          defaultMessage:
            'Blog: development, open source - Page {number} - {websiteName}',
          description: 'BlogPage: SEO - Page title',
          id: 'dG3sT3',
        },
        { number: pageNumber, websiteName: CONFIG.name }
      ),
    },
    widgets: {
      thematicsListTitle: intl.formatMessage({
        defaultMessage: 'Thematics',
        description: 'BlogPage: thematics list widget title',
        id: 'HriY57',
      }),
      topicsListTitle: intl.formatMessage({
        defaultMessage: 'Topics',
        description: 'BlogPage: topics list widget title',
        id: '2D9tB5',
      }),
    },
  };

  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumbs(
    messages.pageTitle
  );

  const jsonLd = getSchemaFrom([
    getWebPageGraph({
      breadcrumb: breadcrumbSchema,
      description: messages.seo.metaDesc,
      slug: ROUTES.BLOG,
      title: messages.pageTitle,
    }),
    getBlogGraph({
      description: '',
      posts: articles?.flatMap((page) =>
        page.edges.map(({ node }) => {
          return { '@id': `${node.slug}#${ARTICLE_ID}` };
        })
      ),
      slug: ROUTES.BLOG,
      title: messages.pageTitle,
    }),
  ]);

  const renderPaginationLabel: RenderPaginationItemAriaLabel = useCallback(
    ({ kind, pageNumber: number, isCurrentPage }) => {
      switch (kind) {
        case 'backward':
          return intl.formatMessage(
            {
              defaultMessage: 'Go to previous page, page {number}',
              description: 'BlogPage: previous page label',
              id: 'faO6BQ',
            },
            { number }
          );
        case 'forward':
          return intl.formatMessage(
            {
              defaultMessage: 'Go to next page, page {number}',
              description: 'BlogPage: next page label',
              id: 'oq3BzP',
            },
            { number }
          );
        case 'number':
        default:
          return isCurrentPage
            ? intl.formatMessage(
                {
                  defaultMessage: 'Current page, page {number}',
                  description: 'BlogPage: current page label',
                  id: 'JL6G22',
                },
                { number }
              )
            : intl.formatMessage(
                {
                  defaultMessage: 'Go to page {number}',
                  description: 'BlogPage: page number label',
                  id: 'IVczxR',
                },
                { number }
              );
      }
    },
    [intl]
  );

  const pageUrl = `${CONFIG.url}${ROUTES.BLOG}`;

  return (
    <Page breadcrumbs={breadcrumbItems} isBodyLastChild>
      <Head>
        <title>{messages.seo.title}</title>
        {/*eslint-disable-next-line react/jsx-no-literals -- Name allowed */}
        <meta name="description" content={messages.seo.metaDesc} />
        <meta property="og:url" content={pageUrl} />
        {/*eslint-disable-next-line react/jsx-no-literals -- Content allowed */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={messages.pageTitle} />
        <meta property="og:description" content={messages.seo.metaDesc} />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      </Head>
      <PageHeader
        heading={messages.pageTitle}
        meta={{ total: data.totalPosts }}
      />
      <PageBody>
        {articles ? (
          <PostsList
            className={styles['posts-list']}
            firstNewResult={firstNewResultIndex}
            isLoading={isLoading || isLoadingMore || isRefreshing}
            onLoadMore={hasNextPage ? loadMore : undefined}
            posts={getPostsWithUrl(
              articles.flatMap((page) => page.edges.map((edge) => edge.node))
            )}
            sortByYear
            total={data.posts.pageInfo.total}
          />
        ) : null}
        {error ? (
          <Notice
            // eslint-disable-next-line react/jsx-no-literals -- Kind allowed
            kind="error"
          >
            {intl.formatMessage({
              defaultMessage: 'Failed to load.',
              description: 'BlogPage: failed to load text',
              id: 'C/XGkH',
            })}
          </Notice>
        ) : null}
        <noscript>
          <Pagination
            aria-label={messages.pagination.title}
            className={styles.pagination}
            current={pageNumber}
            isCentered
            renderItemAriaLabel={renderPaginationLabel}
            renderLink={renderPaginationLink}
            total={Math.ceil(data.totalPosts / CONFIG.postsPerPage)}
          />
        </noscript>
      </PageBody>
      <PageSidebar>
        {areThematicsLoading ? (
          <Spinner>{messages.loading.thematicsList}</Spinner>
        ) : (
          <LinksWidget
            heading={
              <Heading level={2}>{messages.widgets.thematicsListTitle}</Heading>
            }
            items={getLinksItemData(
              thematics.edges.map((edge) =>
                convertWPThematicPreviewToPageLink(edge.node)
              )
            )}
          />
        )}
        {areTopicsLoading ? (
          <Spinner>{messages.loading.topicsList}</Spinner>
        ) : (
          <LinksWidget
            heading={
              <Heading level={2}>{messages.widgets.topicsListTitle}</Heading>
            }
            items={getLinksItemData(
              topics.edges.map((edge) =>
                convertWPTopicPreviewToPageLink(edge.node)
              )
            )}
          />
        )}
      </PageSidebar>
    </Page>
  );
};

/**
 * Blog index page.
 */
const BlogPage: NextPageWithLayout<BlogPageProps> = ({
  data,
  lastCursor,
  pageNumber,
}) => {
  useRedirection({
    isReplacing: true,
    to: ROUTES.BLOG,
    whenPathMatches: (path) =>
      path === `${ROUTES.BLOG}${PAGINATED_ROUTE_PREFIX}/1`,
  });

  const { isFallback } = useRouter();

  return isFallback ? (
    <LoadingPage />
  ) : (
    <Blog data={data} lastCursor={lastCursor} pageNumber={pageNumber} />
  );
};

BlogPage.getLayout = (page) => getLayout(page);

type BlogPageParams = {
  number: string;
} & ParsedUrlQuery;

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({
  locale,
  params,
}) => {
  const pageNumber = Number((params as BlogPageParams).number);

  if (pageNumber === 1)
    return {
      redirect: {
        destination: ROUTES.BLOG,
        permanent: true,
      },
    };

  const lastCursor = await fetchLastPostCursor(
    CONFIG.postsPerPage * (pageNumber - 1)
  );
  const totalPosts = await fetchPostsCount();
  const posts = await fetchPostsList({
    first: CONFIG.postsPerPage,
    after: lastCursor,
  });
  const totalThematics = await fetchThematicsCount();
  const thematics = await fetchThematicsList({ first: totalThematics });
  const totalTopics = await fetchTopicsCount();
  const topics = await fetchTopicsList({ first: totalTopics });
  const translation = await loadTranslation(locale);

  return {
    props: {
      data: {
        posts: JSON.parse(JSON.stringify(posts)),
        thematics,
        topics,
        totalPosts,
      },
      lastCursor,
      pageNumber,
      translation,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const totalArticles = await fetchPostsCount();
  const totalPages = Math.ceil(totalArticles / CONFIG.postsPerPage);
  const pagesArray = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  // We remove /blog/page/1 since it is redirected to /blog
  const paths = pagesArray.slice(1).map((number) => {
    return { params: { number: `${number}` } };
  });

  return {
    paths,
    fallback: true,
  };
};

export default BlogPage;
