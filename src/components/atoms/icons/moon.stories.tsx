import { ComponentMeta, ComponentStory } from '@storybook/react';
import MoonIcon from './moon';

/**
 * Moon icon - Storybook Meta
 */
export default {
  title: 'Atoms/Illustrations/Icons',
  component: MoonIcon,
  argTypes: {
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
    title: {
      control: {
        type: 'text',
      },
      description: 'The SVG title.',
      table: {
        category: 'Accessibility',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof MoonIcon>;

const Template: ComponentStory<typeof MoonIcon> = (args) => (
  <MoonIcon {...args} />
);

/**
 * Icons Stories - Moon
 */
export const Moon = Template.bind({});
