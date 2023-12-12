import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import {
  ContactForm,
  getLayout,
  SocialMediaWidget,
  Heading,
  type ContactFormSubmit,
  Page,
  PageHeader,
  PageBody,
  PageSidebar,
} from '../components';
import { meta } from '../content/pages/contact.mdx';
import { sendEmail } from '../services/graphql';
import type { NextPageWithLayout } from '../types';
import { CONFIG } from '../utils/config';
import { ROUTES } from '../utils/constants';
import {
  getSchemaJson,
  getSinglePageSchema,
  getWebPageSchema,
} from '../utils/helpers';
import { loadTranslation } from '../utils/helpers/server';
import { useBreadcrumbs } from '../utils/hooks';

const ContactPage: NextPageWithLayout = () => {
  const { dates, intro, seo, title } = meta;
  const intl = useIntl();
  const { items: breadcrumbItems, schema: breadcrumbSchema } =
    useBreadcrumbs(title);

  const messages = {
    form: intl.formatMessage({
      defaultMessage: 'Contact form',
      description: 'Contact: form accessible name',
      id: 'bPv0VG',
    }),
    widgets: {
      socialMedia: {
        github: intl.formatMessage({
          defaultMessage: 'Github profile',
          description: 'ContactPage: Github profile link',
          id: '75FYp7',
        }),
        gitlab: intl.formatMessage({
          defaultMessage: 'Gitlab profile',
          description: 'ContactPage: Gitlab profile link',
          id: '1V3CJf',
        }),
        linkedIn: intl.formatMessage({
          defaultMessage: 'LinkedIn profile',
          description: 'ContactPage: LinkedIn profile link',
          id: 'Q3oEQn',
        }),
        title: intl.formatMessage({
          defaultMessage: 'Find me elsewhere',
          description: 'ContactPage: social media widget title',
          id: 'Qh2CwH',
        }),
      },
    },
  };

  const webpageSchema = getWebPageSchema({
    description: seo.description,
    locale: CONFIG.locales.defaultLocale,
    slug: ROUTES.CONTACT,
    title: seo.title,
    updateDate: dates.update,
  });
  const contactSchema = getSinglePageSchema({
    dates,
    description: intro,
    id: 'contact',
    kind: 'contact',
    locale: CONFIG.locales.defaultLocale,
    slug: ROUTES.CONTACT,
    title,
  });
  const schemaJsonLd = getSchemaJson([
    webpageSchema,
    contactSchema,
    breadcrumbSchema,
  ]);

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
      const { message: mutationMessage, sent } = await sendEmail(mailData);

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
    url: `${CONFIG.url}${ROUTES.CONTACT}`,
  };

  return (
    <Page breadcrumbs={breadcrumbItems} isBodyLastChild>
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
      <PageHeader heading={title} intro={intro} />
      <PageBody>
        <ContactForm aria-label={messages.form} onSubmit={submitMail} />
      </PageBody>
      <PageSidebar>
        <SocialMediaWidget
          heading={
            <Heading level={2}>{messages.widgets.socialMedia.title}</Heading>
          }
          media={[
            {
              icon: 'Github',
              id: 'github',
              label: messages.widgets.socialMedia.github,
              url: 'https://github.com/ArmandPhilippot',
            },
            {
              icon: 'Gitlab',
              id: 'gitlab',
              label: messages.widgets.socialMedia.gitlab,
              url: 'https://gitlab.com/ArmandPhilippot',
            },
            {
              icon: 'LinkedIn',
              id: 'linkedin',
              label: messages.widgets.socialMedia.linkedIn,
              url: 'https://www.linkedin.com/in/armandphilippot',
            },
          ]}
        />
      </PageSidebar>
    </Page>
  );
};

ContactPage.getLayout = (page) => getLayout(page);

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translation = await loadTranslation(locale);

  return {
    props: {
      translation,
    },
  };
};

export default ContactPage;
