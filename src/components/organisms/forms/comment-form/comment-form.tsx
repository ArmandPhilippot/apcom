import { type FC, useCallback, useId } from 'react';
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
  Spinner,
  Input,
  TextArea,
  Label,
  Notice,
} from '../../../atoms';
import { LabelledField } from '../../../molecules';
import styles from './comment-form.module.scss';

export type CommentFormData = {
  author: string;
  comment: string;
  email: string;
  parentId?: number;
  website?: string;
};

export type CommentFormSubmit = FormSubmitHandler<CommentFormData>;

export type CommentFormProps = Omit<FormProps, 'children' | 'onSubmit'> & {
  /**
   * A callback function to handle form submit.
   */
  onSubmit?: CommentFormSubmit;
  /**
   * The comment parent id.
   */
  parentId?: number;
};

export const CommentForm: FC<CommentFormProps> = ({
  className = '',
  onSubmit,
  parentId,
  ...props
}) => {
  const formId = useId();
  const formClass = `${styles.form} ${className}`;
  const intl = useIntl();
  const { messages, submit, submitStatus, update, values } =
    useForm<CommentFormData>({
      initialValues:
        /* The order matter: it will be reused to generate the fields in the right
         * order. */
        {
          parentId,
          author: '',
          email: '',
          website: '',
          comment: '',
        },
      submitHandler: onSubmit,
    });

  const renderFields = useCallback(() => {
    const entries = Object.entries(values) as [
      keyof CommentFormData,
      CommentFormData[keyof CommentFormData],
    ][];
    const labels: Record<Exclude<keyof CommentFormData, 'parentId'>, string> = {
      author: intl.formatMessage({
        defaultMessage: 'Name:',
        description: 'CommentForm: name label',
        id: 'ZIrTee',
      }),
      comment: intl.formatMessage({
        defaultMessage: 'Comment:',
        description: 'CommentForm: comment label',
        id: 'A8hGaK',
      }),
      email: intl.formatMessage({
        defaultMessage: 'Email:',
        description: 'CommentForm: email label',
        id: 'Bh7z5v',
      }),
      website: intl.formatMessage({
        defaultMessage: 'Website:',
        description: 'CommentForm: website label',
        id: 'u41qSk',
      }),
    };

    return entries.map(([field, value]) => {
      const isRequired = field !== 'website';
      const inputType = field === 'email' ? 'email' : 'text';
      const fieldId = `${formId}-${field}`;

      return field === 'parentId' ? null : (
        <LabelledField
          className={styles.field}
          field={
            field === 'comment' ? (
              <TextArea
                id={fieldId}
                isRequired
                name={field}
                onChange={update}
                value={value}
              />
            ) : (
              <Input
                id={fieldId}
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
            <Label htmlFor={fieldId} isRequired={isRequired}>
              {labels[field]}
            </Label>
          }
        />
      );
    });
  }, [values, formId, intl, update]);

  const btnLabel = intl.formatMessage({
    defaultMessage: 'Publish',
    description: 'CommentForm: submit button',
    id: 'OL0Yzx',
  });

  const loadingMsg = intl.formatMessage({
    defaultMessage: 'Submitting...',
    description: 'CommentForm: spinner message on submit',
    id: 'IY5ew6',
  });

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
