/* eslint-disable max-statements */
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useCallback, useRef } from 'react';
import { useIntl } from 'react-intl';
import {
  getLayout,
  Heading,
  LinksWidget,
  Notice,
  PageLayout,
  PostsList,
  Pagination,
  type RenderPaginationLink,
  type RenderPaginationItemAriaLabel,
  MetaList,
  MetaItem,
} from '../../components';
import {
  getArticles,
  getThematicsPreview,
  getTopicsPreview,
  getTotalArticles,
  getTotalThematics,
  getTotalTopics,
} from '../../services/graphql';
import styles from '../../styles/pages/blog.module.scss';
import type {
  EdgesResponse,
  NextPageWithLayout,
  RawArticle,
  RawThematicPreview,
  RawTopicPreview,
} from '../../types';
import { CONFIG } from '../../utils/config';
import { ROUTES } from '../../utils/constants';
import {
  getBlogSchema,
  getLinksItemData,
  getPageLinkFromRawData,
  getSchemaJson,
  getWebPageSchema,
} from '../../utils/helpers';
import { loadTranslation, type Messages } from '../../utils/helpers/server';
import { useBreadcrumb, useIsMounted, usePostsList } from '../../utils/hooks';

type BlogPageProps = {
  articles: EdgesResponse<RawArticle>;
  thematicsList: RawThematicPreview[];
  topicsList: RawTopicPreview[];
  totalArticles: number;
  translation: Messages;
};

/**
 * Blog index page.
 */
const BlogPage: NextPageWithLayout<BlogPageProps> = ({
  articles,
  thematicsList,
  topicsList,
  totalArticles,
}) => {
  const intl = useIntl();
  const title = intl.formatMessage({
    defaultMessage: 'Blog',
    description: 'BlogPage: page title',
    id: '7TbbIk',
  });
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title,
    url: ROUTES.BLOG,
  });
  const postsListRef = useRef<HTMLDivElement>(null);
  const isMounted = useIsMounted(postsListRef);
  const { asPath } = useRouter();
  const page = {
    title: intl.formatMessage(
      {
        defaultMessage: 'Blog: development, open source - {websiteName}',
        description: 'BlogPage: SEO - Page title',
        id: '+Y+tLK',
      },
      { websiteName: CONFIG.name }
    ),
    url: `${CONFIG.url}${asPath}`,
  };
  const pageDescription = intl.formatMessage(
    {
      defaultMessage:
        "Discover {websiteName}'s writings. He talks about web development, Linux and open source mostly.",
      description: 'BlogPage: SEO - Meta description',
      id: '18h/t0',
    },
    { websiteName: CONFIG.name }
  );
  const webpageSchema = getWebPageSchema({
    description: pageDescription,
    locale: CONFIG.locales.defaultLocale,
    slug: asPath,
    title,
  });
  const blogSchema = getBlogSchema({
    isSinglePage: false,
    locale: CONFIG.locales.defaultLocale,
    slug: asPath,
  });
  const schemaJsonLd = getSchemaJson([webpageSchema, blogSchema]);

  const {
    error,
    firstNewResultIndex,
    isLoading,
    isLoadingMore,
    isRefreshing,
    hasNextPage,
    loadMore,
    posts,
  } = usePostsList({
    fallback: [articles],
    fetcher: getArticles,
    perPage: CONFIG.postsPerPage,
  });

  const thematicsListTitle = intl.formatMessage({
    defaultMessage: 'Thematics',
    description: 'BlogPage: thematics list widget title',
    id: 'HriY57',
  });

  const topicsListTitle = intl.formatMessage({
    defaultMessage: 'Topics',
    description: 'BlogPage: topics list widget title',
    id: '2D9tB5',
  });
  const renderPaginationLink: RenderPaginationLink = useCallback(
    (pageNum) => `${ROUTES.BLOG}/page/${pageNum}`,
    []
  );
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

  const paginationAriaLabel = intl.formatMessage({
    defaultMessage: 'Pagination',
    description: 'BlogPage: pagination accessible name',
    id: 'AXe1Iz',
  });

  return (
    <>
      <Head>
        <title>{page.title}</title>
        {/*eslint-disable-next-line react/jsx-no-literals -- Name allowed */}
        <meta name="description" content={pageDescription} />
        <meta property="og:url" content={page.url} />
        {/*eslint-disable-next-line react/jsx-no-literals -- Content allowed */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={pageDescription} />
      </Head>
      <Script
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-blog"
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- Necessary for schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <PageLayout
        title={title}
        breadcrumb={breadcrumbItems}
        breadcrumbSchema={breadcrumbSchema}
        headerMeta={
          <MetaList>
            <MetaItem
              isInline
              label={intl.formatMessage({
                defaultMessage: 'Total:',
                description: 'Page: total label',
                id: 'kNBXyK',
              })}
              value={intl.formatMessage(
                {
                  defaultMessage:
                    '{postsCount, plural, =0 {No articles} one {# article} other {# articles}}',
                  description: 'Page: posts count meta',
                  id: 'RvGb2c',
                },
                { postsCount: totalArticles }
              )}
            />
          </MetaList>
        }
        widgets={[
          <LinksWidget
            heading={
              <Heading isFake level={3}>
                {thematicsListTitle}
              </Heading>
            }
            items={getLinksItemData(
              thematicsList.map((thematic) =>
                getPageLinkFromRawData(thematic, 'thematic')
              )
            )}
            // eslint-disable-next-line react/jsx-no-literals -- Key allowed
            key="thematics-list"
          />,
          <LinksWidget
            heading={
              <Heading isFake level={3}>
                {topicsListTitle}
              </Heading>
            }
            items={getLinksItemData(
              topicsList.map((topic) => getPageLinkFromRawData(topic, 'topic'))
            )}
            // eslint-disable-next-line react/jsx-no-literals -- Key allowed
            key="topics-list"
          />,
        ]}
      >
        {posts ? (
          <PostsList
            className={styles.list}
            firstNewResult={firstNewResultIndex}
            isLoading={isLoading || isLoadingMore || isRefreshing}
            onLoadMore={hasNextPage && isMounted ? loadMore : undefined}
            posts={posts}
            ref={postsListRef}
            sortByYear
            total={isMounted ? totalArticles : undefined}
          />
        ) : null}
        {isMounted ? null : (
          <Pagination
            aria-label={paginationAriaLabel}
            current={1}
            isCentered
            renderItemAriaLabel={renderPaginationLabel}
            renderLink={renderPaginationLink}
            total={totalArticles}
          />
        )}
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
      </PageLayout>
    </>
  );
};

BlogPage.getLayout = (page) =>
  getLayout(page, { useGrid: true, withExtraPadding: true });

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({
  locale,
}) => {
  const articles = await getArticles({ first: CONFIG.postsPerPage });
  const totalArticles = await getTotalArticles();
  const totalThematics = await getTotalThematics();
  const thematics = await getThematicsPreview({ first: totalThematics });
  const totalTopics = await getTotalTopics();
  const topics = await getTopicsPreview({ first: totalTopics });
  const translation = await loadTranslation(locale);

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
      thematicsList: thematics.edges.map((edge) => edge.node),
      topicsList: topics.edges.map((edge) => edge.node),
      totalArticles,
      translation,
    },
  };
};

export default BlogPage;
