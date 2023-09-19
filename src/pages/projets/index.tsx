import { MDXComponents } from 'mdx/types';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Link from '../../components/atoms/links/link';
import CardsList, {
  type CardsListItem,
} from '../../components/organisms/layout/cards-list';
import { getLayout } from '../../components/templates/layout/layout';
import PageLayout from '../../components/templates/page/page-layout';
import PageContent, { meta } from '../../content/pages/projects.mdx';
import styles from '../../styles/pages/projects.module.scss';
import { type NextPageWithLayout, type ProjectCard } from '../../types/app';
import { loadTranslation, type Messages } from '../../utils/helpers/i18n';
import { getProjectsCard } from '../../utils/helpers/projects';
import {
  getSchemaJson,
  getSinglePageSchema,
  getWebPageSchema,
} from '../../utils/helpers/schema-org';
import useBreadcrumb from '../../utils/hooks/use-breadcrumb';
import useSettings from '../../utils/hooks/use-settings';

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
    url: `/projets`,
  });

  const items: CardsListItem[] = projects.map(
    ({ id, meta: projectMeta, slug, title: projectTitle }) => {
      const { cover, tagline, technologies } = projectMeta;

      return {
        cover,
        id: id as string,
        meta: { technologies: technologies },
        tagline,
        title: projectTitle,
        url: `/projets/${slug}`,
      };
    }
  );

  const components: MDXComponents = {
    Link,
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
    description: seo.description,
    id: 'projects',
    kind: 'page',
    locale: website.locales.default,
    slug: asPath,
    title,
  });
  const schemaJsonLd = getSchemaJson([webpageSchema, articleSchema]);

  return (
    <>
      <Head>
        <title>{`${seo.title} - ${website.name}`}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:url" content={`${website.url}${asPath}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${seo.title} - ${website.name}`} />
        <meta property="og:description" content={seo.description} />
      </Head>
      <Script
        id="schema-projects"
        type="application/ld+json"
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
