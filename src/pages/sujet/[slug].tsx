import { getLayout } from '@components/Layouts/Layout';
import PostPreview from '@components/PostPreview/PostPreview';
import { t } from '@lingui/macro';
import { NextPageWithLayout } from '@ts/types/app';
import { TopicProps, ThematicPreview } from '@ts/types/taxonomies';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import styles from '@styles/pages/Page.module.scss';
import { getAllTopicsSlug, getTopicBySlug } from '@services/graphql/queries';
import PostHeader from '@components/PostHeader/PostHeader';
import { ArticleMeta } from '@ts/types/articles';
import { RelatedThematics, ToC, TopicsList } from '@components/Widgets';
import { useRef } from 'react';
import Head from 'next/head';
import Sidebar from '@components/Sidebar/Sidebar';
import { Article as Article, Graph, WebPage } from 'schema-dts';
import { config } from '@config/website';
import { useRouter } from 'next/router';

const Topic: NextPageWithLayout<TopicProps> = ({ topic }) => {
  const relatedThematics = useRef<ThematicPreview[]>([]);
  const router = useRouter();

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
  const topicUrl = `${config.url}${router.asPath}`;

  const webpageSchema: WebPage = {
    '@id': `${topicUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${config.url}/#breadcrumb` },
    name: topic.seo.title,
    description: topic.seo.metaDesc,
    inLanguage: config.locales.defaultLocale,
    reviewedBy: { '@id': `${config.url}/#branding` },
    url: `${config.url}`,
    isPartOf: {
      '@id': `${config.url}`,
    },
  };

  const publicationDate = new Date(topic.dates.publication);
  const updateDate = new Date(topic.dates.update);

  const articleSchema: Article = {
    '@id': `${config.url}/topic`,
    '@type': 'Article',
    name: topic.title,
    description: topic.intro,
    author: { '@id': `${config.url}/#branding` },
    copyrightYear: publicationDate.getFullYear(),
    creator: { '@id': `${config.url}/#branding` },
    dateCreated: publicationDate.toISOString(),
    dateModified: updateDate.toISOString(),
    datePublished: publicationDate.toISOString(),
    editor: { '@id': `${config.url}/#branding` },
    thumbnailUrl: topic.featuredImage?.sourceUrl,
    image: topic.featuredImage?.sourceUrl,
    inLanguage: config.locales.defaultLocale,
    isPartOf: { '@id': `${config.url}/blog` },
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: { '@id': `${topicUrl}` },
    subjectOf: { '@id': `${config.url}/blog` },
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
        <Sidebar position="left">
          <ToC />
        </Sidebar>
        <div className={styles.body}>
          <div dangerouslySetInnerHTML={{ __html: topic.content }}></div>
          {topic.posts.length > 0 && (
            <section className={styles.section}>
              <h2>{t`All posts in ${topic.title}`}</h2>
              <ol className={styles.list}>{getPostsList()}</ol>
            </section>
          )}
        </div>
        <Sidebar position="right">
          <RelatedThematics thematics={relatedThematics.current} />
          <TopicsList title={t`Other topics`} />
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
  const translation = await loadTranslation(
    context.locale!,
    process.env.NODE_ENV === 'production'
  );
  const { slug } = context.params as PostParams;
  const topic = await getTopicBySlug(slug);
  const breadcrumbTitle = topic.title;

  return {
    props: {
      breadcrumbTitle,
      topic,
      translation,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugs = await getAllTopicsSlug();

  return {
    paths: allSlugs.map((post) => `/sujet/${post.slug}`),
    fallback: true,
  };
};

export default Topic;
