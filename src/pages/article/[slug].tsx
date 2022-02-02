import CommentForm from '@components/CommentForm/CommentForm';
import CommentsList from '@components/CommentsList/CommentsList';
import { getLayout } from '@components/Layouts/Layout';
import PostFooter from '@components/PostFooter/PostFooter';
import PostHeader from '@components/PostHeader/PostHeader';
import Sidebar from '@components/Sidebar/Sidebar';
import Spinner from '@components/Spinner/Spinner';
import { Sharing, ToC } from '@components/Widgets';
import { getAllPostsSlug, getPostBySlug } from '@services/graphql/queries';
import styles from '@styles/pages/Page.module.scss';
import { NextPageWithLayout } from '@ts/types/app';
import { ArticleMeta, ArticleProps } from '@ts/types/articles';
import { settings } from '@utils/config';
import { getFormattedPaths } from '@utils/helpers/format';
import { loadTranslation } from '@utils/helpers/i18n';
import { addPrismClasses, translateCopyButton } from '@utils/helpers/prism';
import { usePrismTheme } from '@utils/providers/prism';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Prism from 'prismjs';
import { ParsedUrlQuery } from 'querystring';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Blog, BlogPosting, Graph, WebPage } from 'schema-dts';
import '@utils/plugins/prism-color-scheme';

const SingleArticle: NextPageWithLayout<ArticleProps> = ({ post }) => {
  const intl = useIntl();
  const router = useRouter();
  const locale = router.locale ? router.locale : settings.locales.defaultLocale;

  useEffect(() => {
    addPrismClasses();
    Prism.highlightAll();
  });

  useEffect(() => {
    translateCopyButton(locale, intl);
  }, [intl, locale]);

  const { setCodeBlocks } = usePrismTheme();

  useEffect(() => {
    const allPre: NodeListOf<HTMLPreElement> = document.querySelectorAll(
      'pre[data-prismjs-color-scheme'
    );
    setCodeBlocks(allPre);
  }, [setCodeBlocks, router.asPath]);

  if (router.isFallback) return <Spinner />;

  const {
    author,
    comments,
    content,
    databaseId,
    dates,
    featuredImage,
    info,
    intro,
    seo,
    topics,
    thematics,
    title,
  } = post;

  const meta: ArticleMeta = {
    author,
    commentCount: comments.length,
    dates,
    readingTime: info.readingTime,
    thematics,
    wordsCount: info.wordsCount,
  };

  const articleUrl = `${settings.url}${router.asPath}`;

  const webpageSchema: WebPage = {
    '@id': `${articleUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${settings.url}/#breadcrumb` },
    lastReviewed: dates.update,
    name: seo.title,
    description: seo.metaDesc,
    reviewedBy: { '@id': `${settings.url}/#branding` },
    url: `${articleUrl}`,
    isPartOf: {
      '@id': `${settings.url}`,
    },
  };

  const blogSchema: Blog = {
    '@id': `${settings.url}/#blog`,
    '@type': 'Blog',
    blogPost: { '@id': `${settings.url}/#article` },
    isPartOf: {
      '@id': `${articleUrl}`,
    },
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
  };

  const publicationDate = new Date(dates.publication);
  const updateDate = new Date(dates.update);

  const blogPostSchema: BlogPosting = {
    '@id': `${settings.url}/#article`,
    '@type': 'BlogPosting',
    name: title,
    description: intro,
    articleBody: content,
    author: { '@id': `${settings.url}/#branding` },
    commentCount: comments.length,
    copyrightYear: publicationDate.getFullYear(),
    creator: { '@id': `${settings.url}/#branding` },
    dateCreated: publicationDate.toISOString(),
    dateModified: updateDate.toISOString(),
    datePublished: publicationDate.toISOString(),
    discussionUrl: `${articleUrl}/#comments`,
    editor: { '@id': `${settings.url}/#branding` },
    image: featuredImage?.sourceUrl,
    inLanguage: settings.locales.defaultLocale,
    isPartOf: {
      '@id': `${settings.url}/blog`,
    },
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: { '@id': `${articleUrl}` },
    thumbnailUrl: featuredImage?.sourceUrl,
  };

  const schemaJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageSchema, blogSchema, blogPostSchema],
  };

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.metaDesc} />
        <meta property="og:url" content={`${articleUrl}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={intro} />
        <meta property="og:image" content={featuredImage?.sourceUrl} />
        <meta property="og:image:alt" content={featuredImage?.altText} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        ></script>
      </Head>
      <article id="article" className={styles.article}>
        <PostHeader intro={intro} meta={meta} title={title} />
        <Sidebar position="left">
          <ToC />
        </Sidebar>
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <PostFooter topics={topics} />
        <Sidebar position="right">
          <Sharing title={title} excerpt={intro} />
        </Sidebar>
        <section id="comments" className={styles.comments}>
          <CommentsList articleId={databaseId} comments={comments} />
          <CommentForm articleId={databaseId} />
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
  const { locale } = context;
  const translation = await loadTranslation(locale);
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
  const paths = getFormattedPaths(allSlugs);

  return {
    paths,
    fallback: true,
  };
};

export default SingleArticle;
