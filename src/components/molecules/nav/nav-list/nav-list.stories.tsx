import type { Meta, StoryObj } from '@storybook/react';
import { NavItem } from '../nav-item';
import { NavLink } from '../nav-link';
import { NavList } from './nav-list';

const meta = {
  component: NavList,
  title: 'Molecules/Nav/List',
} satisfies Meta<typeof NavList>;

export default meta;

type Story = StoryObj<typeof meta>;

const NavItems = () => (
  <>
    <NavItem>
      <NavLink href="#item1" label="Item 1" />
    </NavItem>
    <NavItem>
      <NavLink href="#item2" label="Item 2" />
    </NavItem>
    <NavItem>
      <NavLink href="#item3" label="Item 3" />
    </NavItem>
    <NavItem>
      <NavLink href="#item4" label="Item 4" />
    </NavItem>
  </>
);

export const Example: Story = {
  args: {
    children: <NavItems />,
  },
};

export const Inlined: Story = {
  args: {
    children: <NavItems />,
    isInline: true,
    spacing: 'sm',
  },
};
