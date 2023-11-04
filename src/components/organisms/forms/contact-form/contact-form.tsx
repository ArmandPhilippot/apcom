import { type FC, useCallback } from 'react';
import { useIntl } from 'react-intl';
import type { Nullable } from '../../../../types';
import {
  type FormSubmitHandler,
  useForm,
  type FormSubmitStatus,
  type FormSubmitMessages,
} from '../../../../utils/hooks';
import {
  Button,
  Form,
  type FormProps,
  Input,
  Label,
  Spinner,
  TextArea,
  Notice,
} from '../../../atoms';
import { LabelledField } from '../../../molecules';
import styles from './contact-form.module.scss';

export type ContactFormData = {
  email: string;
  message: string;
  name: string;
  object: string;
};

export type ContactFormSubmit = FormSubmitHandler<ContactFormData>;

export type ContactFormProps = Omit<FormProps, 'children' | 'onSubmit'> & {
  /**
   * A callback function to handle form submit.
   */
  onSubmit?: ContactFormSubmit;
};

/**
 * ContactForm component
 *
 * Render a contact form.
 */
export const ContactForm: FC<ContactFormProps> = ({
  className = '',
  onSubmit,
  ...props
}) => {
  const formClass = `${styles.form} ${className}`;
  const intl = useIntl();
  const { messages, submit, submitStatus, update, values } =
    useForm<ContactFormData>({
      initialValues:
        /* The order matter: it will be reused to generate the fields in the right
         * order. */
        {
          name: '',
          email: '',
          object: '',
          message: '',
        },
      submitHandler: onSubmit,
    });

  const btnLabel = intl.formatMessage({
    defaultMessage: 'Send',
    description: 'ContactForm: send button',
    id: 'VkAnvv',
  });

  const loadingMsg = intl.formatMessage({
    defaultMessage: 'Sending mail...',
    description: 'ContactForm: spinner message on submit',
    id: 'xaqaYQ',
  });

  const renderFields = useCallback(() => {
    const entries = Object.entries(values) as [
      keyof ContactFormData,
      ContactFormData[keyof ContactFormData],
    ][];
    const labels = {
      email: intl.formatMessage({
        defaultMessage: 'Email:',
        description: 'ContactForm: email label',
        id: 'w4B5PA',
      }),
      message: intl.formatMessage({
        defaultMessage: 'Message:',
        description: 'ContactForm: message label',
        id: 'yN5P+m',
      }),
      name: intl.formatMessage({
        defaultMessage: 'Name:',
        description: 'ContactForm: name label',
        id: '1dCuCx',
      }),
      object: intl.formatMessage({
        defaultMessage: 'Object:',
        description: 'ContactForm: object label',
        id: 's8/tyz',
      }),
    };

    return entries.map(([field, value]) => {
      const isRequired = field !== 'object';
      const inputType = field === 'email' ? 'email' : 'text';

      return (
        <LabelledField
          className={styles.field}
          field={
            field === 'message' ? (
              <TextArea
                id={field}
                isRequired
                name={field}
                onChange={update}
                value={value}
              />
            ) : (
              <Input
                id={field}
                isRequired={isRequired}
                name={field}
                onChange={update}
                type={inputType}
                value={value}
              />
            )
          }
          key={field}
          label={
            <Label htmlFor={field} isRequired={isRequired}>
              {labels[field]}
            </Label>
          }
        />
      );
    });
  }, [values, intl, update]);

  const renderNotice = useCallback(
    (
      currentStatus: FormSubmitStatus,
      msg: Nullable<Partial<FormSubmitMessages>>
    ) => {
      switch (currentStatus) {
        case 'FAILED':
          return msg?.error ? (
            <Notice
              // eslint-disable-next-line react/jsx-no-literals
              kind="error"
            >
              {msg.error}
            </Notice>
          ) : null;
        case 'PENDING':
          return (
            <Notice
              // eslint-disable-next-line react/jsx-no-literals
              kind="info"
            >
              <Spinner className={styles.spinner}>{loadingMsg}</Spinner>
            </Notice>
          );
        case 'SUCCEEDED':
          return msg?.success ? (
            <Notice
              // eslint-disable-next-line react/jsx-no-literals
              kind="success"
            >
              {msg.success}
            </Notice>
          ) : null;
        default:
          return null;
      }
    },
    [loadingMsg]
  );

  return (
    <Form {...props} className={formClass} onSubmit={submit}>
      {renderFields()}
      <Button
        className={styles.btn}
        isLoading={submitStatus === 'PENDING'}
        // eslint-disable-next-line react/jsx-no-literals
        kind="primary"
        type="submit"
      >
        {btnLabel}
      </Button>
      {renderNotice(submitStatus, messages)}
    </Form>
  );
};
