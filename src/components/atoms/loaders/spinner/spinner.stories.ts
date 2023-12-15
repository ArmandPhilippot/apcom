import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './spinner';

const meta = {
  component: Spinner,
  title: 'Atoms/Loaders/Spinner',
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    'aria-label': 'A spinner example',
  },
};

export const WithTextOnBottom: Story = {
  args: {
    children: 'A spinner example',
    position: 'bottom',
  },
};

export const WithTextOnLeft: Story = {
  args: {
    children: 'A spinner example',
    position: 'left',
  },
};

export const WithTextOnRight: Story = {
  args: {
    children: 'A spinner example',
    position: 'right',
  },
};

export const WithTextOnTop: Story = {
  args: {
    children: 'A spinner example',
    position: 'top',
  },
};
