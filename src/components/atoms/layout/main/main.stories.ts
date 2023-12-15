import type { Meta, StoryObj } from '@storybook/react';
import { Main } from './main';

const meta = {
  component: Main,
  title: 'Atoms/Layout/Main',
} satisfies Meta<typeof Main>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: 'The main contents.',
  },
};
