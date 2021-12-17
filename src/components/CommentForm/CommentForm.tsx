import { ButtonSubmit } from '@components/Buttons';
import { Form, FormItem, Input, TextArea } from '@components/Form';
import { t } from '@lingui/macro';
import { useState } from 'react';

const CommentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');

  return (
    <Form>
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
    </Form>
  );
};

export default CommentForm;
