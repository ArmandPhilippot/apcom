import { getLayout } from '@components/Layouts/Layout';
import { seo } from '@config/seo';
import { NextPageWithLayout } from '@ts/types/app';
import { defaultLocale, loadTranslation } from '@utils/helpers/i18n';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import LegalNoticeContent, {
  intro,
  meta,
} from '@content/pages/legal-notice.mdx';
import PostHeader from '@components/PostHeader/PostHeader';
import { ArticleMeta } from '@ts/types/articles';
import styles from '@styles/pages/Page.module.scss';
import { ToC } from '@components/Widgets';
import Sidebar from '@components/Sidebar/Sidebar';
import { Article, Graph, WebPage } from 'schema-dts';
import { config } from '@config/website';
import { useRouter } from 'next/router';
import { t } from '@lingui/macro';

const LegalNotice: NextPageWithLayout = () => {
  const router = useRouter();
  const dates = {
    publication: meta.publishedOn,
    update: meta.updatedOn,
  };

  const pageMeta: ArticleMeta = {
    dates,
  };
  const pageUrl = `${config.url}${router.asPath}`;

  const publicationDate = new Date(dates.publication);
  const updateDate = new Date(dates.update);

  const webpageSchema: WebPage = {
    '@id': `${pageUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${config.url}/#breadcrumb` },
    name: seo.legalNotice.title,
    description: seo.legalNotice.description,
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
    name: t`Legal notice`,
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
        <title>{seo.legalNotice.title}</title>
        <meta name="description" content={seo.legalNotice.description} />
        <meta property="og:url" content={`${pageUrl}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={t`Legal notice`} />
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
  const translation = await loadTranslation(locale || defaultLocale);

  return {
    props: {
      breadcrumbTitle,
      locale,
      translation,
    },
  };
};

export default LegalNotice;
