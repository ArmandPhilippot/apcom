import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ParsedUrlQuery } from 'querystring';
import { useIntl } from 'react-intl';
import Heading from '../../components/atoms/headings/heading';
import PostsList from '../../components/organisms/layout/posts-list';
import LinksListWidget from '../../components/organisms/widgets/links-list-widget';
import { getLayout } from '../../components/templates/layout/layout';
import PageLayout, {
  type PageLayoutProps,
} from '../../components/templates/page/page-layout';
import {
  getAllThematicsSlugs,
  getThematicBySlug,
  getThematicsPreview,
  getTotalThematics,
} from '../../services/graphql/thematics';
import {
  type NextPageWithLayout,
  type PageLink,
  type Thematic,
} from '../../types/app';
import { loadTranslation, type Messages } from '../../utils/helpers/i18n';
import {
  getLinksListItems,
  getPageLinkFromRawData,
  getPostsWithUrl,
} from '../../utils/helpers/pages';
import {
  getSchemaJson,
  getSinglePageSchema,
  getWebPageSchema,
} from '../../utils/helpers/schema-org';
import useBreadcrumb from '../../utils/hooks/use-breadcrumb';
import useSettings from '../../utils/hooks/use-settings';

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
    total: articles ? articles.length : undefined,
  };

  const { website } = useSettings();
  const { asPath } = useRouter();
  const webpageSchema = getWebPageSchema({
    description: seo.description,
    locale: website.locales.default,
    slug: asPath,
    title: seo.title,
    updateDate: dates.update,
  });
  const articleSchema = getSinglePageSchema({
    dates,
    description: intro,
    id: 'thematic',
    kind: 'page',
    locale: website.locales.default,
    slug: asPath,
    title,
  });
  const schemaJsonLd = getSchemaJson([webpageSchema, articleSchema]);

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
        <meta property="og:url" content={`${website.url}${asPath}`} />
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
                  items={getLinksListItems(thematics)}
                  title={thematicsListTitle}
                  level={2}
                />,
                <LinksListWidget
                  key="related-topics"
                  items={getLinksListItems(topics)}
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
              baseUrl="/thematique/page/"
              byYear={true}
              posts={getPostsWithUrl(articles)}
              searchPage="/recherche/"
              titleLevel={3}
              total={articles.length}
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
    getPageLinkFromRawData(edge.node, 'thematic')
  );
  const allThematicsLinks = allThematics.filter(
    (thematic) =>
      thematic.url !== `/thematique/${params!.slug as ThematicParams['slug']}`
  );
  const translation = await loadTranslation(locale);

  return {
    props: {
      currentThematic: JSON.parse(JSON.stringify(currentThematic)),
      thematics: JSON.parse(JSON.stringify(allThematicsLinks)),
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
