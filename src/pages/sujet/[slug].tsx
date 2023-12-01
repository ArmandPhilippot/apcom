/* eslint-disable max-statements */
import type { ParsedUrlQuery } from 'querystring';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useIntl } from 'react-intl';
import {
  getLayout,
  Heading,
  LinksWidget,
  PostsList,
  Page,
  PageHeader,
  PageSidebar,
  PageBody,
  LoadingPage,
  TocWidget,
  Spinner,
} from '../../components';
import {
  convertWPTopicPreviewToPageLink,
  fetchAllTopicsSlugs,
  fetchTopic,
  fetchTopicsCount,
  fetchTopicsList,
} from '../../services/graphql';
import styles from '../../styles/pages/blog.module.scss';
import type {
  GraphQLConnection,
  NextPageWithLayout,
  WPTopic,
  WPTopicPreview,
} from '../../types';
import { CONFIG } from '../../utils/config';
import { ROUTES } from '../../utils/constants';
import {
  getLinksItemData,
  getPostsWithUrl,
  getSchemaJson,
  getSinglePageSchema,
  getWebPageSchema,
  slugify,
} from '../../utils/helpers';
import { loadTranslation, type Messages } from '../../utils/helpers/server';
import {
  useBreadcrumb,
  useHeadingsTree,
  useTopic,
  useTopicsList,
} from '../../utils/hooks';

export type TopicPageProps = {
  data: {
    currentTopic: WPTopic;
    otherTopics: GraphQLConnection<WPTopicPreview>;
    totalTopics: number;
  };
  translation: Messages;
};

const TopicPage: NextPageWithLayout<TopicPageProps> = ({ data }) => {
  const intl = useIntl();
  const { isFallback } = useRouter();
  const { isLoading, topic } = useTopic(
    data.currentTopic.slug,
    data.currentTopic
  );
  const { isLoading: areTopicsLoading, topics } = useTopicsList({
    fallback: data.otherTopics,
    input: { first: data.totalTopics, where: { notIn: [topic.id] } },
  });
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title: topic.title,
    url: `${ROUTES.TOPICS}/${topic.slug}`,
  });
  const { ref, tree } = useHeadingsTree({ fromLevel: 2 });

  if (isFallback || isLoading) return <LoadingPage />;

  const { content, intro, meta, slug, title } = topic;
  const {
    articles,
    cover,
    dates,
    seo,
    relatedThematics,
    website: officialWebsite,
  } = meta;

  const webpageSchema = getWebPageSchema({
    description: seo.description,
    locale: CONFIG.locales.defaultLocale,
    slug,
    title: seo.title,
    updateDate: dates.update,
  });
  const articleSchema = getSinglePageSchema({
    cover: cover?.src,
    dates,
    description: intro,
    id: 'topic',
    kind: 'page',
    locale: CONFIG.locales.defaultLocale,
    slug,
    title,
  });
  const schemaJsonLd = getSchemaJson([webpageSchema, articleSchema]);

  const messages = {
    widgets: {
      loadingTopicsList: intl.formatMessage({
        defaultMessage: 'Topics are loading...',
        description: 'TopicPage: loading topics message',
        id: 'uUIgCr',
      }),
      thematicsListTitle: intl.formatMessage({
        defaultMessage: 'Related thematics',
        description: 'TopicPage: related thematics list widget title',
        id: '/sRqPT',
      }),
      tocTitle: intl.formatMessage({
        defaultMessage: 'Table of Contents',
        description: 'PageLayout: table of contents title',
        id: 'eys2uX',
      }),
      topicsListTitle: intl.formatMessage({
        defaultMessage: 'Other topics',
        description: 'TopicPage: other topics list widget title',
        id: 'JpC3JH',
      }),
    },
    browsePostsTitle: intl.formatMessage(
      {
        defaultMessage: 'Browse posts in {topicName} topic',
        description: 'TopicPage: posts list heading',
        id: 'd+DOFQ',
      },
      { topicName: title }
    ),
  };

  const pageUrl = `${CONFIG.url}${slug}`;
  const browsePostHeadingId = slugify(messages.browsePostsTitle);

  return (
    <Page breadcrumbs={breadcrumbItems}>
      <Head>
        <title>{seo.title}</title>
        {/*eslint-disable-next-line react/jsx-no-literals -- Name allowed */}
        <meta name="description" content={seo.description} />
        <meta property="og:url" content={pageUrl} />
        {/*eslint-disable-next-line react/jsx-no-literals -- Content allowed */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={intro} />
      </Head>
      <Script
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-project"
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
        heading={
          <>
            {cover ? (
              <NextImage {...cover} className={styles['topic-logo']} />
            ) : null}
            {title}
          </>
        }
        intro={intro}
        meta={{
          publicationDate: dates.publication,
          total: articles?.length,
          updateDate: dates.update,
          website: officialWebsite,
        }}
      />
      <PageSidebar>
        <TocWidget
          heading={<Heading level={2}>{messages.widgets.tocTitle}</Heading>}
          tree={[
            ...tree,
            {
              children: [],
              depth: 2,
              id: browsePostHeadingId,
              label: messages.browsePostsTitle,
            },
          ]}
        />
      </PageSidebar>
      <PageBody>
        <div
          className={styles.body}
          // eslint-disable-next-line react/no-danger -- Necessary for content
          dangerouslySetInnerHTML={{ __html: content }}
          ref={ref}
        />
        {articles ? (
          <>
            <Heading id={browsePostHeadingId} level={2}>
              {messages.browsePostsTitle}
            </Heading>
            <PostsList
              posts={getPostsWithUrl(articles)}
              headingLvl={3}
              sortByYear
            />
          </>
        ) : null}
      </PageBody>
      <PageSidebar>
        {relatedThematics ? (
          <LinksWidget
            heading={
              <Heading level={2}>{messages.widgets.thematicsListTitle}</Heading>
            }
            items={getLinksItemData(relatedThematics)}
          />
        ) : null}
        {areTopicsLoading ? (
          <Spinner>{messages.widgets.loadingTopicsList}</Spinner>
        ) : (
          <LinksWidget
            heading={
              <Heading level={2}>{messages.widgets.topicsListTitle}</Heading>
            }
            items={getLinksItemData(
              topics.edges.map((edge) =>
                convertWPTopicPreviewToPageLink(edge.node)
              )
            )}
          />
        )}
      </PageSidebar>
    </Page>
  );
};

TopicPage.getLayout = (page) => getLayout(page);

type TopicParams = {
  slug: string;
} & ParsedUrlQuery;

export const getStaticProps: GetStaticProps<TopicPageProps> = async ({
  locale,
  params,
}) => {
  const currentTopic = await fetchTopic((params as TopicParams).slug);
  const totalTopics = await fetchTopicsCount();
  const otherTopics = await fetchTopicsList({
    first: totalTopics,
    where: { notIn: [currentTopic.databaseId] },
  });
  const translation = await loadTranslation(locale);

  return {
    props: {
      data: {
        currentTopic: JSON.parse(JSON.stringify(currentTopic)),
        otherTopics: JSON.parse(JSON.stringify(otherTopics)),
        totalTopics,
      },
      translation,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const topicsCount = await fetchTopicsCount();
  const slugs = await fetchAllTopicsSlugs(topicsCount);
  const paths = slugs.map((slug) => {
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

export default TopicPage;
