import Notice from '@components/atoms/layout/notice';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import CommentFormComponent from './comment-form';

export default {
  title: 'Organisms/Forms',
  component: CommentFormComponent,
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
} as ComponentMeta<typeof CommentFormComponent>;

const Template: ComponentStory<typeof CommentFormComponent> = (args) => (
  <IntlProvider locale="en">
    <CommentFormComponent {...args} />
  </IntlProvider>
);

export const CommentForm = Template.bind({});
CommentForm.args = {
  saveComment: (reset: () => void) => {
    reset();
  },
};
