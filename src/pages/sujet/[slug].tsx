import Heading from '@components/atoms/headings/heading';
import ResponsiveImage from '@components/molecules/images/responsive-image';
import PostsList, { type Post } from '@components/organisms/layout/posts-list';
import LinksListWidget from '@components/organisms/widgets/links-list-widget';
import { getLayout } from '@components/templates/layout/layout';
import PageLayout, {
  type PageLayoutProps,
} from '@components/templates/page/page-layout';
import {
  getAllTopicsSlugs,
  getTopicBySlug,
  getTopicsPreview,
  getTotalTopics,
} from '@services/graphql/topics';
import styles from '@styles/pages/topic.module.scss';
import {
  type Article,
  type NextPageWithLayout,
  type PageLink,
  type Topic,
} from '@ts/types/app';
import { loadTranslation, type Messages } from '@utils/helpers/i18n';
import {
  getLinksListItems,
  getPageLinkFromRawData,
  getPostMeta,
} from '@utils/helpers/pages';
import useBreadcrumb from '@utils/hooks/use-breadcrumb';
import useSettings from '@utils/hooks/use-settings';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ParsedUrlQuery } from 'querystring';
import { useIntl } from 'react-intl';
import { Article as ArticleSchema, Graph, WebPage } from 'schema-dts';

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
  const pageUrl = `${website.url}${asPath}`;
  const pagePublicationDate = new Date(dates.publication);
  const pageUpdateDate = dates.update ? new Date(dates.update) : undefined;

  const webpageSchema: WebPage = {
    '@id': `${pageUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${website.url}/#breadcrumb` },
    name: seo.title,
    description: seo.description,
    inLanguage: website.locales.default,
    reviewedBy: { '@id': `${website.url}/#branding` },
    url: `${website.url}`,
  };

  const articleSchema: ArticleSchema = {
    '@id': `${website.url}/#topic`,
    '@type': 'Article',
    name: title,
    description: intro,
    author: { '@id': `${website.url}/#branding` },
    copyrightYear: pagePublicationDate.getFullYear(),
    creator: { '@id': `${website.url}/#branding` },
    dateCreated: pagePublicationDate.toISOString(),
    dateModified: pageUpdateDate && pageUpdateDate.toISOString(),
    datePublished: pagePublicationDate.toISOString(),
    editor: { '@id': `${website.url}/#branding` },
    headline: title,
    inLanguage: website.locales.default,
    isPartOf: { '@id': `${website.url}/blog` },
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: { '@id': `${pageUrl}` },
    subjectOf: { '@id': `${website.url}/blog` },
  };

  const schemaJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageSchema, articleSchema],
  };

  const getPosts = (array: Article[]): Post[] => {
    return array.map((article) => {
      const {
        intro: articleIntro,
        meta: articleMeta,
        slug: articleSlug,
        ...remainingData
      } = article;

      const { cover: articleCover, ...remainingMeta } = articleMeta;

      return {
        cover: articleCover,
        excerpt: articleIntro,
        meta: getPostMeta(remainingMeta),
        url: `/article/${articleSlug}`,
        ...remainingData,
      };
    });
  };

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
        <meta property="og:url" content={`${pageUrl}`} />
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
                  items={getLinksListItems(thematics, 'thematic')}
                  title={thematicsListTitle}
                  level={2}
                />,
                <LinksListWidget
                  key="topics"
                  items={getLinksListItems(topics, 'topic')}
                  title={topicsListTitle}
                  level={2}
                />,
              ]
            : []
        }
      >
        <div dangerouslySetInnerHTML={{ __html: content }} />
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
              posts={getPosts(articles)}
              total={articles.length}
              titleLevel={3}
              byYear={true}
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
    getPageLinkFromRawData(edge.node)
  );
  const topicsLinks = allTopics.filter(
    (topic) => topic.slug !== (params!.slug as TopicParams['slug'])
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
