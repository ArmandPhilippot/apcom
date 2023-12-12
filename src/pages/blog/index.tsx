/* eslint-disable max-statements */
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import {
  getLayout,
  Heading,
  LinksWidget,
  Notice,
  PostsList,
  Pagination,
  type RenderPaginationLink,
  type RenderPaginationItemAriaLabel,
  Page,
  PageHeader,
  PageBody,
  PageSidebar,
  Spinner,
} from '../../components';
import {
  convertWPThematicPreviewToPageLink,
  convertWPTopicPreviewToPageLink,
  fetchPostsList,
  fetchThematicsCount,
  fetchThematicsList,
  fetchTopicsCount,
  fetchTopicsList,
} from '../../services/graphql';
import styles from '../../styles/pages/blog.module.scss';
import type {
  GraphQLConnection,
  NextPageWithLayout,
  WPPostPreview,
  WPThematicPreview,
  WPTopicPreview,
} from '../../types';
import { CONFIG } from '../../utils/config';
import { PAGINATED_ROUTE_PREFIX, ROUTES } from '../../utils/constants';
import {
  getBlogSchema,
  getLinksItemData,
  getPostsWithUrl,
  getSchemaJson,
  getWebPageSchema,
} from '../../utils/helpers';
import { loadTranslation, type Messages } from '../../utils/helpers/server';
import {
  useArticlesList,
  useBreadcrumbs,
  useThematicsList,
  useTopicsList,
} from '../../utils/hooks';

const renderPaginationLink: RenderPaginationLink = (pageNum) =>
  `${ROUTES.BLOG}${PAGINATED_ROUTE_PREFIX}/${pageNum}`;

type BlogPageProps = {
  data: {
    posts: GraphQLConnection<WPPostPreview>;
    thematics: GraphQLConnection<WPThematicPreview>;
    topics: GraphQLConnection<WPTopicPreview>;
  };
  translation: Messages;
};

/**
 * Blog index page.
 */
const BlogPage: NextPageWithLayout<BlogPageProps> = ({ data }) => {
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
    pageTitle: intl.formatMessage({
      defaultMessage: 'Blog',
      description: 'BlogPage: page title',
      id: '7TbbIk',
    }),
    pagination: {
      noJS: intl.formatMessage({
        defaultMessage:
          "You can't load more articles without Javascript, please use the pagination instead.",
        description: 'BlogPage: pagination no script message',
        id: 'ZMES/E',
      }),
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
          defaultMessage: 'Blog: development, open source - {websiteName}',
          description: 'BlogPage: SEO - Page title',
          id: '+Y+tLK',
        },
        { websiteName: CONFIG.name }
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

  const webpageSchema = getWebPageSchema({
    description: messages.seo.metaDesc,
    locale: CONFIG.locales.defaultLocale,
    slug: ROUTES.BLOG,
    title: messages.pageTitle,
  });
  const blogSchema = getBlogSchema({
    isSinglePage: false,
    locale: CONFIG.locales.defaultLocale,
    slug: ROUTES.BLOG,
  });
  const schemaJsonLd = getSchemaJson([
    webpageSchema,
    blogSchema,
    breadcrumbSchema,
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
      </Head>
      <Script
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-blog"
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- Necessary for schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <PageHeader
        heading={messages.pageTitle}
        meta={{ total: data.posts.pageInfo.total }}
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
          <Notice
            // eslint-disable-next-line react/jsx-no-literals
            kind="info"
          >
            {messages.pagination.noJS}
          </Notice>
          <Pagination
            aria-label={messages.pagination.title}
            className={styles.pagination}
            current={1}
            isCentered
            renderItemAriaLabel={renderPaginationLabel}
            renderLink={renderPaginationLink}
            total={data.posts.pageInfo.total}
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

BlogPage.getLayout = (page) => getLayout(page);

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({
  locale,
}) => {
  const posts = await fetchPostsList({ first: CONFIG.postsPerPage });
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
      },
      translation,
    },
  };
};

export default BlogPage;
