import type { Meta, StoryObj } from '@storybook/react';
import { ApprovedComment } from './approved-comment';

const meta = {
  component: ApprovedComment,
  title: 'Organisms/Comment/Approved',
} satisfies Meta<typeof ApprovedComment>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    author: {
      name: 'Kameron.Conn',
    },
    content:
      'Quia est eos deserunt qui perferendis est pariatur eaque. Deserunt omnis quis consectetur ea quam a cupiditate. Velit laboriosam rem nihil numquam quia.',
    id: 1,
    publicationDate: '2023-11-06',
  },
};

export const WithAvatar: Story = {
  args: {
    author: {
      avatar: {
        alt: 'Kameron.Conn avatar',
        src: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/82.jpg',
      },
      name: 'Kameron.Conn',
    },
    content:
      'Quia est eos deserunt qui perferendis est pariatur eaque. Deserunt omnis quis consectetur ea quam a cupiditate. Velit laboriosam rem nihil numquam quia.',
    id: 2,
    publicationDate: '2023-11-06',
  },
};

export const WithWebsite: Story = {
  args: {
    author: {
      name: 'Kameron.Conn',
      website: 'https://www.armandphilippot.com/',
    },
    content:
      'Quia est eos deserunt qui perferendis est pariatur eaque. Deserunt omnis quis consectetur ea quam a cupiditate. Velit laboriosam rem nihil numquam quia.',
    id: 3,
    publicationDate: '2023-11-06',
  },
};

export const WithReplyBtn: Story = {
  args: {
    author: {
      name: 'Kameron.Conn',
    },
    content:
      'Quia est eos deserunt qui perferendis est pariatur eaque. Deserunt omnis quis consectetur ea quam a cupiditate. Velit laboriosam rem nihil numquam quia.',
    id: 4,
    publicationDate: '2023-11-06',
    replyBtn: 'Reply',
  },
};
