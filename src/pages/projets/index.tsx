import type { GetStaticProps } from 'next';
import Head from 'next/head';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
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
  MetaList,
  MetaItem,
  Page,
  PageHeader,
  PageBody,
} from '../../components';
import { mdxComponents } from '../../components/mdx';
import PageContent, { meta } from '../../content/pages/projects.mdx';
import styles from '../../styles/pages/projects.module.scss';
import type { NextPageWithLayout, ProjectCard } from '../../types';
import { CONFIG } from '../../utils/config';
import { ROUTES } from '../../utils/constants';
import {
  getSchemaJson,
  getSinglePageSchema,
  getWebPageSchema,
} from '../../utils/helpers';
import {
  getProjectsCard,
  loadTranslation,
  type Messages,
} from '../../utils/helpers/server';
import { useBreadcrumb } from '../../utils/hooks';

type ProjectsPageProps = {
  projects: ProjectCard[];
  translation?: Messages;
};

/**
 * Projects page.
 */
const ProjectsPage: NextPageWithLayout<ProjectsPageProps> = ({ projects }) => {
  const { dates, seo, title } = meta;
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title,
    url: ROUTES.PROJECTS,
  });
  const intl = useIntl();
  const metaLabel = intl.formatMessage({
    defaultMessage: 'Technologies:',
    description: 'Meta: technologies label',
    id: 'ADQmDF',
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
    description: seo.description,
    id: 'projects',
    kind: 'page',
    locale: CONFIG.locales.defaultLocale,
    slug: asPath,
    title,
  });
  const schemaJsonLd = getSchemaJson([webpageSchema, articleSchema]);
  const page = {
    title: `${seo.title} - ${CONFIG.name}`,
    url: `${CONFIG.url}${asPath}`,
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
        <Grid className={styles.list} gap="sm" isCentered sizeMax="30ch">
          {projects.map(
            ({ id, meta: projectMeta, slug, title: projectTitle }) => {
              const { cover, tagline, technologies } = projectMeta;
              const figureLabel = intl.formatMessage(
                {
                  defaultMessage: '{title} cover',
                  description: 'ProjectsPage: figure (cover) accessible name',
                  id: 'FdF33B',
                },
                { title: projectTitle }
              );

              return (
                <Card
                  cover={
                    cover ? (
                      <CardCover aria-label={figureLabel} hasBorders>
                        <NextImage {...cover} />
                      </CardCover>
                    ) : undefined
                  }
                  key={id}
                  meta={
                    technologies ? (
                      <MetaList isCentered>
                        <MetaItem
                          hasBorderedValues
                          hasInlinedValues
                          isCentered
                          label={metaLabel}
                          value={technologies.map((techno) => {
                            return { id: techno, value: techno };
                          })}
                        />
                      </MetaList>
                    ) : undefined
                  }
                  isCentered
                  linkTo={`${ROUTES.PROJECTS}/${slug}`}
                >
                  <CardHeader>
                    <CardTitle>{projectTitle}</CardTitle>
                  </CardHeader>
                  <CardBody>{tagline}</CardBody>
                  <CardFooter />
                </Card>
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
  const projects = await getProjectsCard();
  const translation = await loadTranslation(locale);

  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects)),
      translation,
    },
  };
};

export default ProjectsPage;
