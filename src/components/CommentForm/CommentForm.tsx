import { ButtonSubmit } from '@components/Buttons';
import { Form, FormItem, Input, TextArea } from '@components/Form';
import Notice from '@components/Notice/Notice';
import { createComment } from '@services/graphql/mutations';
import { ForwardedRef, forwardRef, useState } from 'react';
import { useIntl } from 'react-intl';
import styles from './CommentForm.module.scss';

const CommentForm = (
  {
    articleId,
    parentId = 0,
    isReply = false,
  }: {
    articleId: number;
    parentId?: number;
    isReply?: boolean;
  },
  ref: ForwardedRef<HTMLInputElement>
) => {
  const intl = useIntl();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const resetForm = () => {
    setName('');
    setEmail('');
    setWebsite('');
    setMessage('');
  };

  const submitHandler = async (e: SubmitEvent) => {
    e.preventDefault();

    if (name && email && message && articleId) {
      const data = {
        author: name,
        authorEmail: email,
        authorUrl: website,
        content: message,
        parent: parentId,
        commentOn: articleId,
        mutationId: 'createComment',
      };
      const createdComment = await createComment(data);

      if (createdComment.success) setIsSuccess(true);
      if (isSuccess) {
        resetForm();
        if (createdComment.comment?.approved) setIsApproved(true);

        setTimeout(() => {
          setIsSuccess(false);
          setIsApproved(false);
        }, 8000);
      }
    } else {
      setIsSuccess(false);
    }
  };

  const wrapperClasses = `${styles.wrapper} ${
    isReply ? styles['wrapper--reply'] : ''
  }`;

  return (
    <div className={wrapperClasses}>
      <h2 className={styles.title}>
        {intl.formatMessage({
          defaultMessage: 'Leave a comment',
          description: 'CommentForm: form title',
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
            id="commenter-message"
            name="commenter-message"
            label={intl.formatMessage({
              defaultMessage: 'Comment',
              description: 'CommentForm: Comment field label',
            })}
            value={message}
            setValue={setMessage}
            required={true}
          />
        </FormItem>
        <FormItem>
          <ButtonSubmit>
            {intl.formatMessage({
              defaultMessage: 'Send',
              description: 'CommentForm: Send button',
            })}
          </ButtonSubmit>
        </FormItem>
        {isSuccess && !isApproved && (
          <Notice type="success">
            {intl.formatMessage({
              defaultMessage:
                'Thanks for your comment! It is now awaiting moderation.',
              description: 'CommentForm: Comment sent success message',
            })}
          </Notice>
        )}
      </Form>
    </div>
  );
};

export default forwardRef(CommentForm);
