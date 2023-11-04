import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { UserComment } from './comment';
import { data } from './comment.fixture';

const saveComment = async () => {
  /** Do nothing. */
};

/**
 * Comment - Storybook Meta
 */
export default {
  title: 'Organisms/Layout/Comment',
  component: UserComment,
  args: {
    canReply: true,
    onSubmit: saveComment,
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
    onSubmit: {
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
} as ComponentMeta<typeof UserComment>;

const Template: ComponentStory<typeof UserComment> = (args) => (
  <UserComment {...args} />
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
