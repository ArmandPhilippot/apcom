import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MotionToggle } from './motion-toggle';
import { storageKey } from './motion-toggle.fixture';

/**
 * MotionToggle - Storybook Meta
 */
export default {
  title: 'Molecules/Forms/Toggle',
  component: MotionToggle,
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
    defaultValue: {
      control: {
        type: 'select',
      },
      description: 'Set the default value.',
      options: ['on', 'off'],
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
  },
} as ComponentMeta<typeof MotionToggle>;

const Template: ComponentStory<typeof MotionToggle> = (args) => (
  <MotionToggle {...args} />
);

/**
 * Toggle Stories - Motion
 */
export const Motion = Template.bind({});
Motion.args = {
  defaultValue: 'on',
  storageKey,
};
