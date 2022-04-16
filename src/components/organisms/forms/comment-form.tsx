import Button from '@components/atoms/buttons/button';
import Form from '@components/atoms/forms/form';
import Heading, { type HeadingLevel } from '@components/atoms/headings/heading';
import Spinner from '@components/atoms/loaders/spinner';
import LabelledField from '@components/molecules/forms/labelled-field';
import { FC, ReactNode, useState } from 'react';
import { useIntl } from 'react-intl';
import styles from './comment-form.module.scss';

export type CommentFormProps = {
  /**
   * Set additional classnames to the form wrapper.
   */
  className?: string;
  /**
   * Pass a component to print a success/error message.
   */
  Notice?: ReactNode;
  /**
   * A callback function to save comment. It takes a function as parameter to
   * reset the form.
   */
  saveComment: (reset: () => void) => void;
  /**
   * The form title.
   */
  title?: string;
  /**
   * The title level.
   */
  titleLevel?: HeadingLevel;
};

const CommentForm: FC<CommentFormProps> = ({
  className = '',
  Notice,
  saveComment,
  title,
  titleLevel = 2,
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
    saveComment(resetForm);
  };

  return (
    <Form
      onSubmit={submitHandler}
      className={className}
      aria-label={formAriaLabel}
      aria-labelledby={formLabelledBy}
    >
      {title && (
        <Heading id={formId} level={titleLevel}>
          {title}
        </Heading>
      )}
      <LabelledField
        type="text"
        id="commenter-name"
        name="commenter-name"
        label={nameLabel}
        required={true}
        value={name}
        setValue={setName}
        className={styles.field}
      />
      <LabelledField
        type="email"
        id="commenter-email"
        name="commenter-email"
        label={emailLabel}
        required={true}
        value={email}
        setValue={setEmail}
        className={styles.field}
      />
      <LabelledField
        type="text"
        id="commenter-website"
        name="commenter-website"
        label={websiteLabel}
        required={false}
        value={website}
        setValue={setWebsite}
        className={styles.field}
      />
      <LabelledField
        type="textarea"
        id="commenter-comment"
        name="commenter-comment"
        label={commentLabel}
        required={true}
        value={comment}
        setValue={setComment}
        className={styles.field}
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

export default CommentForm;
