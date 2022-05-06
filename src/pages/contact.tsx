import Notice, { NoticeKind } from '@components/atoms/layout/notice';
import { BreadcrumbItem } from '@components/molecules/nav/breadcrumb';
import ContactForm, {
  ContactFormProps,
} from '@components/organisms/forms/contact-form';
import SocialMedia from '@components/organisms/widgets/social-media';
import PageLayout from '@components/templates/page/page-layout';
import { meta } from '@content/pages/contact.mdx';
import styles from '@styles/pages/contact.module.scss';
import { sendMail } from '@services/graphql/contact';
import { loadTranslation } from '@utils/helpers/i18n';
import useSettings from '@utils/hooks/use-settings';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { ContactPage as ContactPageSchema, Graph, WebPage } from 'schema-dts';

const ContactPage: NextPage = () => {
  const { dates, intro, seo, title } = meta;
  const intl = useIntl();
  const homeLabel = intl.formatMessage({
    defaultMessage: 'Home',
    description: 'Breadcrumb: home label',
    id: 'j5k9Fe',
  });
  const breadcrumb: BreadcrumbItem[] = [
    { id: 'home', name: homeLabel, url: '/' },
    { id: 'contact', name: title, url: '/contact' },
  ];

  const socialMediaTitle = intl.formatMessage({
    defaultMessage: 'Find me elsewhere',
    description: 'ContactPage: social media widget title',
    id: 'Qh2CwH',
  });

  const { website } = useSettings();
  const { asPath } = useRouter();
  const pageUrl = `${website.url}${asPath}`;
  const pagePublicationDate = new Date(dates.publication);
  const pageUpdateDate = new Date(dates.update);

  const webpageSchema: WebPage = {
    '@id': `${pageUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${website.url}/#breadcrumb` },
    name: seo.title,
    description: seo.description,
    reviewedBy: { '@id': `${website.url}/#branding` },
    url: `${pageUrl}`,
    isPartOf: {
      '@id': `${website.url}`,
    },
  };

  const contactSchema: ContactPageSchema = {
    '@id': `${website.url}/#contact`,
    '@type': 'ContactPage',
    name: title,
    description: intro,
    author: { '@id': `${website.url}/#branding` },
    creator: { '@id': `${website.url}/#branding` },
    dateCreated: pagePublicationDate.toISOString(),
    dateModified: pageUpdateDate.toISOString(),
    datePublished: pagePublicationDate.toISOString(),
    editor: { '@id': `${website.url}/#branding` },
    inLanguage: website.locales.default,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: { '@id': `${pageUrl}` },
  };

  const schemaJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageSchema, contactSchema],
  };

  const widgets = [
    <SocialMedia
      key="social-media"
      title={socialMediaTitle}
      level={2}
      media={[
        { name: 'Github', url: 'https://github.com/ArmandPhilippot' },
        { name: 'Gitlab', url: 'https://gitlab.com/ArmandPhilippot' },
        {
          name: 'LinkedIn',
          url: 'https://www.linkedin.com/in/armandphilippot',
        },
      ]}
    />,
  ];

  const [status, setStatus] = useState<NoticeKind>('info');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const submitMail: ContactFormProps['sendMail'] = async (data, reset) => {
    const { email, message, name, subject } = data;
    const messageHTML = message.replace(/\r?\n/g, '<br />');
    const body = `Message received from ${name} <${email}> on ${website.url}.<br /><br />${messageHTML}`;
    const replyTo = `${name} <${email}>`;
    const mailData = {
      body,
      clientMutationId: 'contact',
      replyTo,
      subject,
    };
    const { message: mutationMessage, sent } = await sendMail(mailData);

    if (sent) {
      setStatus('success');
      setStatusMessage(
        intl.formatMessage({
          defaultMessage:
            'Thanks. Your message was successfully sent. I will answer it as soon as possible.',
          description: 'Contact: success message',
          id: '3Pipok',
        })
      );
      reset();
    } else {
      const errorPrefix = intl.formatMessage({
        defaultMessage: 'An error occurred:',
        description: 'Contact: error message',
        id: 'TpyFZ6',
      });
      const error = `${errorPrefix} ${mutationMessage}`;
      setStatus('error');
      setStatusMessage(error);
    }
  };

  return (
    <>
      <Head>
        <title>{`${seo.title} - ${website.name}`}</title>
        <meta name="description" content={seo.description} />
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
      <PageLayout
        title="Contact"
        intro={intro}
        breadcrumb={breadcrumb}
        widgets={widgets}
      >
        <ContactForm
          sendMail={submitMail}
          Notice={
            <Notice
              kind={status}
              message={statusMessage}
              className={styles.notice}
            />
          }
        />
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translation = await loadTranslation(locale);

  return {
    props: {
      translation,
    },
  };
};

export default ContactPage;
