import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Notice as NoticeComponent } from './notice';

/**
 * Notice - Storybook Meta
 */
export default {
  title: 'Atoms/Notice',
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
    children: {
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
export const ErrorKind = Template.bind({});
ErrorKind.args = {
  children: 'Nisi provident sapiente.',
  kind: 'error',
};

/**
 * Notice stories - Info
 */
export const InfoKind = Template.bind({});
InfoKind.args = {
  children: 'Nisi provident sapiente.',
  kind: 'info',
};

/**
 * Notice stories - Success
 */
export const SuccessKind = Template.bind({});
SuccessKind.args = {
  children: 'Nisi provident sapiente.',
  kind: 'success',
};

/**
 * Notice stories - Warning
 */
export const WarningKind = Template.bind({});
WarningKind.args = {
  children: 'Nisi provident sapiente.',
  kind: 'warning',
};
