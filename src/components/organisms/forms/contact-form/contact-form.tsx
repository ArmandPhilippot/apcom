import { ChangeEvent, FC, FormEvent, ReactNode, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Form, Input, Label, Spinner, TextArea } from '../../../atoms';
import { LabelledField } from '../../../molecules';
import styles from './contact-form.module.scss';

export type ContactFormData = {
  email: string;
  message: string;
  name: string;
  object: string;
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
  const formClass = `${styles.form} ${className}`;
  const intl = useIntl();
  const emptyForm: ContactFormData = {
    email: '',
    message: '',
    name: '',
    object: '',
  };
  const [data, setData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /**
   * Reset all the form fields.
   */
  const resetForm = () => {
    setData(emptyForm);
    setIsSubmitting(false);
  };

  const updateForm = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (e.target.name) {
      case 'email':
        setData((prevData) => {
          return { ...prevData, email: e.target.value };
        });
        break;
      case 'message':
        setData((prevData) => {
          return { ...prevData, message: e.target.value };
        });
        break;
      case 'name':
        setData((prevData) => {
          return { ...prevData, name: e.target.value };
        });
        break;
      case 'object':
        setData((prevData) => {
          return { ...prevData, object: e.target.value };
        });
        break;
      default:
        break;
    }
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

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    sendMail(data, resetForm).then(() => setIsSubmitting(false));
  };

  return (
    <Form aria-label={formName} className={formClass} onSubmit={submitHandler}>
      <LabelledField
        className={styles.field}
        field={
          <Input
            id="contact-name"
            isRequired
            name="name"
            onChange={updateForm}
            type="text"
            value={data.name}
          />
        }
        label={
          <Label htmlFor="contact-name" isRequired>
            {nameLabel}
          </Label>
        }
      />
      <LabelledField
        className={styles.field}
        field={
          <Input
            id="contact-email"
            isRequired
            name="email"
            onChange={updateForm}
            type="email"
            value={data.email}
          />
        }
        label={
          <Label htmlFor="contact-email" isRequired>
            {emailLabel}
          </Label>
        }
      />
      <LabelledField
        className={styles.field}
        field={
          <Input
            id="contact-object"
            name="object"
            onChange={updateForm}
            type="text"
            value={data.object}
          />
        }
        label={<Label htmlFor="contact-object">{objectLabel}</Label>}
      />
      <LabelledField
        className={styles.field}
        field={
          <TextArea
            id="contact-message"
            isRequired
            name="message"
            onChange={updateForm}
            value={data.message}
          />
        }
        label={
          <Label htmlFor="contact-message" isRequired>
            {messageLabel}
          </Label>
        }
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
