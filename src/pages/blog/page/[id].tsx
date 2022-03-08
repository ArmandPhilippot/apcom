import { getLayout } from '@components/Layouts/Layout';
import Pagination from '@components/Pagination/Pagination';
import PostHeader from '@components/PostHeader/PostHeader';
import PostsList from '@components/PostsList/PostsList';
import Sidebar from '@components/Sidebar/Sidebar';
import { ThematicsList, TopicsList } from '@components/Widgets';
import {
  getAllThematics,
  getAllTopics,
  getEndCursor,
  getPostsTotal,
  getPublishedPosts,
} from '@services/graphql/queries';
import { NextPageWithLayout } from '@ts/types/app';
import { BlogPageProps } from '@ts/types/blog';
import { settings } from '@utils/config';
import { getIntlInstance, loadTranslation } from '@utils/helpers/i18n';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useIntl } from 'react-intl';
import { Blog, Graph, WebPage } from 'schema-dts';
import styles from '@styles/pages/Page.module.scss';
import { getFormattedPageNumbers } from '@utils/helpers/format';
import { useEffect } from 'react';

const BlogPage: NextPageWithLayout<BlogPageProps> = ({
  allThematics,
  allTopics,
  posts,
  totalPosts,
}) => {
  const intl = useIntl();
  const router = useRouter();
  const pageNumber = Number(router.query.id);

  useEffect(() => {
    if (router.query.id === '1') router.push('/blog');
  }, [router]);

  const pageTitle = intl.formatMessage(
    {
      defaultMessage: `Blog - Page {number} - {websiteName}`,
      description: 'BlogPage: SEO - Page title',
    },
    { number: pageNumber, websiteName: settings.name }
  );
  const pageDescription = intl.formatMessage(
    {
      defaultMessage:
        "Discover {websiteName}'s writings. He talks about web development, Linux and open source mostly.",
      description: 'BlogPage: SEO - Meta description',
    },
    { websiteName: settings.name }
  );
  const pageUrl = `${settings.url}${router.asPath}`;

  const webpageSchema: WebPage = {
    '@id': `${pageUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${settings.url}/#breadcrumb` },
    name: pageTitle,
    description: pageDescription,
    inLanguage: settings.locales.defaultLocale,
    reviewedBy: { '@id': `${settings.url}/#branding` },
    url: `${settings.url}`,
    isPartOf: {
      '@id': `${settings.url}`,
    },
  };

  const blogSchema: Blog = {
    '@id': `${settings.url}/#blog`,
    '@type': 'Blog',
    author: { '@id': `${settings.url}/#branding` },
    creator: { '@id': `${settings.url}/#branding` },
    editor: { '@id': `${settings.url}/#branding` },
    inLanguage: settings.locales.defaultLocale,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: { '@id': `${pageUrl}` },
  };

  const schemaJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageSchema, blogSchema],
  };

  const title = intl.formatMessage({
    defaultMessage: 'Blog',
    description: 'BlogPage: page title',
  });

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
      <article
        id="blog"
        className={`${styles.article} ${styles['article--no-comments']}`}
      >
        <PostHeader title={title} meta={{ results: totalPosts }} />
        <div className={styles.body}>
          <PostsList data={[posts]} showYears={true} />
          <Pagination baseUrl="/blog" total={totalPosts} />
        </div>
        <Sidebar
          position="right"
          title={intl.formatMessage({
            defaultMessage: 'Filter by:',
            description: 'BlogPage: sidebar title',
          })}
        >
          <ThematicsList
            initialData={allThematics}
            title={intl.formatMessage({
              defaultMessage: 'Thematics',
              description: 'BlogPage: thematics list widget title',
            })}
          />
          <TopicsList
            initialData={allTopics}
            title={intl.formatMessage({
              defaultMessage: 'Topics',
              description: 'BlogPage: topics list widget title',
            })}
          />
        </Sidebar>
      </article>
    </>
  );
};

BlogPage.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const intl = await getIntlInstance();
  const breadcrumbTitle = intl.formatMessage({
    defaultMessage: 'Blog',
    description: 'BlogPage: breadcrumb item',
  });
  const { locale, params } = context;
  const queriedPageNumber = params ? Number(params.id) : 1;
  const queriedPostsNumber = settings.postsPerPage * queriedPageNumber;
  const endCursor =
    queriedPostsNumber === 1
      ? undefined
      : await getEndCursor({ first: queriedPostsNumber });
  const posts = await getPublishedPosts({
    first: settings.postsPerPage,
    after: endCursor,
  });
  const totalPosts = await getPostsTotal();
  const allThematics = await getAllThematics();
  const allTopics = await getAllTopics();
  const translation = await loadTranslation(locale);

  return {
    props: {
      allThematics,
      allTopics,
      breadcrumbTitle,
      locale,
      posts,
      totalPosts,
      translation,
    },
  };
};

export default BlogPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPosts = await getPostsTotal();
  const totalPages = Math.floor(totalPosts / settings.postsPerPage);
  const paths = getFormattedPageNumbers(totalPages);

  return {
    paths,
    fallback: true,
  };
};
