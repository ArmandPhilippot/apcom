import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import CommentForm from './comment-form';

/**
 * CommentForm - Storybook Meta
 */
export default {
  title: 'Organisms/Forms',
  component: CommentForm,
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
  decorators: [
    (Story) => (
      <IntlProvider locale="en">
        <Story />
      </IntlProvider>
    ),
  ],
} as ComponentMeta<typeof CommentForm>;

const Template: ComponentStory<typeof CommentForm> = (args) => (
  <CommentForm {...args} />
);

/**
 * Forms Stories - Comment
 */
export const Comment = Template.bind({});
Comment.args = {
  saveComment: (reset: () => void) => {
    reset();
  },
};
