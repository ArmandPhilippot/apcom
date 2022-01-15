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

const Subject: NextPageWithLayout<SubjectProps> = ({ subject }) => {
  const relatedThematics = useRef<ThematicPreview[]>([]);

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

  return (
    <>
      <Head>
        <title>{subject.seo.title}</title>
        <meta name="description" content={subject.seo.metaDesc} />
      </Head>
      <article
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
