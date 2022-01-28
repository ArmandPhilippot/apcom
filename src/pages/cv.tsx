import { getLayout } from '@components/Layouts/Layout';
import { seo } from '@config/seo';
import { NextPageWithLayout } from '@ts/types/app';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import CVContent, { intro, meta, pdf, image } from '@content/pages/cv.mdx';
import PostHeader from '@components/PostHeader/PostHeader';
import { ArticleMeta } from '@ts/types/articles';
import styles from '@styles/pages/Page.module.scss';
import { CVPreview, SocialMedia, ToC } from '@components/Widgets';
import { t } from '@lingui/macro';
import Sidebar from '@components/Sidebar/Sidebar';
import { AboutPage, Graph, WebPage } from 'schema-dts';
import { config } from '@config/website';
import { useRouter } from 'next/router';
import { defaultLocale, loadTranslation } from '@utils/helpers/i18n';

const CV: NextPageWithLayout = () => {
  const router = useRouter();
  const dates = {
    publication: meta.publishedOn,
    update: meta.updatedOn,
  };

  const pageMeta: ArticleMeta = {
    dates,
  };
  const pageUrl = `${config.url}${router.asPath}`;

  const webpageSchema: WebPage = {
    '@id': `${pageUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${config.url}/#breadcrumb` },
    name: seo.cv.title,
    description: seo.cv.description,
    reviewedBy: { '@id': `${config.url}/#branding` },
    url: `${pageUrl}`,
    isPartOf: {
      '@id': `${config.url}`,
    },
  };

  const publicationDate = new Date(dates.publication);
  const updateDate = new Date(dates.update);

  const cvSchema: AboutPage = {
    '@id': `${config.url}/#cv`,
    '@type': 'AboutPage',
    name: `${config.name} CV`,
    description: intro,
    author: { '@id': `${config.url}/#branding` },
    creator: { '@id': `${config.url}/#branding` },
    dateCreated: publicationDate.toISOString(),
    dateModified: updateDate.toISOString(),
    datePublished: publicationDate.toISOString(),
    editor: { '@id': `${config.url}/#branding` },
    image,
    inLanguage: config.locales.defaultLocale,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    thumbnailUrl: image,
    mainEntityOfPage: { '@id': `${pageUrl}` },
  };

  const schemaJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageSchema, cvSchema],
  };

  return (
    <>
      <Head>
        <title>{seo.cv.title}</title>
        <meta name="description" content={seo.cv.description} />
        <meta property="og:url" content={`${pageUrl}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${config.name} CV`} />
        <meta property="og:description" content={intro} />
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={`${config.name} CV`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        ></script>
      </Head>
      <article
        id="cv"
        className={`${styles.article} ${styles['article--no-comments']}`}
      >
        <PostHeader intro={intro} meta={pageMeta} title={meta.title} />
        <Sidebar position="left">
          <ToC />
        </Sidebar>
        <div className={styles.body}>
          <CVContent />
        </div>
        <Sidebar position="right">
          <CVPreview title={t`Other formats`} imgSrc={image} pdf={pdf} />
          <SocialMedia
            title={t`Open-source projects`}
            github={true}
            gitlab={true}
          />
        </Sidebar>
      </article>
    </>
  );
};

CV.getLayout = getLayout;

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

export default CV;
