import type { Meta, StoryObj } from '@storybook/react';
import { VisuallyHidden } from './visually-hidden';

const meta = {
  component: VisuallyHidden,
  title: 'Atoms/Visually Hidden',
} satisfies Meta<typeof VisuallyHidden>;

export default meta;

type Story = StoryObj<typeof meta>;

const VisuallyHiddenTemplate: Story = {
  args: {
    children: 'Some content not focusable.',
  },
};

export const NotFocusable: Story = {
  args: {
    ...VisuallyHiddenTemplate.args,
  },
};

export const Focusable: Story = {
  args: {
    ...VisuallyHiddenTemplate.args,
    children: <a href="#anchor">A skip to anchor link</a>,
  },
};
