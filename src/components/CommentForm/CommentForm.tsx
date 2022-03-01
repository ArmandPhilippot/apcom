import { ButtonSubmit } from '@components/Buttons';
import { Field, Form, FormItem, Label } from '@components/FormElements';
import Notice from '@components/Notice/Notice';
import Spinner from '@components/Spinner/Spinner';
import { createComment } from '@services/graphql/mutations';
import { NoticeType } from '@ts/types/app';
import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import styles from './CommentForm.module.scss';

const CommentForm = ({
  articleId,
  parentId = 0,
}: {
  articleId: number;
  parentId?: number;
}) => {
  const intl = useIntl();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [notice, setNotice] = useState<string>();
  const [noticeType, setNoticeType] = useState<NoticeType>('success');
  const nameFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (parentId === 0) return;
    nameFieldRef.current && nameFieldRef.current.focus();
  });

  const resetForm = () => {
    setName('');
    setEmail('');
    setWebsite('');
    setComment('');
    setIsSubmitting(false);
  };

  const isEmptyString = (value: string): boolean => value.trim() === '';
  const areRequiredFieldsSet = (): boolean =>
    !isEmptyString(name) && !isEmptyString(email) && !isEmptyString(comment);

  const sendComment = async () => {
    const data = {
      author: name,
      authorEmail: email,
      authorUrl: website,
      content: comment,
      parent: parentId,
      commentOn: articleId,
      mutationId: 'createComment',
    };

    const createdComment = await createComment(data);

    if (createdComment.success) {
      resetForm();
      setNoticeType('success');
      if (createdComment.comment?.approved) {
        setNotice(
          intl.formatMessage({
            defaultMessage: 'Thanks for your comment!',
            description: 'CommentForm: success notice',
          })
        );
      } else {
        setNotice(
          intl.formatMessage({
            defaultMessage:
              'Thanks for your comment! It is now awaiting moderation.',
            description: 'CommentForm: success notice but awaiting moderation',
          })
        );
      }

      setTimeout(() => {
        setNotice(undefined);
      }, 10000);
    } else {
      setNoticeType('error');
      setNotice(
        intl.formatMessage({
          defaultMessage:
            'An unexpected error happened. Comment cannot be submitted.',
          description: 'CommentForm: error notice',
        })
      );
    }
  };

  const submitHandler = async (e: SubmitEvent) => {
    e.preventDefault();
    setNotice(undefined);
    setIsSubmitting(true);

    if (areRequiredFieldsSet()) {
      sendComment();
    } else {
      setIsSubmitting(false);
      setNoticeType('warning');
      setNotice(
        intl.formatMessage({
          defaultMessage:
            'Some required fields are empty. Comment cannot be submitted.',
          description: 'CommentForm: missing required fields',
        })
      );
    }
  };

  const isReply = parentId !== 0;
  const wrapperClasses = `${styles.wrapper} ${
    isReply ? styles['wrapper--reply'] : ''
  }`;

  const getLabel = (
    body: string,
    htmlFor: string,
    required: boolean = false
  ) => {
    return <Label body={body} htmlFor={htmlFor} required={required} />;
  };

  const nameLabelBody = intl.formatMessage({
    defaultMessage: 'Name',
    description: 'CommentForm: Name field label',
  });

  const emailLabelBody = intl.formatMessage({
    defaultMessage: 'Email',
    description: 'CommentForm: Email field label',
  });

  const websiteLabelBody = intl.formatMessage({
    defaultMessage: 'Website',
    description: 'CommentForm: Website field label',
  });

  const commentLabelBody = intl.formatMessage({
    defaultMessage: 'Comment',
    description: 'CommentForm: Comment field label',
  });

  return (
    <div className={wrapperClasses}>
      <h2 className={styles.title}>
        {intl.formatMessage({
          defaultMessage: 'Leave a comment',
          description: 'CommentForm: Form title',
        })}
      </h2>
      <Form
        submitHandler={submitHandler}
        kind={isReply ? 'centered' : undefined}
      >
        <FormItem>
          <Field
            id="commenter-name"
            name="commenter-name"
            label={getLabel(nameLabelBody, 'commenter-name', true)}
            value={name}
            setValue={setName}
            required={true}
            ref={nameFieldRef}
          />
        </FormItem>
        <FormItem>
          <Field
            id="commenter-email"
            name="commenter-email"
            kind="email"
            label={getLabel(emailLabelBody, 'commenter-email', true)}
            value={email}
            setValue={setEmail}
            required={true}
          />
        </FormItem>
        <FormItem>
          <Field
            id="commenter-website"
            name="commenter-website"
            label={getLabel(websiteLabelBody, 'commenter-website')}
            value={website}
            setValue={setWebsite}
          />
        </FormItem>
        <FormItem>
          <Field
            id="commenter-comment"
            name="commenter-comment"
            kind="textarea"
            label={getLabel(commentLabelBody, 'commenter-comment', true)}
            value={comment}
            setValue={setComment}
            required={true}
          />
        </FormItem>
        <FormItem>
          <noscript>
            {intl.formatMessage({
              defaultMessage: 'Javascript is required to post a comment.',
              description: 'CommentForm: noscript tag',
            })}
          </noscript>
          <ButtonSubmit>
            {intl.formatMessage({
              defaultMessage: 'Send',
              description: 'CommentForm: Send button',
            })}
          </ButtonSubmit>
        </FormItem>
      </Form>
      {isSubmitting && (
        <Spinner
          message={intl.formatMessage({
            defaultMessage: 'Submitting...',
            description: 'CommentForm: submitting message',
          })}
        />
      )}
      {notice && <Notice type={noticeType}>{notice}</Notice>}
    </div>
  );
};

export default CommentForm;
