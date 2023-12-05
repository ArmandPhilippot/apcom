import type { GetStaticProps } from 'next';
import Head from 'next/head';
import NextImage from 'next/image';
import Script from 'next/script';
import { useIntl } from 'react-intl';
import {
  Card,
  CardCover,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  getLayout,
  Grid,
  MetaItem,
  Page,
  PageHeader,
  PageBody,
  CardMeta,
  GridItem,
} from '../../components';
import { mdxComponents } from '../../components/mdx';
import PageContent, { meta } from '../../content/pages/projects.mdx';
import styles from '../../styles/pages/projects.module.scss';
import type { NextPageWithLayout, ProjectPreview } from '../../types';
import { CONFIG } from '../../utils/config';
import { ROUTES } from '../../utils/constants';
import {
  getSchemaJson,
  getSinglePageSchema,
  getWebPageSchema,
} from '../../utils/helpers';
import {
  getAllProjects,
  loadTranslation,
  type Messages,
} from '../../utils/helpers/server';
import { useBreadcrumb } from '../../utils/hooks';

type ProjectsPageProps = {
  data: {
    projects: ProjectPreview[];
  };
  translation?: Messages;
};

/**
 * Projects page.
 */
const ProjectsPage: NextPageWithLayout<ProjectsPageProps> = ({ data }) => {
  const { dates, seo, title } = meta;
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title,
    url: ROUTES.PROJECTS,
  });
  const intl = useIntl();
  const webpageSchema = getWebPageSchema({
    description: seo.description,
    locale: CONFIG.locales.defaultLocale,
    slug: ROUTES.PROJECTS,
    title: seo.title,
    updateDate: dates.update,
  });
  const articleSchema = getSinglePageSchema({
    dates,
    description: seo.description,
    id: 'projects',
    kind: 'page',
    locale: CONFIG.locales.defaultLocale,
    slug: ROUTES.PROJECTS,
    title,
  });
  const schemaJsonLd = getSchemaJson([webpageSchema, articleSchema]);
  const page = {
    title: `${seo.title} - ${CONFIG.name}`,
    url: `${CONFIG.url}${ROUTES.PROJECTS}`,
  };

  return (
    <Page breadcrumbs={breadcrumbItems} isBodyLastChild>
      <Head>
        <title>{page.title}</title>
        {/*eslint-disable-next-line react/jsx-no-literals -- Name allowed */}
        <meta name="description" content={seo.description} />
        <meta property="og:url" content={page.url} />
        {/*eslint-disable-next-line react/jsx-no-literals -- Content allowed */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={seo.description} />
      </Head>
      <Script
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-projects"
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
        intro={<PageContent components={mdxComponents} />}
      />
      <PageBody className={styles.body}>
        <Grid
          className={styles.list}
          // eslint-disable-next-line react/jsx-no-literals
          gap="sm"
          isCentered
          // eslint-disable-next-line react/jsx-no-literals
          sizeMax="30ch"
        >
          {data.projects.map(
            ({ id, meta: projectMeta, slug, title: projectTitle }) => {
              const { contexts, cover, tagline } = projectMeta;
              const messages = {
                card: intl.formatMessage(
                  {
                    defaultMessage: 'Read more about {title}',
                    description: 'ProjectsPage: card accessible name',
                    id: '/STXAQ',
                  },
                  { title: projectTitle }
                ),
                context: intl.formatMessage(
                  {
                    defaultMessage:
                      '{contextsCount, plural, =0 {Contexts:} one {Context:} other {Contexts:}}',
                    description: 'ProjectsPage: context meta label',
                    id: 'jPBeOI',
                  },
                  {
                    contextsCount: contexts?.length,
                  }
                ),
                cover: intl.formatMessage(
                  {
                    defaultMessage: '{title} cover',
                    description: 'ProjectsPage: figure (cover) accessible name',
                    id: 'FdF33B',
                  },
                  { title: projectTitle }
                ),
              };

              return (
                <GridItem key={id}>
                  <Card
                    aria-label={messages.card}
                    className={styles.card}
                    cover={
                      cover ? (
                        <CardCover aria-label={messages.cover} hasBorders>
                          <NextImage {...cover} />
                        </CardCover>
                      ) : undefined
                    }
                    meta={
                      contexts?.length ? (
                        <CardMeta isCentered>
                          <MetaItem
                            hasBorderedValues
                            hasInlinedValues
                            isCentered
                            label={messages.context}
                            value={contexts.map((context) => {
                              return { id: context, value: context };
                            })}
                          />
                        </CardMeta>
                      ) : undefined
                    }
                    isCentered
                    linkTo={slug}
                  >
                    <CardHeader>
                      <CardTitle>{projectTitle}</CardTitle>
                    </CardHeader>
                    <CardBody>{tagline}</CardBody>
                    <CardFooter />
                  </Card>
                </GridItem>
              );
            }
          )}
        </Grid>
      </PageBody>
    </Page>
  );
};

ProjectsPage.getLayout = (page) => getLayout(page);

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async ({
  locale,
}) => {
  const projects = await getAllProjects();
  const translation = await loadTranslation(locale);

  return {
    props: {
      data: {
        projects: JSON.parse(JSON.stringify(projects)),
      },
      translation,
    },
  };
};

export default ProjectsPage;
