import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './header';

const meta = {
  component: Header,
  title: 'Atoms/Layout/Header',
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: 'The header contents.',
  },
};
