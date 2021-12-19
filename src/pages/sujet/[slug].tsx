import Layout from '@components/Layouts/Layout';
import PostPreview from '@components/PostPreview/PostPreview';
import { t } from '@lingui/macro';
import { NextPageWithLayout } from '@ts/types/app';
import { SubjectProps } from '@ts/types/taxonomies';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';
import { ReactElement } from 'react';
import styles from '@styles/pages/Subject.module.scss';
import {
  getAllSubjectsSlug,
  getSubjectBySlug,
} from '@services/graphql/queries';

const Subject: NextPageWithLayout<SubjectProps> = ({ subject }) => {
  const getPostsList = () => {
    return subject.posts.reverse().map((post) => (
      <li key={post.id} className={styles.item}>
        <PostPreview post={post} titleLevel={3} />
      </li>
    ));
  };

  return (
    <article>
      <header>
        <h1 className={styles.title}>
          {subject.featuredImage && (
            <span className={styles.cover}>
              <Image
                src={subject.featuredImage.sourceUrl}
                alt={subject.featuredImage.altText}
                layout="fill"
              />
            </span>
          )}
          {subject.title}
        </h1>
        {subject.officialWebsite && (
          <dl>
            <dt>{t`Official website:`}</dt>
            <dd>{subject.officialWebsite}</dd>
          </dl>
        )}
        <div dangerouslySetInnerHTML={{ __html: subject.intro }}></div>
      </header>
      <div dangerouslySetInnerHTML={{ __html: subject.content }}></div>
      {subject.posts.length > 0 && (
        <div>
          <h2>{t`All posts in ${subject.title}`}</h2>
          <ol className={styles.list}>{getPostsList()}</ol>
        </div>
      )}
    </article>
  );
};

Subject.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

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

  return {
    props: {
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
