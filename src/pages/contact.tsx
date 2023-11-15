/* eslint-disable max-statements */
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import {
  ContactForm,
  getLayout,
  PageLayout,
  SocialMediaWidget,
  Heading,
  type ContactFormSubmit,
} from '../components';
import { meta } from '../content/pages/contact.mdx';
import { sendMail } from '../services/graphql';
import type { NextPageWithLayout } from '../types';
import { CONFIG } from '../utils/config';
import { ROUTES } from '../utils/constants';
import {
  getSchemaJson,
  getSinglePageSchema,
  getWebPageSchema,
} from '../utils/helpers';
import { loadTranslation } from '../utils/helpers/server';
import { useBreadcrumb } from '../utils/hooks';

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

  const { asPath } = useRouter();
  const webpageSchema = getWebPageSchema({
    description: seo.description,
    locale: CONFIG.locales.defaultLocale,
    slug: asPath,
    title: seo.title,
    updateDate: dates.update,
  });
  const contactSchema = getSinglePageSchema({
    dates,
    description: intro,
    id: 'contact',
    kind: 'contact',
    locale: CONFIG.locales.defaultLocale,
    slug: asPath,
    title,
  });
  const schemaJsonLd = getSchemaJson([webpageSchema, contactSchema]);
  const githubLabel = intl.formatMessage({
    defaultMessage: 'Github profile',
    description: 'ContactPage: Github profile link',
    id: '75FYp7',
  });
  const gitlabLabel = intl.formatMessage({
    defaultMessage: 'Gitlab profile',
    description: 'ContactPage: Gitlab profile link',
    id: '1V3CJf',
  });
  const linkedinLabel = intl.formatMessage({
    defaultMessage: 'LinkedIn profile',
    description: 'ContactPage: LinkedIn profile link',
    id: 'Q3oEQn',
  });

  const widgets = [
    <SocialMediaWidget
      heading={
        <Heading isFake level={3}>
          {socialMediaTitle}
        </Heading>
      }
      // eslint-disable-next-line react/jsx-no-literals -- Key allowed
      key="social-media"
      media={[
        {
          icon: 'Github',
          id: 'github',
          label: githubLabel,
          url: 'https://github.com/ArmandPhilippot',
        },
        {
          icon: 'Gitlab',
          id: 'gitlab',
          label: gitlabLabel,
          url: 'https://gitlab.com/ArmandPhilippot',
        },
        {
          icon: 'LinkedIn',
          id: 'linkedin',
          label: linkedinLabel,
          url: 'https://www.linkedin.com/in/armandphilippot',
        },
      ]}
    />,
  ];

  const formName = intl.formatMessage({
    defaultMessage: 'Contact form',
    description: 'Contact: form accessible name',
    id: 'bPv0VG',
  });

  const submitMail: ContactFormSubmit = useCallback(
    async ({ email, message, name, object }) => {
      const messageHTML = message.replace(/\r?\n/g, '<br />');
      const body = `Message received from ${name} <${email}> on ${CONFIG.url}.<br /><br />${messageHTML}`;
      const replyTo = `${name} <${email}>`;
      const mailData = {
        body,
        clientMutationId: 'contact',
        replyTo,
        subject: object,
      };
      const { message: mutationMessage, sent } = await sendMail(mailData);

      if (sent) {
        return {
          messages: {
            success: intl.formatMessage({
              defaultMessage:
                'Thanks. Your message was successfully sent. I will answer it as soon as possible.',
              description: 'Contact: success message',
              id: '3Pipok',
            }),
          },
          validator: () => sent,
        };
      }

      const errorPrefix = intl.formatMessage({
        defaultMessage: 'An error occurred:',
        description: 'Contact: error message',
        id: 'TpyFZ6',
      });

      return {
        messages: { error: `${errorPrefix} ${mutationMessage}` },
        validator: () => sent,
      };
    },
    [intl]
  );
  const page = {
    title: `${seo.title} - ${CONFIG.name}`,
    url: `${CONFIG.url}${asPath}`,
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
        <ContactForm aria-label={formName} onSubmit={submitMail} />
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
