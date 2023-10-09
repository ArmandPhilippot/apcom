import type { MDXComponents } from 'mdx/types';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import Script from 'next/script';
import type { FC, HTMLAttributes } from 'react';
import { useIntl } from 'react-intl';
import {
  ButtonLink,
  CardsList,
  type CardsListItem,
  Column,
  Columns,
  type ColumnsProps,
  getLayout,
  Icon,
  List,
  ListItem,
  Section,
  type SectionProps,
  Heading,
  Figure,
} from '../components';
import HomePageContent from '../content/pages/homepage.mdx';
import { getArticlesCard } from '../services/graphql';
import styles from '../styles/pages/home.module.scss';
import type { ArticleCard, NextPageWithLayout } from '../types';
import { PERSONAL_LINKS, ROUTES } from '../utils/constants';
import { getSchemaJson, getWebPageSchema } from '../utils/helpers';
import { loadTranslation, type Messages } from '../utils/helpers/server';
import { useBreadcrumb, useSettings } from '../utils/hooks';

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

const ResponsiveImage = (props: NextImageProps) => (
  <Figure>
    <NextImage {...props} />
  </Figure>
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
  const shaarliUrl = PERSONAL_LINKS.SHAARLI;

  return (
    <List className={styles.list} hideMarker isInline spacing="sm">
      <ListItem>
        <ButtonLink isExternal to={shaarliUrl}>
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

const StyledColumns = (props: ColumnsProps) => (
  <Columns className={styles.columns} {...props} />
);

/**
 * Create the page sections.
 *
 * @param {object} obj - An object containing the section body.
 * @param {ReactNode[]} obj.children - The section body.
 * @returns {JSX.Element} A section element.
 */
const HomePageSection: FC<SectionProps> = ({
  children,
  hasBorder = true,
  variant,
}) => (
  <Section className={styles.section} hasBorder={hasBorder} variant={variant}>
    {children}
  </Section>
);

type HomeProps = {
  recentPosts: ArticleCard[];
  translation?: Messages;
};

/**
 * Home page.
 */
const HomePage: NextPageWithLayout<HomeProps> = ({ recentPosts }) => {
  const intl = useIntl();
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
    const posts: CardsListItem[] = recentPosts.map((post) => {
      return {
        cover: post.cover,
        id: post.slug,
        meta: { publication: { date: post.dates.publication } },
        title: post.title,
        url: `${ROUTES.ARTICLE}/${post.slug}`,
      };
    });
    const listClass = `${styles.list} ${styles['list--cards']}`;

    return <CardsList className={listClass} items={posts} titleLevel={3} />;
  };

  const components: MDXComponents = {
    CodingLinks,
    ColdarkRepos,
    Column,
    Columns: StyledColumns,
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    Image: ResponsiveImage,
    LibreLinks,
    MoreLinks,
    RecentPosts: getRecentPosts,
    Section: HomePageSection,
    ShaarliLink,
  };

  const { website } = useSettings();

  const pageTitle = intl.formatMessage(
    {
      defaultMessage: '{websiteName} | Front-end developer: WordPress/React',
      description: 'HomePage: SEO - Page title',
      id: 'PXp2hv',
    },
    { websiteName: website.name }
  );
  const pageDescription = intl.formatMessage(
    {
      defaultMessage:
        '{websiteName} is a front-end developer located in France. He codes and he writes mostly about web development and open-source.',
      description: 'HomePage: SEO - Meta description',
      id: 'tMuNTy',
    },
    { websiteName: website.name }
  );
  const webpageSchema = getWebPageSchema({
    description: pageDescription,
    locale: website.locales.default,
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
        <meta property="og:url" content={website.url} />
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
      <HomePageContent components={components} />
    </>
  );
};

HomePage.getLayout = (page) =>
  getLayout(page, { isHome: true, withExtraPadding: false });

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const translation = await loadTranslation(locale);
  const recentPosts = await getArticlesCard({ first: 3 });

  return {
    props: {
      recentPosts,
      translation,
    },
  };
};

export default HomePage;
