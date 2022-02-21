import { getLayout } from '@components/Layouts/Layout';
import PostHeader from '@components/PostHeader/PostHeader';
import Sidebar from '@components/Sidebar/Sidebar';
import { CVPreview, SocialMedia, ToC } from '@components/Widgets';
import CVContent, { intro, meta, pdf, image } from '@content/pages/cv.mdx';
import styles from '@styles/pages/Page.module.scss';
import { NextPageWithLayout } from '@ts/types/app';
import { ArticleMeta } from '@ts/types/articles';
import { settings } from '@utils/config';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
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
  const pageUrl = `${settings.url}${router.asPath}`;
  const pageTitle = intl.formatMessage(
    {
      defaultMessage: 'CV Front-end developer - {websiteName}',
      description: 'CVPage: SEO - Page title',
    },
    { websiteName: settings.name }
  );
  const pageDescription = intl.formatMessage(
    {
      defaultMessage:
        'Discover the curriculum of {websiteName}, front-end developer located in France: skills, experiences and training.',
      description: 'CVPage: SEO - Meta description',
    },
    { websiteName: settings.name }
  );

  const webpageSchema: WebPage = {
    '@id': `${pageUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${settings.url}/#breadcrumb` },
    name: pageTitle,
    description: pageDescription,
    reviewedBy: { '@id': `${settings.url}/#branding` },
    url: `${pageUrl}`,
    isPartOf: {
      '@id': `${settings.url}`,
    },
  };

  const publicationDate = new Date(dates.publication);
  const updateDate = new Date(dates.update);

  const cvSchema: AboutPage = {
    '@id': `${settings.url}/#cv`,
    '@type': 'AboutPage',
    name: pageTitle,
    description: intro,
    author: { '@id': `${settings.url}/#branding` },
    creator: { '@id': `${settings.url}/#branding` },
    dateCreated: publicationDate.toISOString(),
    dateModified: updateDate.toISOString(),
    datePublished: publicationDate.toISOString(),
    editor: { '@id': `${settings.url}/#branding` },
    image,
    inLanguage: settings.locales.defaultLocale,
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
    { name: settings.name }
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
      </Head>
      <Script
        id="schema-cv"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <article
        id="cv"
        className={`${styles.article} ${styles['article--no-comments']}`}
      >
        <PostHeader intro={intro} meta={pageMeta} title={meta.title} />
        <Sidebar
          position="left"
          ariaLabel={intl.formatMessage({
            defaultMessage: 'Table of Contents',
            description: 'CVPage: ToC sidebar aria-label',
          })}
        >
          <ToC />
        </Sidebar>
        <div className={styles.body}>
          <CVContent />
        </div>
        <Sidebar
          position="right"
          ariaLabel={intl.formatMessage({
            defaultMessage: 'Sidebar',
            description: 'CVPage: right sidebar aria-label',
          })}
        >
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
