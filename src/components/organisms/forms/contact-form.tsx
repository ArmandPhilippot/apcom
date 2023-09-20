import { FC, ReactNode, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Form, Spinner } from '../../atoms';
import { LabelledField } from '../../molecules';
import styles from './contact-form.module.scss';

export type ContactFormData = {
  email: string;
  message: string;
  name: string;
  subject: string;
};

export type ContactFormProps = {
  /**
   * Set additional classnames to the form wrapper.
   */
  className?: string;
  /**
   * Pass a component to print a success/error message.
   */
  Notice?: ReactNode;
  /**
   * A callback function to send mail.
   */
  sendMail: (data: ContactFormData, reset: () => void) => Promise<void>;
};

/**
 * ContactForm component
 *
 * Render a contact form.
 */
export const ContactForm: FC<ContactFormProps> = ({
  className = '',
  Notice,
  sendMail,
}) => {
  const intl = useIntl();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [object, setObject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /**
   * Reset all the form fields.
   */
  const resetForm = () => {
    setName('');
    setEmail('');
    setObject('');
    setMessage('');
    setIsSubmitting(false);
  };

  const formName = intl.formatMessage({
    defaultMessage: 'Contact form',
    description: 'ContactForm: form accessible name',
    id: 'HFdzae',
  });

  const nameLabel = intl.formatMessage({
    defaultMessage: 'Name:',
    description: 'ContactForm: name label',
    id: '1dCuCx',
  });

  const emailLabel = intl.formatMessage({
    defaultMessage: 'Email:',
    description: 'ContactForm: email label',
    id: 'w4B5PA',
  });

  const objectLabel = intl.formatMessage({
    defaultMessage: 'Object:',
    description: 'ContactForm: object label',
    id: 's8/tyz',
  });

  const messageLabel = intl.formatMessage({
    defaultMessage: 'Message:',
    description: 'ContactForm: message label',
    id: 'yN5P+m',
  });

  const submitHandler = async () => {
    setIsSubmitting(true);
    sendMail({ email, message, name, subject: object }, resetForm).then(() =>
      setIsSubmitting(false)
    );
  };

  return (
    <Form aria-label={formName} className={className} onSubmit={submitHandler}>
      <LabelledField
        className={styles.field}
        id="contact-name"
        label={nameLabel}
        name="contact-name"
        required={true}
        setValue={setName}
        type="text"
        value={name}
      />
      <LabelledField
        className={styles.field}
        id="contact-email"
        label={emailLabel}
        name="contact-email"
        required={true}
        setValue={setEmail}
        type="email"
        value={email}
      />
      <LabelledField
        className={styles.field}
        id="contact-object"
        label={objectLabel}
        name="contact-object"
        setValue={setObject}
        type="text"
        value={object}
      />
      <LabelledField
        className={styles.field}
        id="contact-message"
        label={messageLabel}
        name="contact-message"
        required={true}
        setValue={setMessage}
        type="textarea"
        value={message}
      />
      <Button type="submit" kind="primary" className={styles.button}>
        {intl.formatMessage({
          defaultMessage: 'Send',
          description: 'ContactForm: send button',
          id: 'VkAnvv',
        })}
      </Button>
      {isSubmitting && (
        <Spinner
          message={intl.formatMessage({
            defaultMessage: 'Sending mail...',
            description: 'ContactForm: spinner message on submit',
            id: 'xaqaYQ',
          })}
        />
      )}
      {Notice}
    </Form>
  );
};
