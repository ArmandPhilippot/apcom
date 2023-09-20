import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Envelop as EnvelopIcon } from './envelop';

/**
 * Envelop icon - Storybook Meta
 */
export default {
  title: 'Atoms/Illustrations/Icons',
  component: EnvelopIcon,
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
} as ComponentMeta<typeof EnvelopIcon>;

const Template: ComponentStory<typeof EnvelopIcon> = (args) => (
  <EnvelopIcon {...args} />
);

/**
 * Icons Stories - Envelop
 */
export const Envelop = Template.bind({});
