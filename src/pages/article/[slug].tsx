import CommentsList from '@components/CommentsList/CommentsList';
import Layout from '@components/Layouts/Layout';
import { t } from '@lingui/macro';
import { fetchAllPostsSlug } from '@services/graphql/blog';
import { getPostBySlug } from '@services/graphql/post';
import { NextPageWithLayout } from '@ts/types/app';
import { ArticleProps } from '@ts/types/articles';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { ReactElement } from 'react';

const SingleArticle: NextPageWithLayout<ArticleProps> = ({ post }) => {
  return (
    <article>
      <header>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.intro }}></div>
      </header>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      <section>
        <h2>{t`Comments`}</h2>
        <CommentsList comments={post.comments} />
      </section>
    </article>
  );
};

SingleArticle.getLayout = function getLayout(page: ReactElement) {
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
  const post = await getPostBySlug(slug);

  return {
    props: {
      post,
      translation,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugs = await fetchAllPostsSlug();

  return {
    paths: allSlugs.map((post) => `/article/${post.slug}`),
    fallback: true,
  };
};

export default SingleArticle;
