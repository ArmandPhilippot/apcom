import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './sidebar';

const meta = {
  component: Sidebar,
  title: 'Atoms/Sidebar',
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: 'Some widgets.',
  },
};
