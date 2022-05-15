import { ComponentMeta, ComponentStory } from '@storybook/react';
import CommentForm from './comment-form';

const saveComment = async () => {
  /** Do nothing. */
};

/**
 * CommentForm - Storybook Meta
 */
export default {
  title: 'Organisms/Forms',
  component: CommentForm,
  args: {
    saveComment,
  },
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the form wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
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
    saveComment: {
      control: {
        type: null,
      },
      description: 'A callback function to process the comment form data.',
      type: {
        name: 'function',
        required: true,
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'The form title.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    titleLevel: {
      control: {
        type: 'number',
        min: 1,
        max: 6,
      },
      description: 'The title level (hn).',
      table: {
        category: 'Options',
      },
      type: {
        name: 'number',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof CommentForm>;

const Template: ComponentStory<typeof CommentForm> = (args) => (
  <CommentForm {...args} />
);

/**
 * Forms Stories - Comment
 */
export const Comment = Template.bind({});
