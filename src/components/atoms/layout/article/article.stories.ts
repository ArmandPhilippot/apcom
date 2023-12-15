import type { Meta, StoryObj } from '@storybook/react';
import { Article } from './article';

const meta = {
  component: Article,
  title: 'Atoms/Layout/Article',
} satisfies Meta<typeof Article>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: 'The article contents.',
  },
};
