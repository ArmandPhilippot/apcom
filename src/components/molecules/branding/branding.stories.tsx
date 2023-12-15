import type { Meta, StoryObj } from '@storybook/react';
import NextImage from 'next/image';
import { Heading } from '../../atoms';
import { Branding } from './branding';

const meta = {
  component: Branding,
  title: 'Molecules/Branding',
} satisfies Meta<typeof Branding>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LogoAndTitle: Story = {
  args: {
    logo: (
      <NextImage
        alt="Your brand logo"
        height={150}
        src="https://picsum.photos/150"
        width={150}
      />
    ),
    name: <Heading level={1}>Your brand name</Heading>,
  },
};

export const LogoTitleAndBaseline: Story = {
  args: {
    baseline: <div>Your brand baseline if any</div>,
    logo: (
      <NextImage
        alt="Your brand logo"
        height={150}
        src="https://picsum.photos/150"
        width={150}
      />
    ),
    name: <Heading level={1}>Your brand name</Heading>,
  },
};
