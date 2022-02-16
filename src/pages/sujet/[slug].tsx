import { getLayout } from '@components/Layouts/Layout';
import PostHeader from '@components/PostHeader/PostHeader';
import PostPreview from '@components/PostPreview/PostPreview';
import Sidebar from '@components/Sidebar/Sidebar';
import Spinner from '@components/Spinner/Spinner';
import { RelatedThematics, ToC, TopicsList } from '@components/Widgets';
import {
  getAllTopics,
  getAllTopicsSlug,
  getTopicBySlug,
} from '@services/graphql/queries';
import styles from '@styles/pages/Page.module.scss';
import { NextPageWithLayout } from '@ts/types/app';
import { ArticleMeta } from '@ts/types/articles';
import { TopicProps, ThematicPreview } from '@ts/types/taxonomies';
import { settings } from '@utils/config';
import { getFormattedPaths } from '@utils/helpers/format';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useRef } from 'react';
import { useIntl } from 'react-intl';
import { Article as Article, Graph, WebPage } from 'schema-dts';

const Topic: NextPageWithLayout<TopicProps> = ({ topic, allTopics }) => {
  const intl = useIntl();
  const relatedThematics = useRef<ThematicPreview[]>([]);
  const router = useRouter();

  if (router.isFallback) return <Spinner />;

  const updateRelatedThematics = (newThematics: ThematicPreview[]) => {
    newThematics.forEach((thematic) => {
      const thematicIndex = relatedThematics.current.findIndex(
        (relatedThematic) => relatedThematic.id === thematic.id
      );
      const hasThematic = thematicIndex === -1 ? false : true;

      if (!hasThematic) relatedThematics.current.push(thematic);
    });
  };

  const getPostsList = () => {
    return [...topic.posts].reverse().map((post) => {
      updateRelatedThematics(post.thematics);

      return (
        <li key={post.id} className={styles.item}>
          <PostPreview post={post} titleLevel={3} />
        </li>
      );
    });
  };

  const meta: ArticleMeta = {
    dates: topic.dates,
    results: topic.posts.length,
    website: topic.officialWebsite,
  };
  const topicUrl = `${settings.url}${router.asPath}`;

  const webpageSchema: WebPage = {
    '@id': `${topicUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${settings.url}/#breadcrumb` },
    name: topic.seo.title,
    description: topic.seo.metaDesc,
    inLanguage: settings.locales.defaultLocale,
    reviewedBy: { '@id': `${settings.url}/#branding` },
    url: `${settings.url}`,
    isPartOf: {
      '@id': `${settings.url}`,
    },
  };

  const publicationDate = new Date(topic.dates.publication);
  const updateDate = new Date(topic.dates.update);

  const articleSchema: Article = {
    '@id': `${settings.url}/#topic`,
    '@type': 'Article',
    name: topic.title,
    description: topic.intro,
    author: { '@id': `${settings.url}/#branding` },
    copyrightYear: publicationDate.getFullYear(),
    creator: { '@id': `${settings.url}/#branding` },
    dateCreated: publicationDate.toISOString(),
    dateModified: updateDate.toISOString(),
    datePublished: publicationDate.toISOString(),
    editor: { '@id': `${settings.url}/#branding` },
    headline: topic.title,
    thumbnailUrl: topic.featuredImage?.sourceUrl,
    image: topic.featuredImage?.sourceUrl,
    inLanguage: settings.locales.defaultLocale,
    isPartOf: { '@id': `${settings.url}/blog` },
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: { '@id': `${topicUrl}` },
    subjectOf: { '@id': `${settings.url}/blog` },
  };

  const schemaJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageSchema, articleSchema],
  };

  return (
    <>
      <Head>
        <title>{topic.seo.title}</title>
        <meta name="description" content={topic.seo.metaDesc} />
        <meta property="og:url" content={`${topicUrl}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={topic.title} />
        <meta property="og:description" content={topic.intro} />
        <meta property="og:image" content={topic.featuredImage?.sourceUrl} />
        <meta property="og:image:alt" content={topic.featuredImage?.altText} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        ></script>
      </Head>
      <article
        id="topic"
        className={`${styles.article} ${styles['article--no-comments']}`}
      >
        <PostHeader
          cover={topic.featuredImage}
          intro={topic.intro}
          meta={meta}
          title={topic.title}
        />
        <Sidebar
          position="left"
          ariaLabel={intl.formatMessage({
            defaultMessage: 'Table of Contents',
            description: 'TopicPage: ToC sidebar aria-label',
          })}
        >
          <ToC />
        </Sidebar>
        <div className={styles.body}>
          <div dangerouslySetInnerHTML={{ __html: topic.content }}></div>
          {topic.posts.length > 0 && (
            <section className={styles.section}>
              <h2>
                {intl.formatMessage(
                  {
                    defaultMessage: 'All posts in {name}',
                    description: 'TopicPage: posts list title',
                  },
                  { name: topic.title }
                )}
              </h2>
              <ol className={styles.list}>{getPostsList()}</ol>
            </section>
          )}
        </div>
        <Sidebar
          position="right"
          ariaLabel={intl.formatMessage({
            defaultMessage: 'Sidebar',
            description: 'TopicPage: right sidebar aria-label',
          })}
        >
          <RelatedThematics thematics={relatedThematics.current} />
          <TopicsList
            initialData={allTopics}
            title={intl.formatMessage({
              defaultMessage: 'Others topics',
              description: 'TopicPage: topics list widget title',
            })}
          />
        </Sidebar>
      </article>
    </>
  );
};

Topic.getLayout = getLayout;

interface PostParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { locale } = context;
  const translation = await loadTranslation(locale);
  const { slug } = context.params as PostParams;
  const topic = await getTopicBySlug(slug);
  const allTopics = await getAllTopics();
  const breadcrumbTitle = topic.title;

  return {
    props: {
      allTopics,
      breadcrumbTitle,
      locale,
      topic,
      translation,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allTopics = await getAllTopicsSlug();
  const paths = getFormattedPaths(allTopics);

  return {
    paths,
    fallback: true,
  };
};

export default Topic;
