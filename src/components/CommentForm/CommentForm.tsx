import { ButtonSubmit } from '@components/Buttons';
import { Form, FormItem, Input, TextArea } from '@components/Form';
import Notice from '@components/Notice/Notice';
import Spinner from '@components/Spinner/Spinner';
import { createComment } from '@services/graphql/mutations';
import { NoticeType } from '@ts/types/app';
import { ForwardedRef, forwardRef, useState } from 'react';
import { useIntl } from 'react-intl';
import styles from './CommentForm.module.scss';

const CommentForm = (
  { articleId, parentId = 0 }: { articleId: number; parentId?: number },
  ref: ForwardedRef<HTMLInputElement>
) => {
  const intl = useIntl();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [notice, setNotice] = useState<string>();
  const [noticeType, setNoticeType] = useState<NoticeType>('success');

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
        modifier={isReply ? 'centered' : undefined}
      >
        <FormItem>
          <Input
            id="commenter-name"
            name="commenter-name"
            label={intl.formatMessage({
              defaultMessage: 'Name',
              description: 'CommentForm: Name field label',
            })}
            required={true}
            value={name}
            setValue={setName}
            ref={ref}
          />
        </FormItem>
        <FormItem>
          <Input
            id="commenter-email"
            name="commenter-email"
            type="email"
            label={intl.formatMessage({
              defaultMessage: 'Email',
              description: 'CommentForm: Email field label',
            })}
            required={true}
            value={email}
            setValue={setEmail}
          />
        </FormItem>
        <FormItem>
          <Input
            id="commenter-website"
            name="commenter-website"
            label={intl.formatMessage({
              defaultMessage: 'Website',
              description: 'CommentForm: Website field label',
            })}
            value={website}
            setValue={setWebsite}
          />
        </FormItem>
        <FormItem>
          <TextArea
            id="commenter-comment"
            name="commenter-comment"
            label={intl.formatMessage({
              defaultMessage: 'Comment',
              description: 'CommentForm: Comment field label',
            })}
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

export default forwardRef(CommentForm);
