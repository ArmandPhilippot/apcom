import { getLayout } from '@components/Layouts/Layout';
import PostPreview from '@components/PostPreview/PostPreview';
import { t } from '@lingui/macro';
import { NextPageWithLayout } from '@ts/types/app';
import { SubjectProps } from '@ts/types/taxonomies';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import styles from '@styles/pages/Listing.module.scss';
import {
  getAllSubjectsSlug,
  getSubjectBySlug,
} from '@services/graphql/queries';
import PostHeader from '@components/PostHeader/PostHeader';
import { ArticleMeta } from '@ts/types/articles';

const Subject: NextPageWithLayout<SubjectProps> = ({ subject }) => {
  const getPostsList = () => {
    return [...subject.posts].reverse().map((post) => (
      <li key={post.id} className={styles.item}>
        <PostPreview post={post} titleLevel={3} />
      </li>
    ));
  };

  const meta: ArticleMeta = {
    website: subject.officialWebsite,
  };

  return (
    <article className={styles.wrapper}>
      <PostHeader
        cover={subject.featuredImage}
        intro={subject.intro}
        meta={meta}
        title={subject.title}
      />
      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: subject.content }}
      ></div>
      {subject.posts.length > 0 && (
        <section className={styles.section}>
          <h2>{t`All posts in ${subject.title}`}</h2>
          <ol className={styles.list}>{getPostsList()}</ol>
        </section>
      )}
    </article>
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
