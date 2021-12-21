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

const ContactPage: NextPageWithLayout = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

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
      const error = `${t`An error occurred:`} ${mail.message}`;
      setStatus(error);
    }
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
