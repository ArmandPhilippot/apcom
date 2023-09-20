import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Modal } from './modal';

/**
 * Widget - Storybook Meta
 */
export default {
  title: 'Molecules/Modals/Modal',
  component: Modal,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'The modal body.',
      type: {
        name: 'string',
        required: true,
      },
    },
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the modal.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    headingClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the modal heading.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    icon: {
      control: {
        type: 'select',
      },
      description: 'The title icon.',
      options: ['', 'cogs', 'search'],
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'The modal title.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

/**
 * Modal Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  children:
    'Inventore natus dignissimos aut illum modi asperiores. Et voluptatibus delectus.',
};

/**
 * Modal Stories - With title
 */
export const WithTitle = Template.bind({});
WithTitle.args = {
  children:
    'Inventore natus dignissimos aut illum modi asperiores. Et voluptatibus delectus.',
  title: 'Alias praesentium corporis',
};
