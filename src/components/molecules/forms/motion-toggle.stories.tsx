import { ComponentMeta, ComponentStory } from '@storybook/react';
import MotionToggleComponent from './motion-toggle';
import { storageKey } from './motion-toggle.fixture';

/**
 * MotionToggle - Storybook Meta
 */
export default {
  title: 'Molecules/Forms/Toggle',
  component: MotionToggleComponent,
  argTypes: {
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
} as ComponentMeta<typeof MotionToggleComponent>;

const Template: ComponentStory<typeof MotionToggleComponent> = (args) => (
  <MotionToggleComponent {...args} />
);

/**
 * Toggle Stories - Motion
 */
export const Motion = Template.bind({});
Motion.args = {
  defaultValue: 'on',
  storageKey,
};
