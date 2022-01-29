import { getLayout } from '@components/Layouts/Layout';
import PostHeader from '@components/PostHeader/PostHeader';
import ProjectsList from '@components/ProjectsList/ProjectsList';
import PageContent, { meta } from '@content/pages/projects.mdx';
import styles from '@styles/pages/Projects.module.scss';
import { Project } from '@ts/types/app';
import { settings } from '@utils/config';
import { loadTranslation } from '@utils/helpers/i18n';
import { getSortedProjects } from '@utils/helpers/projects';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { Article, Graph, WebPage } from 'schema-dts';

const Projects = ({ projects }: { projects: Project[] }) => {
  const intl = useIntl();
  const dates = {
    publication: meta.publishedOn,
    update: meta.updatedOn,
  };
  const publicationDate = new Date(dates.publication);
  const updateDate = new Date(dates.update);
  const router = useRouter();
  const pageUrl = `${settings.url}${router.asPath}`;
  const pageTitle = intl.formatMessage(
    {
      defaultMessage: 'Projects: open-source makings - {websiteName}',
      description: 'ProjectsPage: SEO - Page title',
    },
    { websiteName: settings.name }
  );
  const pageDescription = intl.formatMessage(
    {
      defaultMessage:
        'Discover {websiteName} projects. Mostly related to web development and open source.',
      description: 'ProjectsPage: SEO - Meta description',
    },
    { websiteName: settings.name }
  );

  const webpageSchema: WebPage = {
    '@id': `${pageUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${settings.url}/#breadcrumb` },
    name: pageTitle,
    description: pageDescription,
    inLanguage: settings.locales.defaultLocale,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    reviewedBy: { '@id': `${settings.url}/#branding` },
    url: `${pageUrl}`,
    isPartOf: {
      '@id': `${settings.url}`,
    },
  };

  const articleSchema: Article = {
    '@id': `${settings.url}/#projects`,
    '@type': 'Article',
    name: meta.title,
    description: pageDescription,
    author: { '@id': `${settings.url}/#branding` },
    copyrightYear: publicationDate.getFullYear(),
    creator: { '@id': `${settings.url}/#branding` },
    dateCreated: publicationDate.toISOString(),
    dateModified: updateDate.toISOString(),
    datePublished: publicationDate.toISOString(),
    editor: { '@id': `${settings.url}/#branding` },
    inLanguage: settings.locales.defaultLocale,
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
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:url" content={`${pageUrl}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={pageDescription} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        ></script>
      </Head>
      <article id="projects" className={styles.article}>
        <PostHeader title={meta.title} intro={<PageContent />} />
        <div className={styles.body}>
          {projects.length > 0 && <ProjectsList projects={projects} />}
        </div>
      </article>
    </>
  );
};

Projects.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const breadcrumbTitle = meta.title;
  const { locale } = context;
  const projects: Project[] = await getSortedProjects();
  const translation = await loadTranslation(locale);

  return {
    props: {
      breadcrumbTitle,
      locale,
      projects,
      translation,
    },
  };
};

export default Projects;
