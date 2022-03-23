import { ButtonSubmit } from '@components/Buttons';
import { Field, Form, FormItem, Label } from '@components/FormElements';
import { sendMail } from '@services/graphql/mutations';
import { settings } from '@utils/config';
import { FormEvent, useState } from 'react';
import { useIntl } from 'react-intl';
import styles from './ContactForm.module.scss';

type Status = 'success' | 'error' | 'warning';

const ContactForm = () => {
  const intl = useIntl();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>();
  const [statusMessage, setStatusMessage] = useState<string>('');

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
          description: 'ContactForm: missing fields message.',
          id: 'WpycgB',
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
          description: 'ContactForm: success message',
          id: 'gQKeF+',
        })
      );
      resetForm();
    } else {
      const errorPrefix = intl.formatMessage({
        defaultMessage: 'An error occurred:',
        description: 'ContactForm: error message',
        id: 'pTxT7N',
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

  const getLabel = (
    body: string,
    htmlFor: string,
    required: boolean = false
  ) => {
    return <Label body={body} htmlFor={htmlFor} required={required} />;
  };

  const nameLabelBody = intl.formatMessage({
    defaultMessage: 'Name',
    description: 'ContactForm: name field label',
    id: '6ibqFS',
  });

  const emailLabelBody = intl.formatMessage({
    defaultMessage: 'Email',
    description: 'ContactForm: email field label',
    id: 'Vuryko',
  });

  const subjectLabelBody = intl.formatMessage({
    defaultMessage: 'Subject',
    description: 'ContactForm: subject field label',
    id: 'uMURuJ',
  });

  const messageLabelBody = intl.formatMessage({
    defaultMessage: 'Message',
    description: 'ContactForm: message field label',
    id: '0zBQpa',
  });

  return (
    <>
      <Form submitHandler={submitHandler}>
        <FormItem>
          <Field
            id="contact-name"
            name="name"
            value={name}
            setValue={setName}
            required={true}
            label={getLabel(nameLabelBody, 'contact-name', true)}
          />
        </FormItem>
        <FormItem>
          <Field
            id="contact-email"
            kind="email"
            name="email"
            value={email}
            setValue={setEmail}
            required={true}
            label={getLabel(emailLabelBody, 'contact-email', true)}
          />
        </FormItem>
        <FormItem>
          <Field
            id="contact-subject"
            name="subject"
            value={subject}
            setValue={setSubject}
            label={getLabel(subjectLabelBody, 'contact-subject')}
          />
        </FormItem>
        <FormItem>
          <Field
            id="contact-message"
            kind="textarea"
            name="message"
            value={message}
            setValue={setMessage}
            required={true}
            label={getLabel(messageLabelBody, 'contact-message', true)}
          />
        </FormItem>
        <FormItem>
          <ButtonSubmit>
            {intl.formatMessage({
              defaultMessage: 'Send',
              description: 'ContactForm: send button text',
              id: 'X7n7N2',
            })}
          </ButtonSubmit>
        </FormItem>
      </Form>
      {getStatus()}
    </>
  );
};

export default ContactForm;
