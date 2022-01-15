import { getLayout } from '@components/Layouts/Layout';
import PostPreview from '@components/PostPreview/PostPreview';
import { t } from '@lingui/macro';
import { NextPageWithLayout } from '@ts/types/app';
import { SubjectPreview, ThematicProps } from '@ts/types/taxonomies';
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

const Thematic: NextPageWithLayout<ThematicProps> = ({ thematic }) => {
  const relatedSubjects = useRef<SubjectPreview[]>([]);

  const updateRelatedSubjects = (newSubjects: SubjectPreview[]) => {
    newSubjects.forEach((subject) => {
      const subjectIndex = relatedSubjects.current.findIndex(
        (relatedSubject) => relatedSubject.id === subject.id
      );
      const hasSubject = subjectIndex === -1 ? false : true;

      if (!hasSubject) relatedSubjects.current.push(subject);
    });
  };

  const getPostsList = () => {
    return [...thematic.posts].reverse().map((post) => {
      updateRelatedSubjects(post.subjects);

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

  return (
    <>
      <Head>
        <title>{thematic.seo.title}</title>
        <meta name="description" content={thematic.seo.metaDesc} />
      </Head>
      <article
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
          <RelatedTopics topics={relatedSubjects.current} />
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
