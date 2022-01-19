import { getLayout } from '@components/Layouts/Layout';
import PostPreview from '@components/PostPreview/PostPreview';
import { t } from '@lingui/macro';
import { NextPageWithLayout } from '@ts/types/app';
import { SubjectProps, ThematicPreview } from '@ts/types/taxonomies';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import styles from '@styles/pages/Page.module.scss';
import {
  getAllSubjectsSlug,
  getSubjectBySlug,
} from '@services/graphql/queries';
import PostHeader from '@components/PostHeader/PostHeader';
import { ArticleMeta } from '@ts/types/articles';
import { RelatedThematics, ToC, TopicsList } from '@components/Widgets';
import { useRef } from 'react';
import Head from 'next/head';
import Sidebar from '@components/Sidebar/Sidebar';
import { Article as Article, Blog, Graph, WebPage } from 'schema-dts';
import { config } from '@config/website';
import { useRouter } from 'next/router';

const Subject: NextPageWithLayout<SubjectProps> = ({ subject }) => {
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
    return [...subject.posts].reverse().map((post) => {
      updateRelatedThematics(post.thematics);

      return (
        <li key={post.id} className={styles.item}>
          <PostPreview post={post} titleLevel={3} />
        </li>
      );
    });
  };

  const meta: ArticleMeta = {
    dates: subject.dates,
    website: subject.officialWebsite,
  };
  const subjectUrl = `${config.url}${router.asPath}`;

  const webpageSchema: WebPage = {
    '@id': `${subjectUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${config.url}/#breadcrumb` },
    name: subject.seo.title,
    description: subject.seo.metaDesc,
    inLanguage: config.locales.defaultLocale,
    reviewedBy: { '@id': `${config.url}/#branding` },
    url: `${config.url}`,
    isPartOf: {
      '@id': `${config.url}`,
    },
  };

  const publicationDate = new Date(subject.dates.publication);
  const updateDate = new Date(subject.dates.update);

  const articleSchema: Article = {
    '@id': `${config.url}/subject`,
    '@type': 'Article',
    name: subject.title,
    description: subject.intro,
    author: { '@id': `${config.url}/#branding` },
    copyrightYear: publicationDate.getFullYear(),
    creator: { '@id': `${config.url}/#branding` },
    dateCreated: publicationDate.toISOString(),
    dateModified: updateDate.toISOString(),
    datePublished: publicationDate.toISOString(),
    editor: { '@id': `${config.url}/#branding` },
    thumbnailUrl: subject.featuredImage?.sourceUrl,
    image: subject.featuredImage?.sourceUrl,
    inLanguage: config.locales.defaultLocale,
    isPartOf: { '@id': `${config.url}/blog` },
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: { '@id': `${subjectUrl}` },
    subjectOf: { '@id': `${config.url}/blog` },
  };

  const schemaJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageSchema, articleSchema],
  };

  return (
    <>
      <Head>
        <title>{subject.seo.title}</title>
        <meta name="description" content={subject.seo.metaDesc} />
        <meta property="og:url" content={`${subjectUrl}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={subject.title} />
        <meta property="og:description" content={subject.intro} />
        <meta property="og:image" content={subject.featuredImage?.sourceUrl} />
        <meta
          property="og:image:alt"
          content={subject.featuredImage?.altText}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        ></script>
      </Head>
      <article
        id="subject"
        className={`${styles.article} ${styles['article--no-comments']}`}
      >
        <PostHeader
          cover={subject.featuredImage}
          intro={subject.intro}
          meta={meta}
          title={subject.title}
        />
        <Sidebar position="left">
          <ToC />
        </Sidebar>
        <div className={styles.body}>
          <div dangerouslySetInnerHTML={{ __html: subject.content }}></div>
          {subject.posts.length > 0 && (
            <section className={styles.section}>
              <h2>{t`All posts in ${subject.title}`}</h2>
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

Subject.getLayout = getLayout;

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
  const subject = await getSubjectBySlug(slug);
  const breadcrumbTitle = subject.title;

  return {
    props: {
      breadcrumbTitle,
      subject,
      translation,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugs = await getAllSubjectsSlug();

  return {
    paths: allSlugs.map((post) => `/sujet/${post.slug}`),
    fallback: true,
  };
};

export default Subject;
