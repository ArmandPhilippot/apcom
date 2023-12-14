import type { GetStaticProps } from 'next';
import Head from 'next/head';
import NextImage from 'next/image';
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
import { getSchemaFrom, getWebPageGraph } from '../../utils/helpers';
import {
  getAllProjects,
  loadTranslation,
  type Messages,
} from '../../utils/helpers/server';
import { useBreadcrumbs } from '../../utils/hooks';

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
  const { items: breadcrumbItems, schema: breadcrumbSchema } =
    useBreadcrumbs(title);
  const intl = useIntl();

  const jsonLd = getSchemaFrom([
    getWebPageGraph({
      breadcrumb: breadcrumbSchema,
      copyrightYear: new Date(dates.publication).getFullYear(),
      dates,
      description: seo.description,
      slug: ROUTES.PROJECTS,
      title,
    }),
  ]);

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
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      </Head>
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
