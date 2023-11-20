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
  TocWidget,
  PageBody,
} from '../../components';
import {
  getAllTopicsSlugs,
  getTopicBySlug,
  getTopicsPreview,
  getTotalTopics,
} from '../../services/graphql';
import styles from '../../styles/pages/blog.module.scss';
import type { NextPageWithLayout, PageLink, Topic } from '../../types';
import { CONFIG } from '../../utils/config';
import { ROUTES } from '../../utils/constants';
import {
  getLinksItemData,
  getPageLinkFromRawData,
  getPostsWithUrl,
  getSchemaJson,
  getSinglePageSchema,
  getWebPageSchema,
} from '../../utils/helpers';
import { loadTranslation, type Messages } from '../../utils/helpers/server';
import { useBreadcrumb, useHeadingsTree } from '../../utils/hooks';

export type TopicPageProps = {
  currentTopic: Topic;
  topics: PageLink[];
  translation: Messages;
};

const TopicPage: NextPageWithLayout<TopicPageProps> = ({
  currentTopic,
  topics,
}) => {
  const { content, intro, meta, slug, title } = currentTopic;
  const {
    articles,
    cover,
    dates,
    seo,
    thematics,
    website: officialWebsite,
  } = meta;
  const intl = useIntl();
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title,
    url: `${ROUTES.TOPICS}/${slug}`,
  });
  const { ref, tree } = useHeadingsTree({ fromLevel: 2 });

  const { asPath } = useRouter();
  const webpageSchema = getWebPageSchema({
    description: seo.description,
    locale: CONFIG.locales.defaultLocale,
    slug: asPath,
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
    slug: asPath,
    title,
  });
  const schemaJsonLd = getSchemaJson([webpageSchema, articleSchema]);

  const topicsListTitle = intl.formatMessage({
    defaultMessage: 'Other topics',
    description: 'TopicPage: other topics list widget title',
    id: 'JpC3JH',
  });

  const thematicsListTitle = intl.formatMessage({
    defaultMessage: 'Related thematics',
    description: 'TopicPage: related thematics list widget title',
    id: '/sRqPT',
  });

  const getPageHeading = () => (
    <>
      {cover ? <NextImage {...cover} className={styles.logo} /> : null}
      {title}
    </>
  );
  const pageUrl = `${CONFIG.url}${asPath}`;
  const tocTitle = intl.formatMessage({
    defaultMessage: 'Table of Contents',
    description: 'PageLayout: table of contents title',
    id: 'eys2uX',
  });

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
        heading={getPageHeading()}
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
          heading={<Heading level={3}>{tocTitle}</Heading>}
          tree={tree}
        />
      </PageSidebar>
      <PageBody className={styles.body} ref={ref}>
        {/*eslint-disable-next-line react/no-danger -- Necessary for content*/}
        {content ? <div dangerouslySetInnerHTML={{ __html: content }} /> : null}
        {articles ? (
          <>
            <Heading level={2}>
              {intl.formatMessage(
                {
                  defaultMessage: 'All posts in {topicName}',
                  description: 'TopicPage: posts list heading',
                  id: 'zEN3fd',
                },
                { topicName: title }
              )}
            </Heading>
            <PostsList
              className={styles.list}
              posts={getPostsWithUrl(articles)}
              headingLvl={3}
              sortByYear
            />
          </>
        ) : null}
      </PageBody>
      <PageSidebar>
        {thematics ? (
          <LinksWidget
            heading={
              <Heading isFake level={3}>
                {thematicsListTitle}
              </Heading>
            }
            items={getLinksItemData(thematics)}
          />
        ) : null}
        <LinksWidget
          heading={
            <Heading isFake level={3}>
              {topicsListTitle}
            </Heading>
          }
          items={getLinksItemData(topics)}
        />
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
  const currentTopic = await getTopicBySlug((params as TopicParams).slug);
  const totalTopics = await getTotalTopics();
  const allTopicsEdges = await getTopicsPreview({
    first: totalTopics,
  });
  const allTopics = allTopicsEdges.edges.map((edge) =>
    getPageLinkFromRawData(edge.node, 'topic')
  );
  const topicsLinks = allTopics.filter(
    (topic) => topic.url !== `${ROUTES.TOPICS}/${(params as TopicParams).slug}`
  );
  const translation = await loadTranslation(locale);

  return {
    props: {
      currentTopic: JSON.parse(JSON.stringify(currentTopic)),
      topics: JSON.parse(JSON.stringify(topicsLinks)),
      translation,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllTopicsSlugs();
  const paths = slugs.map((slug) => {
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

export default TopicPage;
