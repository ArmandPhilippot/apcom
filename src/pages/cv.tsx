import { getLayout } from '@components/Layouts/Layout';
import PostHeader from '@components/PostHeader/PostHeader';
import Sidebar from '@components/Sidebar/Sidebar';
import { CVPreview, SocialMedia, ToC } from '@components/Widgets';
import { config } from '@config/website';
import CVContent, { intro, meta, pdf, image } from '@content/pages/cv.mdx';
import styles from '@styles/pages/Page.module.scss';
import { NextPageWithLayout } from '@ts/types/app';
import { ArticleMeta } from '@ts/types/articles';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { AboutPage, Graph, WebPage } from 'schema-dts';

const CV: NextPageWithLayout = () => {
  const intl = useIntl();
  const router = useRouter();
  const dates = {
    publication: meta.publishedOn,
    update: meta.updatedOn,
  };

  const pageMeta: ArticleMeta = {
    dates,
  };
  const pageUrl = `${config.url}${router.asPath}`;
  const pageTitle = intl.formatMessage(
    {
      defaultMessage: 'CV Front-end developer - {websiteName}',
      description: 'CVPage: SEO - Page title',
    },
    { websiteName: config.name }
  );
  const pageDescription = intl.formatMessage(
    {
      defaultMessage:
        'Discover the curriculum of {websiteName}, front-end developer located in France: skills, experiences and training.',
      description: 'CVPage: SEO - Meta description',
    },
    { websiteName: config.name }
  );

  const webpageSchema: WebPage = {
    '@id': `${pageUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${config.url}/#breadcrumb` },
    name: pageTitle,
    description: pageDescription,
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
    name: pageTitle,
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

  const title = intl.formatMessage(
    {
      defaultMessage: "{name}'s CV",
      description: 'CVPage: page title',
    },
    { name: config.name }
  );

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:url" content={`${pageUrl}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={intro} />
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={title} />
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
          <CVPreview
            title={intl.formatMessage({
              defaultMessage: 'Others formats',
              description: 'CVPage: cv preview widget title',
            })}
            imgSrc={image}
            pdf={pdf}
          />
          <SocialMedia
            title={intl.formatMessage({
              defaultMessage: 'Open-source projects',
              description: 'CVPage: social media widget title',
            })}
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
  const translation = await loadTranslation(locale);

  return {
    props: {
      breadcrumbTitle,
      locale,
      translation,
    },
  };
};

export default CV;
