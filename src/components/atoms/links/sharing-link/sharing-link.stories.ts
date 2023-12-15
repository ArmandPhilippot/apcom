import type { Meta, StoryObj } from '@storybook/react';
import { SharingLink } from './sharing-link';

const meta = {
  component: SharingLink,
  title: 'Atoms/Links/Share',
} satisfies Meta<typeof SharingLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Diaspora: Story = {
  args: {
    label: 'Share on Diaspora',
    medium: 'diaspora',
    url: '#diaspora',
  },
};

export const Email: Story = {
  args: {
    label: 'Share by Email',
    medium: 'email',
    url: '#email',
  },
};

export const Facebook: Story = {
  args: {
    label: 'Share on Facebook',
    medium: 'facebook',
    url: '#facebook',
  },
};

export const JournalDuHacker: Story = {
  args: {
    label: 'Share on Journal du Hacker',
    medium: 'journal-du-hacker',
    url: '#journal-du-hacker',
  },
};

export const LinkedIn: Story = {
  args: {
    label: 'Share on LinkedIn',
    medium: 'linkedin',
    url: '#linkedin',
  },
};

export const Twitter: Story = {
  args: {
    label: 'Share on Twitter',
    medium: 'twitter',
    url: '#twitter',
  },
};
