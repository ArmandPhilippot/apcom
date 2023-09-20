import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MagnifyingGlass as MagnifyingGlassIcon } from './magnifying-glass';

/**
 * Magnifying Glass icon - Storybook Meta
 */
export default {
  title: 'Atoms/Illustrations/Icons',
  component: MagnifyingGlassIcon,
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
} as ComponentMeta<typeof MagnifyingGlassIcon>;

const Template: ComponentStory<typeof MagnifyingGlassIcon> = (args) => (
  <MagnifyingGlassIcon {...args} />
);

/**
 * Icons Stories - Magnifying Glass
 */
export const MagnifyingGlass = Template.bind({});
