import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Close as CloseIcon } from './close';

/**
 * Close icon - Storybook Meta
 */
export default {
  title: 'Atoms/Illustrations/Icons',
  component: CloseIcon,
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
} as ComponentMeta<typeof CloseIcon>;

const Template: ComponentStory<typeof CloseIcon> = (args) => (
  <CloseIcon {...args} />
);

/**
 * Icons Stories - Close
 */
export const Close = Template.bind({});
