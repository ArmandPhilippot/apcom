/* eslint-disable max-statements */
import {
  type ChangeEvent,
  type FC,
  type FormEvent,
  type ReactNode,
  useCallback,
  useMemo,
  useState,
  useId,
} from 'react';
import { useIntl } from 'react-intl';
import { useBoolean } from '../../../../utils/hooks';
import {
  Button,
  Form,
  type FormProps,
  Heading,
  type HeadingLevel,
  Spinner,
  Input,
  TextArea,
  Label,
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
   * The title level. Default: 2.
   */
  titleLevel?: HeadingLevel;
};

export const CommentForm: FC<CommentFormProps> = ({
  className = '',
  Notice,
  parentId,
  saveComment,
  title,
  titleLevel = 2,
  ...props
}) => {
  const formClass = `${styles.form} ${className}`;
  const intl = useIntl();
  const emptyForm: CommentFormData = useMemo(() => {
    return {
      author: '',
      comment: '',
      email: '',
      parentId,
      website: '',
    };
  }, [parentId]);
  const [data, setData] = useState(emptyForm);
  const {
    activate: activateNotice,
    deactivate: deactivateNotice,
    state: isSubmitting,
  } = useBoolean(false);

  /**
   * Reset all the form fields.
   */
  const resetForm = useCallback(() => {
    setData(emptyForm);
    deactivateNotice();
  }, [deactivateNotice, emptyForm]);

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

  const loadingMsg = intl.formatMessage({
    defaultMessage: 'Submitting...',
    description: 'CommentForm: spinner message on submit',
    id: 'IY5ew6',
  });

  const formAriaLabel = title ? undefined : formTitle;
  const formId = useId();
  const formLabelledBy = title ? formId : undefined;

  const updateForm = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      switch (e.target.name) {
        case 'author':
          setData((prevData) => {
            return { ...prevData, author: e.target.value };
          });
          break;
        case 'comment':
          setData((prevData) => {
            return { ...prevData, comment: e.target.value };
          });
          break;
        case 'email':
          setData((prevData) => {
            return { ...prevData, email: e.target.value };
          });
          break;
        case 'website':
          setData((prevData) => {
            return { ...prevData, website: e.target.value };
          });
          break;
        default:
          break;
      }
    },
    []
  );

  const sendForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      activateNotice();
      saveComment(data, resetForm).then(() => deactivateNotice());
    },
    [activateNotice, data, deactivateNotice, resetForm, saveComment]
  );

  return (
    <Form
      {...props}
      aria-label={formAriaLabel}
      aria-labelledby={formLabelledBy}
      className={formClass}
      onSubmit={sendForm}
    >
      {title ? (
        <Heading className={styles.title} id={formId} level={titleLevel}>
          {title}
        </Heading>
      ) : null}
      <LabelledField
        className={styles.field}
        field={
          <Input
            id="commenter-name"
            isRequired
            name="author"
            onChange={updateForm}
            type="text"
            value={data.author}
          />
        }
        label={
          <Label htmlFor="commenter-name" isRequired>
            {nameLabel}
          </Label>
        }
      />
      <LabelledField
        className={styles.field}
        field={
          <Input
            id="commenter-email"
            isRequired
            name="email"
            onChange={updateForm}
            type="email"
            value={data.email}
          />
        }
        label={
          <Label htmlFor="commenter-email" isRequired>
            {emailLabel}
          </Label>
        }
      />
      <LabelledField
        className={styles.field}
        field={
          <Input
            id="commenter-website"
            name="website"
            onChange={updateForm}
            type="url"
            value={data.website}
          />
        }
        label={<Label htmlFor="commenter-website">{websiteLabel}</Label>}
      />
      <LabelledField
        className={styles.field}
        field={
          <TextArea
            id="commenter-comment"
            isRequired
            name="comment"
            onChange={updateForm}
            value={data.comment}
          />
        }
        label={
          <Label htmlFor="commenter-comment" isRequired>
            {commentLabel}
          </Label>
        }
      />
      <Button type="submit" kind="primary" className={styles.button}>
        {intl.formatMessage({
          defaultMessage: 'Publish',
          description: 'CommentForm: submit button',
          id: 'OL0Yzx',
        })}
      </Button>
      {isSubmitting ? <Spinner>{loadingMsg}</Spinner> : null}
      {Notice}
    </Form>
  );
};
