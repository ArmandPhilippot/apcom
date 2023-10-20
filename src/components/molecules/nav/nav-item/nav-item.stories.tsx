import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { NavLink } from '../nav-link';
import { NavItem } from './nav-item';

/**
 * NavItem - Storybook Meta
 */
export default {
  title: 'Molecules/Nav/NavItem',
  component: NavItem,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'Define the nav item contents.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof NavItem>;

const Template: ComponentStory<typeof NavItem> = (args) => (
  <ul style={{ margin: 0, padding: 0 }}>
    <NavItem {...args} />
  </ul>
);

/**
 * NavItem Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  children: <NavLink href="#example" label="Example" />,
};
