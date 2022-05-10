import Link from '@components/atoms/links/link';
import SocialLink, { SocialWebsite } from '@components/atoms/links/social-link';
import Spinner from '@components/atoms/loaders/spinner';
import ResponsiveImage from '@components/molecules/images/responsive-image';
import Code from '@components/molecules/layout/code';
import { BreadcrumbItem } from '@components/molecules/nav/breadcrumb';
import Gallery from '@components/organisms/images/gallery';
import Overview, { OverviewMeta } from '@components/organisms/layout/overview';
import Sharing from '@components/organisms/widgets/sharing';
import PageLayout, {
  PageLayoutProps,
} from '@components/templates/page/page-layout';
import { ProjectPreview, Repos } from '@ts/types/app';
import { loadTranslation, Messages } from '@utils/helpers/i18n';
import { getProjectData, getProjectFilenames } from '@utils/helpers/projects';
import { capitalize } from '@utils/helpers/strings';
import useGithubApi, { RepoData } from '@utils/hooks/use-github-api';
import useSettings from '@utils/hooks/use-settings';
import { MDXComponents, NestedMDXComponents } from 'mdx/types';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ComponentType } from 'react';
import { useIntl } from 'react-intl';
import { Article, Graph, WebPage } from 'schema-dts';

type ProjectPageProps = {
  project: ProjectPreview;
  translation: Messages;
};

/**
 * Project page.
 */
const ProjectPage: NextPage<ProjectPageProps> = ({ project }) => {
  const { id, intro, meta, title } = project;
  const { cover, dates, license, repos, seo, technologies } = meta;
  const intl = useIntl();
  const homeLabel = intl.formatMessage({
    defaultMessage: 'Home',
    description: 'Breadcrumb: home label',
    id: 'j5k9Fe',
  });
  const projectsLabel = intl.formatMessage({
    defaultMessage: 'Projects',
    description: 'Breadcrumb: projects label',
    id: '28GZdv',
  });
  const breadcrumb: BreadcrumbItem[] = [
    { id: 'home', name: homeLabel, url: '/' },
    { id: 'projects', name: projectsLabel, url: '/projets' },
    { id: 'project', name: title, url: `/projets/${id}` },
  ];

  const ProjectContent: ComponentType<MDXComponents> =
    require(`../../content/projects/${id}.mdx`).default;

  const components: NestedMDXComponents = {
    Code: (props) => <Code {...props} />,
    Gallery: (props) => <Gallery {...props} />,
    Image: (props) => <ResponsiveImage {...props} />,
    Link: (props) => <Link {...props} />,
    pre: ({ children }) => <Code {...children.props} />,
  };

  const { website } = useSettings();
  const { asPath } = useRouter();
  const pageUrl = `${website.url}${asPath}`;
  const pagePublicationDate = new Date(dates.publication);
  const pageUpdateDate = dates.update ? new Date(dates.update) : undefined;

  const headerMeta: PageLayoutProps['headerMeta'] = {
    publication: { date: dates.publication },
    update: dates.update ? { date: dates.update } : undefined,
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

  const webpageSchema: WebPage = {
    '@id': `${pageUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${website.url}/#breadcrumb` },
    name: seo.title,
    description: seo.description,
    inLanguage: website.locales.default,
    reviewedBy: { '@id': `${website.url}/#branding` },
    url: `${website.url}`,
    isPartOf: {
      '@id': `${website.url}`,
    },
  };

  const articleSchema: Article = {
    '@id': `${website.url}/project`,
    '@type': 'Article',
    name: title,
    description: intro,
    author: { '@id': `${website.url}/#branding` },
    copyrightYear: pagePublicationDate.getFullYear(),
    creator: { '@id': `${website.url}/#branding` },
    dateCreated: pagePublicationDate.toISOString(),
    dateModified: pageUpdateDate && pageUpdateDate.toISOString(),
    datePublished: pagePublicationDate.toISOString(),
    editor: { '@id': `${website.url}/#branding` },
    headline: title,
    thumbnailUrl: `/projects/${id}.jpg`,
    image: `/projects/${id}.jpg`,
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
        breadcrumb={breadcrumb}
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
          />,
        ]}
      >
        <Overview cover={cover} meta={overviewData} />
        <ProjectContent components={components} />
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
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
