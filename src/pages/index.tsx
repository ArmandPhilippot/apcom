import type { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '@components/Layouts/Layout';
import { seo } from '@config/seo';
import { NextPageWithLayout } from '@ts/types/app';
import { loadTranslation } from '@utils/helpers/i18n';
import HomePageContent from '@content/pages/homepage.mdx';
import { ButtonLink } from '@components/Buttons';
import styles from '@styles/pages/Home.module.scss';
import { t } from '@lingui/macro';
import FeedIcon from '@assets/images/icon-feed.svg';
import { ContactIcon } from '@components/Icons';
import { Graph, WebPage } from 'schema-dts';
import { config } from '@config/website';

const Home: NextPageWithLayout = () => {
  const CodingLinks = () => {
    return (
      <ul className={styles['links-list']}>
        <li>
          <ButtonLink target="/thematique/developpement-web">
            {t`Web development`}
          </ButtonLink>
        </li>
        <li>
          <ButtonLink target="/projets">{t`Projects`}</ButtonLink>
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
          <ButtonLink target="/thematique/libre">{t`Free`}</ButtonLink>
        </li>
        <li>
          <ButtonLink target="/thematique/linux">{t`Linux`}</ButtonLink>
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
            {t`Contact me`}
          </ButtonLink>
        </li>
        <li>
          <ButtonLink target="/feed">
            <FeedIcon className={styles['icon--feed']} />
            {t`Subscribe`}
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

  const webpageSchema: WebPage = {
    '@id': `${config.url}/#home`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${config.url}/#breadcrumb` },
    name: seo.legalNotice.title,
    description: seo.legalNotice.description,
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
        <title>{seo.homepage.title}</title>
        <meta name="description" content={seo.homepage.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${config.url}`} />
        <meta property="og:title" content={seo.homepage.title} />
        <meta property="og:description" content={seo.homepage.description} />
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

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(
    ctx.locale!,
    process.env.NODE_ENV === 'production'
  );

  return {
    props: {
      translation,
    },
  };
};

export default Home;
