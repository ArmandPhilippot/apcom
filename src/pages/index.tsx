import type { MDXComponents } from 'mdx/types';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import NextImage from 'next/image';
import Script from 'next/script';
import type { FC, HTMLAttributes, ReactNode } from 'react';
import { useIntl } from 'react-intl';
import {
  ButtonLink,
  Card,
  CardCover,
  CardFooter,
  CardHeader,
  CardMeta,
  CardTitle,
  getLayout,
  Grid,
  Icon,
  List,
  ListItem,
  Time,
  MetaItem,
  type PageSectionProps,
  PageSection,
  Page,
} from '../components';
import { mdxComponents } from '../components/mdx';
import HomePageContent from '../content/pages/homepage.mdx';
import {
  convertRecentPostToRecentArticle,
  fetchRecentPosts,
} from '../services/graphql';
import styles from '../styles/pages/home.module.scss';
import type { NextPageWithLayout, RecentArticle } from '../types';
import { CONFIG } from '../utils/config';
import { PERSONAL_LINKS, ROUTES } from '../utils/constants';
import { getSchemaJson, getWebPageSchema } from '../utils/helpers';
import { loadTranslation, type Messages } from '../utils/helpers/server';
import { useBreadcrumb } from '../utils/hooks';

/**
 * Column component.
 *
 * Render the body as a column.
 */
const Column = ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div {...props}>{children}</div>
);

/**
 * Retrieve a list of coding links.
 *
 * @returns {JSX.Element} - A list of links.
 */
const CodingLinks: FC = () => {
  const intl = useIntl();

  return (
    <List className={styles.list} hideMarker isInline spacing="sm">
      <ListItem>
        <ButtonLink to={ROUTES.THEMATICS.WEB_DEV}>
          {intl.formatMessage({
            defaultMessage: 'Web development',
            description: 'HomePage: link to web development thematic',
            id: 'vkF/RP',
          })}
        </ButtonLink>
      </ListItem>
      <ListItem>
        <ButtonLink to={ROUTES.PROJECTS}>
          {intl.formatMessage({
            defaultMessage: 'Projects',
            description: 'HomePage: link to projects',
            id: 'N44SOc',
          })}
        </ButtonLink>
      </ListItem>
    </List>
  );
};

/**
 * Retrieve a list of Coldark repositories.
 *
 * @returns {JSX.Element} - A list of links.
 */
const ColdarkRepos: FC = () => {
  const intl = useIntl();
  const repo = {
    github: 'https://github.com/ArmandPhilippot/coldark',
    gitlab: 'https://gitlab.com/ArmandPhilippot/coldark',
  };

  return (
    <List className={styles.list} hideMarker isInline spacing="sm">
      <ListItem>
        <ButtonLink isExternal to={repo.github}>
          {intl.formatMessage({
            defaultMessage: 'Github',
            description: 'HomePage: Github link',
            id: '3f3PzH',
          })}
        </ButtonLink>
      </ListItem>
      <ListItem>
        <ButtonLink isExternal to={repo.gitlab}>
          {intl.formatMessage({
            defaultMessage: 'Gitlab',
            description: 'HomePage: Gitlab link',
            id: '7AnwZ7',
          })}
        </ButtonLink>
      </ListItem>
    </List>
  );
};

/**
 * Retrieve a list of links related to Free thematic.
 *
 * @returns {JSX.Element} - A list of links.
 */
const LibreLinks: FC = () => {
  const intl = useIntl();

  return (
    <List className={styles.list} hideMarker isInline spacing="sm">
      <ListItem>
        <ButtonLink to={ROUTES.THEMATICS.FREE}>
          {intl.formatMessage({
            defaultMessage: 'Free',
            description: 'HomePage: link to free thematic',
            id: 'w8GrOf',
          })}
        </ButtonLink>
      </ListItem>
      <ListItem>
        <ButtonLink to={ROUTES.THEMATICS.LINUX}>
          {intl.formatMessage({
            defaultMessage: 'Linux',
            description: 'HomePage: link to Linux thematic',
            id: 'jASD7k',
          })}
        </ButtonLink>
      </ListItem>
    </List>
  );
};

/**
 * Retrieve the Shaarli link.
 *
 * @returns {JSX.Element} - A list of links
 */
const ShaarliLink: FC = () => {
  const intl = useIntl();

  return (
    <List className={styles.list} hideMarker isInline spacing="sm">
      <ListItem>
        <ButtonLink isExternal to={PERSONAL_LINKS.SHAARLI}>
          {intl.formatMessage({
            defaultMessage: 'Shaarli',
            description: 'HomePage: link to Shaarli',
            id: 'i5L19t',
          })}
        </ButtonLink>
      </ListItem>
    </List>
  );
};

/**
 * Retrieve the additional links.
 *
 * @returns {JSX.Element} - A list of links.
 */
