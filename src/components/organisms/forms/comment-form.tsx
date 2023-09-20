import { FC, ReactNode, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Button,
  Form,
  type FormProps,
  Heading,
  type HeadingLevel,
  type HeadingProps,
  Spinner,
} from '../../atoms';
import { LabelledField } from '../../molecules';
import styles from './comment-form.module.scss';

export type CommentFormData = {
  comment: string;
  email: string;
  name: string;
  parentId?: number;
  website?: string;
};

export type CommentFormProps = Pick<FormProps, 'className'> & {
  /**
   * Pass a component to print a success/error message.
   */
  Notice?: ReactNode;
  /**
   * The comment parent id.
   */
  parentId?: number;
  /**
   * A callback function to save comment. It takes a function as parameter to
   * reset the form.
   */
  saveComment: (data: CommentFormData, reset: () => void) => Promise<void>;
  /**
   * The form title.
   */
  title?: string;
  /**
   * The form title alignment. Default: left.
   */
  titleAlignment?: HeadingProps['alignment'];
  /**
   * The title level. Default: 2.
   */
  titleLevel?: HeadingLevel;
};

export const CommentForm: FC<CommentFormProps> = ({
  Notice,
  parentId,
  saveComment,
  title,
  titleAlignment,
  titleLevel = 2,
  ...props
}) => {
  const intl = useIntl();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /**
   * Reset all the form fields.
   */
  const resetForm = () => {
    setName('');
    setEmail('');
    setWebsite('');
    setComment('');
    setIsSubmitting(false);
  };

  const nameLabel = intl.formatMessage({
    defaultMessage: 'Name:',
    description: 'CommentForm: name label',
    id: 'ZIrTee',
  });

  const emailLabel = intl.formatMessage({
    defaultMessage: 'Email:',
    description: 'CommentForm: email label',
    id: 'Bh7z5v',
  });

  const websiteLabel = intl.formatMessage({
    defaultMessage: 'Website:',
    description: 'CommentForm: website label',
    id: 'u41qSk',
  });

  const commentLabel = intl.formatMessage({
    defaultMessage: 'Comment:',
    description: 'CommentForm: comment label',
    id: 'A8hGaK',
  });

  const formTitle = intl.formatMessage({
    defaultMessage: 'Comment form',
    description: 'CommentForm: aria label',
    id: 'dz2kDV',
  });

  const formAriaLabel = title ? undefined : formTitle;
  const formId = 'comment-form-title';
  const formLabelledBy = title ? formId : undefined;

  /**
   * Handle form submit.
   */
  const submitHandler = () => {
    setIsSubmitting(true);
    saveComment({ comment, email, name, parentId, website }, resetForm).then(
      () => setIsSubmitting(false)
    );
  };

  return (
    <Form
      {...props}
      aria-label={formAriaLabel}
      aria-labelledby={formLabelledBy}
      onSubmit={submitHandler}
    >
      {title && (
        <Heading alignment={titleAlignment} id={formId} level={titleLevel}>
          {title}
        </Heading>
      )}
      <LabelledField
        className={styles.field}
        id="commenter-name"
        label={nameLabel}
        name="commenter-name"
        required={true}
        setValue={setName}
        type="text"
        value={name}
      />
      <LabelledField
        className={styles.field}
        id="commenter-email"
        label={emailLabel}
        name="commenter-email"
        required={true}
        setValue={setEmail}
        type="email"
        value={email}
      />
      <LabelledField
        className={styles.field}
        id="commenter-website"
        label={websiteLabel}
        name="commenter-website"
        required={false}
        setValue={setWebsite}
        type="text"
        value={website}
      />
      <LabelledField
        className={styles.field}
        id="commenter-comment"
        label={commentLabel}
        name="commenter-comment"
        required={true}
        setValue={setComment}
        type="textarea"
        value={comment}
      />
      <Button type="submit" kind="primary" className={styles.button}>
        {intl.formatMessage({
          defaultMessage: 'Publish',
          description: 'CommentForm: submit button',
          id: 'OL0Yzx',
        })}
      </Button>
      {isSubmitting && (
        <Spinner
          message={intl.formatMessage({
            defaultMessage: 'Submitting...',
            description: 'CommentForm: spinner message on submit',
            id: 'IY5ew6',
          })}
        />
      )}
      {Notice}
    </Form>
  );
};
