import type { Meta, StoryObj } from '@storybook/react';
import { Aside } from './aside';

const meta = {
  component: Aside,
  title: 'Atoms/Layout/Aside',
} satisfies Meta<typeof Aside>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: 'The aside contents.',
  },
};
