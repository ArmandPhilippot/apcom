/* eslint-disable max-statements */
import type { MDXComponents } from 'mdx/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import NextImage from 'next/image';
import Script from 'next/script';
import { useMemo, type ComponentType, type FC } from 'react';
import { useIntl } from 'react-intl';
import {
  Heading,
  Link,
  LoadingPage,
  type MetaValues,
  Page,
  PageBody,
  PageHeader,
  PageSidebar,
  ProjectOverview,
  SharingWidget,
  SocialLink,
  Spinner,
  Time,
  TocWidget,
  getLayout,
  type ProjectOverviewProps,
} from '../../components';
import { mdxComponents } from '../../components/mdx';
import { fetchGithubRepoMeta } from '../../services/github';
import styles from '../../styles/pages/projects.module.scss';
import type {
  GithubRepositoryMeta,
  Maybe,
  NextPageWithLayout,
  Project,
  ProjectMeta,
} from '../../types';
import { CONFIG } from '../../utils/config';
import {
  capitalize,
  getSchemaJson,
  getSinglePageSchema,
  getWebPageSchema,
} from '../../utils/helpers';
import {
  type Messages,
  getProjectData,
  getProjectFilenames,
  loadTranslation,
} from '../../utils/helpers/server';
import {
  useBreadcrumbs,
  useGithubRepoMeta,
  useHeadingsTree,
} from '../../utils/hooks';

const getGithubRepoInputFrom = (namespace: string) => {
  const parts = namespace.split('/');

  if (parts.length !== 2)
    throw new Error(
      'Invalid repo. It should use the following format: owner/name.'
    );

  return { owner: parts[0], name: parts[1] };
};

const isValidRepo = (name: string): name is 'github' | 'gitlab' =>
  ['github', 'gitlab'].includes(name);

type GithubRepoOverviewProps = Omit<
  ProjectOverviewProps,
  'cover' | 'meta' | 'name'
> &
  Pick<ProjectMeta, 'cover' | 'license' | 'technologies'> & {
    repos: {
      github: string;
      gitlab?: string;
    };
    title: string;
  };

const GithubRepoOverview: FC<GithubRepoOverviewProps> = ({
  cover,
  license,
  repos,
  technologies,
  title,
  ...props
}) => {
  const intl = useIntl();
  const { isLoading, meta: repoMeta } = useGithubRepoMeta(
    getGithubRepoInputFrom(repos.github)
  );
  const reposLabels = {
    github: intl.formatMessage({
      defaultMessage: 'Github',
      description: 'ProjectPage: Github repo label',
      id: 'l82UU5',
    }),
    gitlab: intl.formatMessage({
      defaultMessage: 'Gitlab',
      description: 'ProjectPage: Gitlab repo label',
      id: '1msHuZ',
    }),
  };
  const stars = intl.formatMessage(
    {
      defaultMessage:
        '{starsCount, plural, =0 {No stars} one {# star} other {# stars}}',
      description: 'ProjectPage: stars count',
      id: '4M71hp',
    },
    { starsCount: repoMeta?.stargazerCount }
  );
  const popularityURL = `https://github.com/${repos.github}/stargazers`;

  return isLoading ? (
    <Spinner>
      {intl.formatMessage({
        defaultMessage: 'Loading the repository metadata...',
        description: 'ProjectPage: loading repository metadata',
        id: 'EET/tC',
      })}
    </Spinner>
  ) : (
    <ProjectOverview
      {...props}
      cover={cover ? <NextImage {...cover} /> : undefined}
      meta={{
        creationDate: repoMeta?.createdAt ? (
          <Time date={repoMeta.createdAt} />
        ) : undefined,
        lastUpdateDate: repoMeta?.updatedAt ? (
          <Time date={repoMeta.updatedAt} />
        ) : undefined,
        license,
        popularity: (
          <>
            ⭐&nbsp;<Link href={popularityURL}>{stars}</Link>
          </>
        ),
        repositories: Object.entries(repos)
          .map(([key, value]): Maybe<MetaValues> => {
            if (!isValidRepo(key)) return undefined;

            return {
              id: key,
              value: (
                <SocialLink
                  icon={capitalize(key)}
                  key={key}
                  label={reposLabels[key]}
                  url={value}
                />
              ),
            };
          })
          .filter((entry): entry is MetaValues => !!entry),
        technologies: technologies?.map((techno) => {
          return {
            id: techno,
            value: techno,
          };
        }),
      }}
      name={title}
    />
  );
};

type ProjectPageProps = {
  data: {
    githubMeta: Maybe<GithubRepositoryMeta>;
    project: Project;
  };
  translation: Messages;
};

