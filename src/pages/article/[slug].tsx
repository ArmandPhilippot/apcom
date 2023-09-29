/* eslint-disable max-statements */
import type { ParsedUrlQuery } from 'querystring';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import type { HTMLAttributes } from 'react';
import { useIntl } from 'react-intl';
import {
  ButtonLink,
  getLayout,
  Link,
  PageLayout,
  type PageLayoutProps,
  ResponsiveImage,
  Sharing,
  Spinner,
} from '../../components';
import {
  getAllArticlesSlugs,
  getAllComments,
  getArticleBySlug,
} from '../../services/graphql';
import styles from '../../styles/pages/article.module.scss';
import type { Article, NextPageWithLayout, SingleComment } from '../../types';
import { ROUTES } from '../../utils/constants';
import {
  getBlogSchema,
  getSchemaJson,
  getSinglePageSchema,
  getWebPageSchema,
} from '../../utils/helpers';
import { loadTranslation, type Messages } from '../../utils/helpers/server';
import {
  type OptionalPrismPlugin,
  useArticle,
  useBreadcrumb,
  useComments,
  usePrism,
  useReadingTime,
  useSettings,
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
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title: article?.title ?? '',
    url: `${ROUTES.ARTICLE}/${slug}`,
  });
  const readingTime = useReadingTime(article?.meta.wordsCount ?? 0, true);
  const { website } = useSettings();
  const prismPlugins: OptionalPrismPlugin[] = ['command-line', 'line-numbers'];
  const { attributes, className } = usePrism({ plugins: prismPlugins });
  const loadingArticle = intl.formatMessage({
    defaultMessage: 'Loading the requested article...',
    description: 'ArticlePage: loading article message',
    id: '4iYISO',
  });

  if (isFallback || !article) return <Spinner>{loadingArticle}</Spinner>;

  const { content, id, intro, meta, title } = article;
  const { author, commentsCount, cover, dates, seo, thematics, topics } = meta;

  const headerMeta: PageLayoutProps['headerMeta'] = {
    author: author?.name,
    publication: { date: dates.publication },
    update:
      dates.update && dates.publication !== dates.update
        ? { date: dates.update }
        : undefined,
    readingTime,
    thematics: thematics?.map((thematic) => (
      <Link key={thematic.id} href={thematic.url}>
        {thematic.name}
      </Link>
    )),
  };

  const footerMetaLabel = intl.formatMessage({
    defaultMessage: 'Read more articles about:',
    description: 'ArticlePage: footer topics list label',
    id: '50xc4o',
  });

  const footerMeta: PageLayoutProps['footerMeta'] = {
    custom: topics && {
      label: footerMetaLabel,
      value: topics.map((topic) => (
        <ButtonLink className={styles.btn} key={topic.id} to={topic.url}>
          {topic.logo ? <ResponsiveImage {...topic.logo} /> : null} {topic.name}
        </ButtonLink>
      )),
    },
  };

  const webpageSchema = getWebPageSchema({
    description: intro,
    locale: website.locales.default,
    slug,
    title,
    updateDate: dates.update,
  });
  const blogSchema = getBlogSchema({
    isSinglePage: true,
    locale: website.locales.default,
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
    locale: website.locales.default,
    slug,
    title,
  });
  const schemaJsonLd = getSchemaJson([
    webpageSchema,
    blogSchema,
    blogPostSchema,
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
      return `class="${wpBlockClassName} ${commandLineClassName}${languageClassName}" tabindex="0" data-filter-output="#output#`;
    }

    return `class="${wpBlockClassName} ${lineNumbersClassName}${languageClassName}" tabindex="0`;
  };

  const contentWithPrismClasses = content.replaceAll(
    /class="wp-block-code[^"]+/gm,
    prismClassNameReplacer
  );

  const pageUrl = `${website.url}${slug}`;

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
        id="schema-project"
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- Necessary for schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <PageLayout
        allowComments={true}
        bodyAttributes={{
          ...(attributes as HTMLAttributes<HTMLDivElement>),
        }}
        bodyClassName={styles.body}
        breadcrumb={breadcrumbItems}
        breadcrumbSchema={breadcrumbSchema}
        comments={commentsData}
        footerMeta={footerMeta}
        headerMeta={headerMeta}
        id={id as number}
        intro={intro}
        title={title}
        withToC={true}
        widgets={[
          <Sharing
            // eslint-disable-next-line react/jsx-no-literals -- Key allowed
            key="sharing-widget"
            className={styles.widget}
            data={{ excerpt: intro, title, url: pageUrl }}
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
