import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './progress-bar';

const meta = {
  component: ProgressBar,
  title: 'Atoms/Loaders/ProgressBar',
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

const max = 50;
const current = 10;
const label = `${current} loaded out of a total of ${max}`;

export const Example: Story = {
  args: {
    current,
    label,
    max,
  },
};
