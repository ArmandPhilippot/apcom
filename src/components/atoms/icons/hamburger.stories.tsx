import { ComponentMeta, ComponentStory } from '@storybook/react';
import HamburgerIcon from './hamburger';

export default {
  title: 'Atoms/Icons',
  component: HamburgerIcon,
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
    isActive: {
      control: {
        type: 'boolean',
      },
      description: 'Transform hamburger into a cross when state is active.',
      type: {
        name: 'boolean',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof HamburgerIcon>;

const Template: ComponentStory<typeof HamburgerIcon> = (args) => (
  <HamburgerIcon {...args} />
);

export const Hamburger = Template.bind({});
