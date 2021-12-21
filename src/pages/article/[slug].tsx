import CommentForm from '@components/CommentForm/CommentForm';
import CommentsList from '@components/CommentsList/CommentsList';
import { getLayout } from '@components/Layouts/Layout';
import PostFooter from '@components/PostFooter/PostFooter';
import PostHeader from '@components/PostHeader/PostHeader';
import ToC from '@components/ToC/ToC';
import { t } from '@lingui/macro';
import { getAllPostsSlug, getPostBySlug } from '@services/graphql/queries';
import { NextPageWithLayout } from '@ts/types/app';
import { ArticleProps } from '@ts/types/articles';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

const SingleArticle: NextPageWithLayout<ArticleProps> = ({ post }) => {
  const {
    author,
    comments,
    content,
    dates,
    intro,
    seo,
    subjects,
    thematics,
    title,
  } = post;

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.metaDesc} />
      </Head>
      <article>
        <PostHeader
          author={author}
          dates={dates}
          intro={intro}
          title={title}
          thematics={thematics}
        />
        <ToC />
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
        <PostFooter subjects={subjects} />
        <section>
          <h2>{t`Comments`}</h2>
          <CommentsList comments={comments} />
          <h2>{t`Leave a comment`}</h2>
          <CommentForm articleId={post.databaseId} />
        </section>
      </article>
    </>
  );
};

SingleArticle.getLayout = getLayout;

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
  const breadcrumbTitle = post.title;

  return {
    props: {
      breadcrumbTitle,
      post,
      translation,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugs = await getAllPostsSlug();

  return {
    paths: allSlugs.map((post) => `/article/${post.slug}`),
    fallback: true,
  };
};

export default SingleArticle;
