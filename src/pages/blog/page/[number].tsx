/* eslint-disable max-statements */
import type { ParsedUrlQuery } from 'querystring';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import {
  getLayout,
  Heading,
  LinksWidget,
  PostsList,
  Pagination,
  type RenderPaginationLink,
  type RenderPaginationItemAriaLabel,
  Page,
  PageHeader,
  PageBody,
  PageSidebar,
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
import { CONFIG } from '../../../utils/config';
import { ROUTES } from '../../../utils/constants';
import {
  getBlogSchema,
  getLinksItemData,
  getPageLinkFromRawData,
  getSchemaJson,
  getWebPageSchema,
} from '../../../utils/helpers';
import { loadTranslation, type Messages } from '../../../utils/helpers/server';
import {
  useBreadcrumb,
  usePostsList,
  useRedirection,
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
    redirectTo: ROUTES.BLOG,
  });

  const { posts } = usePostsList({
    fallback: [articles],
    fetcher: getArticles,
    perPage: CONFIG.postsPerPage,
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

  const { asPath } = useRouter();
  const page = {
    title: `${pageTitleWithPageNumber} - ${CONFIG.name}`,
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
    <Page breadcrumbs={breadcrumbItems} isBodyLastChild>
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
      <Script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-breadcrumb"
        type="application/ld+json"
      />
      <PageHeader
        heading={pageTitleWithPageNumber}
        meta={{ total: totalArticles }}
      />
      <PageBody>
        <PostsList posts={posts ?? []} sortByYear />
        <Pagination
          aria-label={paginationAriaLabel}
          current={pageNumber}
          isCentered
          renderItemAriaLabel={renderPaginationLabel}
          renderLink={renderPaginationLink}
          total={totalArticles}
        />
      </PageBody>
      <PageSidebar>
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
        />
        <LinksWidget
          heading={
            <Heading isFake level={3}>
              {topicsListTitle}
            </Heading>
          }
          items={getLinksItemData(
            topicsList.map((topic) => getPageLinkFromRawData(topic, 'topic'))
          )}
        />
      </PageSidebar>
    </Page>
  );
};

BlogPage.getLayout = (page) => getLayout(page);

type BlogPageParams = {
  number: string;
} & ParsedUrlQuery;

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({
  locale,
  params,
}) => {
  const pageNumber = Number((params as BlogPageParams).number);
  const lastCursor = await getArticlesEndCursor({
    first: CONFIG.postsPerPage * pageNumber,
  });
  const articles = await getArticles({
    first: CONFIG.postsPerPage,
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
  const totalPages = Math.ceil(totalArticles / CONFIG.postsPerPage);
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
