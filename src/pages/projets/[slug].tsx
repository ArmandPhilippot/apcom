/* eslint-disable max-statements */
import type { MDXComponents } from 'mdx/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import { useRouter } from 'next/router';
import Script from 'next/script';
import type { ComponentType, HTMLAttributes, ReactNode } from 'react';
import { useIntl } from 'react-intl';
import {
  Code,
  getLayout,
  Link,
  PageLayout,
  Sharing,
  Spinner,
  Heading,
  List,
  ListItem,
  Figure,
  type MetaItemData,
  Time,
  Grid,
  ProjectOverview,
  type ProjectMeta,
  type Repository,
} from '../../components';
import styles from '../../styles/pages/project.module.scss';
import type { NextPageWithLayout, ProjectPreview, Repos } from '../../types';
import { ROUTES } from '../../utils/constants';
import {
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
import { useBreadcrumb, useGithubApi, useSettings } from '../../utils/hooks';

const BorderedImage = (props: NextImageProps) => (
  <Figure hasBorders>
    <NextImage {...props} />
  </Figure>
);

const H1 = ({
  children = '',
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <Heading {...props} level={1}>
    {children}
  </Heading>
);

const H2 = ({
  children = '',
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <Heading {...props} level={2}>
    {children}
  </Heading>
);

const H3 = ({
  children = '',
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <Heading {...props} level={3}>
    {children}
  </Heading>
);

const H4 = ({
  children = '',
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <Heading {...props} level={4}>
    {children}
  </Heading>
);

const H5 = ({
  children = '',
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <Heading {...props} level={5}>
    {children}
  </Heading>
);

const H6 = ({
  children = '',
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <Heading {...props} level={6}>
    {children}
  </Heading>
);

const OrderedList = ({
  children,
  ...props
}: HTMLAttributes<HTMLUListElement>) => (
  <List {...props} isOrdered spacing="2xs">
    {children}
  </List>
);

const UnorderedList = ({
  children,
  ...props
}: HTMLAttributes<HTMLUListElement>) => (
  <List {...props} spacing="2xs">
    {children}
  </List>
);

const Gallery = ({ children }: { children: ReactNode[] }) => (
  <Grid
    gap="sm"
    items={children.map((child, index) => {
      return { id: `${index}`, item: child };
    })}
    sizeMin="250px"
  />
);

const components: MDXComponents = {
  Code,
  Gallery,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  Image: BorderedImage,
  li: ({ ref, ...props }) => <ListItem {...props} />,
  Link,
  ol: OrderedList,
  ul: UnorderedList,
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
    url: `${ROUTES.PROJECTS}/${id}`,
  });

  const ProjectContent: ComponentType<MDXComponents> = dynamic(
    async () => import(`../../content/projects/${id}.mdx`),
    {
      loading: () => <Spinner />,
    }
  );

  const { website } = useSettings();
  const { asPath } = useRouter();
  const page = {
    title: `${seo.title} - ${website.name}`,
    url: `${website.url}${asPath}`,
  };

  const headerMeta: (MetaItemData | undefined)[] = [
    {
      id: 'publication-date',
      label: intl.formatMessage({
        defaultMessage: 'Published on:',
        description: 'ProjectsPage: publication date label',
        id: 'HxZvY4',
      }),
      value: <Time date={dates.publication} />,
    },
    dates.update && dates.update !== dates.publication
      ? {
          id: 'update-date',
          label: intl.formatMessage({
            defaultMessage: 'Updated on:',
            description: 'ProjectsPage: update date label',
            id: 'wQrvgw',
          }),
          value: <Time date={dates.update} />,
        }
      : undefined,
  ];
  const filteredHeaderMeta = headerMeta.filter(
    (item): item is MetaItemData => !!item
  );

  /**
   * Retrieve the project repositories.
   *
   * @param {Repos} repositories - A repositories object.
   * @returns {Repository[]} - An array of repositories.
   */
  const getRepos = (repositories: Repos): Repository[] => {
    const definedRepos: Repository[] = [];

    if (repositories.github)
      definedRepos.push({
        id: 'Github',
        label: intl.formatMessage({
          defaultMessage: 'Github profile',
          description: 'ProjectsPage: Github profile link',
          id: 'Nx8Jo5',
        }),
        url: repositories.github,
      });

    if (repositories.gitlab)
      definedRepos.push({
        id: 'Gitlab',
        label: intl.formatMessage({
          defaultMessage: 'Gitlab profile',
          description: 'ProjectsPage: Gitlab profile link',
          id: 'sECHDg',
        }),
        url: repositories.gitlab,
      });

    return definedRepos;
  };

  const loadingRepoPopularity = intl.formatMessage({
    defaultMessage: 'Loading the repository popularity...',
    description: 'ProjectsPage: loading repository popularity',
    id: 'RwI3B9',
  });

  const { isError, isLoading, data } = useGithubApi(
    /*
     * Repo should be defined for each project so for now it is safe for my
     * use-case. However, I should refactored it to handle cases where it is
     * not defined. The logic should be extracted in another component I think.
     *
     * TODO: fix this hardly readable argument
     */
    meta.repos ? meta.repos.github ?? '' : ''
  );

  if (isError) return 'Error';
  if (isLoading || !data) return <Spinner aria-label={loadingRepoPopularity} />;

  const overviewMeta: Partial<ProjectMeta> = {
    creationDate: data.created_at,
    lastUpdateDate: data.updated_at,
    license,
    popularity: repos?.github
      ? {
          count: data.stargazers_count,
          url: `https://github.com/${repos.github}/stargazers`,
        }
      : undefined,
    repositories: repos ? getRepos(repos) : undefined,
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
        <title>{page.title}</title>
        {/*eslint-disable-next-line react/jsx-no-literals -- Name allowed */}
        <meta name="description" content={seo.description} />
        <meta property="og:url" content={page.url} />
        {/*eslint-disable-next-line react/jsx-no-literals -- Content allowed */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={intro} />
      </Head>
      <Script
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-project"
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- Necessary for schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <PageLayout
        title={title}
        intro={intro}
        breadcrumb={breadcrumbItems}
        breadcrumbSchema={breadcrumbSchema}
        headerMeta={filteredHeaderMeta}
        withToC={true}
        widgets={[
          <Sharing
            // eslint-disable-next-line react/jsx-no-literals -- Key allowed
            key="sharing-widget"
            data={{ excerpt: intro, title, url: page.url }}
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
        <ProjectOverview
          cover={cover ? <NextImage {...cover} /> : undefined}
          meta={overviewMeta}
          name={project.title}
        />
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
  const project = await getProjectData(params ? (params.slug as string) : '');

  return {
    props: {
      project,
      translation,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
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
