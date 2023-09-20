import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AckeeToggle } from './ackee-toggle';
import { storageKey } from './ackee-toggle.fixture';

/**
 * AckeeToggle - Storybook Meta
 */
export default {
  title: 'Molecules/Forms/Toggle',
  component: AckeeToggle,
  argTypes: {
    bodyClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the fieldset body wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    buttonClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the help button.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the toggle wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    defaultValue: {
      control: {
        type: 'select',
      },
      description: 'Set the default value.',
      options: ['full', 'partial'],
      type: {
        name: 'string',
        required: true,
      },
    },
    groupClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the radio group wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    legendClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the legend.',
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
      description: 'Set local storage key.',
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
} as ComponentMeta<typeof AckeeToggle>;

const Template: ComponentStory<typeof AckeeToggle> = (args) => (
  <AckeeToggle {...args} />
);

/**
 * Toggle Stories - Ackee
 */
export const Ackee = Template.bind({});
Ackee.args = {
  defaultValue: 'full',
  storageKey,
};
