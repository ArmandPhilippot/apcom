import { ComponentMeta, ComponentStory } from '@storybook/react';
import SunIcon from './sun';

/**
 * Sun icon - Storybook Meta
 */
export default {
  title: 'Atoms/Illustrations/Icons',
  component: SunIcon,
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
} as ComponentMeta<typeof SunIcon>;

const Template: ComponentStory<typeof SunIcon> = (args) => (
  <SunIcon {...args} />
);

/**
 * Icons Stories - Sun
 */
export const Sun = Template.bind({});
