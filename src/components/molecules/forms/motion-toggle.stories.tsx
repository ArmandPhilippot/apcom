import { ComponentMeta, ComponentStory } from '@storybook/react';
import MotionToggleComponent from './motion-toggle';

/**
 * MotionToggle - Storybook Meta
 */
export default {
  title: 'Molecules/Forms/Toggle',
  component: MotionToggleComponent,
  argTypes: {
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
      description: 'Set local storage key.',
      type: {
        name: 'string',
        required: true,
      },
    },
    value: {
      control: {
        type: null,
      },
      description: 'The reduce motion value.',
      type: {
        name: 'boolean',
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
  value: false,
};
