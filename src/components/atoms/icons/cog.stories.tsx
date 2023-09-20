import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Cog as CogIcon } from './cog';

/**
 * Cogs icon - Storybook Meta
 */
export default {
  title: 'Atoms/Illustrations/Icons',
  component: CogIcon,
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
} as ComponentMeta<typeof CogIcon>;

const Template: ComponentStory<typeof CogIcon> = (args) => (
  <CogIcon {...args} />
);

/**
 * Icons Stories - Cogs
 */
export const Cog = Template.bind({});
