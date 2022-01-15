import CommentForm from '@components/CommentForm/CommentForm';
import CommentsList from '@components/CommentsList/CommentsList';
import { getLayout } from '@components/Layouts/Layout';
import PostFooter from '@components/PostFooter/PostFooter';
import PostHeader from '@components/PostHeader/PostHeader';
import { config } from '@config/website';
import { getAllPostsSlug, getPostBySlug } from '@services/graphql/queries';
import { NextPageWithLayout } from '@ts/types/app';
import { ArticleMeta, ArticleProps } from '@ts/types/articles';
import { loadTranslation } from '@utils/helpers/i18n';
import { addPrismClasses, translateCopyButton } from '@utils/helpers/prism';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Prism from 'prismjs';
import { ParsedUrlQuery } from 'querystring';
import { useEffect } from 'react';
import styles from '@styles/pages/Page.module.scss';
import { Sharing, ToC } from '@components/Widgets';
import Sidebar from '@components/Sidebar/Sidebar';

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

  const meta: ArticleMeta = {
    author,
    commentCount: comments.length,
    dates,
    thematics,
  };

  const router = useRouter();
  const locale = router.locale ? router.locale : config.defaultLocale;

  useEffect(() => {
    addPrismClasses();
    Prism.highlightAll();
  });

  useEffect(() => {
    translateCopyButton(locale);
  }, [locale]);

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.metaDesc} />
      </Head>
      <article className={styles.article}>
        <PostHeader intro={intro} meta={meta} title={title} />
        <Sidebar position="left">
          <ToC />
        </Sidebar>
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <PostFooter subjects={subjects} />
        <Sidebar position="right">
          <Sharing title={title} excerpt={intro} />
        </Sidebar>
        <section className={styles.comments}>
          <CommentsList comments={comments} />
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
