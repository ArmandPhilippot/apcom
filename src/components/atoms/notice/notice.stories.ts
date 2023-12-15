import type { Meta, StoryObj } from '@storybook/react';
import { Notice } from './notice';

const meta = {
  component: Notice,
  title: 'Atoms/Notice',
} satisfies Meta<typeof Notice>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ErrorKind: Story = {
  args: {
    children: 'Nisi provident sapiente.',
    kind: 'error',
  },
};

export const InfoKind: Story = {
  args: {
    children: 'Nisi provident sapiente.',
    kind: 'info',
  },
};

export const SuccessKind: Story = {
  args: {
    children: 'Nisi provident sapiente.',
    kind: 'success',
  },
};

export const WarningKind: Story = {
  args: {
    children: 'Nisi provident sapiente.',
    kind: 'warning',
  },
};
