import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MotionToggle } from './motion-toggle';
import { storageKey } from './motion-toggle.fixture';

/**
 * MotionToggle - Storybook Meta
 */
export default {
  title: 'Organisms/Forms/Toggle',
  component: MotionToggle,
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
