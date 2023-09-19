import { FC, ReactNode, useState } from 'react';
import { useIntl } from 'react-intl';
import Button from '../../atoms/buttons/button';
import Form from '../../atoms/forms/form';
import Spinner from '../../atoms/loaders/spinner';
import LabelledField from '../../molecules/forms/labelled-field';
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
const ContactForm: FC<ContactFormProps> = ({
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
    <Form aria-label={formName} onSubmit={submitHandler} className={className}>
      <LabelledField
        type="text"
        id="contact-name"
        name="contact-name"
        label={nameLabel}
        required={true}
        value={name}
        setValue={setName}
        className={styles.field}
      />
      <LabelledField
        type="email"
        id="contact-email"
        name="contact-email"
        label={emailLabel}
        required={true}
        value={email}
        setValue={setEmail}
        className={styles.field}
      />
      <LabelledField
        type="text"
        id="contact-object"
        name="contact-object"
        label={objectLabel}
        value={object}
        setValue={setObject}
        className={styles.field}
      />
      <LabelledField
        type="textarea"
        id="contact-message"
        name="contact-message"
        label={messageLabel}
        required={true}
        value={message}
        setValue={setMessage}
        className={styles.field}
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

export default ContactForm;
