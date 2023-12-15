import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from './layout';

const meta = {
  component: Layout,
  title: 'Templates/Layout',
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'The contents.',
  },
};
