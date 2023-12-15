import type { Meta, StoryObj } from '@storybook/react';
import { CommentForm, type CommentFormSubmit } from './comment-form';

const meta = {
  component: CommentForm,
  title: 'Organisms/Forms/Comment',
} satisfies Meta<typeof CommentForm>;

export default meta;

type Story = StoryObj<typeof meta>;

const saveComment: CommentFormSubmit = () => {
  console.log('Comment saved!');

  return undefined;
};

export const Example: Story = {
  args: {
    onSubmit: saveComment,
  },
};
