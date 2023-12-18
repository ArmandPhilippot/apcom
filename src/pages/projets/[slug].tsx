/* eslint-disable max-statements */
import type { MDXComponents } from 'mdx/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import NextImage from 'next/image';
import { useMemo, type ComponentType, useCallback } from 'react';
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
  getLayout,
  type OverviewMeta,
} from '../../components';
import { mdxComponents } from '../../components/mdx';
import { fetchGithubRepoMeta } from '../../services/github';
import styles from '../../styles/pages/projects.module.scss';
import type {
  GithubRepositoryMeta,
  Maybe,
  NextPageWithLayout,
  Project,
} from '../../types';
import { CONFIG } from '../../utils/config';
import {
  capitalize,
  getSchemaFrom,
  getWebPageGraph,
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

const Toc = dynamic(
  async () => import('../../components').then((mod) => mod.TocWidget),
  {
    ssr: false,
  }
);

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
  const { isLoading: isGithubMetaLoading, meta: githubMeta } =
    useGithubRepoMeta(
      meta.repos.github ? getGithubRepoInputFrom(meta.repos.github) : null,
      data.githubMeta
    );

  const page = {
    title: `${meta.seo.title} - ${CONFIG.name}`,
    url: `${CONFIG.url}${slug}`,
  };

  const jsonLd = getSchemaFrom([
    getWebPageGraph({
      breadcrumb: breadcrumbSchema,
      copyrightYear: new Date(meta.dates.publication).getFullYear(),
      cover: `/projects/${id}.jpg`,
      dates: meta.dates,
      description: intro,
      slug,
      title,
    }),
  ]);

  const messages = {
    repos: {
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

  const getAdditionalMeta = useCallback(
    (
      repo: string,
      repoMeta: Maybe<GithubRepositoryMeta>
    ): Partial<OverviewMeta> => {
      const loading = {
        creationDate: intl.formatMessage({
          defaultMessage: 'Loading the repository creation date...',
          description: 'ProjectPage: loading repository metadata',
          id: 'OzVOKP',
        }),
        popularity: intl.formatMessage({
          defaultMessage: 'Loading the repository popularity...',
          description: 'ProjectPage: loading repository metadata',
          id: 'RfXzNe',
        }),
        updateDate: intl.formatMessage({
          defaultMessage: 'Loading the repository update date...',
          description: 'ProjectPage: loading repository metadata',
          id: 'VEHEEs',
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
      const popularityURL = `https://github.com/${repo}/stargazers`;

      return {
        creationDate:
          isGithubMetaLoading || !repoMeta ? (
            <Spinner aria-label={loading.creationDate} />
          ) : (
            <Time date={repoMeta.createdAt} />
          ),
        lastUpdateDate:
          isGithubMetaLoading || !repoMeta ? (
            <Spinner aria-label={loading.updateDate} />
          ) : (
            <Time date={repoMeta.updatedAt} />
          ),
        popularity:
          isGithubMetaLoading || !repoMeta ? (
            <Spinner aria-label={loading.popularity} />
          ) : (
            <>
              ⭐&nbsp;<Link href={popularityURL}>{stars}</Link>
            </>
          ),
      };
    },
    [intl, isGithubMetaLoading]
  );

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
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      </Head>
      <PageHeader
        heading={title}
        intro={intro}
        meta={{
          publicationDate: meta.dates.publication,
          updateDate: meta.dates.update,
        }}
      />
      <PageSidebar>
        <Toc
          heading={<Heading level={2}>{messages.widgets.tocTitle}</Heading>}
          tree={tree}
        />
      </PageSidebar>
      <PageBody ref={ref}>
        <ProjectOverview
          className={styles.overview}
          cover={meta.cover ? <NextImage {...meta.cover} /> : undefined}
          meta={{
            ...(githubMeta === null || !meta.repos.github
              ? {}
              : getAdditionalMeta(meta.repos.github, githubMeta)),
            license: meta.license,
            repositories: Object.entries(meta.repos)
              .map(([key, value]): Maybe<MetaValues> => {
                if (!isValidRepo(key)) return undefined;

                return {
                  id: key,
                  value: (
                    <SocialLink
                      icon={capitalize(key)}
                      key={key}
                      label={messages.repos[key]}
                      url={value}
                    />
                  ),
                };
              })
              .filter((entry): entry is MetaValues => !!entry),
            technologies: meta.technologies?.map((techno) => {
              return {
                id: techno,
                value: techno,
              };
            }),
          }}
          name={title}
        />
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
