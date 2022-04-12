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
      description: 'Set additional classnames to the icon wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    iconClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the icon.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof HamburgerIcon>;

const Template: ComponentStory<typeof HamburgerIcon> = (args) => (
  <HamburgerIcon {...args} />
);

export const Hamburger = Template.bind({});
