import type { Meta, StoryObj } from '@storybook/react';
import { ButtonLink } from './button-link';

const meta = {
  component: ButtonLink,
  title: 'Atoms/Buttons/ButtonLink',
} satisfies Meta<typeof ButtonLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button Link',
    isDisabled: false,
    to: '#',
  },
};

export const Primary: Story = {
  name: 'Kind: Primary',
  args: {
    ...Default.args,
    kind: 'primary',
  },
};

export const Secondary: Story = {
  name: 'Kind: Secondary',
  args: {
    ...Default.args,
    kind: 'secondary',
  },
};

export const Tertiary: Story = {
  name: 'Kind: Tertiary',
  args: {
    ...Default.args,
    kind: 'tertiary',
  },
};

export const Enabled: Story = {
  name: 'State: Enabled',
  args: {
    ...Default.args,
    isDisabled: false,
  },
};

export const Disabled: Story = {
  name: 'State: Disabled',
  args: {
    ...Default.args,
    isDisabled: true,
  },
};

export const ExternalLink: Story = {
  name: 'State: External',
  args: {
    ...Default.args,
    isExternal: true,
  },
};

export const Circle: Story = {
  name: 'Shape: Circle',
  args: {
    ...Default.args,
    shape: 'circle',
  },
};

export const Rectangle: Story = {
  name: 'Shape: Rectangle',
  args: {
    ...Default.args,
    shape: 'rectangle',
  },
};

export const Square: Story = {
  name: 'Shape: Square',
  args: {
    ...Default.args,
    shape: 'square',
  },
};

export const Auto: Story = {
  name: 'Shape: Auto',
  args: {
    ...Default.args,
    shape: 'auto',
  },
};
