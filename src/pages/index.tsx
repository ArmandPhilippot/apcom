import FeedIcon from '@assets/images/icon-feed.svg';
import ButtonLink from '@components/atoms/buttons/button-link';
import Envelop from '@components/atoms/icons/envelop';
import Column, { type ColumnProps } from '@components/atoms/layout/column';
import Section, { type SectionProps } from '@components/atoms/layout/section';
import List, { type ListItem } from '@components/atoms/lists/list';
import ResponsiveImage, {
  type ResponsiveImageProps,
} from '@components/molecules/images/responsive-image';
import Columns, {
  type ColumnsProps,
} from '@components/molecules/layout/columns';
import CardsList, {
  type CardsListItem,
} from '@components/organisms/layout/cards-list';
import { getLayout } from '@components/templates/layout/layout';
import HomePageContent from '@content/pages/homepage.mdx';
import { getArticlesCard } from '@services/graphql/articles';
import styles from '@styles/pages/home.module.scss';
import { type ArticleCard, type NextPageWithLayout } from '@ts/types/app';
import { loadTranslation, type Messages } from '@utils/helpers/i18n';
import useBreadcrumb from '@utils/hooks/use-breadcrumb';
import useSettings from '@utils/hooks/use-settings';
import { NestedMDXComponents } from 'mdx/types';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import { ReactElement } from 'react';
import { useIntl } from 'react-intl';
import { Graph, WebPage } from 'schema-dts';

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
   * Retrieve a list of coding links.
   *
   * @returns {JSX.Element} - A list of links.
   */
  const CodingLinks = (): JSX.Element => {
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
    const links: ListItem[] = [
      {
        id: 'contact-me',
        value: (
          <ButtonLink target="/contact">
            <Envelop className={styles.icon} />
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
            <FeedIcon className={`${styles.icon} ${styles['icon--feed']}`} />
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
   * @param {ReactElement[]} obj.children - The section body.
   * @returns {JSX.Element} A section element.
   */
  const getSection = ({
    children,
    variant,
  }: {
    children: ReactElement[];
    variant: SectionProps['variant'];
  }): JSX.Element => {
    const [headingEl, ...content] = children;
    const title = headingEl.props.children;

    return (
      <Section
        title={title}
        content={content}
        variant={variant}
        className={styles.section}
      />
    );
  };

  const components: NestedMDXComponents = {
    CodingLinks: CodingLinks,
    ColdarkRepos: ColdarkRepos,
    Column: (props: ColumnProps) => <Column {...props} />,
    Columns: (props: ColumnsProps) => (
      <Columns className={styles.columns} {...props} />
    ),
    Image: (props: ResponsiveImageProps) => <ResponsiveImage {...props} />,
    LibreLinks: LibreLinks,
    MoreLinks: MoreLinks,
    RecentPosts: getRecentPosts,
    Section: getSection,
    ShaarliLink: ShaarliLink,
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

  const webpageSchema: WebPage = {
    '@id': `${website.url}/#home`,
    '@type': 'WebPage',
    name: pageTitle,
    description: pageDescription,
    author: { '@id': `${website.url}/#branding` },
    creator: { '@id': `${website.url}/#branding` },
    editor: { '@id': `${website.url}/#branding` },
    inLanguage: website.locales.default,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    reviewedBy: { '@id': `${website.url}/#branding` },
    url: `${website.url}`,
  };

  const schemaJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageSchema],
  };

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
