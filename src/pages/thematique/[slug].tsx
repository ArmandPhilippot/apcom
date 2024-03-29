/* eslint-disable max-statements */
import type { ParsedUrlQuery } from 'querystring';
import type { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
  LoadingPage,
  Spinner,
} from '../../components';
import {
  convertWPThematicPreviewToPageLink,
  fetchAllThematicsSlugs,
  fetchThematic,
  fetchThematicsCount,
  fetchThematicsList,
} from '../../services/graphql';
import styles from '../../styles/pages/blog.module.scss';
import type {
  GraphQLConnection,
  NextPageWithLayout,
  WPThematic,
  WPThematicPreview,
} from '../../types';
import { CONFIG } from '../../utils/config';
import {
  getLinksItemData,
  getPostsWithUrl,
  getSchemaFrom,
  getWebPageGraph,
  slugify,
  trimHTMLTags,
} from '../../utils/helpers';
import { loadTranslation, type Messages } from '../../utils/helpers/server';
import {
  useBreadcrumbs,
  useHeadingsTree,
  useThematic,
  useThematicsList,
} from '../../utils/hooks';

const Toc = dynamic(
  async () => import('../../components').then((mod) => mod.TocWidget),
  {
    ssr: false,
  }
);

export type ThematicPageProps = {
  data: {
    currentThematic: WPThematic;
    otherThematics: GraphQLConnection<WPThematicPreview>;
    totalThematics: number;
  };
  translation: Messages;
};

const ThematicPage: NextPageWithLayout<ThematicPageProps> = ({ data }) => {
  const intl = useIntl();
  const { isFallback } = useRouter();
  const { isLoading, thematic } = useThematic(
    data.currentThematic.slug,
    data.currentThematic
  );
  const { isLoading: areThematicsLoading, thematics } = useThematicsList({
    fallback: data.otherThematics,
    input: { first: data.totalThematics, where: { notIn: [thematic.id] } },
  });
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumbs(
    thematic.title
  );
  const { ref, tree } = useHeadingsTree<HTMLDivElement>({ fromLevel: 2 });

  if (isFallback || isLoading) return <LoadingPage />;

  const { content, intro, meta, slug, title } = thematic;
  const { articles, dates, seo, relatedTopics } = meta;

  const jsonLd = getSchemaFrom([
    getWebPageGraph({
      breadcrumb: breadcrumbSchema,
      copyrightYear: new Date(dates.publication).getFullYear(),
      dates,
      description: trimHTMLTags(intro),
      slug,
      title,
    }),
  ]);

  const messages = {
    widgets: {
      loadingThematicsList: intl.formatMessage({
        defaultMessage: 'Thematics are loading...',
        description: 'ThematicPage: loading thematics message',
        id: 'rVoW4G',
      }),
      thematicsListTitle: intl.formatMessage({
        defaultMessage: 'Other thematics',
        description: 'ThematicPage: other thematics list widget title',
        id: 'KVSWGP',
      }),
      tocTitle: intl.formatMessage({
        defaultMessage: 'Table of Contents',
        description: 'PageLayout: table of contents title',
        id: 'eys2uX',
      }),
      topicsListTitle: intl.formatMessage({
        defaultMessage: 'Related topics',
        description: 'ThematicPage: related topics list widget title',
        id: '/42Z0z',
      }),
    },
    browsePostsTitle: intl.formatMessage(
      {
        defaultMessage: 'Browse posts in {thematicName} thematic',
        description: 'ThematicPage: posts list heading',
        id: 'jrRBeb',
      },
      { thematicName: title }
    ),
  };

  const pageUrl = `${CONFIG.url}${slug}`;
  const browsePostHeadingId = slugify(messages.browsePostsTitle);

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
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      </Head>
      <PageHeader
        heading={title}
        intro={intro}
        meta={{
          publicationDate: dates.publication,
          total: articles?.length,
          updateDate: dates.update,
        }}
      />
      <PageSidebar>
        <Toc
          heading={<Heading level={2}>{messages.widgets.tocTitle}</Heading>}
          tree={[
            ...tree,
            {
              children: [],
              depth: 2,
              id: browsePostHeadingId,
              label: messages.browsePostsTitle,
            },
          ]}
        />
      </PageSidebar>
      <PageBody>
        <div
          className={styles.body}
          // eslint-disable-next-line react/no-danger -- Necessary for content
          dangerouslySetInnerHTML={{ __html: content }}
          ref={ref}
        />
        {articles ? (
          <>
            <Heading id={browsePostHeadingId} level={2}>
              {messages.browsePostsTitle}
            </Heading>
            <PostsList
              posts={getPostsWithUrl(articles)}
              headingLvl={3}
              sortByYear
            />
          </>
        ) : null}
      </PageBody>
      <PageSidebar>
        {areThematicsLoading ? (
          <Spinner>{messages.widgets.loadingThematicsList}</Spinner>
        ) : (
          <LinksWidget
            heading={
              <Heading level={2}>{messages.widgets.thematicsListTitle}</Heading>
            }
            items={getLinksItemData(
              thematics.edges.map((edge) =>
                convertWPThematicPreviewToPageLink(edge.node)
              )
            )}
          />
        )}
        {relatedTopics ? (
          <LinksWidget
            heading={
              <Heading level={2}>{messages.widgets.topicsListTitle}</Heading>
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
  const thematic = await fetchThematic((params as ThematicParams).slug);
  const totalThematics = await fetchThematicsCount();
  const otherThematics = await fetchThematicsList({
    first: totalThematics,
    where: { notIn: [thematic.databaseId] },
  });
  const translation = await loadTranslation(locale);

  return {
    props: {
      data: {
        currentThematic: JSON.parse(JSON.stringify(thematic)),
        otherThematics: JSON.parse(JSON.stringify(otherThematics)),
        totalThematics,
      },
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
