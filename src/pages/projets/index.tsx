import Link from '@components/atoms/links/link';
import CardsList, {
  type CardsListItem,
} from '@components/organisms/layout/cards-list';
import { getLayout } from '@components/templates/layout/layout';
import PageLayout from '@components/templates/page/page-layout';
import PageContent, { meta } from '@content/pages/projects.mdx';
import styles from '@styles/pages/projects.module.scss';
import { type NextPageWithLayout, type ProjectCard } from '@ts/types/app';
import { loadTranslation, type Messages } from '@utils/helpers/i18n';
import { getProjectsCard } from '@utils/helpers/projects';
import useBreadcrumb from '@utils/hooks/use-breadcrumb';
import useSettings from '@utils/hooks/use-settings';
import { NestedMDXComponents } from 'mdx/types';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { Article, Graph, WebPage } from 'schema-dts';

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

  const components: NestedMDXComponents = {
    Links: (props) => <Link {...props} />,
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
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    reviewedBy: { '@id': `${website.url}/#branding` },
    url: `${pageUrl}`,
    isPartOf: {
      '@id': `${website.url}`,
    },
  };

  const articleSchema: Article = {
    '@id': `${website.url}/#projects`,
    '@type': 'Article',
    name: meta.title,
    description: seo.description,
    author: { '@id': `${website.url}/#branding` },
    copyrightYear: pagePublicationDate.getFullYear(),
    creator: { '@id': `${website.url}/#branding` },
    dateCreated: pagePublicationDate.toISOString(),
    dateModified: pageUpdateDate && pageUpdateDate.toISOString(),
    datePublished: pagePublicationDate.toISOString(),
    editor: { '@id': `${website.url}/#branding` },
    headline: meta.title,
    inLanguage: website.locales.default,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: { '@id': `${pageUrl}` },
  };

  const schemaJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageSchema, articleSchema],
  };

  return (
    <>
      <Head>
        <title>{`${seo.title} - ${website.name}`}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:url" content={`${pageUrl}`} />
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
