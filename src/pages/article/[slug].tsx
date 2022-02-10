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
import { addPrismClasses } from '@utils/helpers/prism';
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

  useEffect(() => {
    addPrismClasses();
    Prism.highlightAll();
  });

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

  const copyText = intl.formatMessage({
    defaultMessage: 'Copy',
    description: 'Prism: copy button text (no clicked)',
  });
  const copiedText = intl.formatMessage({
    defaultMessage: 'Copied!',
    description: 'Prism: copy button text (clicked)',
  });
  const errorText = intl.formatMessage({
    defaultMessage: 'Use Ctrl+c to copy',
    description: 'Prism: error text',
  });
  const darkTheme = intl.formatMessage({
    defaultMessage: 'Toggle Dark Theme',
    description: 'Prism: toggle dark theme button text',
  });
  const lightTheme = intl.formatMessage({
    defaultMessage: 'Toggle Light Theme',
    description: 'Prism: toggle light theme button text',
  });

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
      <article
        id="article"
        className={styles.article}
        data-prismjs-copy={copyText}
        data-prismjs-copy-success={copiedText}
        data-prismjs-copy-error={errorText}
        data-prismjs-color-scheme-dark={darkTheme}
        data-prismjs-color-scheme-light={lightTheme}
      >
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
