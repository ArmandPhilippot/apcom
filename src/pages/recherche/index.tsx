import Notice from '@components/atoms/layout/notice';
import Spinner from '@components/atoms/loaders/spinner';
import PostsList from '@components/organisms/layout/posts-list';
import LinksListWidget from '@components/organisms/widgets/links-list-widget';
import { getLayout } from '@components/templates/layout/layout';
import PageLayout from '@components/templates/page/page-layout';
import { getArticles, getTotalArticles } from '@services/graphql/articles';
import {
  getThematicsPreview,
  getTotalThematics,
} from '@services/graphql/thematics';
import { getTopicsPreview, getTotalTopics } from '@services/graphql/topics';
import { type NextPageWithLayout } from '@ts/types/app';
import {
  type RawArticle,
  type RawThematicPreview,
  type RawTopicPreview,
} from '@ts/types/raw-data';
import { loadTranslation, type Messages } from '@utils/helpers/i18n';
import {
  getLinksListItems,
  getPageLinkFromRawData,
  getPostsList,
} from '@utils/helpers/pages';
import {
  getBlogSchema,
  getSchemaJson,
  getWebPageSchema,
} from '@utils/helpers/schema-org';
import useBreadcrumb from '@utils/hooks/use-breadcrumb';
import useDataFromAPI from '@utils/hooks/use-data-from-api';
import usePagination from '@utils/hooks/use-pagination';
import useSettings from '@utils/hooks/use-settings';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useIntl } from 'react-intl';

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
  const { asPath, query } = useRouter();
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
    url: `/recherche`,
  });

  const { blog, website } = useSettings();
  const pageTitle = `${title} - ${website.name}`;
  const pageDescription = query.s
    ? intl.formatMessage(
        {
          defaultMessage:
            'Discover search results for {query} on {websiteName}.',
          description: 'SearchPage: SEO - Meta description',
          id: 'pg26sn',
        },
        { query: query.s as string, websiteName: website.name }
      )
    : intl.formatMessage(
        {
          defaultMessage: 'Search for a post on {websiteName}.',
          description: 'SearchPage: SEO - Meta description',
          id: 'npisb3',
        },
        { websiteName: website.name }
      );
  const webpageSchema = getWebPageSchema({
    description: pageDescription,
    locale: website.locales.default,
    slug: asPath,
    title: pageTitle,
  });
  const blogSchema = getBlogSchema({
    isSinglePage: false,
    locale: website.locales.default,
    slug: asPath,
  });
  const schemaJsonLd = getSchemaJson([webpageSchema, blogSchema]);

  const {
    data,
    error,
    isLoadingInitialData,
    isLoadingMore,
    hasNextPage,
    setSize,
  } = usePagination<RawArticle>({
    fallbackData: [],
    fetcher: getArticles,
    perPage: blog.postsPerPage,
    search: query.s as string,
  });

  const totalArticles = useDataFromAPI<number>(() =>
    getTotalArticles(query.s as string)
  );

  /**
   * Load more posts handler.
   */
  const loadMore = () => {
    setSize((prevSize) => prevSize + 1);
  };

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

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:url" content={`${website.url}${asPath}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={pageDescription} />
      </Head>
      <Script
        id="schema-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <PageLayout
        title={title}
        breadcrumb={breadcrumbItems}
        breadcrumbSchema={breadcrumbSchema}
        headerMeta={{ total: totalArticles }}
        widgets={[
          <LinksListWidget
            key="thematics-list"
            items={getLinksListItems(
              thematicsList.map((thematic) =>
                getPageLinkFromRawData(thematic, 'thematic')
              )
            )}
            title={thematicsListTitle}
            level={2}
          />,
          <LinksListWidget
            key="topics-list"
            items={getLinksListItems(
              topicsList.map((topic) => getPageLinkFromRawData(topic, 'topic'))
            )}
            title={topicsListTitle}
            level={2}
          />,
        ]}
      >
        {data && data.length > 0 ? (
          <PostsList
            baseUrl="/recherche/page/"
            byYear={true}
            isLoading={isLoadingMore || isLoadingInitialData}
            loadMore={loadMore}
            posts={getPostsList(data)}
            searchPage="/recherche/"
            showLoadMoreBtn={hasNextPage}
            total={totalArticles || 0}
          />
        ) : (
          <Spinner />
        )}
        {error && (
          <Notice
            kind="error"
            message={intl.formatMessage({
              defaultMessage: 'Failed to load.',
              description: 'SearchPage: failed to load text',
              id: 'fOe8rH',
            })}
          />
        )}
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
