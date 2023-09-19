import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useIntl } from 'react-intl';
import Notice from '../../components/atoms/layout/notice';
import PostsList from '../../components/organisms/layout/posts-list';
import LinksListWidget from '../../components/organisms/widgets/links-list-widget';
import { getLayout } from '../../components/templates/layout/layout';
import PageLayout from '../../components/templates/page/page-layout';
import { getArticles, getTotalArticles } from '../../services/graphql/articles';
import {
  getThematicsPreview,
  getTotalThematics,
} from '../../services/graphql/thematics';
import {
  getTopicsPreview,
  getTotalTopics,
} from '../../services/graphql/topics';
import { type NextPageWithLayout } from '../../types/app';
import { EdgesResponse } from '../../types/graphql/queries';
import {
  type RawArticle,
  type RawThematicPreview,
  type RawTopicPreview,
} from '../../types/raw-data';
import { settings } from '../../utils/config';
import { loadTranslation, type Messages } from '../../utils/helpers/i18n';
import {
  getLinksListItems,
  getPageLinkFromRawData,
  getPostsList,
} from '../../utils/helpers/pages';
import {
  getBlogSchema,
  getSchemaJson,
  getWebPageSchema,
} from '../../utils/helpers/schema-org';
import useBreadcrumb from '../../utils/hooks/use-breadcrumb';
import usePagination from '../../utils/hooks/use-pagination';
import useSettings from '../../utils/hooks/use-settings';

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
    url: '/blog',
  });

  const { blog, website } = useSettings();
  const { asPath } = useRouter();
  const pageTitle = intl.formatMessage(
    {
      defaultMessage: 'Blog: development, open source - {websiteName}',
      description: 'BlogPage: SEO - Page title',
      id: '+Y+tLK',
    },
    { websiteName: website.name }
  );
  const pageDescription = intl.formatMessage(
    {
      defaultMessage:
        "Discover {websiteName}'s writings. He talks about web development, Linux and open source mostly.",
      description: 'BlogPage: SEO - Meta description',
      id: '18h/t0',
    },
    { websiteName: website.name }
  );
  const webpageSchema = getWebPageSchema({
    description: pageDescription,
    locale: website.locales.default,
    slug: asPath,
    title,
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
    fallbackData: [articles],
    fetcher: getArticles,
    perPage: blog.postsPerPage,
  });

  /**
   * Load more posts handler.
   */
  const loadMore = () => {
    setSize((prevSize) => prevSize + 1);
  };

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
        {data && (
          <PostsList
            baseUrl="/blog/page/"
            byYear={true}
            isLoading={isLoadingMore || isLoadingInitialData}
            loadMore={loadMore}
            posts={getPostsList(data)}
            searchPage="/recherche/"
            showLoadMoreBtn={hasNextPage}
            total={totalArticles}
          />
        )}
        {error && (
          <Notice
            kind="error"
            message={intl.formatMessage({
              defaultMessage: 'Failed to load.',
              description: 'BlogPage: failed to load text',
              id: 'C/XGkH',
            })}
          />
        )}
      </PageLayout>
    </>
  );
};

BlogPage.getLayout = (page) =>
  getLayout(page, { useGrid: true, withExtraPadding: true });

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({
  locale,
}) => {
  const articles = await getArticles({ first: settings.postsPerPage });
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
