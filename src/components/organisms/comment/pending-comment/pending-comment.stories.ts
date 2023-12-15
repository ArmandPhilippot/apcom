import type { Meta, StoryObj } from '@storybook/react';
import { PendingComment } from './pending-comment';

const meta = {
  component: PendingComment,
  title: 'Organisms/Comment/Pending',
} satisfies Meta<typeof PendingComment>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