/**
 * Project page.
 */
const ProjectPage: NextPageWithLayout<ProjectPageProps> = ({ data }) => {
  const { id, intro, meta, slug, title } = data.project;
  const intl = useIntl();
  const { items: breadcrumbItems, schema: breadcrumbSchema } =
    useBreadcrumbs(title);
  const { ref, tree } = useHeadingsTree<HTMLDivElement>({ fromLevel: 2 });

  const page = {
    title: `${meta.seo.title} - ${CONFIG.name}`,
    url: `${CONFIG.url}${slug}`,
  };

  const webpageSchema = getWebPageSchema({
    description: meta.seo.description,
    locale: CONFIG.locales.defaultLocale,
    slug,
    title: meta.seo.title,
    updateDate: meta.dates.update,
  });
  const articleSchema = getSinglePageSchema({
    cover: `/projects/${id}.jpg`,
    dates: meta.dates,
    description: intro,
    id: 'project',
    kind: 'page',
    locale: CONFIG.locales.defaultLocale,
    slug,
    title,
  });
  const schemaJsonLd = getSchemaJson([
    webpageSchema,
    articleSchema,
    breadcrumbSchema,
  ]);

  const messages = {
    repos: {
      gitlab: intl.formatMessage({
        defaultMessage: 'Gitlab',
        description: 'ProjectPage: Gitlab repo label',
        id: '1msHuZ',
      }),
    },
    widgets: {
      sharingTitle: intl.formatMessage({
        defaultMessage: 'Share',
        id: 'JnalJp',
        description: 'ProjectPage: sharing widget title',
      }),
      tocTitle: intl.formatMessage({
        defaultMessage: 'Table of Contents',
        description: 'PageLayout: table of contents title',
        id: 'eys2uX',
      }),
    },
  };

  const ProjectContent: ComponentType<MDXComponents> = useMemo(
    () =>
      dynamic(async () => import(`../../content/projects/${id}.mdx`), {
        loading: () => <LoadingPage />,
      }),
    [id]
  );

  return (
    <Page breadcrumbs={breadcrumbItems} isBodyLastChild>
      <Head>
        <title>{page.title}</title>
        {/*eslint-disable-next-line react/jsx-no-literals -- Name allowed */}
        <meta name="description" content={meta.seo.description} />
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
      <PageHeader
        heading={title}
        intro={intro}
        meta={{
          publicationDate: meta.dates.publication,
          updateDate: meta.dates.update,
        }}
      />
      <PageSidebar>
        <TocWidget
          heading={<Heading level={2}>{messages.widgets.tocTitle}</Heading>}
          tree={tree}
        />
      </PageSidebar>
      <PageBody ref={ref}>
        {meta.repos.github ? (
          <GithubRepoOverview
            className={styles.overview}
            cover={meta.cover}
            license={meta.license}
            repos={{ github: meta.repos.github, gitlab: meta.repos.gitlab }}
            technologies={meta.technologies}
            title={title}
          />
        ) : (
          <ProjectOverview
            className={styles.overview}
            cover={meta.cover ? <NextImage {...meta.cover} /> : undefined}
            meta={{
              license: meta.license,
              repositories: meta.repos.gitlab ? (
                <SocialLink
                  // eslint-disable-next-line react/jsx-no-literals
                  icon="Gitlab"
                  label={messages.repos.gitlab}
                  url={meta.repos.gitlab}
                />
              ) : undefined,
              technologies: meta.technologies?.map((techno) => {
                return {
                  id: techno,
                  value: techno,
                };
              }),
            }}
            name={title}
          />
        )}
        <ProjectContent components={mdxComponents} />
      </PageBody>
      <PageSidebar>
        <SharingWidget
          className={styles['sharing-widget']}
          data={{ excerpt: intro, title, url: page.url }}
          heading={<Heading level={2}>{messages.widgets.sharingTitle}</Heading>}
          media={[
            'diaspora',
            'email',
            'facebook',
            'journal-du-hacker',
            'linkedin',
            'twitter',
          ]}
        />
      </PageSidebar>
    </Page>
  );
};

ProjectPage.getLayout = (page) => getLayout(page);

export const getStaticProps: GetStaticProps<ProjectPageProps> = async ({
  locale,
  params,
}) => {
  const translation = await loadTranslation(locale);
  const project = await getProjectData(params ? (params.slug as string) : '');
  const githubMeta = project.meta.repos.github
    ? await fetchGithubRepoMeta(
        getGithubRepoInputFrom(project.meta.repos.github)
      )
    : undefined;

  return {
    props: {
      data: {
        githubMeta,
        project,
      },
      translation,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = await getProjectFilenames();
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
