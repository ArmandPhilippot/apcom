import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ApprovedComment } from './approved-comment';

/**
 * ApprovedComment - Storybook Meta
 */
export default {
  title: 'Organisms/Comment/ApprovedComment',
  component: ApprovedComment,
  argTypes: {
    author: {
      description: 'The author data.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    content: {
      control: {
        type: 'text',
      },
      description: 'The comment body.',
      type: {
        name: 'string',
        required: true,
      },
    },
    id: {
      control: {
        type: 'string',
      },
      description: 'The comment id.',
      type: {
        name: 'string',
        required: true,
      },
    },
    publicationDate: {
      control: {
        type: 'text',
      },
      description: 'The publication date.',
      type: {
        name: 'string',
        required: true,
      },
    },
    replyBtn: {
      control: {
        type: null,
      },
      description: 'Add a reply button.',
      type: {
        name: 'function',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof ApprovedComment>;

const Template: ComponentStory<typeof ApprovedComment> = (args) => (
  <ApprovedComment {...args} />
);

/**
 * ApprovedComment Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  author: {
    name: 'Kameron.Conn',
  },
  content:
    'Quia est eos deserunt qui perferendis est pariatur eaque. Deserunt omnis quis consectetur ea quam a cupiditate. Velit laboriosam rem nihil numquam quia.',
  id: 1,
  publicationDate: '2023-11-06',
};

/**
 * ApprovedComment Stories - WithAvatar
 */
export const WithAvatar = Template.bind({});
WithAvatar.args = {
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
};

/**
 * ApprovedComment Stories - WithWebsite
 */
export const WithWebsite = Template.bind({});
WithWebsite.args = {
  author: {
    name: 'Kameron.Conn',
    website: 'https://www.armandphilippot.com/',
  },
  content:
    'Quia est eos deserunt qui perferendis est pariatur eaque. Deserunt omnis quis consectetur ea quam a cupiditate. Velit laboriosam rem nihil numquam quia.',
  id: 3,
  publicationDate: '2023-11-06',
};

/**
 * ApprovedComment Stories - WithReplyBtn
 */
export const WithReplyBtn = Template.bind({});
WithReplyBtn.args = {
  author: {
    name: 'Kameron.Conn',
  },
  content:
    'Quia est eos deserunt qui perferendis est pariatur eaque. Deserunt omnis quis consectetur ea quam a cupiditate. Velit laboriosam rem nihil numquam quia.',
  id: 4,
  publicationDate: '2023-11-06',
  replyBtn: 'Reply',
};
