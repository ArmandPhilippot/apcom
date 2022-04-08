import { ComponentMeta, ComponentStory } from '@storybook/react';
import MoonIcon from './moon';

export default {
  title: 'Atoms/Icons',
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

export const Moon = Template.bind({});
