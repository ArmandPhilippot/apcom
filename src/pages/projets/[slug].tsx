import { MDXComponents } from 'mdx/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ComponentType } from 'react';
import { useIntl } from 'react-intl';
import {
  Code,
  Gallery,
  getLayout,
  Link,
  Overview,
  type OverviewMeta,
  PageLayout,
  type PageLayoutProps,
  ResponsiveImage,
  type ResponsiveImageProps,
  Sharing,
  SocialLink,
  type SocialWebsite,
  Spinner,
} from '../../components';
import styles from '../../styles/pages/project.module.scss';
import {
  type NextPageWithLayout,
  type ProjectPreview,
  type Repos,
} from '../../types';
import {
  capitalize,
  getSchemaJson,
  getSinglePageSchema,
  getWebPageSchema,
} from '../../utils/helpers';
import {
  getProjectData,
  getProjectFilenames,
  loadTranslation,
  type Messages,
} from '../../utils/helpers/server';
import {
  type RepoData,
  useBreadcrumb,
  useGithubApi,
  useSettings,
} from '../../utils/hooks';

const BorderedImage = (props: ResponsiveImageProps) => {
  return <ResponsiveImage withBorders={true} {...props} />;
};

type ProjectPageProps = {
  project: ProjectPreview;
  translation: Messages;
};

/**
 * Project page.
 */
const ProjectPage: NextPageWithLayout<ProjectPageProps> = ({ project }) => {
  const { id, intro, meta, title } = project;
  const { cover, dates, license, repos, seo, technologies } = meta;
  const intl = useIntl();
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title,
    url: `/projets/${id}`,
  });

  const ProjectContent: ComponentType<MDXComponents> = dynamic(
    () => import(`../../content/projects/${id}.mdx`),
    {
      loading: () => <Spinner />,
    }
  );

  const components: MDXComponents = {
    Code,
    Gallery,
    Image: BorderedImage,
    Link,
  };

  const { website } = useSettings();
  const { asPath } = useRouter();
  const pageUrl = `${website.url}${asPath}`;

  const headerMeta: PageLayoutProps['headerMeta'] = {
    publication: { date: dates.publication },
    update:
      dates.update && dates.update !== dates.publication
        ? { date: dates.update }
        : undefined,
  };

  /**
   * Retrieve the repositories links.
   *
   * @param {Repos} repos - A repositories object.
   * @returns {JSX.Element[]} - An array of SocialLink.
   */
  const getReposLinks = (repositories: Repos): JSX.Element[] => {
    const links = [];

    for (const [name, url] of Object.entries(repositories)) {
      const socialWebsite = capitalize(name) as SocialWebsite;
      const socialUrl = `https://${name}.com/${url}`;

      links.push(<SocialLink name={socialWebsite} url={socialUrl} />);
    }

    return links;
  };

  const { isError, isLoading, data } = useGithubApi(meta.repos!.github!);

  const getGithubData = (key: keyof RepoData) => {
    if (isError) return 'Error';
    if (isLoading || !data) return <Spinner />;

    switch (key) {
      case 'created_at':
        return data.created_at;
      case 'updated_at':
        return data.updated_at;
      case 'stargazers_count':
        const stars = intl.formatMessage(
          {
            defaultMessage:
              '{starsCount, plural, =0 {No stars on Github} one {# star on Github} other {# stars on Github}}',
            id: 'Gnf1Si',
            description: 'Projets: Github stars count',
          },
          { starsCount: data.stargazers_count }
        );
        return (
          <>
            ⭐&nbsp;
            <Link href={`https://github.com/${repos!.github}/stargazers`}>
              {stars}
            </Link>
          </>
        );
    }
  };

  const overviewData: OverviewMeta = {
    creation: data && { date: getGithubData('created_at') as string },
    update: data && { date: getGithubData('updated_at') as string },
    license,
    popularity: data && getGithubData('stargazers_count'),
    repositories: repos ? getReposLinks(repos) : undefined,
    technologies,
  };

  const webpageSchema = getWebPageSchema({
    description: seo.description,
    locale: website.locales.default,
    slug: asPath,
    title: seo.title,
    updateDate: dates.update,
  });
  const articleSchema = getSinglePageSchema({
    cover: `/projects/${id}.jpg`,
    dates,
    description: intro,
    id: 'project',
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
        <meta property="og:url" content={`${pageUrl}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={intro} />
      </Head>
      <Script
        id="schema-project"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <PageLayout
        title={title}
        intro={intro}
        breadcrumb={breadcrumbItems}
        breadcrumbSchema={breadcrumbSchema}
        headerMeta={headerMeta}
        withToC={true}
        widgets={[
          <Sharing
            key="sharing-widget"
            data={{ excerpt: intro, title, url: pageUrl }}
            media={[
              'diaspora',
              'email',
              'facebook',
              'journal-du-hacker',
              'linkedin',
              'twitter',
            ]}
            className={styles.widget}
          />,
        ]}
      >
        <Overview cover={cover} meta={overviewData} />
        <ProjectContent components={components} />
      </PageLayout>
    </>
  );
};

ProjectPage.getLayout = (page) =>
  getLayout(page, { useGrid: true, withExtraPadding: true });

export const getStaticProps: GetStaticProps<ProjectPageProps> = async ({
  locale,
  params,
}) => {
  const translation = await loadTranslation(locale);
  const { slug } = params!;
  const project = await getProjectData(slug as string);

  return {
    props: {
      project,
      translation,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = getProjectFilenames();
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

export default ProjectPage;
