import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CommentsList } from './comments-list';
import { comments } from './comments-list.fixture';

const saveComment = async () => {
  /** Do nothing. */
};

/**
 * CommentsList - Storybook Meta
 */
export default {
  title: 'Organisms/Layout/CommentsList',
  component: CommentsList,
  args: {
    saveComment,
  },
  argTypes: {
    comments: {
      control: {
        type: null,
      },
      description: 'An array of comments.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    depth: {
      control: {
        type: 'number',
        min: 0,
        max: 4,
      },
      description: 'The maximum depth. Use `0` to not display nested comments.',
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
} as ComponentMeta<typeof CommentsList>;

const Template: ComponentStory<typeof CommentsList> = (args) => (
  <CommentsList {...args} />
);

/**
 * Layout Stories - Without child comments
 */
export const WithoutChildComments = Template.bind({});
WithoutChildComments.args = {
  comments,
  depth: 0,
};

/**
 * Layout Stories - With child comments
 */
export const WithChildComments = Template.bind({});
WithChildComments.args = {
  comments,
  depth: 1,
};
