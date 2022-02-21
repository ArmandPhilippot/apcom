import { getLayout } from '@components/Layouts/Layout';
import { CodeBlock, Gallery, Link, ResponsiveImage } from '@components/MDX';
import PostHeader from '@components/PostHeader/PostHeader';
import ProjectSummary from '@components/ProjectSummary/ProjectSummary';
import Sidebar from '@components/Sidebar/Sidebar';
import { Sharing, ToC } from '@components/Widgets';
import styles from '@styles/pages/Page.module.scss';
import {
  NextPageWithLayout,
  Project as ProjectData,
  ProjectProps,
} from '@ts/types/app';
import { settings } from '@utils/config';
import { loadTranslation } from '@utils/helpers/i18n';
import {
  getAllProjectsFilename,
  getProjectData,
} from '@utils/helpers/projects';
import { MDXComponents, NestedMDXComponents } from 'mdx/types';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ParsedUrlQuery } from 'querystring';
import { ComponentType } from 'react';
import { useIntl } from 'react-intl';
import { Article, Graph, WebPage } from 'schema-dts';

const Project: NextPageWithLayout<ProjectProps> = ({
  project,
}: {
  project: ProjectData;
}) => {
  const intl = useIntl();
  const router = useRouter();
  const projectUrl = `${settings.url}${router.asPath}`;
  const { id, intro, meta, title, seo } = project;
  const dates = {
    publication: meta.publishedOn,
    update: meta.updatedOn,
  };

  const components: NestedMDXComponents = {
    Gallery: (props) => Gallery(props),
    Image: (props) => ResponsiveImage({ caption: props.caption, ...props }),
    Link: (props) => Link(props),
    pre: ({ children }) => CodeBlock(children.props),
  };

  const ProjectContent: ComponentType<MDXComponents> =
    require(`../../content/projects/${id}.mdx`).default;

  const webpageSchema: WebPage = {
    '@id': `${projectUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${settings.url}/#breadcrumb` },
    name: seo.title,
    description: seo.description,
    inLanguage: settings.locales.defaultLocale,
    reviewedBy: { '@id': `${settings.url}/#branding` },
    url: `${settings.url}`,
    isPartOf: {
      '@id': `${settings.url}`,
    },
  };

  const publicationDate = new Date(dates.publication);
  const updateDate = new Date(dates.update);

  const articleSchema: Article = {
    '@id': `${settings.url}/project`,
    '@type': 'Article',
    name: title,
    description: intro,
    author: { '@id': `${settings.url}/#branding` },
    copyrightYear: publicationDate.getFullYear(),
    creator: { '@id': `${settings.url}/#branding` },
    dateCreated: publicationDate.toISOString(),
    dateModified: updateDate.toISOString(),
    datePublished: publicationDate.toISOString(),
    editor: { '@id': `${settings.url}/#branding` },
    headline: title,
    thumbnailUrl: meta.hasCover ? `/projects/${id}.jpg` : '',
    image: meta.hasCover ? `/projects/${id}.jpg` : '',
    inLanguage: settings.locales.defaultLocale,
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
      </Head>
      <Script
        id="schema-project"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <article
        id="project"
        className={`${styles.article} ${styles['article--no-comments']}`}
      >
        <PostHeader title={title} intro={intro} meta={{ dates }} />
        <Sidebar
          position="left"
          ariaLabel={intl.formatMessage({
            defaultMessage: 'Table of Contents',
            description: 'ProjectPage: ToC sidebar aria-label',
          })}
        >
          <ToC />
        </Sidebar>
        <div className={styles.body}>
          <ProjectSummary id={id} title={title} meta={meta} />
          <ProjectContent components={components} />
        </div>
        <Sidebar
          position="right"
          ariaLabel={intl.formatMessage({
            defaultMessage: 'Sidebar',
            description: 'ProjectPage: right sidebar aria-label',
          })}
        >
          <Sharing title={title} excerpt={intro} />
        </Sidebar>
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
  const { locale } = context;
  const translation = await loadTranslation(locale);
  const { slug } = context.params as ProjectParams;
  const project = await getProjectData(slug);
  const breadcrumbTitle = project.title;

  return {
    props: {
      breadcrumbTitle,
      locale,
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
