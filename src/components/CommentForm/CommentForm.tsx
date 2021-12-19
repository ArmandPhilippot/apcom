import { ButtonSubmit } from '@components/Buttons';
import { Form, FormItem, Input, TextArea } from '@components/Form';
import Notice from '@components/Notice/Notice';
import { t } from '@lingui/macro';
import { createComment } from '@services/graphql/mutations';
import { useState } from 'react';

const CommentForm = ({
  articleId,
  parentId = 0,
}: {
  articleId: number;
  parentId?: number;
}) => {
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

  return (
    <Form submitHandler={submitHandler}>
      <FormItem>
        <Input
          id="commenter-name"
          name="commenter-name"
          label={t`Name`}
          required={true}
          value={name}
          setValue={setName}
        />
      </FormItem>
      <FormItem>
        <Input
          id="commenter-email"
          name="commenter-email"
          label={t`Email`}
          required={true}
          value={email}
          setValue={setEmail}
        />
      </FormItem>
      <FormItem>
        <Input
          id="commenter-website"
          name="commenter-website"
          label={t`Website`}
          value={website}
          setValue={setWebsite}
        />
      </FormItem>
      <FormItem>
        <TextArea
          id="commenter-message"
          name="commenter-message"
          label={t`Comment`}
          value={message}
          setValue={setMessage}
          required={true}
        />
      </FormItem>
      <ButtonSubmit>{t`Send`}</ButtonSubmit>
      {isSuccess && !isApproved && (
        <Notice type="success">{t`Thanks for your comment! It is now awaiting moderation.`}</Notice>
      )}
    </Form>
  );
};

export default CommentForm;
