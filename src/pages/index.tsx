import FeedIcon from '@assets/images/icon-feed.svg';
import { ButtonLink } from '@components/Buttons';
import { ContactIcon } from '@components/Icons';
import Layout from '@components/Layouts/Layout';
import { RecentPosts } from '@components/Widgets';
import HomePageContent from '@content/pages/homepage.mdx';
import { getPublishedPosts } from '@services/graphql/queries';
import styles from '@styles/pages/Home.module.scss';
import { NextPageWithLayout } from '@ts/types/app';
import { PostsList } from '@ts/types/blog';
import { settings } from '@utils/config';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import type { ReactElement } from 'react';
import { useIntl } from 'react-intl';
import { Graph, WebPage } from 'schema-dts';

type HomePageProps = {
  recentPosts: PostsList;
};

const Home: NextPageWithLayout<HomePageProps> = ({
  recentPosts,
}: {
  recentPosts: PostsList;
}) => {
  const intl = useIntl();

  const CodingLinks = () => {
    return (
      <ul className={styles['links-list']}>
        <li>
          <ButtonLink target="/thematique/developpement-web">
            {intl.formatMessage({
              defaultMessage: 'Web development',
              description: 'HomePage: link to web development thematic',
            })}
          </ButtonLink>
        </li>
        <li>
          <ButtonLink target="/projets">
            {intl.formatMessage({
              defaultMessage: 'Projects',
              description: 'HomePage: link to projects',
            })}
          </ButtonLink>
        </li>
      </ul>
    );
  };

  const ColdarkRepos = () => {
    return (
      <ul className={styles['links-list']}>
        <li>
          <ButtonLink
            target="https://github.com/ArmandPhilippot/coldark"
            isExternal={true}
          >
            Github
          </ButtonLink>
        </li>
        <li>
          <ButtonLink
            target="https://gitlab.com/ArmandPhilippot/coldark"
            isExternal={true}
          >
            Gitlab
          </ButtonLink>
        </li>
      </ul>
    );
  };

  const LibreLinks = () => {
    return (
      <ul className={styles['links-list']}>
        <li>
          <ButtonLink target="/thematique/libre">
            {intl.formatMessage({
              defaultMessage: 'Free',
              description: 'HomePage: link to free thematic',
            })}
          </ButtonLink>
        </li>
        <li>
          <ButtonLink target="/thematique/linux">
            {intl.formatMessage({
              defaultMessage: 'Linux',
              description: 'HomePage: link to Linux thematic',
            })}
          </ButtonLink>
        </li>
      </ul>
    );
  };

  const MoreLinks = () => {
    return (
      <ul className={styles['links-list']}>
        <li>
          <ButtonLink target="/contact">
            <ContactIcon />
            {intl.formatMessage({
              defaultMessage: 'Contact me',
              description: 'HomePage: contact button text',
            })}
          </ButtonLink>
        </li>
        <li>
          <ButtonLink target="/feed">
            <FeedIcon className={styles['icon--feed']} />
            {intl.formatMessage({
              defaultMessage: 'Subscribe',
              description: 'HomePage: RSS feed subscription text',
            })}
          </ButtonLink>
        </li>
      </ul>
    );
  };

  const getRecentPosts = () => {
    return <RecentPosts posts={recentPosts} />;
  };

  const components = {
    CodingLinks: CodingLinks,
    ColdarkRepos: ColdarkRepos,
    LibreLinks: LibreLinks,
    MoreLinks: MoreLinks,
    RecentPosts: getRecentPosts,
  };

  const pageTitle = intl.formatMessage(
    {
      defaultMessage: '{websiteName} | Front-end developer: WordPress/React',
      description: 'HomePage: SEO - Page title',
    },
    { websiteName: settings.name }
  );
  const pageDescription = intl.formatMessage(
    {
      defaultMessage:
        '{websiteName} is a front-end developer located in France. He codes and he writes mostly about web development and open-source.',
      description: 'HomePage: SEO - Meta description',
    },
    { websiteName: settings.name }
  );

  const webpageSchema: WebPage = {
    '@id': `${settings.url}/#home`,
    '@type': 'WebPage',
    name: pageTitle,
    description: pageDescription,
    author: { '@id': `${settings.url}/#branding` },
    creator: { '@id': `${settings.url}/#branding` },
    editor: { '@id': `${settings.url}/#branding` },
    inLanguage: settings.locales.defaultLocale,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    reviewedBy: { '@id': `${settings.url}/#branding` },
    url: `${settings.url}`,
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
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${settings.url}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        ></script>
      </Head>
      <div id="home">
        <HomePageContent components={components} />
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout isHome={true}>{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { locale } = context;
  const translation = await loadTranslation(locale);
  const recentPosts = await getPublishedPosts({ first: 3 });

  return {
    props: {
      recentPosts,
      translation,
    },
  };
};

export default Home;
