import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ParsedUrlQuery } from 'querystring';
import { useIntl } from 'react-intl';
import {
  getLayout,
  LinksListWidget,
  PageLayout,
  PostsList,
} from '../../../components';
import {
  getArticles,
  getArticlesEndCursor,
  getThematicsPreview,
  getTopicsPreview,
  getTotalArticles,
  getTotalThematics,
  getTotalTopics,
} from '../../../services/graphql';
import {
  type EdgesResponse,
  type NextPageWithLayout,
  type RawArticle,
  type RawThematicPreview,
  type RawTopicPreview,
} from '../../../types';
import { settings } from '../../../utils/config';
import {
  getBlogSchema,
  getLinksListItems,
  getPageLinkFromRawData,
  getPostsList,
  getSchemaJson,
  getWebPageSchema,
} from '../../../utils/helpers';
import { loadTranslation, type Messages } from '../../../utils/helpers/server';
import {
  useBreadcrumb,
  useRedirection,
  useSettings,
} from '../../../utils/hooks';

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
        <PostsList
          baseUrl="/blog/page/"
          byYear={true}
          pageNumber={pageNumber}
          posts={getPostsList([articles])}
          searchPage="/recherche/"
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
