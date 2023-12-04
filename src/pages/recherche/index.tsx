/* eslint-disable max-statements */
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import {
  getLayout,
  Heading,
  LinksWidget,
  Notice,
  PostsList,
  Spinner,
  SearchForm,
  type SearchFormSubmit,
  PageHeader,
  Page,
  PageSidebar,
  PageBody,
} from '../../components';
import {
  convertWPThematicPreviewToPageLink,
  convertWPTopicPreviewToPageLink,
  fetchThematicsCount,
  fetchThematicsList,
  fetchTopicsCount,
  fetchTopicsList,
} from '../../services/graphql';
import styles from '../../styles/pages/blog.module.scss';
import type {
  GraphQLConnection,
  NextPageWithLayout,
  WPThematicPreview,
  WPTopicPreview,
} from '../../types';
import { CONFIG } from '../../utils/config';
import { ROUTES } from '../../utils/constants';
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
  useBreadcrumb,
  useThematicsList,
  useTopicsList,
} from '../../utils/hooks';

const NoResults = () => {
  const intl = useIntl();
  const router = useRouter();

  const searchSubmitHandler: SearchFormSubmit = useCallback(
    async ({ query: searchQuery }) => {
      if (!searchQuery)
        return {
          messages: {
            error: intl.formatMessage({
              defaultMessage: 'Query must be longer than one character.',
              description: 'SearchPage: invalid query message',
              id: 'e3ppRI',
            }),
          },
          validator: (value) => value.query.length > 1,
        };

      await router.push({ pathname: ROUTES.SEARCH, query: { s: searchQuery } });

      return undefined;
    },
    [intl, router]
  );

  return (
    <div className={styles['no-results']}>
      <p>
        {router.query.s
          ? intl.formatMessage({
              defaultMessage:
                'No results found. Would you like to try a new search?',
              description: 'SearchPage: no results',
              id: 'E+ROR5',
            })
          : intl.formatMessage({
              defaultMessage: 'Please use the form below to start searching:',
              description: 'SearchPage: search for message',
              id: 'A0TsHP',
            })}
      </p>
      <SearchForm isLabelHidden onSubmit={searchSubmitHandler} />
    </div>
  );
};

type SearchPageProps = {
  data: {
    thematics: GraphQLConnection<WPThematicPreview>;
    topics: GraphQLConnection<WPTopicPreview>;
  };
  translation: Messages;
};

/**
 * Search page.
 */
const SearchPage: NextPageWithLayout<SearchPageProps> = ({ data }) => {
  const intl = useIntl();
  const { asPath, query } = useRouter();
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
    perPage: CONFIG.postsPerPage,
    searchQuery: typeof query.s === 'string' ? query.s : undefined,
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
        description: 'SearchPage: loading thematics message',
        id: 'qFqWQH',
      }),
      topicsList: intl.formatMessage({
        defaultMessage: 'Topics are loading...',
        description: 'SearchPage: loading topics message',
        id: 'tLflgC',
      }),
    },
    pageTitle: query.s
      ? intl.formatMessage(
          {
            defaultMessage: 'Search results for "{query}"',
            description: 'SearchPage: SEO - Page title',
            id: 'N+3eau',
          },
          { query: query.s as string }
        )
      : intl.formatMessage({
          defaultMessage: 'Search',
          description: 'SearchPage: SEO - Page title',
          id: 'WDwNDl',
        }),
    seo: {
      metaDesc: query.s
        ? intl.formatMessage(
            {
              defaultMessage:
                'Discover search results for {query} on {websiteName}.',
              description: 'SearchPage: SEO - Meta description',
              id: 'pg26sn',
            },
            { query: query.s as string, websiteName: CONFIG.name }
          )
        : intl.formatMessage(
            {
              defaultMessage: 'Search for a post on {websiteName}.',
              description: 'SearchPage: SEO - Meta description',
              id: 'npisb3',
            },
            { websiteName: CONFIG.name }
          ),
      title: query.s
        ? intl.formatMessage(
            {
              defaultMessage: 'Search results for {query} - {websiteName}',
              description: 'SearchPage: SEO - Page title',
              id: 'QRDdye',
            },
            { query: query.s as string, websiteName: CONFIG.name }
          )
        : intl.formatMessage(
            {
              defaultMessage: 'Search - {websiteName}',
              description: 'SearchPage: SEO - Page title',
              id: 'NqVQYo',
            },
            { websiteName: CONFIG.name }
          ),
    },
    widgets: {
      thematicsListTitle: intl.formatMessage({
        defaultMessage: 'Thematics',
        description: 'SearchPage: thematics list widget title',
        id: 'Dq6+WH',
      }),
      topicsListTitle: intl.formatMessage({
        defaultMessage: 'Topics',
        description: 'SearchPage: topics list widget title',
        id: 'N804XO',
      }),
    },
  };

  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title: messages.pageTitle,
    url: ROUTES.SEARCH,
  });

  const webpageSchema = getWebPageSchema({
    description: messages.seo.metaDesc,
    locale: CONFIG.locales.defaultLocale,
    slug: asPath,
    title: messages.pageTitle,
  });
  const blogSchema = getBlogSchema({
    isSinglePage: false,
    locale: CONFIG.locales.defaultLocale,
    slug: asPath,
  });
  const schemaJsonLd = getSchemaJson([webpageSchema, blogSchema]);

  const pageUrl = `${CONFIG.url}${asPath}`;

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
        <meta property="og:description" content={messages.seo.title} />
      </Head>
      <Script
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-blog"
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- Necessary for schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <Script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-breadcrumb"
        type="application/ld+json"
      />
      <PageHeader
        heading={messages.pageTitle}
        meta={{ total: articles ? articles[0].pageInfo.total : undefined }}
      />
      <PageBody>
        {query.s &&
        ((articles?.length && articles[0].edges.length) || isLoading) ? (
          <PostsList
            className={styles['posts-list']}
            firstNewResult={firstNewResultIndex}
            isLoading={isLoading || isLoadingMore || isRefreshing}
            onLoadMore={hasNextPage ? loadMore : undefined}
            posts={
              articles
                ? getPostsWithUrl(
                    articles.flatMap((page) =>
                      page.edges.map((edge) => edge.node)
                    )
                  )
                : []
            }
            sortByYear
            total={articles ? articles[0].pageInfo.total : undefined}
          />
        ) : (
          <NoResults />
        )}
        {error ? (
          <Notice
            // eslint-disable-next-line react/jsx-no-literals -- Kind allowed
            kind="error"
          >
            {intl.formatMessage({
              defaultMessage: 'Failed to load.',
              description: 'SearchPage: failed to load text',
              id: 'fOe8rH',
            })}
          </Notice>
        ) : null}
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

SearchPage.getLayout = (page) => getLayout(page);

export const getStaticProps: GetStaticProps<SearchPageProps> = async ({
  locale,
}) => {
  const totalThematics = await fetchThematicsCount();
  const thematics = await fetchThematicsList({ first: totalThematics });
  const totalTopics = await fetchTopicsCount();
  const topics = await fetchTopicsList({ first: totalTopics });
  const translation = await loadTranslation(locale);

  return {
    props: {
      data: {
        thematics,
        topics,
      },
      translation,
    },
  };
};

export default SearchPage;
