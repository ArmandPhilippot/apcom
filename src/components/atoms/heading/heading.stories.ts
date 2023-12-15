import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './heading';

const meta = {
  component: Heading,
  title: 'Atoms/Headings',
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

const HeadingTemplate: Story = {
  args: {
    children: 'The quick brown fox jumps over a lazy dog',
    isFake: false,
    level: 2,
  },
};

export const H1: Story = {
  args: {
    ...HeadingTemplate.args,
    level: 1,
  },
};

export const H2: Story = {
  args: {
    ...HeadingTemplate.args,
    level: 2,
  },
};

export const H3: Story = {
  args: {
    ...HeadingTemplate.args,
    level: 3,
  },
};

export const H4: Story = {
  args: {
    ...HeadingTemplate.args,
    level: 4,
  },
};

export const H5: Story = {
  args: {
    ...HeadingTemplate.args,
    level: 5,
  },
};

export const H6: Story = {
  args: {
    ...HeadingTemplate.args,
    level: 6,
  },
};

export const FakeH2: Story = {
  args: {
    ...HeadingTemplate.args,
    isFake: true,
    level: 2,
  },
};
