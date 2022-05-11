import ProgressBar from '@components/atoms/loaders/progress-bar';
import { BreadcrumbItem } from '@components/molecules/nav/breadcrumb';
import PostsList, { Post } from '@components/organisms/layout/posts-list';
import PageLayout from '@components/templates/page/page-layout';
import { getArticles, getTotalArticles } from '@services/graphql/articles';
import { Article, Meta } from '@ts/types/app';
import { settings } from '@utils/config';
import { loadTranslation, Messages } from '@utils/helpers/i18n';
import useSettings from '@utils/hooks/use-settings';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useIntl } from 'react-intl';
import { Blog, Graph, WebPage } from 'schema-dts';

type BlogPageProps = {
  posts: Article[];
  totalPosts: number;
  translation: Messages;
};

/**
 * Blog index page.
 */
const BlogPage: NextPage<BlogPageProps> = ({ posts, totalPosts }) => {
  const intl = useIntl();
  const title = intl.formatMessage({
    defaultMessage: 'Blog',
    description: 'BlogPage: page title',
    id: '7TbbIk',
  });
  const homeLabel = intl.formatMessage({
    defaultMessage: 'Home',
    description: 'Breadcrumb: home label',
    id: 'j5k9Fe',
  });
  const breadcrumb: BreadcrumbItem[] = [
    { id: 'home', name: homeLabel, url: '/' },
    { id: 'blog', name: title, url: '/blog' },
  ];

  const { website } = useSettings();
  const { asPath } = useRouter();
  const pageTitle = intl.formatMessage(
    {
      defaultMessage: 'Blog: development, open source - {websiteName}',
      description: 'BlogPage: SEO - Page title',
      id: '+Y+tLK',
    },
    { websiteName: website.name }
  );
  const pageDescription = intl.formatMessage(
    {
      defaultMessage:
        "Discover {websiteName}'s writings. He talks about web development, Linux and open source mostly.",
      description: 'BlogPage: SEO - Meta description',
      id: '18h/t0',
    },
    { websiteName: website.name }
  );
  const pageUrl = `${website.url}${asPath}`;

  const webpageSchema: WebPage = {
    '@id': `${pageUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${website.url}/#breadcrumb` },
    name: pageTitle,
    description: pageDescription,
    inLanguage: website.locales.default,
    reviewedBy: { '@id': `${website.url}/#branding` },
    url: `${website.url}`,
    isPartOf: {
      '@id': `${website.url}`,
    },
  };

  const blogSchema: Blog = {
    '@id': `${website.url}/#blog`,
    '@type': 'Blog',
    author: { '@id': `${website.url}/#branding` },
    creator: { '@id': `${website.url}/#branding` },
    editor: { '@id': `${website.url}/#branding` },
    inLanguage: website.locales.default,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: { '@id': `${pageUrl}` },
  };

  const schemaJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageSchema, blogSchema],
  };

  const postsCount = intl.formatMessage(
    {
      defaultMessage:
        '{postsCount, plural, =0 {No articles} one {# article} other {# articles}}',
      id: 'OF5cPz',
      description: 'BlogPage: posts count meta',
    },
    { postsCount: totalPosts }
  );

  const getPostMeta = (data: Meta<'article'>): Post['meta'] => {
    const { commentsCount, dates, thematics, wordsCount } = data;

    return {
      commentsCount,
      dates,
      readingTime: { wordsCount: wordsCount || 0, onlyMinutes: true },
      thematics: thematics?.map((thematic) => {
        return { ...thematic, url: `/thematique/${thematic.slug}` };
      }),
    };
  };

  const getPosts = (): Post[] => {
    return posts.map((post) => {
      return {
        ...post,
        cover: post.meta.cover,
        excerpt: post.intro,
        meta: getPostMeta(post.meta),
        url: `/article/${post.slug}`,
      };
    });
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:url" content={`${pageUrl}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={pageDescription} />
      </Head>
      <Script
        id="schema-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <PageLayout
        title={title}
        breadcrumb={breadcrumb}
        headerMeta={{ total: postsCount }}
      >
        <PostsList posts={getPosts()} byYear={true} total={totalPosts} />
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = await getArticles({ first: settings.postsPerPage });
  const totalPosts = await getTotalArticles();
  const translation = await loadTranslation(locale);

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts.articles)),
      totalPosts,
      translation,
    },
  };
};

export default BlogPage;
