import { MDXComponents } from 'mdx/types';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import { ReactNode, isValidElement } from 'react';
import { useIntl } from 'react-intl';
import FeedIcon from '../assets/images/icon-feed.svg';
import {
  ButtonLink,
  CardsList,
  type CardsListItem,
  Column,
  Columns,
  type ColumnsProps,
  Envelop,
  getLayout,
  List,
  type ListItem,
  ResponsiveImage,
  Section,
  type SectionProps,
} from '../components';
import HomePageContent from '../content/pages/homepage.mdx';
import { getArticlesCard } from '../services/graphql';
import styles from '../styles/pages/home.module.scss';
import { type ArticleCard, type NextPageWithLayout } from '../types';
import { getSchemaJson, getWebPageSchema } from '../utils/helpers';
import { loadTranslation, type Messages } from '../utils/helpers/server';
import { useBreadcrumb, useSettings } from '../utils/hooks';

/**
 * Retrieve a list of coding links.
 *
 * @returns {JSX.Element} - A list of links.
 */
const CodingLinks = (): JSX.Element => {
  const intl = useIntl();
  const links: ListItem[] = [
    {
      id: 'web-development',
      value: (
        <ButtonLink target="/thematique/developpement-web">
          {intl.formatMessage({
            defaultMessage: 'Web development',
            description: 'HomePage: link to web development thematic',
            id: 'vkF/RP',
          })}
        </ButtonLink>
      ),
    },
    {
      id: 'projects',
      value: (
        <ButtonLink target="/projets">
          {intl.formatMessage({
            defaultMessage: 'Projects',
            description: 'HomePage: link to projects',
            id: 'N44SOc',
          })}
        </ButtonLink>
      ),
    },
  ];

  return <List kind="flex" items={links} className={styles.list} />;
};

/**
 * Retrieve a list of Coldark repositories.
 *
 * @returns {JSX.Element} - A list of links.
 */
const ColdarkRepos = (): JSX.Element => {
  const intl = useIntl();
  const links: ListItem[] = [
    {
      id: 'coldark-github',
      value: (
        <ButtonLink
          target="https://github.com/ArmandPhilippot/coldark"
          external={true}
        >
          {intl.formatMessage({
            defaultMessage: 'Github',
            description: 'HomePage: Github link',
            id: '3f3PzH',
          })}
        </ButtonLink>
      ),
    },
    {
      id: 'coldark-gitlab',
      value: (
        <ButtonLink
          target="https://gitlab.com/ArmandPhilippot/coldark"
          external={true}
        >
          {intl.formatMessage({
            defaultMessage: 'Gitlab',
            description: 'HomePage: Gitlab link',
            id: '7AnwZ7',
          })}
        </ButtonLink>
      ),
    },
  ];

  return <List kind="flex" items={links} className={styles.list} />;
};

/**
 * Retrieve a list of links related to Free thematic.
 *
 * @returns {JSX.Element} - A list of links.
 */
const LibreLinks = (): JSX.Element => {
  const intl = useIntl();
  const links: ListItem[] = [
    {
      id: 'free',
      value: (
        <ButtonLink target="/thematique/libre">
          {intl.formatMessage({
            defaultMessage: 'Free',
            description: 'HomePage: link to free thematic',
            id: 'w8GrOf',
          })}
        </ButtonLink>
      ),
    },
    {
      id: 'linux',
      value: (
        <ButtonLink target="/thematique/linux">
          {intl.formatMessage({
            defaultMessage: 'Linux',
            description: 'HomePage: link to Linux thematic',
            id: 'jASD7k',
          })}
        </ButtonLink>
      ),
    },
  ];

  return <List kind="flex" items={links} className={styles.list} />;
};

/**
 * Retrieve the Shaarli link.
 *
 * @returns {JSX.Element} - A list of links
 */
const ShaarliLink = (): JSX.Element => {
  const intl = useIntl();
  const links: ListItem[] = [
    {
      id: 'shaarli',
      value: (
        <ButtonLink target="https://shaarli.armandphilippot.com/">
          {intl.formatMessage({
            defaultMessage: 'Shaarli',
            description: 'HomePage: link to Shaarli',
            id: 'i5L19t',
          })}
        </ButtonLink>
      ),
    },
  ];

  return <List kind="flex" items={links} className={styles.list} />;
};

/**
 * Retrieve the additional links.
 *
 * @returns {JSX.Element} - A list of links.
 */
const MoreLinks = (): JSX.Element => {
  const intl = useIntl();
  const links: ListItem[] = [
    {
      id: 'contact-me',
      value: (
        <ButtonLink target="/contact">
          <Envelop aria-hidden={true} className={styles.icon} />
          {intl.formatMessage({
            defaultMessage: 'Contact me',
            description: 'HomePage: contact button text',
            id: 'sO/Iwj',
          })}
        </ButtonLink>
      ),
    },
    {
      id: 'rss-feed',
      value: (
        <ButtonLink target="/feed">
          <FeedIcon
            aria-hidden={true}
            className={`${styles.icon} ${styles['icon--feed']}`}
          />
          {intl.formatMessage({
            defaultMessage: 'Subscribe',
            description: 'HomePage: RSS feed subscription text',
            id: 'T4YA64',
          })}
        </ButtonLink>
      ),
    },
  ];

  return <List kind="flex" items={links} className={styles.list} />;
};

const StyledColumns = (props: ColumnsProps) => {
  return <Columns className={styles.columns} {...props} />;
};

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
        url: `/article/${post.slug}`,
      };
    });

    return (
      <CardsList
        items={posts}
        titleLevel={3}
        className={`${styles.list} ${styles['list--cards']}`}
      />
    );
  };

  /**
   * Create the page sections.
   *
   * @param {object} obj - An object containing the section body.
   * @param {ReactNode[]} obj.children - The section body.
   * @returns {JSX.Element} A section element.
   */
  const getSection = ({
    children,
    variant,
  }: {
    children: ReactNode[];
    variant: SectionProps['variant'];
  }): JSX.Element => {
    const [headingEl, ...content] = children;

    return (
      <Section
        className={styles.section}
        content={content}
        title={isValidElement(headingEl) ? headingEl.props.children : ''}
        variant={variant}
      />
    );
  };

  const components: MDXComponents = {
    CodingLinks,
    ColdarkRepos,
    Column,
    Columns: StyledColumns,
    Image: ResponsiveImage,
    LibreLinks,
    MoreLinks,
    RecentPosts: getRecentPosts,
    Section: getSection,
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
        <meta name="description" content={pageDescription} />
        <meta property="og:url" content={website.url} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Head>
      <Script
        id="schema-homepage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <Script
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
