import type { Meta, StoryObj } from '@storybook/react';
import { Time } from './time';

const meta = {
  component: Time,
  title: 'Atoms/Layout/Time',
} satisfies Meta<typeof Time>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    date: '2022-03-15 10:44:20',
  },
};
