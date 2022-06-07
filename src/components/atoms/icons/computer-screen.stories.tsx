import { ComponentMeta, ComponentStory } from '@storybook/react';
import ComputerScreenIcon from './computer-screen';

/**
 * Computer Screen icon - Storybook Meta
 */
export default {
  title: 'Atoms/Illustrations/Icons',
  component: ComputerScreenIcon,
  argTypes: {
    'aria-hidden': {
      control: {
        type: null,
      },
      description: 'Should the svg be hidden from assistive technologies?',
      table: {
        category: 'Accessibility',
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
      description: 'Set additional classnames.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof ComputerScreenIcon>;

const Template: ComponentStory<typeof ComputerScreenIcon> = (args) => (
  <ComputerScreenIcon {...args} />
);

/**
 * Icons Stories - Computer Screen
 */
export const ComputerScreen = Template.bind({});
