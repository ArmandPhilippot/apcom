/* eslint-disable max-statements */
import type { ParsedUrlQuery } from 'querystring';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import {
  getLayout,
  SharingWidget,
  type CommentData,
  Heading,
  Page,
  PageHeader,
  PageBody,
  PageFooter,
  PageComments,
  PageSidebar,
  TocWidget,
  LoadingPage,
  LoadingPageComments,
} from '../../components';
import {
  fetchAllPostsSlugs,
  fetchCommentsList,
  fetchPost,
  fetchPostsCount,
} from '../../services/graphql';
import styles from '../../styles/pages/blog.module.scss';
import type {
  NextPageWithLayout,
  SingleComment,
  WPComment,
  WPPost,
} from '../../types';
import { CONFIG } from '../../utils/config';
import {
  getBlogSchema,
  getCommentsSchema,
  getSchemaJson,
  getSinglePageSchema,
  getWebPageSchema,
  updateWordPressCodeBlocks,
} from '../../utils/helpers';
import { loadTranslation, type Messages } from '../../utils/helpers/server';
import {
  useArticle,
  useBreadcrumbs,
  useComments,
  useHeadingsTree,
  usePrism,
} from '../../utils/hooks';

type ArticlePageProps = {
  data: {
    comments: WPComment[];
    post: WPPost;
  };
  translation: Messages;
};

/**
 * Article page.
 */
const ArticlePage: NextPageWithLayout<ArticlePageProps> = ({ data }) => {
  const intl = useIntl();
  const { isFallback } = useRouter();
  const { article, isLoading } = useArticle(data.post.slug, data.post);
  const { comments, isLoading: areCommentsLoading } = useComments({
    fallback: data.comments,
    first: article.meta.commentsCount,
    where: {
      contentId: article.id,
    },
  });
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumbs(
    article.title
  );
  const { ref, tree } = useHeadingsTree<HTMLDivElement>({ fromLevel: 2 });
  const { attributes, className: prismClassName } = usePrism({
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

  const formatComments = useCallback(
    (allComments: SingleComment[]) =>
      allComments.map((comment): CommentData => {
        return {
          author: {
            ...comment.meta.author,
            avatar: comment.meta.author.avatar
              ? {
                  ...comment.meta.author.avatar,
                  alt: intl.formatMessage(
                    {
                      defaultMessage: "{author}'s avatar",
                      description:
                        'Article: accessible name for the comment avatar',
                      id: 'VTJE8h',
                    },
                    {
                      author: comment.meta.author.name,
                    }
                  ),
                }
              : undefined,
          },
          content: comment.content,
          id: comment.id,
          isApproved: comment.isApproved,
          publicationDate: comment.meta.date,
          replies: formatComments(comment.replies),
        };
      }),
    [intl]
  );

  if (isFallback || isLoading) return <LoadingPage />;

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
    slug: article.slug,
    title,
    updateDate: dates.update,
  });
  const blogSchema = getBlogSchema({
    isSinglePage: true,
    locale: CONFIG.locales.defaultLocale,
    slug: article.slug,
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
    slug: article.slug,
    title,
  });
  const schemaJsonLd = getSchemaJson([
    webpageSchema,
    blogSchema,
    blogPostSchema,
    breadcrumbSchema,
    ...getCommentsSchema(comments),
  ]);

  const pageUrl = `${CONFIG.url}${article.slug}`;
  const messages = {
    sharingTitle: intl.formatMessage({
      defaultMessage: 'Share',
      id: 's57FTB',
      description: 'Article: sharing widget title',
    }),
    tocTitle: intl.formatMessage({
      defaultMessage: 'Table of Contents',
      description: 'PageLayout: table of contents title',
      id: 'eys2uX',
    }),
  };

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
          heading={<Heading level={2}>{messages.tocTitle}</Heading>}
          tree={tree}
        />
      </PageSidebar>
      <PageBody
        {...attributes}
        className={styles.body}
        dangerouslySetInnerHTML={{
          __html: updateWordPressCodeBlocks(content, prismClassName),
        }}
        ref={ref}
      />
      {topics ? <PageFooter readMoreAbout={topics} /> : null}
      <PageSidebar>
        <SharingWidget
          // eslint-disable-next-line react/jsx-no-literals -- Key allowed
          key="sharing-widget"
          className={styles['sharing-widget']}
          data={{ excerpt: intro, title, url: pageUrl }}
          heading={<Heading level={2}>{messages.sharingTitle}</Heading>}
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
      {areCommentsLoading ? (
        <LoadingPageComments />
      ) : (
        <PageComments
          comments={formatComments(comments)}
          depth={2}
          pageId={id}
        />
      )}
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
  const comments = await fetchCommentsList({
    first: post.commentCount ?? 1,
    where: { contentId: post.databaseId },
  });
  const translation = await loadTranslation(locale);

  return {
    props: {
      data: {
        comments: JSON.parse(JSON.stringify(comments)),
        post: JSON.parse(JSON.stringify(post)),
      },
      translation,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsCount = await fetchPostsCount();
  const slugs = await fetchAllPostsSlugs(postsCount);
  const paths = slugs.map((slug) => {
    return { params: { slug } };
  });

  return {
    paths,
    fallback: true,
  };
};

export default ArticlePage;
