import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './breadcrumbs';

const meta = {
  component: Breadcrumbs,
  title: 'Organisms/Nav/Breadcrumbs',
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OneItem: Story = {
  args: {
    items: [{ id: 'home', slug: '#', label: 'Home' }],
  },
};

export const TwoItems: Story = {
  args: {
    items: [
      { id: 'home', slug: '#', label: 'Home' },
      { id: 'blog', slug: '#', label: 'Blog' },
    ],
  },
};

export const ThreeItemsOrMore: Story = {
  args: {
    items: [
      { id: 'home', slug: '#', label: 'Home' },
      { id: 'blog', slug: '#', label: 'Blog' },
      { id: 'post1', slug: '#', label: 'A Post' },
    ],
  },
};
