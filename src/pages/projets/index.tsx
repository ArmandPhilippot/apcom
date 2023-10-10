/* eslint-disable max-statements */
import type { MDXComponents } from 'mdx/types';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useIntl } from 'react-intl';
import {
  CardsList,
  type CardsListItem,
  getLayout,
  Link,
  PageLayout,
} from '../../components';
import PageContent, { meta } from '../../content/pages/projects.mdx';
import styles from '../../styles/pages/projects.module.scss';
import type { NextPageWithLayout, ProjectCard } from '../../types';
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
import { useBreadcrumb, useSettings } from '../../utils/hooks';

const components: MDXComponents = {
  Link,
};

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

  const items: CardsListItem[] = projects.map(
    ({ id, meta: projectMeta, slug, title: projectTitle }) => {
      const { cover, tagline, technologies } = projectMeta;

      return {
        cover,
        id: id as string,
        meta: technologies?.length
          ? [
              {
                id: 'technologies',
                label: metaLabel,
                value: technologies.map((techno) => {
                  return { id: techno, value: techno };
                }),
              },
            ]
          : [],
        tagline,
        title: projectTitle,
        url: `${ROUTES.PROJECTS}/${slug}`,
      };
    }
  );

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
    description: seo.description,
    id: 'projects',
    kind: 'page',
    locale: website.locales.default,
    slug: asPath,
    title,
  });
  const schemaJsonLd = getSchemaJson([webpageSchema, articleSchema]);
  const page = {
    title: `${seo.title} - ${website.name}`,
    url: `${website.url}${asPath}`,
  };

  return (
    <>
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
      <PageLayout
        title={title}
        intro={<PageContent components={components} />}
        breadcrumb={breadcrumbItems}
        breadcrumbSchema={breadcrumbSchema}
      >
        <CardsList items={items} titleLevel={2} className={styles.list} />
      </PageLayout>
    </>
  );
};

ProjectsPage.getLayout = (page) =>
  getLayout(page, { useGrid: true, withExtraPadding: true });

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
