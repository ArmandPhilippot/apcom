import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';

const meta = {
  component: Label,
  title: 'Atoms/Forms/Label',
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'A label',
  },
};

export const VisuallyHidden: Story = {
  args: {
    children: 'A visually hidden label',
    isHidden: true,
  },
};

export const IsRequired: Story = {
  name: 'State: Required',
  args: {
    ...Default.args,
    isRequired: true,
  },
};

export const SizeSM: Story = {
  name: 'Size: Small',
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const SizeMD: Story = {
  name: 'Size: Medium',
  args: {
    ...Default.args,
    size: 'md',
  },
};
