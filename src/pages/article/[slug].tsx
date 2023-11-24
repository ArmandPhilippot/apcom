/* eslint-disable max-statements */
import type { ParsedUrlQuery } from 'querystring';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useIntl } from 'react-intl';
import type { Comment as CommentSchema, WithContext } from 'schema-dts';
import {
  getLayout,
  SharingWidget,
  Spinner,
  type CommentData,
  Heading,
  Page,
  PageHeader,
  PageBody,
  PageFooter,
  PageComments,
  PageSidebar,
  TocWidget,
} from '../../components';
import {
  convertPostToArticle,
  convertWPCommentToComment,
  fetchAllPostsSlugs,
  fetchCommentsList,
  fetchPost,
} from '../../services/graphql';
import styles from '../../styles/pages/article.module.scss';
import type { Article, NextPageWithLayout, SingleComment } from '../../types';
import { CONFIG } from '../../utils/config';
import { ROUTES } from '../../utils/constants';
import {
  getBlogSchema,
  getSchemaJson,
  getSinglePageSchema,
  getWebPageSchema,
} from '../../utils/helpers';
import { loadTranslation, type Messages } from '../../utils/helpers/server';
import {
  useArticle,
  useBreadcrumb,
  useComments,
  useHeadingsTree,
  usePrism,
} from '../../utils/hooks';

type ArticlePageProps = {
  comments: SingleComment[];
  post: Article;
  slug: string;
  translation: Messages;
};

/**
 * Article page.
 */
