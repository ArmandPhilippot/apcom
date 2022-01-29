import FeedIcon from '@assets/images/icon-feed.svg';
import { ButtonLink } from '@components/Buttons';
import { ContactIcon } from '@components/Icons';
import Layout from '@components/Layouts/Layout';
import { config } from '@config/website';
import HomePageContent from '@content/pages/homepage.mdx';
import styles from '@styles/pages/Home.module.scss';
import { NextPageWithLayout } from '@ts/types/app';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import type { ReactElement } from 'react';
import { useIntl } from 'react-intl';
import { Graph, WebPage } from 'schema-dts';

const Home: NextPageWithLayout = () => {
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

  const components = {
    CodingLinks: CodingLinks,
    ColdarkRepos: ColdarkRepos,
    LibreLinks: LibreLinks,
    MoreLinks: MoreLinks,
  };

  const pageTitle = intl.formatMessage(
    {
      defaultMessage: '{websiteName} | Front-end developer: WordPress/React',
      description: 'HomePage: SEO - Page title',
    },
    { websiteName: config.name }
  );
  const pageDescription = intl.formatMessage(
    {
      defaultMessage:
        '{websiteName} is a front-end developer located in France. He codes and he writes mostly about web development and open-source.',
      description: 'HomePage: SEO - Meta description',
    },
    { websiteName: config.name }
  );

  const webpageSchema: WebPage = {
    '@id': `${config.url}/#home`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${config.url}/#breadcrumb` },
    name: pageTitle,
    description: pageDescription,
    author: { '@id': `${config.url}/#branding` },
    creator: { '@id': `${config.url}/#branding` },
    editor: { '@id': `${config.url}/#branding` },
    inLanguage: config.locales.defaultLocale,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    reviewedBy: { '@id': `${config.url}/#branding` },
    url: `${config.url}`,
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
        <meta property="og:url" content={`${config.url}`} />
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

  return {
    props: {
      translation,
    },
  };
};

export default Home;
