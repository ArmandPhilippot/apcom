import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ParsedUrlQuery } from 'querystring';
import { useIntl } from 'react-intl';
import {
  getLayout,
  Heading,
  LinksListWidget,
  PageLayout,
  type PageLayoutProps,
  PostsList,
  ResponsiveImage,
} from '../../components';
import {
  getAllTopicsSlugs,
  getTopicBySlug,
  getTopicsPreview,
  getTotalTopics,
} from '../../services/graphql';
import styles from '../../styles/pages/topic.module.scss';
import {
  type NextPageWithLayout,
  type PageLink,
  type Topic,
} from '../../types';
import {
  getLinksListItems,
  getPageLinkFromRawData,
  getPostsWithUrl,
  getSchemaJson,
  getSinglePageSchema,
  getWebPageSchema,
} from '../../utils/helpers';
import { loadTranslation, type Messages } from '../../utils/helpers/server';
import { useBreadcrumb, useSettings } from '../../utils/hooks';

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
    url: `/sujet/${slug}`,
  });

  const headerMeta: PageLayoutProps['headerMeta'] = {
    publication: { date: dates.publication },
    update: dates.update ? { date: dates.update } : undefined,
    website: officialWebsite,
    total: articles ? articles.length : undefined,
  };

  const { website } = useSettings();
  const { asPath } = useRouter();
  const webpageSchema = getWebPageSchema({
    description: seo.description,
    locale: website.locales.default,
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
    locale: website.locales.default,
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

  const getPageHeading = () => {
    return (
      <>
        {cover && <ResponsiveImage className={styles.logo} {...cover} />}
        {title}
      </>
    );
  };

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:url" content={`${website.url}${asPath}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={intro} />
      </Head>
      <Script
        id="schema-project"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <PageLayout
        breadcrumb={breadcrumbItems}
        breadcrumbSchema={breadcrumbSchema}
        title={getPageHeading()}
        intro={intro}
        headerMeta={headerMeta}
        widgets={
          thematics
            ? [
                <LinksListWidget
                  key="related-thematics"
                  items={getLinksListItems(thematics)}
                  title={thematicsListTitle}
                  level={2}
                />,
                <LinksListWidget
                  key="topics"
                  items={getLinksListItems(topics)}
                  title={topicsListTitle}
                  level={2}
                />,
              ]
            : []
        }
      >
        {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
        {articles && (
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
              baseUrl="/sujet/page/"
              byYear={true}
              posts={getPostsWithUrl(articles)}
              searchPage="/recherche/"
              titleLevel={3}
              total={articles.length}
            />
          </>
        )}
      </PageLayout>
    </>
  );
};

TopicPage.getLayout = (page) =>
  getLayout(page, { useGrid: true, withExtraPadding: true });

interface TopicParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<TopicPageProps> = async ({
  locale,
  params,
}) => {
  const currentTopic = await getTopicBySlug(
    params!.slug as TopicParams['slug']
  );
  const totalTopics = await getTotalTopics();
  const allTopicsEdges = await getTopicsPreview({
    first: totalTopics,
  });
  const allTopics = allTopicsEdges.edges.map((edge) =>
    getPageLinkFromRawData(edge.node, 'topic')
  );
  const topicsLinks = allTopics.filter(
    (topic) => topic.url !== `/sujet/${params!.slug as TopicParams['slug']}`
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
