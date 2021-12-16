import { ButtonSubmit } from '@components/Buttons';
import { Form, FormItem, Input, TextArea } from '@components/Form';
import Layout from '@components/Layouts/Layout';
import { seo } from '@config/seo';
import { t } from '@lingui/macro';
import { NextPageWithLayout } from '@ts/types/app';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { ReactElement, useState } from 'react';

const ContactPage: NextPageWithLayout = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <>
      <Head>
        <title>{seo.contact.title}</title>
        <meta name="description" content={seo.contact.description} />
      </Head>
      <article>
        <header>
          <h1>{t`Contact`}</h1>
        </header>
        <div>
          <p>{t`All fields marked with * are required.`}</p>
          <Form>
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
      </article>
    </>
  );
};

ContactPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const translation = await loadTranslation(
    context.locale!,
    process.env.NODE_ENV === 'production'
  );

  return {
    props: {
      translation,
    },
  };
};

export default ContactPage;
