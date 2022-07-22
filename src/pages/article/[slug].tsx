import ButtonLink from '@components/atoms/buttons/button-link';
import Link from '@components/atoms/links/link';
import Spinner from '@components/atoms/loaders/spinner';
import ResponsiveImage from '@components/molecules/images/responsive-image';
import Sharing from '@components/organisms/widgets/sharing';
import { getLayout } from '@components/templates/layout/layout';
import PageLayout, {
  type PageLayoutProps,
} from '@components/templates/page/page-layout';
import {
  getAllArticlesSlugs,
  getArticleBySlug,
} from '@services/graphql/articles';
import { getPostComments } from '@services/graphql/comments';
import styles from '@styles/pages/article.module.scss';
import {
  type Article,
  type Comment,
  type NextPageWithLayout,
} from '@ts/types/app';
import { loadTranslation, type Messages } from '@utils/helpers/i18n';
import {
  getBlogSchema,
  getSchemaJson,
  getSinglePageSchema,
  getWebPageSchema,
} from '@utils/helpers/schema-org';
import useArticle from '@utils/hooks/use-article';
import useBreadcrumb from '@utils/hooks/use-breadcrumb';
import useComments from '@utils/hooks/use-comments';
import usePrism, { type OptionalPrismPlugin } from '@utils/hooks/use-prism';
import useReadingTime from '@utils/hooks/use-reading-time';
import useSettings from '@utils/hooks/use-settings';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ParsedUrlQuery } from 'querystring';
import { HTMLAttributes } from 'react';
import { useIntl } from 'react-intl';

type ArticlePageProps = {
  comments: Comment[];
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
  const article = useArticle(slug, post);
  const commentsData = useComments(post.id, comments);
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title: article?.title || '',
    url: `/article/${slug}`,
  });
  const readingTime = useReadingTime(article?.meta.wordsCount || 0, true);
  const { website } = useSettings();
  const prismPlugins: OptionalPrismPlugin[] = ['command-line', 'line-numbers'];
  const { attributes, className } = usePrism({ plugins: prismPlugins });

  if (isFallback) return <Spinner />;

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
    thematics:
      thematics &&
      thematics.map((thematic) => (
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
      value: topics.map((topic) => {
        return (
          <ButtonLink key={topic.id} target={topic.url} className={styles.btn}>
            {topic.logo && <ResponsiveImage {...topic.logo} />} {topic.name}
          </ButtonLink>
        );
      }),
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
    const languageArray = str.match(/language-[^\s|"]+/);
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
        <meta name="description" content={seo.description} />
        <meta property="og:url" content={`${pageUrl}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={intro} />
      </Head>
      <Script
        id="schema-project"
        type="application/ld+json"
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

interface PostParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({
  locale,
  params,
}) => {
  const post = await getArticleBySlug(params!.slug as PostParams['slug']);
  const comments = await getPostComments(post.id as number);
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
