/* eslint-disable max-statements */
import type { ParsedUrlQuery } from 'querystring';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import Script from 'next/script';
import type { HTMLAttributes } from 'react';
import { useIntl } from 'react-intl';
import type { Comment as CommentSchema, WithContext } from 'schema-dts';
import {
  ButtonLink,
  getLayout,
  Link,
  PageLayout,
  SharingWidget,
  Spinner,
  type MetaItemData,
  Time,
  type CommentData,
  Heading,
} from '../../components';
import {
  getAllArticlesSlugs,
  getAllComments,
  getArticleBySlug,
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
  usePrism,
  useReadingTime,
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
    contentId: article?.id,
    fallback: comments,
  });

  const getComments = (data?: SingleComment[]) =>
    data?.map((comment): CommentData => {
      return {
        author: comment.meta.author,
        content: comment.content,
        id: comment.id,
        isApproved: comment.approved,
        publicationDate: comment.meta.date,
        replies: getComments(comment.replies),
      };
    });

  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title: article?.title ?? '',
    url: `${ROUTES.ARTICLE}/${slug}`,
  });
  const readingTime = useReadingTime(article?.meta.wordsCount ?? 0, true);
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

  if (isFallback || !article) return <Spinner>{loadingArticle}</Spinner>;

  const { content, id, intro, meta, title } = article;
  const { author, commentsCount, cover, dates, seo, thematics, topics } = meta;

  const headerMeta: (MetaItemData | undefined)[] = [
    author
      ? {
          id: 'author',
          label: intl.formatMessage({
            defaultMessage: 'Written by:',
            description: 'ArticlePage: author label',
            id: 'MJbZfX',
          }),
          value: author.name,
        }
      : undefined,
    {
      id: 'publication-date',
      label: intl.formatMessage({
        defaultMessage: 'Published on:',
        description: 'ArticlePage: publication date label',
        id: 'RecdwX',
      }),
      value: <Time date={dates.publication} />,
    },
    dates.update && dates.publication !== dates.update
      ? {
          id: 'update-date',
          label: intl.formatMessage({
            defaultMessage: 'Updated on:',
            description: 'ArticlePage: update date label',
            id: 'ZAqGZ6',
          }),
          value: <Time date={dates.update} />,
        }
      : undefined,
    {
      id: 'reading-time',
      label: intl.formatMessage({
        defaultMessage: 'Reading time:',
        description: 'ArticlePage: reading time label',
        id: 'Gw7X3x',
      }),
      value: readingTime,
    },
    thematics
      ? {
          id: 'thematics',
          label: intl.formatMessage({
            defaultMessage: 'Thematics:',
            description: 'ArticlePage: thematics meta label',
            id: 'CvOqoh',
          }),
          value: thematics.map((thematic) => {
            return {
              id: `thematic-${thematic.id}`,
              value: (
                <Link key={thematic.id} href={thematic.url}>
                  {thematic.name}
                </Link>
              ),
            };
          }),
        }
      : undefined,
  ];
  const filteredHeaderMeta = headerMeta.filter(
    (item): item is MetaItemData => !!item
  );

  const footerMetaLabel = intl.formatMessage({
    defaultMessage: 'Read more articles about:',
    description: 'ArticlePage: footer topics list label',
    id: '50xc4o',
  });

  const footerMeta: MetaItemData[] = topics
    ? [
        {
          id: 'more-about',
          label: footerMetaLabel,
          value: topics.map((topic) => {
            return {
              id: `topic--${topic.id}`,
              value: (
                <ButtonLink
                  className={styles.btn}
                  key={topic.id}
                  to={topic.url}
                >
                  {topic.logo ? <NextImage {...topic.logo} /> : null}{' '}
                  {topic.name}
                </ButtonLink>
              ),
            };
          }),
        },
      ]
    : [];

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

  return (
    <>
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
      <PageLayout
        allowComments={true}
        bodyAttributes={attributes as HTMLAttributes<HTMLDivElement>}
        bodyClassName={styles.body}
        breadcrumb={breadcrumbItems}
        breadcrumbSchema={breadcrumbSchema}
        comments={getComments(commentsData)}
        footerMeta={footerMeta}
        headerMeta={filteredHeaderMeta}
        id={id as number}
        intro={intro}
        title={title}
        withToC={true}
        widgets={[
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
          />,
        ]}
      >
        {contentWithPrismClasses}
      </PageLayout>
    </>
  );
};

ArticlePage.getLayout = (page) => getLayout(page, { useGrid: true });

type PostParams = {
  slug: string;
} & ParsedUrlQuery;

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({
  locale,
  params,
}) => {
  const post = await getArticleBySlug((params as PostParams).slug);
  const comments = await getAllComments({ contentId: post.id as number });
  const translation = await loadTranslation(locale);

  return {
    props: {
      comments: JSON.parse(JSON.stringify(comments)),
      post: JSON.parse(JSON.stringify(post)),
      slug: post.slug,
      translation,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllArticlesSlugs();
  const paths = slugs.map((slug) => {
    return { params: { slug } };
  });

  return {
    paths,
    fallback: true,
  };
};

export default ArticlePage;
