import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Comment } from './comment';
import { data } from './comment.fixture';

const saveComment = async () => {
  /** Do nothing. */
};

/**
 * Comment - Storybook Meta
 */
export default {
  title: 'Organisms/Layout/Comment',
  component: Comment,
  args: {
    canReply: true,
    saveComment,
  },
  argTypes: {
    author: {
      description: 'The author data.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    canReply: {
      control: {
        type: 'boolean',
      },
      description: 'Enable or disable the reply button.',
      table: {
        category: 'Options',
        defaultValue: { summary: true },
      },
      type: {
        name: 'boolean',
        required: false,
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
        type: 'number',
      },
      description: 'The comment id.',
      type: {
        name: 'number',
        required: true,
      },
    },
    Notice: {
      control: {
        type: null,
      },
      description: 'A component to display a success or error message.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'function',
        required: false,
      },
    },
    parentId: {
      control: {
        type: null,
      },
      description: 'The parent id if it is a reply.',
      type: {
        name: 'number',
        required: false,
      },
    },
    publication: {
      description: 'The publication date.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    saveComment: {
      control: {
        type: null,
      },
      description: 'A callback function to save the comment form data.',
      table: {
        category: 'Events',
      },
      type: {
        name: 'function',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof Comment>;

const Template: ComponentStory<typeof Comment> = (args) => (
  <Comment {...args} />
);

/**
 * Layout Stories - Approved
 */
export const Approved = Template.bind({});
Approved.args = {
  ...data,
};

/**
 * Layout Stories - Unapproved
 */
export const Unapproved = Template.bind({});
Unapproved.args = {
  ...data,
  approved: false,
};
