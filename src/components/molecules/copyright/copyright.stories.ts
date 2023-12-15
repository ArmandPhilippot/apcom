import type { Meta, StoryObj } from '@storybook/react';
import { Copyright } from './copyright';

const meta = {
  component: Copyright,
  title: 'Molecules/Copyright',
} satisfies Meta<typeof Copyright>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    from: '2012',
    owner: 'Your brand',
  },
};

export const WithEndYear: Story = {
  args: {
    from: '2012',
    owner: 'Your brand',
    to: '2023',
  },
};
