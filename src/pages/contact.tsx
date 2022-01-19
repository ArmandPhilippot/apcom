import { ButtonSubmit } from '@components/Buttons';
import { Form, FormItem, Input, TextArea } from '@components/Form';
import { getLayout } from '@components/Layouts/Layout';
import { seo } from '@config/seo';
import { t } from '@lingui/macro';
import { sendMail } from '@services/graphql/mutations';
import { NextPageWithLayout } from '@ts/types/app';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { FormEvent, useState } from 'react';
import PostHeader from '@components/PostHeader/PostHeader';
import styles from '@styles/pages/Page.module.scss';
import { SocialMedia } from '@components/Widgets';
import Sidebar from '@components/Sidebar/Sidebar';
import { ContactPage as ContactPageSchema, Graph, WebPage } from 'schema-dts';
import { config } from '@config/website';
import { useRouter } from 'next/router';

const ContactPage: NextPageWithLayout = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  const resetForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const body = `Message received from ${name} <${email}> on ArmandPhilippot.com.\n\n${message}`;
    const replyTo = `${name} <${email}>`;
    const data = {
      body,
      mutationId: 'contact',
      replyTo,
      subject,
    };
    const mail = await sendMail(data);

    if (mail.sent) {
      setStatus(
        t`Thanks. Your message was successfully sent. I will answer it as soon as possible.`
      );
      resetForm();
    } else {
      const errorPrefix = t`An error occurred:`;
      const error = `${errorPrefix} ${mail.message}`;
      setStatus(error);
    }
  };

  const title = t`Contact`;
  const intro = t`Please fill the form to contact me.`;

  const webpageSchema: WebPage = {
    '@id': `${config.url}${router.asPath}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${config.url}/#breadcrumb` },
    name: seo.contact.title,
    description: seo.contact.description,
    reviewedBy: { '@id': `${config.url}/#branding` },
    url: `${config.url}${router.asPath}`,
    isPartOf: {
      '@id': `${config.url}`,
    },
  };

  const contactSchema: ContactPageSchema = {
    '@id': `${config.url}/#contact`,
    '@type': 'ContactPage',
    name: title,
    description: intro,
    author: { '@id': `${config.url}/#branding` },
    creator: { '@id': `${config.url}/#branding` },
    editor: { '@id': `${config.url}/#branding` },
    inLanguage: config.locales.defaultLocale,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: { '@id': `${config.url}${router.asPath}` },
  };

  const schemaJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageSchema, contactSchema],
  };

  return (
    <>
      <Head>
        <title>{seo.contact.title}</title>
        <meta name="description" content={seo.contact.description} />
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
          <p>{t`All fields marked with * are required.`}</p>
          {status && <p>{status}</p>}
          <Form submitHandler={submitHandler}>
            <FormItem>
              <Input
                id="contact-name"
                name="name"
                value={name}
                setValue={setName}
                label={t`Name`}
                required={true}
              />
            </FormItem>
            <FormItem>
              <Input
                id="contact-email"
                name="email"
                value={email}
                setValue={setEmail}
                label={t`Email`}
                required={true}
              />
            </FormItem>
            <FormItem>
              <Input
                id="contact-subject"
                name="subject"
                value={subject}
                setValue={setSubject}
                label={t`Subject`}
              />
            </FormItem>
            <FormItem>
              <TextArea
                id="contact-message"
                name="message"
                value={message}
                setValue={setMessage}
                label={t`Message`}
                required={true}
              />
            </FormItem>
            <FormItem>
              <ButtonSubmit>{t`Send`}</ButtonSubmit>
            </FormItem>
          </Form>
        </div>
        <Sidebar position="right">
          <SocialMedia
            title={t`Find me elsewhere`}
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
  const translation = await loadTranslation(
    context.locale!,
    process.env.NODE_ENV === 'production'
  );

  const breadcrumbTitle = t`Contact`;

  return {
    props: {
      breadcrumbTitle,
      translation,
    },
  };
};

export default ContactPage;
