import Layout from '@components/Layouts/Layout';
import PostPreview from '@components/PostPreview/PostPreview';
import { t } from '@lingui/macro';
import {
  fetchAllThematicsSlug,
  getThematicBySlug,
} from '@services/graphql/taxonomies';
import { NextPageWithLayout } from '@ts/types/app';
import { ThematicProps } from '@ts/types/taxonomies';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { ReactElement } from 'react';
import styles from '@styles/pages/Thematic.module.scss';

const Thematic: NextPageWithLayout<ThematicProps> = ({ thematic }) => {
  const getPostsList = () => {
    return thematic.posts.reverse().map((post) => (
      <li key={post.id} className={styles.item}>
        <PostPreview post={post} titleLevel={3} />
      </li>
    ));
  };

  return (
    <article>
      <header>
        <h1>{thematic.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: thematic.intro }}></div>
      </header>
      <div dangerouslySetInnerHTML={{ __html: thematic.content }}></div>
      {thematic.posts.length > 0 && (
        <div>
          <h2>{t`All posts in ${thematic.title}`}</h2>
          <ol className={styles.list}>{getPostsList()}</ol>
        </div>
      )}
    </article>
  );
};

Thematic.getLayout = function getLayout(page: ReactElement) {
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
  const thematic = await getThematicBySlug(slug);

  return {
    props: {
      thematic,
      translation,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugs = await fetchAllThematicsSlug();

  return {
    paths: allSlugs.map((post) => `/thematique/${post.slug}`),
    fallback: true,
  };
};

export default Thematic;
