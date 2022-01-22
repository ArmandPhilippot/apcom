import { getLayout } from '@components/Layouts/Layout';
import PostPreview from '@components/PostPreview/PostPreview';
import { t } from '@lingui/macro';
import { NextPageWithLayout } from '@ts/types/app';
import { TopicPreview, ThematicProps } from '@ts/types/taxonomies';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import styles from '@styles/pages/Page.module.scss';
import {
  getAllThematicsSlug,
  getThematicBySlug,
} from '@services/graphql/queries';
import PostHeader from '@components/PostHeader/PostHeader';
import { RelatedTopics, ThematicsList, ToC } from '@components/Widgets';
import { useRef } from 'react';
import { ArticleMeta } from '@ts/types/articles';
import Head from 'next/head';
import Sidebar from '@components/Sidebar/Sidebar';
import { Article, Graph, WebPage } from 'schema-dts';
import { config } from '@config/website';
import { useRouter } from 'next/router';

const Thematic: NextPageWithLayout<ThematicProps> = ({ thematic }) => {
  const relatedTopics = useRef<TopicPreview[]>([]);
  const router = useRouter();

  const updateRelatedTopics = (newTopics: TopicPreview[]) => {
    newTopics.forEach((topic) => {
      const topicIndex = relatedTopics.current.findIndex(
        (relatedTopic) => relatedTopic.id === topic.id
      );
      const hasTopic = topicIndex === -1 ? false : true;

      if (!hasTopic) relatedTopics.current.push(topic);
    });
  };

  const getPostsList = () => {
    return [...thematic.posts].reverse().map((post) => {
      updateRelatedTopics(post.topics);

      return (
        <li key={post.id} className={styles.item}>
          <PostPreview post={post} titleLevel={3} />
        </li>
      );
    });
  };

  const meta: ArticleMeta = {
    dates: thematic.dates,
  };
  const thematicUrl = `${config.url}${router.asPath}`;

  const webpageSchema: WebPage = {
    '@id': `${thematicUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${config.url}/#breadcrumb` },
    name: thematic.seo.title,
    description: thematic.seo.metaDesc,
    inLanguage: config.locales.defaultLocale,
    reviewedBy: { '@id': `${config.url}/#branding` },
    url: `${config.url}`,
  };

  const publicationDate = new Date(thematic.dates.publication);
  const updateDate = new Date(thematic.dates.update);

  const articleSchema: Article = {
    '@id': `${config.url}/thematic`,
    '@type': 'Article',
    name: thematic.title,
    description: thematic.intro,
    author: { '@id': `${config.url}/#branding` },
    copyrightYear: publicationDate.getFullYear(),
    creator: { '@id': `${config.url}/#branding` },
    dateCreated: publicationDate.toISOString(),
    dateModified: updateDate.toISOString(),
    datePublished: publicationDate.toISOString(),
    editor: { '@id': `${config.url}/#branding` },
    inLanguage: config.locales.defaultLocale,
    isPartOf: { '@id': `${config.url}/blog` },
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: { '@id': `${thematicUrl}` },
    subjectOf: { '@id': `${config.url}/blog` },
  };

  const schemaJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageSchema, articleSchema],
  };

  return (
    <>
      <Head>
        <title>{thematic.seo.title}</title>
        <meta name="description" content={thematic.seo.metaDesc} />
        <meta property="og:url" content={`${thematic}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={thematic.title} />
        <meta property="og:description" content={thematic.intro} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        ></script>
      </Head>
      <article
        id="thematic"
        className={`${styles.article} ${styles['article--no-comments']}`}
      >
        <PostHeader intro={thematic.intro} meta={meta} title={thematic.title} />
        <Sidebar position="left">
          <ToC />
        </Sidebar>
        <div className={styles.body}>
          <div dangerouslySetInnerHTML={{ __html: thematic.content }}></div>
          {thematic.posts.length > 0 && (
            <section className={styles.section}>
              <h2>{t`All posts in ${thematic.title}`}</h2>
              <ol className={styles.list}>{getPostsList()}</ol>
            </section>
          )}
        </div>
        <Sidebar position="right">
          <RelatedTopics topics={relatedTopics.current} />
          <ThematicsList title={t`Other thematics`} />
        </Sidebar>
      </article>
    </>
  );
};

Thematic.getLayout = getLayout;

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
  const thematic = await getThematicBySlug(slug);
  const breadcrumbTitle = thematic.title;

  return {
    props: {
      breadcrumbTitle,
      thematic,
      translation,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugs = await getAllThematicsSlug();

  return {
    paths: allSlugs.map((post) => `/thematique/${post.slug}`),
    fallback: true,
  };
};

export default Thematic;
