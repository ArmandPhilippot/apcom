import PostsList from '@components/organisms/layout/posts-list';
import LinksListWidget from '@components/organisms/widgets/links-list-widget';
import { getLayout } from '@components/templates/layout/layout';
import PageLayout from '@components/templates/page/page-layout';
import { type EdgesResponse } from '@services/graphql/api';
import {
  getArticles,
  getArticlesEndCursor,
  getTotalArticles,
} from '@services/graphql/articles';
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
import { settings } from '@utils/config';
import { loadTranslation, type Messages } from '@utils/helpers/i18n';
import {
  getLinksListItems,
  getPageLinkFromRawData,
  getPostsList,
} from '@utils/helpers/pages';
import useBreadcrumb from '@utils/hooks/use-breadcrumb';
import useRedirection from '@utils/hooks/use-redirection';
import useSettings from '@utils/hooks/use-settings';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ParsedUrlQuery } from 'querystring';
import { useIntl } from 'react-intl';
import { Blog, Graph, WebPage } from 'schema-dts';

type BlogPageProps = {
  articles: EdgesResponse<RawArticle>;
  pageNumber: number;
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
  pageNumber,
  thematicsList,
  topicsList,
  totalArticles,
}) => {
  useRedirection({
    query: { param: 'number', value: '1' },
    redirectTo: '/blog',
  });

  const intl = useIntl();
  const title = intl.formatMessage({
    defaultMessage: 'Blog',
    description: 'BlogPage: page title',
    id: '7TbbIk',
  });
  const pageNumberTitle = intl.formatMessage(
    {
      defaultMessage: 'Page {number}',
      id: 'zbzlb1',
      description: 'BlogPage: page number',
    },
    {
      number: pageNumber,
    }
  );
  const pageTitleWithPageNumber = `${title} - ${pageNumberTitle}`;
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title: pageNumberTitle,
    url: `/blog/page/${pageNumber}`,
  });

  const { website } = useSettings();
  const { asPath } = useRouter();
  const pageTitle = `${pageTitleWithPageNumber} - ${website.name}`;
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
        <meta property="og:title" content={pageTitleWithPageNumber} />
        <meta property="og:description" content={pageDescription} />
      </Head>
      <Script
        id="schema-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <PageLayout
        title={pageTitleWithPageNumber}
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
        <PostsList
          baseUrl="/blog/page/"
          byYear={true}
          pageNumber={pageNumber}
          posts={getPostsList([articles])}
          total={totalArticles}
        />
      </PageLayout>
    </>
  );
};

BlogPage.getLayout = (page) =>
  getLayout(page, { useGrid: true, withExtraPadding: true });

interface BlogPageParams extends ParsedUrlQuery {
  number: string;
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({
  locale,
  params,
}) => {
  const pageNumber = Number(params!.number as BlogPageParams['number']);
  const queriedPostsNumber = settings.postsPerPage * pageNumber;
  const lastCursor = await getArticlesEndCursor({
    first: queriedPostsNumber,
  });
  const articles = await getArticles({
    first: settings.postsPerPage,
    after: lastCursor,
  });
  const totalArticles = await getTotalArticles();
  const totalThematics = await getTotalThematics();
  const thematics = await getThematicsPreview({ first: totalThematics });
  const totalTopics = await getTotalTopics();
  const topics = await getTopicsPreview({ first: totalTopics });
  const translation = await loadTranslation(locale);

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
      pageNumber,
      thematicsList: thematics.edges.map((edge) => edge.node),
      topicsList: topics.edges.map((edge) => edge.node),
      totalArticles,
      translation,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const totalArticles = await getTotalArticles();
  const totalPages = Math.ceil(totalArticles / settings.postsPerPage);
  const pagesArray = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  const paths = pagesArray.map((number) => {
    return { params: { number: `${number}` } };
  });

  return {
    paths,
    fallback: false,
  };
};

export default BlogPage;
