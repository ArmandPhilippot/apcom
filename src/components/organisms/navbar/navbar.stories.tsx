import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './navbar';
import { NavbarItem } from './navbar-item';

const meta = {
  component: Navbar,
  title: 'Organisms/Navbar',
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OneItem: Story = {
  args: {
    children: (
      <NavbarItem icon="hamburger" id="main-nav" label="Nav">
        The main nav contents
      </NavbarItem>
    ),
  },
};

export const TwoItems: Story = {
  args: {
    children: (
      <>
        <NavbarItem icon="hamburger" id="main-nav" label="Nav">
          The main nav contents
        </NavbarItem>
        <NavbarItem icon="magnifying-glass" id="search" label="Search">
          A search form
        </NavbarItem>
      </>
    ),
  },
};

export const ThreeItems: Story = {
  args: {
    children: (
      <>
        <NavbarItem icon="hamburger" id="main-nav" label="Nav">
          The main nav contents
        </NavbarItem>
        <NavbarItem icon="magnifying-glass" id="search" label="Search">
          A search form
        </NavbarItem>
        <NavbarItem icon="cog" id="settings" label="Settings">
          A settings form
        </NavbarItem>
      </>
    ),
  },
};
