import CommentForm from '@components/CommentForm/CommentForm';
import CommentsList from '@components/CommentsList/CommentsList';
import { getLayout } from '@components/Layouts/Layout';
import PostFooter from '@components/PostFooter/PostFooter';
import PostHeader from '@components/PostHeader/PostHeader';
import Sidebar from '@components/Sidebar/Sidebar';
import Spinner from '@components/Spinner/Spinner';
import { Sharing, ToC } from '@components/Widgets';
import {
  getAllPostsSlug,
  getCommentsByPostId,
  getPostBySlug,
} from '@services/graphql/queries';
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
import { highlightAll } from 'prismjs';
import { ParsedUrlQuery } from 'querystring';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Blog, BlogPosting, Graph, WebPage } from 'schema-dts';
import '@utils/plugins/prism-color-scheme';
import Script from 'next/script';

const SingleArticle: NextPageWithLayout<ArticleProps> = ({
  comments,
  post,
}) => {
  const intl = useIntl();
  const router = useRouter();

  useEffect(() => {
    addPrismClasses();
    highlightAll();
  });

  const { setCodeBlocks } = usePrismTheme();

  useEffect(() => {
    const allPre: NodeListOf<HTMLPreElement> = document.querySelectorAll(
      'pre[data-prismjs-color-scheme-current]'
    );
    setCodeBlocks(allPre);
  }, [setCodeBlocks, router.asPath]);

  if (router.isFallback) return <Spinner />;

  const {
    author,
    commentCount,
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
    commentCount: commentCount || undefined,
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
    commentCount: commentCount || undefined,
    copyrightYear: publicationDate.getFullYear(),
    creator: { '@id': `${settings.url}/#branding` },
    dateCreated: publicationDate.toISOString(),
    dateModified: updateDate.toISOString(),
    datePublished: publicationDate.toISOString(),
    discussionUrl: `${articleUrl}/#comments`,
    editor: { '@id': `${settings.url}/#branding` },
    headline: title,
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
    id: '/ly3AC',
  });
  const copiedText = intl.formatMessage({
    defaultMessage: 'Copied!',
    description: 'Prism: copy button text (clicked)',
    id: 'OV9r1K',
  });
  const errorText = intl.formatMessage({
    defaultMessage: 'Use Ctrl+c to copy',
    description: 'Prism: error text',
    id: 'z9qkcQ',
  });
  const darkTheme = intl.formatMessage({
    defaultMessage: 'Dark Theme 🌙',
    description: 'Prism: toggle dark theme button text',
    id: 'nFMdWI',
  });
  const lightTheme = intl.formatMessage({
    defaultMessage: 'Light Theme 🌞',
    description: 'Prism: toggle light theme button text',
    id: 'Ua2g2p',
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
      </Head>
      <Script
        id="schema-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
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
        <Sidebar
          position="left"
          ariaLabel={intl.formatMessage({
            defaultMessage: 'Table of Contents',
            description: 'ArticlePage: ToC sidebar aria-label',
            id: '9nhYRA',
          })}
        >
          <ToC />
        </Sidebar>
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <PostFooter topics={topics} />
        <Sidebar
          position="right"
          ariaLabel={intl.formatMessage({
            defaultMessage: 'Sidebar',
            description: 'ArticlePage: right sidebar aria-label',
            id: 'JeYOeA',
          })}
        >
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
  const comments = await getCommentsByPostId(post.databaseId);
  const breadcrumbTitle = post.title;

  return {
    props: {
      breadcrumbTitle,
      comments,
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
