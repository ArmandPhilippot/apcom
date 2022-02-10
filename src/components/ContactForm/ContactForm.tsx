import { ButtonSubmit } from '@components/Buttons';
import { Form, FormItem, Input, TextArea } from '@components/Form';
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
        })
      );
      resetForm();
    } else {
      const errorPrefix = intl.formatMessage({
        defaultMessage: 'An error occurred:',
        description: 'ContactForm: error message',
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

  return (
    <>
      <Form submitHandler={submitHandler}>
        <FormItem>
          <Input
            id="contact-name"
            name="name"
            value={name}
            setValue={setName}
            label={intl.formatMessage({
              defaultMessage: 'Name',
              description: 'ContactForm: name field label',
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
              description: 'ContactForm: email field label',
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
              description: 'ContactForm: subject field label',
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
              description: 'ContactForm: message field label',
            })}
            required={true}
          />
        </FormItem>
        <FormItem>
          <ButtonSubmit>
            {intl.formatMessage({
              defaultMessage: 'Send',
              description: 'ContactForm: send button text',
            })}
          </ButtonSubmit>
        </FormItem>
      </Form>
      {getStatus()}
    </>
  );
};

export default ContactForm;
