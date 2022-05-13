import Notice from '@components/atoms/layout/notice';
import { type BreadcrumbItem } from '@components/molecules/nav/breadcrumb';
import PostsList, { type Post } from '@components/organisms/layout/posts-list';
import LinksListWidget, {
  LinksListItems,
} from '@components/organisms/widgets/links-list-widget';
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
import { type Article, type Meta } from '@ts/types/app';
import {
  RawThematicPreview,
  RawTopicPreview,
  type RawArticle,
} from '@ts/types/raw-data';
import { settings } from '@utils/config';
import { loadTranslation, type Messages } from '@utils/helpers/i18n';
import usePagination from '@utils/hooks/use-pagination';
import useSettings from '@utils/hooks/use-settings';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useIntl } from 'react-intl';
import { Blog, Graph, WebPage } from 'schema-dts';

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
const BlogPage: NextPage<BlogPageProps> = ({
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
  const homeLabel = intl.formatMessage({
    defaultMessage: 'Home',
    description: 'Breadcrumb: home label',
    id: 'j5k9Fe',
  });
  const breadcrumb: BreadcrumbItem[] = [
    { id: 'home', name: homeLabel, url: '/' },
    { id: 'blog', name: title, url: '/blog' },
  ];

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

  const postsCount = intl.formatMessage(
    {
      defaultMessage:
        '{postsCount, plural, =0 {No articles} one {# article} other {# articles}}',
      id: 'OF5cPz',
      description: 'BlogPage: posts count meta',
    },
    { postsCount: totalArticles }
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

  const getLinksListItems = (
    rawData: RawThematicPreview[] | RawTopicPreview[],
    kind: 'thematic' | 'topic'
  ): LinksListItems[] => {
    const baseUrl = kind === 'thematic' ? '/thematique/' : '/sujet/';

    return rawData.map((taxonomy) => {
      return {
        name: taxonomy.title,
        url: `${baseUrl}${taxonomy.slug}`,
      };
    });
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
        breadcrumb={breadcrumb}
        headerMeta={{ total: postsCount }}
        widgets={[
          <LinksListWidget
            key="thematics-list"
            items={getLinksListItems(thematicsList, 'thematic')}
            title={thematicsListTitle}
            level={2}
          />,
          <LinksListWidget
            key="topics-list"
            items={getLinksListItems(topicsList, 'topic')}
            title={topicsListTitle}
            level={2}
          />,
        ]}
      >
        {data && (
          <PostsList
            byYear={true}
            isLoading={isLoadingMore || isLoadingInitialData}
            loadMore={loadMore}
            posts={getPostsList(data)}
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
