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
  PageLayout,
  PostsList,
  Spinner,
  SearchForm,
  type SearchFormSubmit,
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
  NextPageWithLayout,
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
import { useBreadcrumb, useDataFromAPI, usePostsList } from '../../utils/hooks';

type SearchPageProps = {
  thematicsList: RawThematicPreview[];
  topicsList: RawTopicPreview[];
  translation: Messages;
};

/**
 * Search page.
 */
const SearchPage: NextPageWithLayout<SearchPageProps> = ({
  thematicsList,
  topicsList,
}) => {
  const intl = useIntl();
  const { asPath, query, push: routerPush } = useRouter();
  const title = query.s
    ? intl.formatMessage(
        {
          defaultMessage: 'Search results for {query}',
          description: 'SearchPage: SEO - Page title',
          id: 'ZNBhDP',
        },
        { query: query.s as string }
      )
    : intl.formatMessage({
        defaultMessage: 'Search',
        description: 'SearchPage: SEO - Page title',
        id: 'WDwNDl',
      });
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title,
    url: ROUTES.SEARCH,
  });

  const page = {
    title: `${title} - ${CONFIG.name}`,
    url: `${CONFIG.url}${asPath}`,
  };
  const pageDescription = query.s
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
      );
  const webpageSchema = getWebPageSchema({
    description: pageDescription,
    locale: CONFIG.locales.defaultLocale,
    slug: asPath,
    title: page.title,
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
    fallback: [],
    fetcher: getArticles,
    perPage: CONFIG.postsPerPage,
    searchQuery: query.s as string,
  });

  const totalArticles = useDataFromAPI<number>(async () =>
    getTotalArticles(query.s as string)
  );

  const thematicsListTitle = intl.formatMessage({
    defaultMessage: 'Thematics',
    description: 'SearchPage: thematics list widget title',
    id: 'Dq6+WH',
  });

  const topicsListTitle = intl.formatMessage({
    defaultMessage: 'Topics',
    description: 'SearchPage: topics list widget title',
    id: 'N804XO',
  });
  const loadingResults = intl.formatMessage({
    defaultMessage: 'Loading the search results...',
    description: 'SearchPage: loading search results message',
    id: 'EeCqAE',
  });

  const searchSubmitHandler: SearchFormSubmit = useCallback(
    ({ query: searchQuery }) => {
      if (!searchQuery)
        return {
          messages: {
            error: intl.formatMessage({
              defaultMessage: 'Query must be longer than one character.',
              description: 'NoResults: invalid query message',
              id: 'VkfO7t',
            }),
          },
          validator: (value) => value.query.length > 1,
        };

      routerPush({ pathname: ROUTES.SEARCH, query: { s: searchQuery } });

      return undefined;
    },
    [intl, routerPush]
  );

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
        {posts ? null : <Spinner>{loadingResults}</Spinner>}
        {posts?.length ? (
          <PostsList
            className={styles.list}
            firstNewResult={firstNewResultIndex}
            isLoading={isLoading || isLoadingMore || isRefreshing}
            onLoadMore={hasNextPage ? loadMore : undefined}
            posts={posts}
            sortByYear
          />
        ) : (
          <>
            <p>
              {intl.formatMessage({
                defaultMessage: 'No results found.',
                description: 'SearchPage: no results',
                id: 'YV//MH',
              })}
            </p>
            <p>
              {intl.formatMessage({
                defaultMessage: 'Would you like to try a new search?',
                description: 'SearchPage: try a new search message',
                id: 'vtDLzG',
              })}
            </p>
            <SearchForm isLabelHidden onSubmit={searchSubmitHandler} />
          </>
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
      </PageLayout>
    </>
  );
};

SearchPage.getLayout = (page) =>
  getLayout(page, { useGrid: true, withExtraPadding: true });

export const getStaticProps: GetStaticProps<SearchPageProps> = async ({
  locale,
}) => {
  const totalThematics = await getTotalThematics();
  const thematics = await getThematicsPreview({ first: totalThematics });
  const totalTopics = await getTotalTopics();
  const topics = await getTopicsPreview({ first: totalTopics });
  const translation = await loadTranslation(locale);

  return {
    props: {
      thematicsList: thematics.edges.map((edge) => edge.node),
      topicsList: topics.edges.map((edge) => edge.node),
      translation,
    },
  };
};

export default SearchPage;
