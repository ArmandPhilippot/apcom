import type { Meta, StoryObj } from '@storybook/react';
import { ContactForm, type ContactFormSubmit } from './contact-form';

const meta = {
  component: ContactForm,
  title: 'Organisms/Forms/Contact',
} satisfies Meta<typeof ContactForm>;

export default meta;

type Story = StoryObj<typeof meta>;

const sendMail: ContactFormSubmit = () => {
  console.log('Mail sent!');

  return undefined;
};

export const Example: Story = {
  args: {
    onSubmit: sendMail,
  },
};
