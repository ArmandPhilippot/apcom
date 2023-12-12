import type { MDXComponents } from 'mdx/types';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import NextImage from 'next/image';
import Script from 'next/script';
import type { FC } from 'react';
import { useIntl } from 'react-intl';
import {
  Card,
  CardCover,
  CardFooter,
  CardHeader,
  CardMeta,
  CardTitle,
  getLayout,
  Grid,
  Time,
  MetaItem,
  Page,
} from '../components';
import { mdxComponents } from '../components/mdx';
import HomePageContent, { meta } from '../content/pages/homepage.mdx';
import {
  convertRecentPostToRecentArticle,
  fetchRecentPosts,
} from '../services/graphql';
import type { NextPageWithLayout, RecentArticle } from '../types';
import { CONFIG } from '../utils/config';
import { ROUTES } from '../utils/constants';
import { getSchemaJson, getWebPageSchema } from '../utils/helpers';
import { loadTranslation, type Messages } from '../utils/helpers/server';
import { useBreadcrumbs } from '../utils/hooks';

type RecentPostsProps = {
  posts: RecentArticle[];
};

/**
 * Get a cards list of recent posts.
 *
 * @returns {JSX.Element} - The cards list.
 */
const RecentPosts: FC<RecentPostsProps> = ({ posts }): JSX.Element => {
  const intl = useIntl();
  const publicationDate = intl.formatMessage({
    defaultMessage: 'Published on:',
    description: 'HomePage: publication date label',
    id: 'pT5nHk',
  });

  return (
    <Grid
      // eslint-disable-next-line react/jsx-no-literals
      gap="sm"
      // eslint-disable-next-line react/jsx-no-literals
      sizeMax="25ch"
    >
      {posts.map((post) => {
        const postUrl = `${ROUTES.ARTICLE}/${post.slug}`;
        const cardLabel = intl.formatMessage(
          {
            defaultMessage: 'View {pageTitle}',
            description: 'RecentPosts: card accessible name',
            id: 'mWZU4R',
          },
          {
            pageTitle: post.title,
          }
        );
        const coverLabel = intl.formatMessage(
          {
            defaultMessage: 'Cover of {pageTitle}',
            description: 'RecentPosts: card cover accessible name',
            id: 'kq+fzI',
          },
          {
            pageTitle: post.title,
          }
        );

        return (
          <Card
            aria-label={cardLabel}
            cover={
              post.cover ? (
                <CardCover aria-label={coverLabel} hasBorders>
                  <NextImage {...post.cover} />
                </CardCover>
              ) : undefined
            }
            key={post.id}
            meta={
              <CardMeta isCentered>
                <MetaItem
                  hasBorderedValues
                  isCentered
                  label={publicationDate}
                  value={<Time date={post.publicationDate} />}
                />
              </CardMeta>
            }
            isCentered
            linkTo={postUrl}
          >
            <CardHeader>
              <CardTitle level={3}>{post.title}</CardTitle>
            </CardHeader>
            <CardFooter />
          </Card>
        );
      })}
    </Grid>
  );
};

const getComponents = (recentPosts: RecentArticle[]): MDXComponents => {
  return {
    ...mdxComponents,
    RecentPosts: () => <RecentPosts posts={recentPosts} />,
  };
};

type HomeProps = {
  recentPosts: RecentArticle[];
  translation?: Messages;
};

/**
 * Home page.
 */
const HomePage: NextPageWithLayout<HomeProps> = ({ recentPosts }) => {
  const { schema: breadcrumbSchema } = useBreadcrumbs();

  const webpageSchema = getWebPageSchema({
    description: meta.seo.description,
    locale: CONFIG.locales.defaultLocale,
    slug: ROUTES.HOME,
    title: meta.seo.title,
  });
  const schemaJsonLd = getSchemaJson([webpageSchema, breadcrumbSchema]);

  return (
    <Page hasSections>
      <Head>
        <title>{meta.seo.title}</title>
        {/*eslint-disable-next-line react/jsx-no-literals -- Name allowed */}
        <meta name="description" content={meta.seo.description} />
        <meta property="og:url" content={CONFIG.url} />
        <meta property="og:title" content={meta.seo.title} />
        <meta property="og:description" content={meta.seo.description} />
      </Head>
      <Script
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-homepage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <HomePageContent components={getComponents(recentPosts)} />
    </Page>
  );
};

HomePage.getLayout = (page) => getLayout(page, { isHome: true });

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const translation = await loadTranslation(locale);
  const recentPosts = await fetchRecentPosts({ first: 3 });

  return {
    props: {
      recentPosts: recentPosts.edges.map((edge) =>
        convertRecentPostToRecentArticle(edge.node)
      ),
      translation,
    },
  };
};

export default HomePage;
