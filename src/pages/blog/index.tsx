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
  LinksListWidget,
  type MetaItemData,
  Notice,
  PageLayout,
  PostsList,
} from '../../components';
import {
  getArticles,
  getThematicsPreview,
  getTopicsPreview,
  getTotalArticles,
  getTotalThematics,
  getTotalTopics,
} from '../../services/graphql';
import type {
  EdgesResponse,
  NextPageWithLayout,
  RawArticle,
  RawThematicPreview,
  RawTopicPreview,
} from '../../types';
import { settings } from '../../utils/config';
import { ROUTES } from '../../utils/constants';
import {
  getBlogSchema,
  getLinksListItems,
  getPageLinkFromRawData,
  getPostsList,
  getSchemaJson,
  getWebPageSchema,
} from '../../utils/helpers';
import { loadTranslation, type Messages } from '../../utils/helpers/server';
import { useBreadcrumb, usePagination, useSettings } from '../../utils/hooks';

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
    url: ROUTES.BLOG,
  });

  const { blog, website } = useSettings();
  const { asPath } = useRouter();
  const page = {
    title: intl.formatMessage(
      {
        defaultMessage: 'Blog: development, open source - {websiteName}',
        description: 'BlogPage: SEO - Page title',
        id: '+Y+tLK',
      },
      { websiteName: website.name }
    ),
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

  const loadMore = useCallback(() => {
    setSize((prevSize) => prevSize + 1);
  }, [setSize]);

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

  const headerMeta: MetaItemData[] = totalArticles
    ? [
        {
          id: 'posts-count',
          label: intl.formatMessage({
            defaultMessage: 'Total:',
            description: 'Page: total label',
            id: 'kNBXyK',
          }),
          value: intl.formatMessage(
            {
              defaultMessage:
                '{postsCount, plural, =0 {No articles} one {# article} other {# articles}}',
              description: 'Page: posts count meta',
              id: 'RvGb2c',
            },
            { postsCount: totalArticles }
          ),
        },
      ]
    : [];

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
        headerMeta={headerMeta}
        widgets={[
          <LinksListWidget
            heading={
              <Heading isFake level={3}>
                {thematicsListTitle}
              </Heading>
            }
            items={getLinksListItems(
              thematicsList.map((thematic) =>
                getPageLinkFromRawData(thematic, 'thematic')
              )
            )}
            // eslint-disable-next-line react/jsx-no-literals -- Key allowed
            key="thematics-list"
          />,
          <LinksListWidget
            heading={
              <Heading isFake level={3}>
                {topicsListTitle}
              </Heading>
            }
            items={getLinksListItems(
              topicsList.map((topic) => getPageLinkFromRawData(topic, 'topic'))
            )}
            // eslint-disable-next-line react/jsx-no-literals -- Key allowed
            key="topics-list"
          />,
        ]}
      >
        {data ? (
          <PostsList
            baseUrl={postsListBaseUrl}
            byYear={true}
            isLoading={isLoadingMore ?? isLoadingInitialData}
            loadMore={loadMore}
            posts={getPostsList(data)}
            showLoadMoreBtn={hasNextPage}
            total={totalArticles}
          />
        ) : null}
        {error ? (
          <Notice
            // eslint-disable-next-line react/jsx-no-literals -- Kind allowed
            kind="error"
          >
            {intl.formatMessage({
              defaultMessage: 'Failed to load.',
              description: 'BlogPage: failed to load text',
              id: 'C/XGkH',
            })}
          </Notice>
        ) : null}
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
