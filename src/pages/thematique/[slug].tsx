import Heading from '@components/atoms/headings/heading';
import PostsList, { type Post } from '@components/organisms/layout/posts-list';
import LinksListWidget from '@components/organisms/widgets/links-list-widget';
import { getLayout } from '@components/templates/layout/layout';
import PageLayout, {
  type PageLayoutProps,
} from '@components/templates/page/page-layout';
import {
  getAllThematicsSlugs,
  getThematicBySlug,
  getThematicsPreview,
  getTotalThematics,
} from '@services/graphql/thematics';
import {
  type Article,
  type NextPageWithLayout,
  type PageLink,
  type Thematic,
} from '@ts/types/app';
import { loadTranslation, type Messages } from '@utils/helpers/i18n';
import {
  getLinksListItems,
  getPageLinkFromRawData,
  getPostMeta,
} from '@utils/helpers/pages';
import useBreadcrumb from '@utils/hooks/use-breadcrumb';
import useSettings from '@utils/hooks/use-settings';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ParsedUrlQuery } from 'querystring';
import { useIntl } from 'react-intl';
import { Article as ArticleSchema, Graph, WebPage } from 'schema-dts';

export type ThematicPageProps = {
  currentThematic: Thematic;
  thematics: PageLink[];
  translation: Messages;
};

const ThematicPage: NextPageWithLayout<ThematicPageProps> = ({
  currentThematic,
  thematics,
}) => {
  const { content, intro, meta, slug, title } = currentThematic;
  const { articles, dates, seo, topics } = meta;
  const intl = useIntl();
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title,
    url: `/thematique/${slug}`,
  });

  const headerMeta: PageLayoutProps['headerMeta'] = {
    publication: { date: dates.publication },
    update: dates.update ? { date: dates.update } : undefined,
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
    name: seo.title,
    description: seo.description,
    inLanguage: website.locales.default,
    reviewedBy: { '@id': `${website.url}/#branding` },
    url: `${website.url}`,
  };

  const articleSchema: ArticleSchema = {
    '@id': `${website.url}/#thematic`,
    '@type': 'Article',
    name: title,
    description: intro,
    author: { '@id': `${website.url}/#branding` },
    copyrightYear: pagePublicationDate.getFullYear(),
    creator: { '@id': `${website.url}/#branding` },
    dateCreated: pagePublicationDate.toISOString(),
    dateModified: pageUpdateDate && pageUpdateDate.toISOString(),
    datePublished: pagePublicationDate.toISOString(),
    editor: { '@id': `${website.url}/#branding` },
    headline: title,
    inLanguage: website.locales.default,
    isPartOf: { '@id': `${website.url}/blog` },
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: { '@id': `${pageUrl}` },
    subjectOf: { '@id': `${website.url}/blog` },
  };

  const schemaJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageSchema, articleSchema],
  };

  const getPosts = (array: Article[]): Post[] => {
    return array.map((article) => {
      const {
        intro: articleIntro,
        meta: articleMeta,
        slug: articleSlug,
        ...remainingData
      } = article;

      const { cover, ...remainingMeta } = articleMeta;

      return {
        cover,
        excerpt: articleIntro,
        meta: getPostMeta(remainingMeta),
        url: `/article/${articleSlug}`,
        ...remainingData,
      };
    });
  };

  const thematicsListTitle = intl.formatMessage({
    defaultMessage: 'Other thematics',
    description: 'ThematicPage: other thematics list widget title',
    id: 'KVSWGP',
  });

  const topicsListTitle = intl.formatMessage({
    defaultMessage: 'Related topics',
    description: 'ThematicPage: related topics list widget title',
    id: '/42Z0z',
  });

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
        breadcrumb={breadcrumbItems}
        breadcrumbSchema={breadcrumbSchema}
        title={title}
        intro={intro}
        headerMeta={headerMeta}
        widgets={
          topics
            ? [
                <LinksListWidget
                  key="thematics"
                  items={getLinksListItems(thematics, 'thematic')}
                  title={thematicsListTitle}
                  level={2}
                />,
                <LinksListWidget
                  key="related-topics"
                  items={getLinksListItems(topics, 'topic')}
                  title={topicsListTitle}
                  level={2}
                />,
              ]
            : []
        }
      >
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {articles && (
          <>
            <Heading level={2}>
              {intl.formatMessage(
                {
                  defaultMessage: 'All posts in {thematicName}',
                  description: 'ThematicPage: posts list heading',
                  id: 'LszkU6',
                },
                { thematicName: title }
              )}
            </Heading>
            <PostsList
              posts={getPosts(articles)}
              total={articles.length}
              titleLevel={3}
              byYear={true}
            />
          </>
        )}
      </PageLayout>
    </>
  );
};

ThematicPage.getLayout = (page) =>
  getLayout(page, { useGrid: true, withExtraPadding: true });

interface ThematicParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<ThematicPageProps> = async ({
  locale,
  params,
}) => {
  const currentThematic = await getThematicBySlug(
    params!.slug as ThematicParams['slug']
  );
  const totalThematics = await getTotalThematics();
  const allThematicsEdges = await getThematicsPreview({
    first: totalThematics,
  });
  const allThematics = allThematicsEdges.edges.map((edge) =>
    getPageLinkFromRawData(edge.node)
  );
  const translation = await loadTranslation(locale);

  return {
    props: {
      currentThematic: JSON.parse(JSON.stringify(currentThematic)),
      thematics: allThematics.filter(
        (thematic) => thematic.slug !== (params!.slug as ThematicParams['slug'])
      ),
      translation,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllThematicsSlugs();
  const paths = slugs.map((slug) => {
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

export default ThematicPage;
