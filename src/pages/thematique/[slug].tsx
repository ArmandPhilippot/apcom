/* eslint-disable max-statements */
import type { ParsedUrlQuery } from 'querystring';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useIntl } from 'react-intl';
import {
  getLayout,
  Heading,
  LinksWidget,
  PostsList,
  Page,
  PageHeader,
  PageSidebar,
  PageBody,
} from '../../components';
import {
  convertWPThematicPreviewToPageLink,
  convertWPThematicToThematic,
  fetchAllThematicsSlugs,
  fetchThematic,
  fetchThematicsCount,
  fetchThematicsList,
} from '../../services/graphql';
import styles from '../../styles/pages/blog.module.scss';
import type { NextPageWithLayout, PageLink, Thematic } from '../../types';
import { CONFIG } from '../../utils/config';
import { ROUTES } from '../../utils/constants';
import {
  getLinksItemData,
  getPostsWithUrl,
  getSchemaJson,
  getSinglePageSchema,
  getWebPageSchema,
} from '../../utils/helpers';
import { loadTranslation, type Messages } from '../../utils/helpers/server';
import { useBreadcrumb } from '../../utils/hooks';

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
  const { articles, dates, seo, relatedTopics } = meta;
  const intl = useIntl();
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title,
    url: `${ROUTES.THEMATICS}/${slug}`,
  });

  const { asPath } = useRouter();
  const webpageSchema = getWebPageSchema({
    description: seo.description,
    locale: CONFIG.locales.defaultLocale,
    slug: asPath,
    title: seo.title,
    updateDate: dates.update,
  });
  const articleSchema = getSinglePageSchema({
    dates,
    description: intro,
    id: 'thematic',
    kind: 'page',
    locale: CONFIG.locales.defaultLocale,
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
  const pageUrl = `${CONFIG.url}${asPath}`;

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
        id="schema-project"
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- Necessary for schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <Script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-breadcrumb"
        type="application/ld+json"
      />
      <PageHeader
        heading={title}
        intro={intro}
        meta={{
          publicationDate: dates.publication,
          total: articles?.length,
          updateDate: dates.update,
        }}
      />
      <PageBody className={styles.body}>
        {/*eslint-disable-next-line react/no-danger -- Necessary for content*/}
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {articles ? (
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
              className={styles.list}
              posts={getPostsWithUrl(articles)}
              headingLvl={3}
              sortByYear
            />
          </>
        ) : null}
      </PageBody>
      <PageSidebar>
        <LinksWidget
          heading={
            <Heading isFake level={3}>
              {thematicsListTitle}
            </Heading>
          }
          items={getLinksItemData(thematics)}
        />
        {relatedTopics ? (
          <LinksWidget
            heading={
              <Heading isFake level={3}>
                {topicsListTitle}
              </Heading>
            }
            items={getLinksItemData(relatedTopics)}
          />
        ) : null}
      </PageSidebar>
    </Page>
  );
};

ThematicPage.getLayout = (page) => getLayout(page);

type ThematicParams = {
  slug: string;
} & ParsedUrlQuery;

export const getStaticProps: GetStaticProps<ThematicPageProps> = async ({
  locale,
  params,
}) => {
  const currentThematic = await fetchThematic((params as ThematicParams).slug);
  const totalThematics = await fetchThematicsCount();
  const allThematicsEdges = await fetchThematicsList({
    first: totalThematics,
  });
  const allThematics = allThematicsEdges.edges.map((edge) =>
    convertWPThematicPreviewToPageLink(edge.node)
  );
  const allThematicsLinks = allThematics.filter(
    (thematic) =>
      thematic.url !== `${ROUTES.THEMATICS}/${(params as ThematicParams).slug}`
  );
  const translation = await loadTranslation(locale);

  return {
    props: {
      currentThematic: JSON.parse(
        JSON.stringify(convertWPThematicToThematic(currentThematic))
      ),
      thematics: JSON.parse(JSON.stringify(allThematicsLinks)),
      translation,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const thematicsCount = await fetchThematicsCount();
  const slugs = await fetchAllThematicsSlugs(thematicsCount);
  const paths = slugs.map((slug) => {
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

export default ThematicPage;
