import type { Meta, StoryObj } from '@storybook/react';
import NextImage from 'next/image';
import { Figure } from './figure';

const meta = {
  component: Figure,
  title: 'Atoms/Figure',
} satisfies Meta<typeof Figure>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <NextImage
        alt="An example"
        height={480}
        src="https://picsum.photos/640/480"
        width={640}
      />
    ),
  },
};

export const Bordered: Story = {
  args: {
    children: (
      <NextImage
        alt="An example"
        height={480}
        src="https://picsum.photos/640/480"
        width={640}
      />
    ),
    hasBorders: true,
  },
};
