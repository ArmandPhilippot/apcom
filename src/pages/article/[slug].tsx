import ButtonLink from '@components/atoms/buttons/button-link';
import Link from '@components/atoms/links/link';
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
import useAddClassName from '@utils/hooks/use-add-classname';
import useAttributes from '@utils/hooks/use-attributes';
import useBreadcrumb from '@utils/hooks/use-breadcrumb';
import usePrism, { type OptionalPrismPlugin } from '@utils/hooks/use-prism';
import useQuerySelectorAll from '@utils/hooks/use-query-selector-all';
import useReadingTime from '@utils/hooks/use-reading-time';
import useSettings from '@utils/hooks/use-settings';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ParsedUrlQuery } from 'querystring';
import { HTMLAttributes } from 'react';
import { useIntl } from 'react-intl';
import { Blog, BlogPosting, Graph, WebPage } from 'schema-dts';
import useSWR from 'swr';

type ArticlePageProps = {
  comments: Comment[];
  post: Article;
  translation: Messages;
};

/**
 * Article page.
 */
const ArticlePage: NextPageWithLayout<ArticlePageProps> = ({
  comments,
  post,
}) => {
  const { content, id, intro, meta, slug, title } = post;
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
  const { data } = useSWR(() => id, getPostComments, {
    fallbackData: comments,
  });
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title,
    url: `/article/${slug}`,
  });
  const readingTime = useReadingTime(wordsCount || 0, true);

  const headerMeta: PageLayoutProps['headerMeta'] = {
    author: author?.name,
    publication: { date: dates.publication },
    update: dates.update ? { date: dates.update } : undefined,
    readingTime,
    thematics:
      thematics &&
      thematics.map((thematic) => (
        <Link key={thematic.id} href={`/thematique/${thematic.slug}`}>
          {thematic.name}
        </Link>
      )),
  };

  const intl = useIntl();
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
          <ButtonLink
            key={topic.id}
            target={`/sujet/${topic.slug}`}
            className={styles.btn}
          >
            {topic.logo && <ResponsiveImage {...topic.logo} />} {topic.name}
          </ButtonLink>
        );
      }),
    },
  };

  const { website } = useSettings();
  const { asPath } = useRouter();
  const pageUrl = `${website.url}${asPath}`;
  const pagePublicationDate = new Date(dates.publication);
  const pageUpdateDate = dates.update ? new Date(dates.update) : undefined;

  const webpageSchema: WebPage = {
    '@id': `${pageUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${website.url}/#breadcrumb` },
    lastReviewed: dates.update,
    name: seo.title,
    description: seo.description,
    reviewedBy: { '@id': `${website.url}/#branding` },
    url: `${pageUrl}`,
    isPartOf: {
      '@id': `${website.url}`,
    },
  };

  const blogSchema: Blog = {
    '@id': `${website.url}/#blog`,
    '@type': 'Blog',
    blogPost: { '@id': `${website.url}/#article` },
    isPartOf: {
      '@id': `${pageUrl}`,
    },
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
  };

  const blogPostSchema: BlogPosting = {
    '@id': `${website.url}/#article`,
    '@type': 'BlogPosting',
    name: title,
    description: intro,
    articleBody: content,
    author: { '@id': `${website.url}/#branding` },
    commentCount: commentsCount,
    copyrightYear: pagePublicationDate.getFullYear(),
    creator: { '@id': `${website.url}/#branding` },
    dateCreated: pagePublicationDate.toISOString(),
    dateModified: pageUpdateDate && pageUpdateDate.toISOString(),
    datePublished: pagePublicationDate.toISOString(),
    discussionUrl: `${pageUrl}/#comments`,
    editor: { '@id': `${website.url}/#branding` },
    headline: title,
    image: cover?.src,
    inLanguage: website.locales.default,
    isPartOf: {
      '@id': `${website.url}/blog`,
    },
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: { '@id': `${pageUrl}` },
    thumbnailUrl: cover?.src,
  };

  const schemaJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageSchema, blogSchema, blogPostSchema],
  };

  /**
   * Convert the comments list to the right format.
   *
   * @param {Comment[]} list - The comments list.
   * @returns {PageLayoutProps['comments']} - The formatted comments list.
   */
  const getCommentsList = (list: Comment[]): PageLayoutProps['comments'] => {
    return list.map((comment) => {
      const {
        content: commentBody,
        id: commentId,
        meta: commentMeta,
        parentId,
        replies,
      } = comment;
      const { author: commentAuthor, date } = commentMeta;
      const { name, avatar, website: authorUrl } = commentAuthor;

      return {
        author: { name, avatar: avatar!.src, url: authorUrl },
        content: commentBody,
        id: commentId,
        publication: date,
        child: getCommentsList(replies),
        parentId,
      };
    });
  };

  const prismPlugins: OptionalPrismPlugin[] = ['command-line', 'line-numbers'];
  const { attributes, className } = usePrism({ plugins: prismPlugins });
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
        comments={data && getCommentsList(data)}
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
