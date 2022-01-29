import { getLayout } from '@components/Layouts/Layout';
import PostHeader from '@components/PostHeader/PostHeader';
import Sidebar from '@components/Sidebar/Sidebar';
import { ToC } from '@components/Widgets';
import { config } from '@config/website';
import LegalNoticeContent, {
  intro,
  meta,
} from '@content/pages/legal-notice.mdx';
import styles from '@styles/pages/Page.module.scss';
import { NextPageWithLayout } from '@ts/types/app';
import { ArticleMeta } from '@ts/types/articles';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { Article, Graph, WebPage } from 'schema-dts';

const LegalNotice: NextPageWithLayout = () => {
  const intl = useIntl();
  const router = useRouter();
  const dates = {
    publication: meta.publishedOn,
    update: meta.updatedOn,
  };

  const pageMeta: ArticleMeta = {
    dates,
  };
  const pageTitle = intl.formatMessage(
    {
      defaultMessage: 'Legal notice - {websiteName}',
      description: 'LegalNoticePage: SEO - Page title',
    },
    { websiteName: config.name }
  );
  const pageDescription = intl.formatMessage(
    {
      defaultMessage: "Discover the legal notice of {websiteName}'s website.",
      description: 'LegalNoticePage: SEO - Meta description',
    },
    { websiteName: config.name }
  );
  const pageUrl = `${config.url}${router.asPath}`;
  const title = intl.formatMessage({
    defaultMessage: 'Legal notice',
    description: 'LegalNoticePage: page title',
  });
  const publicationDate = new Date(dates.publication);
  const updateDate = new Date(dates.update);

  const webpageSchema: WebPage = {
    '@id': `${pageUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${config.url}/#breadcrumb` },
    name: pageTitle,
    description: pageDescription,
    inLanguage: config.locales.defaultLocale,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    reviewedBy: { '@id': `${config.url}/#branding` },
    url: `${pageUrl}`,
    isPartOf: {
      '@id': `${config.url}`,
    },
  };

  const articleSchema: Article = {
    '@id': `${config.url}/#legal-notice`,
    '@type': 'Article',
    name: title,
    description: intro,
    author: { '@id': `${config.url}/#branding` },
    copyrightYear: publicationDate.getFullYear(),
    creator: { '@id': `${config.url}/#branding` },
    dateCreated: publicationDate.toISOString(),
    dateModified: updateDate.toISOString(),
    datePublished: publicationDate.toISOString(),
    editor: { '@id': `${config.url}/#branding` },
    inLanguage: config.locales.defaultLocale,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: { '@id': `${pageUrl}` },
  };

  const schemaJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageSchema, articleSchema],
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:url" content={`${pageUrl}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={intro} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        ></script>
      </Head>
      <article
        id="legal-notice"
        className={`${styles.article} ${styles['article--no-comments']}`}
      >
        <PostHeader intro={intro} meta={pageMeta} title={meta.title} />
        <Sidebar position="left">
          <ToC />
        </Sidebar>
        <div className={styles.body}>
          <LegalNoticeContent />
        </div>
      </article>
    </>
  );
};

LegalNotice.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const breadcrumbTitle = meta.title;
  const { locale } = context;
  const translation = await loadTranslation(locale);

  return {
    props: {
      breadcrumbTitle,
      locale,
      translation,
    },
  };
};

export default LegalNotice;