const MoreLinks: FC = () => {
  const intl = useIntl();

  return (
    <List className={styles.list} hideMarker isInline spacing="sm">
      <ListItem>
        <ButtonLink to={ROUTES.CONTACT}>
          <Icon aria-hidden={true} shape="envelop" />
          {intl.formatMessage({
            defaultMessage: 'Contact me',
            description: 'HomePage: contact button text',
            id: 'sO/Iwj',
          })}
        </ButtonLink>
      </ListItem>
      <ListItem>
        <ButtonLink to={ROUTES.RSS}>
          <Icon aria-hidden={true} shape="feed" />
          {intl.formatMessage({
            defaultMessage: 'Subscribe',
            description: 'HomePage: RSS feed subscription text',
            id: 'T4YA64',
          })}
        </ButtonLink>
      </ListItem>
    </List>
  );
};

const StyledGrid = ({ children }: { children: ReactNode }) => (
  <Grid className={styles.columns} gap="sm" sizeMin="250px">
    {children}
  </Grid>
);

/**
 * Create the page sections.
 *
 * @param {object} obj - An object containing the section body.
 * @param {ReactNode[]} obj.children - The section body.
 * @returns {JSX.Element} A section element.
 */
const HomePageSection: FC<PageSectionProps> = ({
  children,
  hasBorder = true,
  variant,
}) => (
  <PageSection
    className={styles.section}
    hasBorder={hasBorder}
    variant={variant}
  >
    {children}
  </PageSection>
);

type HomeProps = {
  recentPosts: RecentArticle[];
  translation?: Messages;
};

/**
 * Home page.
 */
const HomePage: NextPageWithLayout<HomeProps> = ({ recentPosts }) => {
  const intl = useIntl();
  const publicationDate = intl.formatMessage({
    defaultMessage: 'Published on:',
    description: 'HomePage: publication date label',
    id: 'pT5nHk',
  });
  const { schema: breadcrumbSchema } = useBreadcrumb({
    title: '',
    url: `/`,
  });

  /**
   * Get a cards list of recent posts.
   *
   * @returns {JSX.Element} - The cards list.
   */
  const getRecentPosts = (): JSX.Element => {
    const listClass = `${styles.list} ${styles['list--cards']}`;

    return (
      <Grid className={listClass} gap="sm" isCentered sizeMax="25ch">
        {recentPosts.map((post) => (
          <Card
            cover={
              post.cover ? (
                <CardCover hasBorders>
                  <NextImage
                    {...post.cover}
                    style={{ objectFit: 'scale-down' }}
                  />
                </CardCover>
              ) : undefined
            }
            key={post.id}
            meta={
              <CardMeta isCentered>
                <MetaItem
                  hasBorderedValues
                  isCentered
                  label={publicationDate}
                  value={<Time date={post.publicationDate} />}
                />
              </CardMeta>
            }
            isCentered
            linkTo={`${ROUTES.ARTICLE}/${post.slug}`}
          >
            <CardHeader>
              <CardTitle level={3}>{post.title}</CardTitle>
            </CardHeader>
            <CardFooter />
          </Card>
        ))}
      </Grid>
    );
  };

  const components: MDXComponents = {
    ...mdxComponents,
    CodingLinks,
    ColdarkRepos,
    Column,
    Grid: StyledGrid,
    LibreLinks,
    MoreLinks,
    RecentPosts: getRecentPosts,
    Section: HomePageSection,
    ShaarliLink,
  };

  const pageTitle = intl.formatMessage(
    {
      defaultMessage: '{websiteName} | Front-end developer: WordPress/React',
      description: 'HomePage: SEO - Page title',
      id: 'PXp2hv',
    },
    { websiteName: CONFIG.name }
  );
  const pageDescription = intl.formatMessage(
    {
      defaultMessage:
        '{websiteName} is a front-end developer located in France. He codes and he writes mostly about web development and open-source.',
      description: 'HomePage: SEO - Meta description',
      id: 'tMuNTy',
    },
    { websiteName: CONFIG.name }
  );
  const webpageSchema = getWebPageSchema({
    description: pageDescription,
    locale: CONFIG.locales.defaultLocale,
    slug: '',
    title: pageTitle,
  });
  const schemaJsonLd = getSchemaJson([webpageSchema]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {/*eslint-disable-next-line react/jsx-no-literals -- Name allowed */}
        <meta name="description" content={pageDescription} />
        <meta property="og:url" content={CONFIG.url} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Head>
      <Script
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-homepage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <Script
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Page hasSections>
        <HomePageContent components={components} />
      </Page>
    </>
  );
};

HomePage.getLayout = (page) => getLayout(page, { isHome: true });

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const translation = await loadTranslation(locale);
  const recentPosts = await fetchRecentPosts({ first: 3 });

  return {
    props: {
      recentPosts: recentPosts.edges.map((edge) =>
        convertRecentPostToRecentArticle(edge.node)
      ),
      translation,
    },
  };
};

export default HomePage;
