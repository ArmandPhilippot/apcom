import { getLayout } from '@components/Layouts/Layout';
import PostHeader from '@components/PostHeader/PostHeader';
import ProjectsList from '@components/ProjectsList/ProjectsList';
import { seo } from '@config/seo';
import { config } from '@config/website';
import PageContent, { meta } from '@content/pages/projects.mdx';
import styles from '@styles/pages/Projects.module.scss';
import { Project } from '@ts/types/app';
import { loadTranslation } from '@utils/helpers/i18n';
import { getSortedProjects } from '@utils/helpers/projects';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Article, Graph, WebPage } from 'schema-dts';

const Projects = ({ projects }: { projects: Project[] }) => {
  const dates = {
    publication: meta.publishedOn,
    update: meta.updatedOn,
  };
  const publicationDate = new Date(dates.publication);
  const updateDate = new Date(dates.update);
  const router = useRouter();
  const pageUrl = `${config.url}${router.asPath}`;

  const webpageSchema: WebPage = {
    '@id': `${pageUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${config.url}/#breadcrumb` },
    name: seo.legalNotice.title,
    description: seo.legalNotice.description,
    inLanguage: config.locales.defaultLocale,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    reviewedBy: { '@id': `${config.url}/#branding` },
    url: `${pageUrl}`,
    isPartOf: {
      '@id': `${config.url}`,
    },
  };

  const articleSchema: Article = {
    '@id': `${config.url}/#projects`,
    '@type': 'Article',
    name: meta.title,
    description: seo.projects.description,
    author: { '@id': `${config.url}/#branding` },
    copyrightYear: publicationDate.getFullYear(),
    creator: { '@id': `${config.url}/#branding` },
    dateCreated: publicationDate.toISOString(),
    dateModified: updateDate.toISOString(),
    datePublished: publicationDate.toISOString(),
    editor: { '@id': `${config.url}/#branding` },
    inLanguage: config.locales.defaultLocale,
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
        <title>{seo.projects.title}</title>
        <meta name="description" content={seo.projects.description} />
        <meta property="og:url" content={`${pageUrl}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={seo.projects.description} />
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
  const translation = await loadTranslation(
    context.locale!,
    process.env.NODE_ENV === 'production'
  );
  const breadcrumbTitle = meta.title;
  const projects: Project[] = await getSortedProjects();

  return {
    props: {
      breadcrumbTitle,
      projects,
      translation,
    },
  };
};

export default Projects;
