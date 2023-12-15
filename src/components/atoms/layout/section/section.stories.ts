import type { Meta, StoryObj } from '@storybook/react';
import { Section } from './section';

const meta = {
  component: Section,
  title: 'Atoms/Layout/Section',
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: 'The section contents.',
  },
};
