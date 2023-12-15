import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '../../../atoms';
import { ReplyCommentForm } from './reply-comment-form';

const meta = {
  component: ReplyCommentForm,
  title: 'Organisms/Comment/Reply Form',
} satisfies Meta<typeof ReplyCommentForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    commentId: 5,
    heading: <Heading level={2}>Reply to comment 5</Heading>,
  },
};
