import { getLayout } from '@components/Layouts/Layout';
import PostHeader from '@components/PostHeader/PostHeader';
import Sidebar from '@components/Sidebar/Sidebar';
import { ToC } from '@components/Widgets';
import { config } from '@config/website';
import styles from '@styles/pages/Page.module.scss';
import {
  NextPageWithLayout,
  Project as ProjectData,
  ProjectProps,
} from '@ts/types/app';
import { loadTranslation } from '@utils/helpers/i18n';
import {
  getAllProjectsFilename,
  getProjectData,
} from '@utils/helpers/projects';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { Article, Graph, WebPage } from 'schema-dts';

const Project: NextPageWithLayout<ProjectProps> = ({
  project,
}: {
  project: ProjectData;
}) => {
  const router = useRouter();
  const projectUrl = `${config.url}${router.asPath}`;
  const { cover, id, intro, meta, title, seo } = project;
  const dates = {
    publication: meta.publishedOn,
    update: meta.updatedOn,
  };

  const ProjectContent = dynamic(
    () => import(`../../content/projects/${id}.mdx`)
  );

  const webpageSchema: WebPage = {
    '@id': `${projectUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${config.url}/#breadcrumb` },
    name: seo.title,
    description: seo.description,
    inLanguage: config.locales.defaultLocale,
    reviewedBy: { '@id': `${config.url}/#branding` },
    url: `${config.url}`,
    isPartOf: {
      '@id': `${config.url}`,
    },
  };

  const publicationDate = new Date(dates.publication);
  const updateDate = new Date(dates.update);

  const articleSchema: Article = {
    '@id': `${config.url}/subject`,
    '@type': 'Article',
    name: title,
    description: intro,
    author: { '@id': `${config.url}/#branding` },
    copyrightYear: publicationDate.getFullYear(),
    creator: { '@id': `${config.url}/#branding` },
    dateCreated: publicationDate.toISOString(),
    dateModified: updateDate.toISOString(),
    datePublished: publicationDate.toISOString(),
    editor: { '@id': `${config.url}/#branding` },
    thumbnailUrl: cover,
    image: cover,
    inLanguage: config.locales.defaultLocale,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: { '@id': `${projectUrl}` },
  };

  const schemaJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageSchema, articleSchema],
  };

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:url" content={`${projectUrl}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={intro} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        ></script>
      </Head>
      <article
        id="project"
        className={`${styles.article} ${styles['article--no-comments']}`}
      >
        <PostHeader title={title} intro={intro} meta={{ dates }} />
        <Sidebar position="left">
          <ToC />
        </Sidebar>
        <div className={styles.body}>
          <ProjectContent />
        </div>
      </article>
    </>
  );
};

Project.getLayout = getLayout;

interface ProjectParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const translation = await loadTranslation(
    context.locale!,
    process.env.NODE_ENV === 'production'
  );
  const breadcrumbTitle = '';
  const { slug } = context.params as ProjectParams;
  const project = await getProjectData(slug);

  return {
    props: {
      breadcrumbTitle,
      project,
      translation,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = getAllProjectsFilename();
  const paths = filenames.map((filename) => {
    return {
      params: {
        slug: filename,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default Project;
