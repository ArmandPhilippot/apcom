import { ComponentMeta, ComponentStory } from '@storybook/react';
import NoticeComponent from './notice';

/**
 * Notice - Storybook Meta
 */
export default {
  title: 'Atoms/Layout/Notice',
  component: NoticeComponent,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the notice wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    kind: {
      control: {
        type: 'select',
      },
      description: 'The notice kind.',
      options: ['error', 'info', 'success', 'warning'],
      type: {
        name: 'string',
        required: true,
      },
    },
    message: {
      control: {
        type: 'text',
      },
      description: 'The notice body.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof NoticeComponent>;

const Template: ComponentStory<typeof NoticeComponent> = (args) => (
  <NoticeComponent {...args} />
);

/**
 * Notice stories - Error
 */
export const Error = Template.bind({});
Error.args = {
  kind: 'error',
  message: 'Nisi provident sapiente.',
};

/**
 * Notice stories - Info
 */
export const Info = Template.bind({});
Info.args = {
  kind: 'info',
  message: 'Nisi provident sapiente.',
};

/**
 * Notice stories - Success
 */
export const Success = Template.bind({});
Success.args = {
  kind: 'success',
  message: 'Nisi provident sapiente.',
};

/**
 * Notice stories - Warning
 */
export const Warning = Template.bind({});
Warning.args = {
  kind: 'warning',
  message: 'Nisi provident sapiente.',
};
