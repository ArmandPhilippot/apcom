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

  return (
    <>
      <Head>
        <title>{seo.homepage.title}</title>
        <meta name="description" content={seo.homepage.description} />
      </Head>
      <HomePageContent components={components} />
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
