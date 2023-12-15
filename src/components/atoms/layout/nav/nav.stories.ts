import type { Meta, StoryObj } from '@storybook/react';
import { Nav } from './nav';

const meta = {
  component: Nav,
  title: 'Atoms/Layout/Nav',
} satisfies Meta<typeof Nav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: 'The nav contents.',
  },
};
