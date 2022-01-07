import { getLayout } from '@components/Layouts/Layout';
import PostPreview from '@components/PostPreview/PostPreview';
import { t } from '@lingui/macro';
import { NextPageWithLayout } from '@ts/types/app';
import { ThematicProps } from '@ts/types/taxonomies';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import styles from '@styles/pages/Listing.module.scss';
import {
  getAllThematicsSlug,
  getThematicBySlug,
} from '@services/graphql/queries';
import PostHeader from '@components/PostHeader/PostHeader';

const Thematic: NextPageWithLayout<ThematicProps> = ({ thematic }) => {
  const getPostsList = () => {
    return [...thematic.posts].reverse().map((post) => (
      <li key={post.id} className={styles.item}>
        <PostPreview post={post} titleLevel={3} />
      </li>
    ));
  };

  return (
    <article className={styles.wrapper}>
      <PostHeader intro={thematic.intro} title={thematic.title} />
      <div className={styles.body}>
        <div dangerouslySetInnerHTML={{ __html: thematic.content }}></div>
        {thematic.posts.length > 0 && (
          <section className={styles.section}>
            <h2>{t`All posts in ${thematic.title}`}</h2>
            <ol className={styles.list}>{getPostsList()}</ol>
          </section>
        )}
      </div>
    </article>
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
