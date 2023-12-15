import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './footer';

const meta = {
  component: Footer,
  title: 'Atoms/Layout/Footer',
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: 'The footer contents.',
  },
};
