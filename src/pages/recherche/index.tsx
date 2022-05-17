import Notice from '@components/atoms/layout/notice';
import Spinner from '@components/atoms/loaders/spinner';
import PostsList, { type Post } from '@components/organisms/layout/posts-list';
import LinksListWidget from '@components/organisms/widgets/links-list-widget';
import { getLayout } from '@components/templates/layout/layout';
import PageLayout from '@components/templates/page/page-layout';
import { type EdgesResponse } from '@services/graphql/api';
import {
  getArticleFromRawData,
  getArticles,
  getTotalArticles,
} from '@services/graphql/articles';
import {
  getThematicsPreview,
  getTotalThematics,
} from '@services/graphql/thematics';
import { getTopicsPreview, getTotalTopics } from '@services/graphql/topics';
import {
  type Article,
  type Meta,
  type NextPageWithLayout,
} from '@ts/types/app';
import {
  RawThematicPreview,
  RawTopicPreview,
  type RawArticle,
} from '@ts/types/raw-data';
import { loadTranslation, type Messages } from '@utils/helpers/i18n';
import {
  getLinksListItems,
  getPageLinkFromRawData,
} from '@utils/helpers/pages';
import useBreadcrumb from '@utils/hooks/use-breadcrumb';
import useDataFromAPI from '@utils/hooks/use-data-from-api';
import usePagination from '@utils/hooks/use-pagination';
import useSettings from '@utils/hooks/use-settings';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useIntl } from 'react-intl';
import { Blog, Graph, WebPage } from 'schema-dts';

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
  const pageUrl = `${website.url}${asPath}`;

  const webpageSchema: WebPage = {
    '@id': `${pageUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${website.url}/#breadcrumb` },
    name: pageTitle,
    description: pageDescription,
    inLanguage: website.locales.default,
    reviewedBy: { '@id': `${website.url}/#branding` },
    url: `${website.url}`,
    isPartOf: {
      '@id': `${website.url}`,
    },
  };

  const blogSchema: Blog = {
    '@id': `${website.url}/#blog`,
    '@type': 'Blog',
    author: { '@id': `${website.url}/#branding` },
    creator: { '@id': `${website.url}/#branding` },
    editor: { '@id': `${website.url}/#branding` },
    inLanguage: website.locales.default,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: { '@id': `${pageUrl}` },
  };

  const schemaJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageSchema, blogSchema],
  };

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
   * Retrieve the formatted meta.
   *
   * @param {Meta<'article'>} meta - The article meta.
   * @returns {Post['meta']} The formatted meta.
   */
  const getPostMeta = (meta: Meta<'article'>): Post['meta'] => {
    const { commentsCount, dates, thematics, wordsCount } = meta;

    return {
      commentsCount,
      dates,
      readingTime: { wordsCount: wordsCount || 0, onlyMinutes: true },
      thematics: thematics?.map((thematic) => {
        return { ...thematic, url: `/thematique/${thematic.slug}` };
      }),
    };
  };

  /**
   * Retrieve the formatted posts.
   *
   * @param {Article[]} posts - An array of articles.
   * @returns {Post[]} An array of formatted posts.
   */
  const getPosts = (posts: Article[]): Post[] => {
    return posts.map((post) => {
      return {
        ...post,
        cover: post.meta.cover,
        excerpt: post.intro,
        meta: getPostMeta(post.meta),
        url: `/article/${post.slug}`,
      };
    });
  };

  /**
   * Retrieve the posts list from raw data.
   *
   * @param {EdgesResponse<RawArticle>[]} rawData - The raw data.
   * @returns {Post[]} An array of posts.
   */
  const getPostsList = (rawData: EdgesResponse<RawArticle>[]): Post[] => {
    const articlesList: RawArticle[] = [];
    rawData.forEach((articleData) =>
      articleData.edges.forEach((edge) => {
        articlesList.push(edge.node);
      })
    );

    return getPosts(
      articlesList.map((article) => getArticleFromRawData(article))
    );
  };

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
        <meta property="og:url" content={`${pageUrl}`} />
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
              thematicsList.map(getPageLinkFromRawData),
              'thematic'
            )}
            title={thematicsListTitle}
            level={2}
          />,
          <LinksListWidget
            key="topics-list"
            items={getLinksListItems(
              topicsList.map(getPageLinkFromRawData),
              'topic'
            )}
            title={topicsListTitle}
            level={2}
          />,
        ]}
      >
        {data && data.length > 0 ? (
          <PostsList
            byYear={true}
            isLoading={isLoadingMore || isLoadingInitialData}
            loadMore={loadMore}
            posts={getPostsList(data)}
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
