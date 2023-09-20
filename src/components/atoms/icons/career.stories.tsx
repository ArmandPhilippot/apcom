import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Career as CareerIcon } from './career';

/**
 * Career icon - Storybook Meta
 */
export default {
  title: 'Atoms/Illustrations/Icons',
  component: CareerIcon,
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
} as ComponentMeta<typeof CareerIcon>;

const Template: ComponentStory<typeof CareerIcon> = (args) => (
  <CareerIcon {...args} />
);

/**
 * Icons Stories - Career
 */
export const Career = Template.bind({});
