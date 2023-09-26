/* eslint-disable max-statements */
import type { ParsedUrlQuery } from 'querystring';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
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
import type {
  EdgesResponse,
  NextPageWithLayout,
  RawArticle,
  RawThematicPreview,
  RawTopicPreview,
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
import { ROUTES } from 'src/utils/constants';

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
    redirectTo: ROUTES.BLOG,
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
    url: `${ROUTES.BLOG}/page/${pageNumber}`,
  });

  const { website } = useSettings();
  const { asPath } = useRouter();
  const page = {
    title: `${pageTitleWithPageNumber} - ${website.name}`,
    url: `${website.url}${asPath}`,
  };
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
  const postsListBaseUrl = `${ROUTES.BLOG}/page/`;

  return (
    <>
      <Head>
        <title>{page.title}</title>
        {/*eslint-disable-next-line react/jsx-no-literals -- Name allowed */}
        <meta name="description" content={pageDescription} />
        <meta property="og:url" content={page.url} />
        {/*eslint-disable-next-line react/jsx-no-literals -- Content allowed */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitleWithPageNumber} />
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
        title={pageTitleWithPageNumber}
        breadcrumb={breadcrumbItems}
        breadcrumbSchema={breadcrumbSchema}
        headerMeta={{ total: totalArticles }}
        widgets={[
          <LinksListWidget
            // eslint-disable-next-line react/jsx-no-literals -- Key allowed
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
            // eslint-disable-next-line react/jsx-no-literals -- Key allowed
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
          baseUrl={postsListBaseUrl}
          byYear={true}
          pageNumber={pageNumber}
          posts={getPostsList([articles])}
          searchPage={ROUTES.SEARCH}
          total={totalArticles}
        />
      </PageLayout>
    </>
  );
};

BlogPage.getLayout = (page) =>
  getLayout(page, { useGrid: true, withExtraPadding: true });

type BlogPageParams = {
  number: string;
} & ParsedUrlQuery;

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({
  locale,
  params,
}) => {
  const pageNumber = Number((params as BlogPageParams).number);
  const lastCursor = await getArticlesEndCursor({
    first: settings.postsPerPage * pageNumber,
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
