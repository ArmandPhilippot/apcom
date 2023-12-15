import type { Meta, StoryObj } from '@storybook/react';
import { SocialLink } from './social-link';

const meta = {
  component: SocialLink,
  title: 'Atoms/Links/Social',
} satisfies Meta<typeof SocialLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Github: Story = {
  args: {
    icon: 'Github',
    label: 'Github profile',
    url: '#github',
  },
};

export const Gitlab: Story = {
  args: {
    icon: 'Gitlab',
    label: 'Gitlab profile',
    url: '#gitlab',
  },
};

export const LinkedIn: Story = {
  args: {
    icon: 'LinkedIn',
    label: 'LinkedIn profile',
    url: '#linkedin',
  },
};

export const Twitter: Story = {
  args: {
    icon: 'Twitter',
    label: 'Twitter profile',
    url: '#twitter',
  },
};
