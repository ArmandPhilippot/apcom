import { ComponentMeta, ComponentStory } from '@storybook/react';
import AckeeSelect from './ackee-select';

/**
 * AckeeSelect - Storybook Meta
 */
export default {
  title: 'Molecules/Forms/Select',
  component: AckeeSelect,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the select wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    initialValue: {
      control: {
        type: 'select',
      },
      description: 'Initial selected option.',
      options: ['full', 'partial'],
      type: {
        name: 'string',
        required: true,
      },
    },
    labelClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the label wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    storageKey: {
      control: {
        type: 'text',
      },
      description: 'Set Ackee settings local storage key.',
      type: {
        name: 'string',
        required: true,
      },
    },
    tooltipClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the tooltip wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof AckeeSelect>;

const Template: ComponentStory<typeof AckeeSelect> = (args) => (
  <AckeeSelect {...args} />
);

/**
 * Select Stories - Ackee select
 */
export const Ackee = Template.bind({});
Ackee.args = {
  initialValue: 'full',
};
