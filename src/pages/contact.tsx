import { ButtonSubmit } from '@components/Buttons';
import { Form, FormItem, Input, TextArea } from '@components/Form';
import { getLayout } from '@components/Layouts/Layout';
import PostHeader from '@components/PostHeader/PostHeader';
import Sidebar from '@components/Sidebar/Sidebar';
import { SocialMedia } from '@components/Widgets';
import { sendMail } from '@services/graphql/mutations';
import styles from '@styles/pages/Page.module.scss';
import { NextPageWithLayout } from '@ts/types/app';
import { settings } from '@utils/config';
import { getIntlInstance, loadTranslation } from '@utils/helpers/i18n';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { useIntl } from 'react-intl';
import { ContactPage as ContactPageSchema, Graph, WebPage } from 'schema-dts';

type Status = 'success' | 'error' | 'warning';

const ContactPage: NextPageWithLayout = () => {
  const intl = useIntl();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>();
  const [statusMessage, setStatusMessage] = useState<string>('');
  const router = useRouter();

  const resetForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setStatus('warning');
      setStatusMessage(
        intl.formatMessage({
          defaultMessage:
            'Warning: mail not sent. Some required fields are empty.',
          description: 'ContactPage: missing fields message.',
        })
      );
      return;
    }

    const messageHTML = message.replace(/\r?\n/g, '<br />');
    const body = `Message received from ${name} <${email}> on ${settings.url}.<br /><br />${messageHTML}`;
    const replyTo = `${name} <${email}>`;
    const data = {
      body,
      mutationId: 'contact',
      replyTo,
      subject,
    };
    const mail = await sendMail(data);

    if (mail.sent) {
      setStatus('success');
      setStatusMessage(
        intl.formatMessage({
          defaultMessage:
            'Thanks. Your message was successfully sent. I will answer it as soon as possible.',
          description: 'ContactPage: success message',
        })
      );
      resetForm();
    } else {
      const errorPrefix = intl.formatMessage({
        defaultMessage: 'An error occurred:',
        description: 'ContactPage: error message',
      });
      const error = `${errorPrefix} ${mail.message}`;
      setStatus('error');
      setStatusMessage(error);
    }
  };

  const getStatus = () => {
    if (!status) return <></>;

    const statusModifier = `status--${status}`;

    return (
      <p className={`${styles.status} ${styles[statusModifier]}`}>
        {statusMessage}
      </p>
    );
  };

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        ></script>
      </Head>
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
          <Form submitHandler={submitHandler}>
            <FormItem>
              <Input
                id="contact-name"
                name="name"
                value={name}
                setValue={setName}
                label={intl.formatMessage({
                  defaultMessage: 'Name',
                  description: 'ContactPage: name field label',
                })}
                required={true}
              />
            </FormItem>
            <FormItem>
              <Input
                id="contact-email"
                type="email"
                name="email"
                value={email}
                setValue={setEmail}
                label={intl.formatMessage({
                  defaultMessage: 'Email',
                  description: 'ContactPage: email field label',
                })}
                required={true}
              />
            </FormItem>
            <FormItem>
              <Input
                id="contact-subject"
                name="subject"
                value={subject}
                setValue={setSubject}
                label={intl.formatMessage({
                  defaultMessage: 'Subject',
                  description: 'ContactPage: subject field label',
                })}
              />
            </FormItem>
            <FormItem>
              <TextArea
                id="contact-message"
                name="message"
                value={message}
                setValue={setMessage}
                label={intl.formatMessage({
                  defaultMessage: 'Message',
                  description: 'ContactPage: message field label',
                })}
                required={true}
              />
            </FormItem>
            <FormItem>
              <ButtonSubmit>
                {intl.formatMessage({
                  defaultMessage: 'Send',
                  description: 'ContactPage: send button text',
                })}
              </ButtonSubmit>
            </FormItem>
          </Form>
          {getStatus()}
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
