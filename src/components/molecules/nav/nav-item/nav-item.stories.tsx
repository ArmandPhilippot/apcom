import type { Meta, StoryObj } from '@storybook/react';
import { NavLink } from '../nav-link';
import { NavItem, type NavItemProps } from './nav-item';

const WrappedNavItem = (args: NavItemProps) => (
  <ul style={{ margin: 0, padding: 0 }}>
    <NavItem {...args} />
  </ul>
);

const meta = {
  component: NavItem,
  title: 'Molecules/Nav/Item',
  render: WrappedNavItem,
} satisfies Meta<typeof NavItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: <NavLink href="#example" label="Example" />,
  },
};
