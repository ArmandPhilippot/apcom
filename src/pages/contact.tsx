import ContactForm from '@components/ContactForm/ContactForm';
import { getLayout } from '@components/Layouts/Layout';
import PostHeader from '@components/PostHeader/PostHeader';
import Sidebar from '@components/Sidebar/Sidebar';
import { SocialMedia } from '@components/Widgets';
import styles from '@styles/pages/Page.module.scss';
import { NextPageWithLayout } from '@ts/types/app';
import { settings } from '@utils/config';
import { getIntlInstance, loadTranslation } from '@utils/helpers/i18n';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useIntl } from 'react-intl';
import { ContactPage as ContactPageSchema, Graph, WebPage } from 'schema-dts';

const ContactPage: NextPageWithLayout = () => {
  const intl = useIntl();
  const router = useRouter();

  const pageTitle = intl.formatMessage(
    {
      defaultMessage: 'Contact form - {websiteName}',
      description: 'ContactPage: SEO - Page title',
    },
    { websiteName: settings.name }
  );
  const pageDescription = intl.formatMessage(
    {
      defaultMessage:
        "Contact {websiteName} through its website. All you need to do it's to fill the contact form.",
      description: 'ContactPage: SEO - Meta description',
    },
    { websiteName: settings.name }
  );
  const pageUrl = `${settings.url}${router.asPath}`;
  const title = intl.formatMessage({
    defaultMessage: 'Contact',
    description: 'ContactPage: page title',
  });
  const intro = intl.formatMessage({
    defaultMessage: 'Please fill the form to contact me.',
    description: 'ContactPage: page introduction',
  });

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

  const contactSchema: ContactPageSchema = {
    '@id': `${settings.url}/#contact`,
    '@type': 'ContactPage',
    name: title,
    description: intro,
    author: { '@id': `${settings.url}/#branding` },
    creator: { '@id': `${settings.url}/#branding` },
    editor: { '@id': `${settings.url}/#branding` },
    inLanguage: settings.locales.defaultLocale,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: { '@id': `${pageUrl}` },
  };

  const schemaJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageSchema, contactSchema],
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:url" content={`${pageUrl}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={intro} />
      </Head>
      <Script
        id="schema-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <article
        id="contact"
        className={`${styles.article} ${styles['article--no-comments']}`}
      >
        <PostHeader title={title} intro={intro} />
        <div className={styles.body}>
          <p>
            {intl.formatMessage({
              defaultMessage: 'All fields marked with * are required.',
              description: 'ContactPage: required fields text',
            })}
          </p>
          <ContactForm />
        </div>
        <Sidebar position="right">
          <SocialMedia
            title={intl.formatMessage({
              defaultMessage: 'Find me elsewhere',
              description: 'ContactPage: social media widget title',
            })}
            github={true}
            gitlab={true}
            linkedin={true}
          />
        </Sidebar>
      </article>
    </>
  );
};

ContactPage.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const intl = await getIntlInstance();
  const breadcrumbTitle = intl.formatMessage({
    defaultMessage: 'Contact',
    description: 'ContactPage: breadcrumb item',
  });
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

export default ContactPage;
