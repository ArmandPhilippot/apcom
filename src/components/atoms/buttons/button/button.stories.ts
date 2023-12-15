import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  component: Button,
  title: 'Atoms/Buttons/Button',
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
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

export const Neutral: Story = {
  name: 'Kind: Neutral',
  args: {
    ...Default.args,
    kind: 'neutral',
  },
};

export const Enabled: Story = {
  name: 'State: Enabled',
  args: {
    ...Default.args,
  },
};

export const Disabled: Story = {
  name: 'State: Disabled',
  args: {
    ...Default.args,
    isDisabled: true,
  },
};

export const Loading: Story = {
  name: 'State: Loading',
  args: {
    ...Default.args,
    isLoading: true,
  },
};

export const Pressed: Story = {
  name: 'State: Pressed',
  args: {
    ...Default.args,
    isPressed: true,
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

export const Initial: Story = {
  name: 'Shape: Initial',
  args: {
    ...Default.args,
    shape: 'initial',
  },
};
