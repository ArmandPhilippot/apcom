/* eslint-disable max-statements */
import type { ParsedUrlQuery } from 'querystring';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
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
import {
  getLinksItemData,
  getPostsWithUrl,
  getSchemaFrom,
  getWebPageGraph,
  slugify,
  trimHTMLTags,
} from '../../utils/helpers';
import { loadTranslation, type Messages } from '../../utils/helpers/server';
import {
  useBreadcrumbs,
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
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumbs(
    topic.title
  );
  const { ref, tree } = useHeadingsTree<HTMLDivElement>({ fromLevel: 2 });

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

  const jsonLd = getSchemaFrom([
    getWebPageGraph({
      breadcrumb: breadcrumbSchema,
      copyrightYear: new Date(dates.publication).getFullYear(),
      cover: cover?.src,
      dates,
      description: trimHTMLTags(intro),
      slug,
      title,
    }),
  ]);

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
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      </Head>
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
