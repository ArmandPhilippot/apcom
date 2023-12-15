import type { Meta, StoryObj } from '@storybook/react';
import NextImage from 'next/image';
import { Logo } from '../../../atoms';
import { FlippingLogo } from './flipping-logo';

const meta = {
  component: FlippingLogo,
  title: 'Molecules/Images/Flipping Logo',
} satisfies Meta<typeof FlippingLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    back: <Logo heading="A logo example" />,
    front: (
      <NextImage
        alt="A photo example"
        height={200}
        src="https://picsum.photos/200"
        width={200}
      />
    ),
  },
};