const ArticlePage: NextPageWithLayout<ArticlePageProps> = ({
  comments,
  post,
  slug,
}) => {
  const { isFallback } = useRouter();
  const intl = useIntl();
  const article = useArticle({ slug, fallback: post });
  const commentsData = useComments({
    fallback: comments,
    first: article?.meta.commentsCount,
    where: {
      contentId: article?.id ?? post.id,
    },
  });

  const getComments = (data?: SingleComment[]) =>
    data?.map((comment): CommentData => {
      return {
        author: comment.meta.author,
        content: comment.content,
        id: comment.id,
        isApproved: comment.isApproved,
        publicationDate: comment.meta.date,
        replies: getComments(comment.replies),
      };
    });

  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title: article?.title ?? '',
    url: `${ROUTES.ARTICLE}/${slug}`,
  });
  const { attributes, className } = usePrism({
    attributes: {
      'data-toolbar-order': 'show-language,copy-to-clipboard,color-scheme',
    },
    plugins: [
      'toolbar',
      'autoloader',
      'show-language',
      'color-scheme',
      'copy-to-clipboard',
      'inline-color',
      'match-braces',
      'normalize-whitespace',
      'command-line',
      'line-numbers',
    ],
  });
  const loadingArticle = intl.formatMessage({
    defaultMessage: 'Loading the requested article...',
    description: 'ArticlePage: loading article message',
    id: '4iYISO',
  });
  const { ref, tree } = useHeadingsTree({ fromLevel: 2 });

  if (isFallback || !article) return <Spinner>{loadingArticle}</Spinner>;

  const { content, id, intro, meta, title } = article;
  const {
    author,
    commentsCount,
    cover,
    dates,
    seo,
    thematics,
    topics,
    wordsCount,
  } = meta;

  const webpageSchema = getWebPageSchema({
    description: intro,
    locale: CONFIG.locales.defaultLocale,
    slug,
    title,
    updateDate: dates.update,
  });
  const blogSchema = getBlogSchema({
    isSinglePage: true,
    locale: CONFIG.locales.defaultLocale,
    slug,
  });
  const blogPostSchema = getSinglePageSchema({
    commentsCount,
    content,
    cover: cover?.src,
    dates,
    description: intro,
    id: 'article',
    kind: 'post',
    locale: CONFIG.locales.defaultLocale,
    slug,
    title,
  });
  const commentsSchema: WithContext<CommentSchema>[] = commentsData
    ? commentsData.map((comment) => {
        return {
          '@context': 'https://schema.org',
          '@id': `${CONFIG.url}/#comment-${comment.id}`,
          '@type': 'Comment',
          parentItem: comment.parentId
            ? { '@id': `${CONFIG.url}/#comment-${comment.parentId}` }
            : undefined,
          about: { '@type': 'Article', '@id': `${CONFIG.url}/#article` },
          author: {
            '@type': 'Person',
            name: comment.meta.author.name,
            image: comment.meta.author.avatar?.src,
            url: comment.meta.author.website,
          },
          creator: {
            '@type': 'Person',
            name: comment.meta.author.name,
            image: comment.meta.author.avatar?.src,
            url: comment.meta.author.website,
          },
          dateCreated: comment.meta.date,
          datePublished: comment.meta.date,
          text: comment.content,
        };
      })
    : [];
  const schemaJsonLd = getSchemaJson([
    webpageSchema,
    blogSchema,
    blogPostSchema,
    ...commentsSchema,
  ]);

  const lineNumbersClassName = className
    .replace('command-line', '')
    .replace(/\s\s+/g, ' ');
  const commandLineClassName = className
    .replace('line-numbers', '')
    .replace(/\s\s+/g, ' ');

  /**
   * Replace a string with Prism classnames and attributes.
   *
   * @param {string} str - The found string.
   * @returns {string} The classes and attributes.
   */
  const prismClassNameReplacer = (str: string): string => {
    const wpBlockClassName = 'wp-block-code';
    const languageArray = /language-[^\s|"]+/.exec(str);
    const languageClassName = languageArray ? `${languageArray[0]}` : '';

    if (
      str.includes('command-line') ||
      (!str.includes('command-line') && str.includes('language-bash'))
    ) {
      return `class="${wpBlockClassName} ${commandLineClassName} ${languageClassName}" tabindex="0" data-filter-output="#output#`;
    }

    return `class="${wpBlockClassName} ${lineNumbersClassName} ${languageClassName}" tabindex="0`;
  };

  const contentWithPrismClasses = content.replaceAll(
    /class="wp-block-code[^"]+/gm,
    prismClassNameReplacer
  );

  const pageUrl = `${CONFIG.url}${slug}`;
  const sharingWidgetTitle = intl.formatMessage({
    defaultMessage: 'Share',
    id: 'HKKkQk',
    description: 'SharingWidget: widget title',
  });
  const tocTitle = intl.formatMessage({
    defaultMessage: 'Table of Contents',
    description: 'PageLayout: table of contents title',
    id: 'eys2uX',
  });
  const articleComments = getComments(commentsData);

  return (
    <Page breadcrumbs={breadcrumbItems}>
      <Head>
        <title>{seo.title}</title>
        {/*eslint-disable-next-line react/jsx-no-literals -- Name allowed */}
        <meta name="description" content={seo.description} />
        <meta property="og:url" content={pageUrl} />
        {/*eslint-disable-next-line react/jsx-no-literals -- Content allowed */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={intro} />
      </Head>
      <Script
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-article"
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- Necessary for schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <Script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-breadcrumb"
        type="application/ld+json"
      />
      <PageHeader
        heading={title}
        intro={intro}
        meta={{
          author,
          publicationDate: dates.publication,
          thematics,
          updateDate: dates.update,
          wordsCount,
        }}
      />
      <PageSidebar>
        <TocWidget
          heading={<Heading level={3}>{tocTitle}</Heading>}
          tree={tree}
        />
      </PageSidebar>
      <PageBody
        {...attributes}
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: contentWithPrismClasses }}
        ref={ref}
      />
      {topics ? <PageFooter readMoreAbout={topics} /> : null}
      <PageSidebar>
        <SharingWidget
          // eslint-disable-next-line react/jsx-no-literals -- Key allowed
          key="sharing-widget"
          className={styles.widget}
          data={{ excerpt: intro, title, url: pageUrl }}
          heading={<Heading level={3}>{sharingWidgetTitle}</Heading>}
          media={[
            'diaspora',
            'email',
            'facebook',
            'journal-du-hacker',
            'linkedin',
            'twitter',
          ]}
        />
      </PageSidebar>
      <PageComments comments={articleComments ?? []} depth={2} pageId={id} />
    </Page>
  );
};

ArticlePage.getLayout = (page) => getLayout(page);

type PostParams = {
  slug: string;
} & ParsedUrlQuery;

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({
  locale,
  params,
}) => {
  const post = await fetchPost((params as PostParams).slug);
  const article = await convertPostToArticle(post);
  const comments = await fetchCommentsList({
    first: post.commentCount ?? 1,
    where: { contentId: post.databaseId },
  });
  const translation = await loadTranslation(locale);

  return {
    props: {
      comments: JSON.parse(
        JSON.stringify(comments.map(convertWPCommentToComment))
      ),
      post: JSON.parse(JSON.stringify(article)),
      slug: post.slug,
      translation,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await fetchAllPostsSlugs();
  const paths = slugs.map((slug) => {
    return { params: { slug } };
  });

  return {
    paths,
    fallback: true,
  };
};

export default ArticlePage;
