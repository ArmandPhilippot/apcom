/* eslint-disable max-statements */
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  ContactForm,
  type ContactFormProps,
  getLayout,
  Notice,
  type NoticeKind,
  PageLayout,
  SocialMedia,
} from '../components';
import { meta } from '../content/pages/contact.mdx';
import { sendMail } from '../services/graphql';
import styles from '../styles/pages/contact.module.scss';
import type { NextPageWithLayout } from '../types';
import { ROUTES } from '../utils/constants';
import {
  getSchemaJson,
  getSinglePageSchema,
  getWebPageSchema,
} from '../utils/helpers';
import { loadTranslation } from '../utils/helpers/server';
import { useBreadcrumb, useSettings } from '../utils/hooks';

const ContactPage: NextPageWithLayout = () => {
  const { dates, intro, seo, title } = meta;
  const intl = useIntl();
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title,
    url: ROUTES.CONTACT,
  });

  const pageTitle = intl.formatMessage({
    defaultMessage: 'Contact',
    description: 'ContactPage: page title',
    id: 'AN9iy7',
  });
  const socialMediaTitle = intl.formatMessage({
    defaultMessage: 'Find me elsewhere',
    description: 'ContactPage: social media widget title',
    id: 'Qh2CwH',
  });

  const { website } = useSettings();
  const { asPath } = useRouter();
  const webpageSchema = getWebPageSchema({
    description: seo.description,
    locale: website.locales.default,
    slug: asPath,
    title: seo.title,
    updateDate: dates.update,
  });
  const contactSchema = getSinglePageSchema({
    dates,
    description: intro,
    id: 'contact',
    kind: 'contact',
    locale: website.locales.default,
    slug: asPath,
    title,
  });
  const schemaJsonLd = getSchemaJson([webpageSchema, contactSchema]);

  const widgets = [
    <SocialMedia
      // eslint-disable-next-line react/jsx-no-literals -- Key allowed
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

  const [statusKind, setStatusKind] = useState<NoticeKind>('info');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const submitMail: ContactFormProps['sendMail'] = useCallback(
    async (data, reset) => {
      const { email, message, name, object } = data;
      const messageHTML = message.replace(/\r?\n/g, '<br />');
      const body = `Message received from ${name} <${email}> on ${website.url}.<br /><br />${messageHTML}`;
      const replyTo = `${name} <${email}>`;
      const mailData = {
        body,
        clientMutationId: 'contact',
        replyTo,
        subject: object,
      };
      const { message: mutationMessage, sent } = await sendMail(mailData);

      if (sent) {
        setStatusKind('success');
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
        setStatusKind('error');
        setStatusMessage(error);
      }
    },
    [intl, website.url]
  );
  const page = {
    title: `${seo.title} - ${website.name}`,
    url: `${website.url}${asPath}`,
  };

  return (
    <>
      <Head>
        <title>{page.title}</title>
        {/*eslint-disable-next-line react/jsx-no-literals -- Name allowed */}
        <meta name="description" content={seo.description} />
        <meta property="og:url" content={page.url} />
        {/*eslint-disable-next-line react/jsx-no-literals -- Content allowed */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={intro} />
      </Head>
      <Script
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <PageLayout
        breadcrumb={breadcrumbItems}
        breadcrumbSchema={breadcrumbSchema}
        intro={intro}
        title={pageTitle}
        widgets={widgets}
      >
        <ContactForm
          sendMail={submitMail}
          Notice={
            statusMessage ? (
              <Notice className={styles.notice} kind={statusKind}>
                {statusMessage}
              </Notice>
            ) : undefined
          }
        />
      </PageLayout>
    </>
  );
};

ContactPage.getLayout = (page) =>
  getLayout(page, { useGrid: true, withExtraPadding: true });

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translation = await loadTranslation(locale);

  return {
    props: {
      translation,
    },
  };
};

export default ContactPage;
